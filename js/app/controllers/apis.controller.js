(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApisCtrl', ApisCtrl);

  ApisCtrl.$inject = ['$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function ApisCtrl($http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;

    APIService.call('apisGet', [0.0, 0.0])
      .then(aPIsGetResponse);

    function aPIsGetResponse(response) {
      if (response.status === 200) {
        vm.apis = response.data.list;
      } else {
        AlertService.error("Problem retrieving application list");
      }
    }

  }

})();
