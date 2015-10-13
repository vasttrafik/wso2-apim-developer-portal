(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApisCtrl', ApisCtrl);

  ApisCtrl.$inject = ['$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function ApisCtrl($http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;

    APIService.Call('apisGet', [0.0, 0.0])
      .then(APIsGetResponse);

    function APIsGetResponse(response) {
      if (response.status === 200) {
        vm.apis = response.data.list;
      } else {
        AlertService.Error("Problem retrieving application list", false);
      }
    }

  }

})();
