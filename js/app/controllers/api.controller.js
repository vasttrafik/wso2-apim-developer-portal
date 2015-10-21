(function () {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApiCtrl', ApiCtrl);

  ApiCtrl.$inject = ['$routeParams', '$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function ApiCtrl($routeParams, $http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;

    APIService.call('apisApiIdGet', [$routeParams.apiName + '/' + $routeParams.apiVersion + '/' + $routeParams.apiProvider])
    .then(aPIsIdGetResponse);

    function aPIsIdGetResponse(response) {
      if (response.status == 200) {
        vm.api = response.data;
      } else {
        AlertService.error("Problem retrieving api details");
      }
    }
  }

})();
