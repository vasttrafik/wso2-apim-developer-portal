(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$rootScope', '$timeout', '$location', '$http', '$httpParamSerializer', 'APIService', 'AlertService', 'UserService'];

  function ProfileCtrl($rootScope, $timeout, $location, $http, $httpParamSerializer, APIService, AlertService, UserService) {
    var vm = this;

    vm.saveProfile = saveProfile;
    vm.savePassword = savePassword;
    vm.resetProfileForm = resetProfileForm;
    vm.resetPasswordForm = resetPasswordForm;

    vm.user = {};
    resetProfileForm();

    function saveProfile() {

      vm.dataLoadingProfile = true;

      UserService.getUser()
        .then(function(response) {

          response.userName = vm.user.profile.userName;
          response.claims = [{
            claimURI: 'http://wso2.org/claims/emailaddress',
            value: vm.user.profile.email
          }, {
            claimURI: 'http://wso2.org/claims/givenname',
            value: vm.user.profile.firstName
          }, {
            claimURI: 'http://wso2.org/claims/lastname',
            value: vm.user.profile.lastName
          }];

          APIService.call('usersUserIdPut', ['updateProfile', response, response.userId])
            .then(usersUserIdPutResponse);
        });

      function usersUserIdPutResponse(response) {

        $timeout(function() {
          UserService.getUser()
            .then(function(userResponse) {
              userResponse.userName = response.data.userName;
              userResponse.claims = response.data.claims;
              UserService.setUser(userResponse)
                .then(function() {
                  resetProfileForm(); // At this stage the rootScope is updated
                  vm.dataLoadingProfile = false;
                  AlertService.success("Din profil är uppdaterad!");
                });
            });

        }, 1000);
      }

    }

    function savePassword() {

      vm.dataLoadingPassword = true;

      UserService.getUser()
        .then(function(response) {

          APIService.call('usersUserIdPut', ['updateCredential', response, response.userId])
            .then(usersUserIdPutResponse);
        });

      function usersUserIdPutResponse(response) {

        $timeout(function() {
          vm.dataLoadingPassword = false;
          AlertService.success("Ditt lösenord är uppdaterat!");

        }, 1000);
      }

    }

    function resetProfileForm() {
      vm.user.profile = angular.copy($rootScope.globals.currentUser);
    }

    function resetPasswordForm() {
      vm.user.password.password = '';
      vm.user.password.passwordRepeat = '';
    }

  }


})();
