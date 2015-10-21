(function () {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApiCtrl', ApiCtrl);

  ApiCtrl.$inject = ['$routeParams', '$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function ApiCtrl($routeParams, $http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;

    APIService.call('apisApiIdGet', [$routeParams.apiName + '/' + $routeParams.apiVersion + '/' + $routeParams.apiProvider])
    .then(aPIsIdGetResponse)
    .then(getDocumentsForApi());

    function getDocumentsForApi()
    {
      APIService.call('apisApiIdDocumentsGet',[0,0, $routeParams.apiName + '/' + $routeParams.apiVersion + '/' + $routeParams.apiProvider] ).
      then(apisApiIdDocumentsGetResponse)
    }

    function aPIsIdGetResponse(response) {
      if (response.status == 200) {
        vm.api = response.data;
      } else {
        AlertService.error("Problem retrieving api details");
      }
    }

    function apisApiIdDocumentsGetResponse(response){
      if (response.status == 200){
        vm.api.documents = response.data.list;
      } else {
        AlertService.error("Could not retrieve document list for API");
      }
    }
  }

})();
