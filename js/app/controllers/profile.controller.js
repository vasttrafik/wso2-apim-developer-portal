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
    vm.resetChallengeQuestionForm = resetChallengeQuestionForm;
    vm.addUpdateChallengeQuestion = addUpdateChallengeQuestion;

    (function init() {
      vm.form = {};

      resetProfileForm();
      resetChallengeQuestionForm();

    })();

    function saveProfile() {
      vm.dataLoadingProfile = true;

      var newUserObject = {};

      UserService.getUser()
        .then(function(response) {

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
          newUserObject = angular.copy(response); // Keep a copy of the updated values
          response.tenantDomain = 'carbon.super';
          delete response.accessToken;
          delete response.userName;

          APIService.userCall('usersUserIdPut', [response.id, 'updateProfile', 'application/json', 'application/json', response])
            .then(usersUserIdPutResponse)
            .catch(function(response) {
              if (response.status === 412) {
                AlertService.error(response.message, 'Problem att uppdatera användaruppgifter');
              } else {
                AlertService.error('Problem att uppdatera användaruppgifter');
              }
            });
        });

      function usersUserIdPutResponse(response) {

        if (response.status === 200) {

          UserService.getClaim('http://wso2.org/claims/challengeQuestion1')
            .then(function(response) {
              newUserObject.claims.push(response.object);

              UserService.setUser(newUserObject)
                .then(function() {
                  resetProfileForm(); // At this stage the rootScope is updated
                  vm.dataLoadingProfile = false;
                  AlertService.success('Din profil är uppdaterad!');
                });
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

          APIService.userCall('usersUserIdPut', [response.id, 'updatePassword', '*/*', 'application/json', request])
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

    function addUpdateChallengeQuestion() {

      var challengeQuestionId = 'http://wso2.org/claims/challengeQuestion1';
      var challengeQuestionQuestion = vm.form.question.question;

      var userObject = {};

      UserService.getUser()
        .then(function(response) {

          APIService.userCall('challengequestionsPost', ['application/json', response.id, {
              id: challengeQuestionId,
              question: challengeQuestionQuestion,
              answer: vm.form.question.answer
            }])
            .then(challengequestionsPutResponse);

          function challengequestionsPutResponse(response) {
            if (response.status === 200 || response.status === 201) {
              AlertService.success('Säkerhetsfrågan skapad / uppdaterad!');

              UserService.setOrUpdateClaim('http://wso2.org/claims/challengeQuestion1', challengeQuestionQuestion)
                .then(function() {
                  resetChallengeQuestionForm();
                });

            } else {
              AlertService.error('Problem att skapa / uppdatera säkerhetsfrågan');
            }
          }
        });
    }

    function resetProfileForm() {
      vm.form.profile = angular.copy($rootScope.globals.currentUser);
    }

    function resetChallengeQuestionForm() {

      UserService.getClaim('http://wso2.org/claims/challengeQuestion1')
        .then(function(response) {

          if (response.success) {
            vm.form.question = {};

            /* The challenge question isn't correctly formatted */
            if (response.object.claimValue == null) {
              vm.form.question.question = '';
            } else if (response.object.claimValue.indexOf('!') > -1) {
              vm.form.question.question = response.object.claimValue.substring(0, response.object.claimValue.indexOf('!'));
            } else {
              vm.form.question.question = response.object.claimValue;
            }
          }
        });
      if ($scope.challengeQuestionForm != null) {
        $scope.challengeQuestionForm.$setPristine();
      }
    }

    function resetPasswordForm() {
      vm.form.password = {};
      vm.form.password.password = '';
      vm.form.password.passwordRepeat = '';
      $scope.passwordForm.$setPristine();
    }

  }

})();
