(function () {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApiCtrl', ApiCtrl);

  ApiCtrl.$inject = ['$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function ApiCtrl($http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;
    var name = "";
    var version = "";
    var provider = "";

    APIService.call('apisApiIdGet', [name + '/' + version + '/' + provider])
    .then(aPIsIdGetResponse)

    function aPIsIdGetResponse(response) {
      if (response.status == 200) {
        vm.api = response.data;
      } else {
        AlertService.error("Problem retrieving api details");
      }
    }
  }

})();
