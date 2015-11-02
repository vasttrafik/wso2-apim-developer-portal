(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$scope', '$rootScope', '$timeout', '$location', '$http', 'APIService', 'AlertService', 'UserService'];

  function ProfileCtrl($scope, $rootScope, $timeout, $location, $http, APIService, AlertService, UserService) {
    var vm = this;

    vm.saveProfile = saveProfile;
    vm.savePassword = savePassword;
    vm.resetProfileForm = resetProfileForm;
    vm.resetPasswordForm = resetPasswordForm;

    (function init() {
      vm.form = {};

      resetProfileForm();
    })();

    function saveProfile() {

      vm.dataLoadingProfile = true;

      UserService.getUser()
        .then(function(response) {

          response.userName = vm.form.profile.userName;
          response.claims = [{
            claimURI: 'http://wso2.org/claims/emailaddress',
            value: vm.form.profile.email
          }, {
            claimURI: 'http://wso2.org/claims/givenname',
            value: vm.form.profile.firstName
          }, {
            claimURI: 'http://wso2.org/claims/lastname',
            value: vm.form.profile.lastName
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

          response.credential = vm.form.password.password;
          response.newCredential = vm.form.password.passwordRepeat;

          APIService.call('usersUserIdPut', ['updateCredential', response, response.userId])
            .then(usersUserIdPutResponse);
        });

      function usersUserIdPutResponse(response) {

        $timeout(function() {
          vm.dataLoadingPassword = false;
          resetPasswordForm();
          AlertService.success("Ditt lösenord är uppdaterat!");

        }, 1000);
      }

    }

    function resetProfileForm() {
      vm.form.profile = angular.copy($rootScope.globals.currentUser);
    }

    function resetPasswordForm() {
      vm.form.password = {};
      vm.form.password.password = '';
      vm.form.password.passwordRepeat = '';
      $scope.passwordForm.$setPristine();
    }

  }

})();
