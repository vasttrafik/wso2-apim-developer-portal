(function () {
  'use strict';

  angular
  .module('vtPortal')
  .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$rootScope', 'APIService', 'AlertService', '$http', '$httpParamSerializer'];
  function ProfileController($rootScope, APIService, AlertService, $http, $httpParamSerializer) {
    var vm = this;

    var apiClient = new API.Client.DefaultApi($http, null, $httpParamSerializer);

    APIService.Call('applicationsGet', [0.0, 0.0])
    .then(function(response) {

      if(response.status === 200) {
        vm.applications = response.data.list;
      } else {
        AlertService.Error("Problem retrieving application list", false);
      }

    });

  }

})();
