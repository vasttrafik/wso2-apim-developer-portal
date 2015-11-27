/*global defaultBaseUrl*/

(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApiCtrl', ApiCtrl)
    .constant('defaultBaseUrl', defaultBaseUrl);

  ApiCtrl.$inject = ['$rootScope', '$scope', '$location', '$routeParams', 'APIService', 'AlertService'];

  function ApiCtrl($rootScope, $scope, $location, $routeParams, APIService, AlertService) {
    var vm = this;

    vm.addSubscription = addSubscription;
    vm.resetAddSubscriptionForm = resetAddSubscriptionForm;

    (function init() {
      vm.defaultBaseUrl = defaultBaseUrl;
      vm.documents = {};
      vm.applications = {};

      // To make loading of this data faster
      vm.apiName = $routeParams.apiName;
      vm.apiVersion = $routeParams.apiVersion;
      vm.apiProvider = $routeParams.apiProvider;
      vm.apiIdSingle = $routeParams.apiName + '--' + $routeParams.apiVersion + '_' + $routeParams.apiProvider;

      APIService.call('apisApiIdGet', [vm.apiIdSingle])
        .then(aPIsIdGetResponse)
        .then(getDocumentsForApi);

      if ($rootScope.user.loggedIn) {
        APIService.call('applicationsGet', [100, 0])
          .then(applicationsGetResponse);
      }
    })();

    function applicationsGetResponse(response) {
      if (response.status === 200) {
        vm.applications = response.data.list;
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
