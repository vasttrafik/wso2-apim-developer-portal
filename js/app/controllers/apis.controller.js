/*global defaultBaseUrl*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApisCtrl', ApisCtrl)
    .constant('defaultBaseUrl', defaultBaseUrl);

  ApisCtrl.$inject = ['$http', '$location', 'APIService', 'AlertService'];

  function ApisCtrl($http, $location, APIService, AlertService) {
    var vm = this;

    vm.displayApi = displayApi;

    (function init() {
      APIService.call('apisGet', [100, 0])
        .then(apisGetResponse);

      vm.defaultBaseUrl = defaultBaseUrl;
    })();

    function apisGetResponse(response) {
      if (response.status === 200) {
        vm.apis = response.data.list.filter(function(el) {
          return el.status.toUpperCase() !== 'BLOCKED';
        });
      } else {
        AlertService.error('Problem att hämta lista med applikationer');
      }
    }

    function displayApi(name, version, provider) {
      $location.path('/api/' + name + '/' + version + '/' + provider);
    }

  }

})();
