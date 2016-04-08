(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', 'APIService', 'AlertService', 'UserService'];

  function ProfileCtrl($scope, $rootScope, $location, $http, APIService, AlertService, UserService) {
    var vm = this;

    vm.saveProfile = saveProfile;
    vm.saveCommunityProfile = saveCommunityProfile;
    vm.savePassword = savePassword;
    vm.resetProfileForm = resetProfileForm;
    vm.resetCommunityForm = resetCommunityForm;
    vm.resetPasswordForm = resetPasswordForm;
    vm.resetChallengeQuestionForm = resetChallengeQuestionForm;
    vm.addUpdateChallengeQuestion = addUpdateChallengeQuestion;

    (function init() {
      vm.form = {};

      APIService.communityCall('membersIdGet', [$rootScope.globals.currentUser.id])
        .then(membersIdGetResponse);

      resetProfileForm();
      resetChallengeQuestionForm();

    })();

    function membersIdGetResponse(response) {
      if (response.status === 200) {

        vm.member = response.data;
        resetCommunityForm();

      } else {
        AlertService.error('Problem att hämta community profil');
      }
    }

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
          delete response.memberId;

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

    function saveCommunityProfile() {
      vm.dataLoadingCommunity = true;

      var member = {
        id: $rootScope.globals.currentUser.id,
        userName: $rootScope.globals.currentUser.userName,
        status: 'active',
        email: vm.form.community.email,
        signature: vm.form.community.signature,
        gravatarEmail: vm.form.community.gravatarEmail,
        useGravatar: (vm.form.community.gravatarEmail ? true : false)
      };

      if ($rootScope.globals.currentUser.memberId) {
        APIService.communityCall('membersIdPut', [$rootScope.globals.currentUser.memberId, member])
          .then(membersResponse)
          .catch(function(response) {
            if (response.status === 400) {
              AlertService.error(response.message, 'Problem att uppdatera community profil');
            } else {
              AlertService.error('Problem att uppdatera community profil');
            }
            vm.dataLoadingCommunity = false;
          });
      } else {
        APIService.communityCall('membersPost', [member])
          .then(membersResponse)
          .catch(function(response) {
            if (response.status === 400) {
              AlertService.error(response.message, 'Problem att skapa community profil');
            } else {
              AlertService.error('Problem att skapa community profil');
            }
            vm.dataLoadingCommunity = false;
          });
      }

      function membersResponse(response) {

        if (response.status === 200 || response.status === 201) {

          var created = ($rootScope.globals.currentUser.memberId ? false : true);

          UserService.setMemberId(response.data.id)
            .then(function() {

              vm.member = response.data;

              if (!created) {
                AlertService.success('Din community profil är uppdaterad!');
              } else {
                AlertService.success('Din community profil är skapad!');
              }
            })
            .then(resetCommunityForm)
            .catch(function(response) {
              AlertService.error('Problem att uppdatera community profilen');
            });

        } else {
          if ($rootScope.globals.member) {
            AlertService.success('Problem att uppdatera community profil');
          } else {
            AlertService.success('Problem att skapa community profil');
          }
        }
        vm.dataLoadingCommunity = false;
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

    function resetCommunityForm() {

      vm.form.community = {};

      if (!$rootScope.globals.currentUser.memberId) {
        vm.form.community.signature = $rootScope.globals.currentUser.userName;
        vm.form.community.email = $rootScope.globals.currentUser.email;
        vm.form.community.gravatarEmail = $rootScope.globals.currentUser.email;
      } else {
        vm.form.community = angular.copy(vm.member);
      }

    }

    function resetChallengeQuestionForm() {

      UserService.getClaim('http://wso2.org/claims/challengeQuestion1')
        .then(function(response) {

          if (response.success) {
            vm.form.question = {};

            if (response.object) {
              /* The challenge question isn't correctly formatted */
              if (response.object.claimValue == null) {
                vm.form.question.question = '';
              } else if (response.object.claimValue.indexOf('!') > -1) {
                vm.form.question.question = response.object.claimValue.substring(0, response.object.claimValue.indexOf('!'));
              } else {
                vm.form.question.question = response.object.claimValue;
              }
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
