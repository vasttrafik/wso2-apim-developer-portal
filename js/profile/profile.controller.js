(function () {
  'use strict';

  angular
  .module('vtPortal')
  .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['APIService', 'AlertService', '$http', '$httpParamSerializer'];
  function ProfileController(APIService, AlertService, $http, $httpParamSerializer) {
    var vm = this;

    APIService.Call('applicationsGet', [0.0, 0.0])
    .then(ApplicationsGetResponse);

    function ApplicationsGetResponse(response) {
      if(response.status === 200) {
        vm.applications = response.data.list;
      } else {
        AlertService.Error("Problem retrieving application list", false);
      }
    }

  }

})();
