(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApplicationCtrl', ApplicationCtrl);

  ApplicationCtrl.$inject = ['$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function ApplicationCtrl($http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;

    APIService.call('applicationsGet', [0.0, 0.0])
      .then(applicationsGetResponse);

    function applicationsGetResponse(response) {
      if (response.status === 200) {
        vm.applications = response.data.list;
      } else {
        AlertService.error("Problem retrieving application list");
      }
    }

  }

})();
