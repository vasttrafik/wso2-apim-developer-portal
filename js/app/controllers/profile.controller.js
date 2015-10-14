(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function ProfileCtrl($http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;

    APIService.Call('applicationsGet', [0.0, 0.0])
      .then(ApplicationsGetResponse);

    function ApplicationsGetResponse(response) {
      if (response.status === 200) {
        vm.applications = response.data.list;
      } else {
        AlertService.Error("Problem retrieving application list", false);
      }
    }

  }

})();