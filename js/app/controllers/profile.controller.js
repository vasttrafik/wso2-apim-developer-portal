(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', 'APIService', 'AlertService', 'UserService'];

  function ProfileCtrl($scope, $rootScope, $location, $http, APIService, AlertService, UserService) {
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

      var newUserObject = {};

      UserService.getUser()
        .then(function(response) {

          response.userName = vm.form.profile.userName;
          response.claims = [{
            claimUri: 'http://wso2.org/claims/emailaddress',
            claimValue: vm.form.profile.email
          }, {
            claimUri: 'http://wso2.org/claims/givenname',
            claimValue: vm.form.profile.firstName
          }, {
            claimUri: 'http://wso2.org/claims/lastname',
            claimValue: vm.form.profile.lastName
          }];
          response.tenantDomain = 'carbon.super';
          newUserObject = angular.copy(response); // Keep a copy of the updated values
          delete response.accessToken;

          APIService.userCall('usersUserIdPut', [response.id, 'updateProfile', 'application/json', 'Bearer ' + newUserObject.accessToken.token, 'application/json', response])
            .then(usersUserIdPutResponse);
        });

      function usersUserIdPutResponse(response) {

        if (response.status === 200) {

          UserService.setUser(newUserObject)
            .then(function() {
              resetProfileForm(); // At this stage the rootScope is updated
              vm.dataLoadingProfile = false;
              AlertService.success('Din profil är uppdaterad!');
            });
        } else {
          AlertService.error('Problem att uppdatera användaruppgifter');
        }
        vm.dataLoadingProfile = false;
      }
    }

    function savePassword() {
      vm.dataLoadingPassword = true;

      UserService.getUser()
        .then(function(response) {

          var request = {};
          request.id = response.id;
          request.password = {};
          request.password.password = vm.form.password.passwordOld;
          request.password.newPassword = vm.form.password.passwordRepeat;
          request.userName = response.userName;

          APIService.userCall('usersUserIdPut', [response.id, 'updatePassword', '*/*', 'Bearer ' + response.accessToken.token, 'application/json', request])
            .then(usersUserIdPutResponse);
        });

      function usersUserIdPutResponse(response) {
        if (response.status === 200) {

          resetPasswordForm();
          AlertService.success('Ditt lösenord är uppdaterat!');
        } else {
          AlertService.error(response.data.message);
        }
        vm.dataLoadingPassword = false;
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
