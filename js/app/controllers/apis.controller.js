(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApisCtrl', ApisCtrl);

  ApisCtrl.$inject = ['$http', '$location', 'APIService', 'AlertService'];

  function ApisCtrl($http, $location, APIService, AlertService) {
    var vm = this;

    vm.displayApi = displayApi;

    (function init() {
      APIService.call('apisGet', [0, 0])
        .then(aPIsGetResponse);

    })();

    function aPIsGetResponse(response) {
      if (response.status === 200) {
        vm.apis = response.data.list;
      } else {
        AlertService.error("Problem retrieving application list");
      }
    }

    function displayApi(name, version, provider) {
      $location.path('/api/' + name + '/' + version + '/' + provider);
    }

  }

})();
