(function () {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApiCtrl', ApiCtrl);

  ApiCtrl.$inject = ['$scope', '$routeParams', '$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function ApiCtrl($scope, $routeParams, $http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;
    vm.swaggerUrl = 'http://petstore.swagger.io/v2/swagger.json';
    vm.documents = {};
    vm.applications = {};

    vm.addSubscription = addSubscription;

    APIService.call('apisApiIdGet', [$routeParams.apiName + '/' + $routeParams.apiVersion + '/' + $routeParams.apiProvider])
      .then(aPIsIdGetResponse)
      .then(getDocumentsForApi);

    APIService.call('applicationsGet', [0.0, 0.0])
      .then(applicationsGetResponse);

    function applicationsGetResponse(response) {
      if (response.status === 200) {
        vm.applications = response.data.list;
      } else {
        AlertService.error("Problem retrieving application list");
      }
    }

    function getDocumentsForApi()
    {
      APIService.call('apisApiIdDocumentsGet', [10, 10, $routeParams.apiName + '/' + $routeParams.apiVersion + '/' + $routeParams.apiProvider])
        .then(apisApiIdDocumentsGetResponse)
    }

    function aPIsIdGetResponse(response) {
      if (response.status == 200) {
        vm.api = response.data;
        vm.apiId = vm.api.name + '/' + vm.api.version + '/' + vm.api.provider;
       } else {
        AlertService.error("Problem retrieving api details");
      }
    }

    function apisApiIdDocumentsGetResponse(docResponse){
      if (docResponse.status == 200) {
        vm.documents = docResponse.data.list;
      } else {
        AlertService.error("Could not retrieve document list for API");
      }
    }

    function addSubscription() {

      var apiDef = vm.apiId.split("/");

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
          AlertService.success("Prenumerationen skapad!");
          resetAddSubscriptionForm();

        } else {
          AlertService.error("Problem att skapa ny prenumeration");
        }
      }

      function resetAddSubscriptionForm() {
        $scope.addSubscriptionForm.$setPristine();
      }
    }
  }

})();
