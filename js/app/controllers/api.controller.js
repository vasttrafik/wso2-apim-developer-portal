/*global defaultBaseUrl*/
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApiCtrl', ApiCtrl)
    .constant('defaultBaseUrl', defaultBaseUrl);

  ApiCtrl.$inject = ['$rootScope', '$scope', '$location', '$routeParams', '$timeout', 'APIService', 'AlertService'];

  function ApiCtrl($rootScope, $scope, $location, $routeParams, $timeout, APIService, AlertService) {
    var vm = this;

    vm.addSubscription = addSubscription;
    vm.resetAddSubscriptionForm = resetAddSubscriptionForm;

    (function init() {
      vm.defaultBaseUrl = defaultBaseUrl;
      vm.documents = {};
      vm.applications = {};

      if ($routeParams.direct) {
        // Check if we're coming to this page directly or from api list.
        vm.direct = true;
        // Clean up url
        $location.update_path('/api/' + $routeParams.apiName + '/' + $routeParams.apiVersion + '/' + $routeParams.apiProvider); // jshint ignore:line
      }

      // To make loading of this data faster
      vm.apiName = $routeParams.apiName;
      vm.apiVersion = $routeParams.apiVersion;
      vm.apiProvider = $routeParams.apiProvider;
      vm.apiIdSingle = $routeParams.apiName + '--' + $routeParams.apiVersion + '_' + $routeParams.apiProvider;

      vm.applicationsSubscribing = [];

      $scope.$on('cfpLoadingBar:completed', function(event, data) {
        $rootScope.user.accessToken = vm.accessToken;
      });

      APIService.call('apisApiIdGet', [vm.apiIdSingle])
        .then(aPIsIdGetResponse)
        .then(getDocumentsForApi);

      if ($rootScope.user.loggedIn) {
        APIService.call('applicationsGet', [100, 0])
          .then(applicationsGetResponse);

        // Event fired when all $http loads completed
        $scope.$on('cfpLoadingBar:completed', function(event, data) {
          $timeout(function() {
            // Adding accessToken to API Console if there's a subscribing application with a key
            $rootScope.user.accessToken = vm.accessToken;
          }, 100);
        });
      }

    })();

    function applicationsGetResponse(response) {

      if (response.status === 200) {
        vm.applications = response.data.list.filter(function(a) {
          for (var i = 0; i < a.subscriptions.length; i++) {
            if (a.subscriptions[i].api.name === vm.apiName && a.subscriptions[i].api.version === vm.apiVersion && a.subscriptions[i].api.provider === vm.apiProvider) {
              vm.applicationsSubscribing.push(a);

              // Adding accessToken to API Console if there's a subscribing application with a key
              vm.accessToken = (a.accessToken != null ? a.accessToken : null);

              return false;
            }
          }
          return true;
        });
      } else {
        AlertService.error('Problem att hämta lista med applikationer');
      }
    }

    function getDocumentsForApi() {
      APIService.call('apisApiIdDocumentsGet', [100, 0, vm.apiIdSingle])
        .then(apisApiIdDocumentsGetResponse);
    }

    function aPIsIdGetResponse(response) {
      if (response.status === 200) {
        vm.api = response.data;
        vm.imageUrl = response.data.imageUrl;
        vm.apiId = vm.api.name + '/' + vm.api.version + '/' + vm.api.provider;
        vm.swaggerUrl = defaultBaseUrl + '/' + response.data.swagger;
        vm.useAccessToken = response.data.status !== 'DEPRECATED';

      } else {
        AlertService.error('Problem att hämta detaljer för API');
      }
    }

    function apisApiIdDocumentsGetResponse(docResponse) {
      if (docResponse.status === 200) {
        vm.documents = docResponse.data.list;
      } else {
        AlertService.error('Problem att hämta lista med dokument för API');
      }
    }

    function addSubscription() {
      vm.dataLoadingAddSubscription = true;

      var apiDef = vm.apiId.split('/');

      APIService.call('subscriptionsPost', [{
          application: {
            id: vm.selectedApplicationId
          },
          api: {
            name: apiDef[0],
            version: apiDef[1],
            provider: apiDef[2]
          }
        }, 'application/json'])
        .then(subscriptionsPostResponse);

      function subscriptionsPostResponse(response) {
        if (response.status === 201) {
          AlertService.success('Prenumerationen skapad!');
          $location.path('/subscriptions');

        } else {
          AlertService.error('Problem att skapa ny prenumeration');
        }
        vm.dataLoadingAddSubscription = false;
      }
    }

    function resetAddSubscriptionForm() {
      vm.selectedApplicationId = null;
      $scope.addSubscriptionForm.$setPristine();
    }

  }

})();
