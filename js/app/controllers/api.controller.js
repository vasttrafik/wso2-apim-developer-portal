(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApiCtrl', ApiCtrl);

  ApiCtrl.$inject = ['$rootScope', '$scope', '$location', '$routeParams','APIService', 'AlertService'];

  function ApiCtrl($rootScope, $scope, $location, $routeParams, APIService, AlertService) {
    var vm = this;

    vm.addSubscription = addSubscription;
    vm.resetAddSubscriptionForm = resetAddSubscriptionForm;

    (function init() {
      vm.swaggerUrl = 'http://petstore.swagger.io/v2/swagger.json';
      vm.documents = {};
      vm.applications = {};

      // To make loading of this data faster
      vm.apiName = $routeParams.apiName;
      vm.apiVersion = $routeParams.apiVersion;

      APIService.call('apisApiIdGet', [$routeParams.apiName + '--' + $routeParams.apiVersion + '_' + $routeParams.apiProvider])
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
      APIService.call('apisApiIdDocumentsGet', [100, 0, $routeParams.apiName + '--' + $routeParams.apiVersion + '_' + $routeParams.apiProvider])
        .then(apisApiIdDocumentsGetResponse);
    }

    function aPIsIdGetResponse(response) {
      if (response.status === 200) {
        vm.api = response.data;
        vm.apiId = vm.api.name + '/' + vm.api.version + '/' + vm.api.provider;
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
      var apiDef = vm.apiId.split('/');

      APIService.call('subscriptionsPost', [{
          application: {
            applicationId: vm.selectedApplicationId
          },
          api: {
            name: apiDef[0],
            version: apiDef[1],
            provider: apiDef[2]
          }
        }])
        .then(subscriptionsPostResponse);

      function subscriptionsPostResponse(response) {
        if (response.status === 200) {
          AlertService.success('Prenumerationen skapad!');
          $location.path('/subscriptions');

        } else {
          AlertService.error('Problem att skapa ny prenumeration');
        }
      }
    }

    function resetAddSubscriptionForm() {
      vm.selectedApplicationId = null;
      $scope.addSubscriptionForm.$setPristine();
    }

  }

})();
