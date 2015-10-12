(function () {
  'use strict';

  angular
  .module('vtPortal')
  .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$rootScope', 'AuthenticationService', 'FlashService', '$http', '$httpParamSerializer'];
  function ProfileController($rootScope, AuthenticationService, FlashService, $http, $httpParamSerializer) {
    var vm = this;

    var apiClient = new API.Client.DefaultApi($http, null, $httpParamSerializer);

    AuthenticationService.PreEmptivelyAuthenticate(function(response) {
      if(response.success === true) {
        apiClient.applicationsGet(0.0, 0.0)
        .then(function(response) {
          if(response.status === 200) {
            vm.applications = response.data.list;
          } else {
            FlashService.Error("Problem retrieving application list", false);
          }
        }, function(response) {
          if(response.status === 401) {
            FlashService.Error("User not authenticated", false);
            AuthenticationService.Logout();
          }
        });
      } else {
        FlashService.Error("Problem authenticating: " + response.message, false);
      }
    });

  }

})();
