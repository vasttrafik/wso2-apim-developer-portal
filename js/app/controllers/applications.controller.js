(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApplicationsCtrl', ApplicationsCtrl);

  ApplicationsCtrl.$inject = ['$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function ApplicationsCtrl($http, $httpParamSerializer, APIService, AlertService) {
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
