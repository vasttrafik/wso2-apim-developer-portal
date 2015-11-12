(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('RecoverCtrl', RecoverCtrl);

  RecoverCtrl.$inject = ['$location', '$scope', 'APIService', 'AlertService'];

  function RecoverCtrl($location, $scope, APIService, AlertService) {
    var vm = this;

    vm.generateCaptcha = generateCaptcha;
    vm.passwordRecoveryCaptcha = passwordRecoveryCaptcha;
    vm.passwordRecoveryNotification = passwordRecoveryNotification;
    vm.passwordRecovery = passwordRecovery;
    vm.resetPasswordForm = resetPasswordForm;

    (function init() {

      generateCaptcha();

      vm.form = {};
      vm.form.captcha = {};
      vm.form.username = $location.search().username;

      vm.form.notification = {};
      vm.user = {};

      if ((vm.form.notification.code = $location.search().code) != null) { // jshint ignore:line
        vm.user.notification = true;
      }

      vm.form.captcha.recoveryType = 'notification';

    })();

    function passwordRecoveryCaptcha() {

      vm.dataLoadingCaptcha = true;

      APIService.userCall('captchasPut', ['*/*', 'application/json', 'verifyUser', {
          userName: vm.form.username,
          captcha: {
            imageId: vm.form.captcha.imageId,
            secretKey: vm.form.captcha.secretKey,
            userAnswer: vm.form.captcha.captcha
          },
          tenantDomain: 'carbon.super'

        }])
        .then(captchasPutUserResponse);

      function captchasPutUserResponse(response) {
        if (response.status === 200) {

          if (vm.form.captcha.recoveryType === 'notification') {
            APIService.userCall('notificationsPost', ['*/*', 'application/json', {
                userName: vm.form.username,
                key: response.data.key,
                notificationType: ''
              }])
              .then(notificationsPostResponse);
          }

        } else {
          AlertService.error('Problem vid verifieringen av captcha, försök igen');
          generateCaptcha();
          vm.form.captcha.captcha = '';
          $scope.passwordRecoveryCaptchaForm.$setPristine();
        }

        vm.dataLoadingCaptcha = false;

      }

      function notificationsPostResponse(response) {
        if (response.status === 200) {
          AlertService.success('Du kommer få ett mail med vidare instruktioner', 'Lyckad verifiering!', 10000);
          vm.user.notification = true;
          generateCaptcha();
        } else {
          AlertService.error('Kontakta ic-support@vasttrafik.se och beskriv problemet", "Problem att skicka ut mail med instruktioner');
        }
      }

    }

    function passwordRecoveryNotification() {

      vm.dataLoadingNotification = true;

      APIService.userCall('captchasPut', ['*/*', 'application/json', 'verifyCode', {
          userName: vm.form.username,
          captcha: {
            imageId: vm.form.captcha.imageId,
            secretKey: vm.form.captcha.secretKey,
            userAnswer: vm.form.captcha.captcha
          },
          code: vm.form.notification.code,
          tenantDomain: 'carbon.super'

        }])
        .then(captchasPutCodeResponse);

      function captchasPutCodeResponse(response) {
        if (response.status === 200) {
          AlertService.success('Lyckad verifiering!');
          vm.user.password = true;
          vm.form.password = {};
          vm.form.password.userId = 1; // Recover password doesn't look at the userId
          vm.form.password.code = response.data.key;
        } else {
          AlertService.error('Försök igen', 'Problem vid verifieringen av captcha');
          generateCaptcha();
          vm.form.captcha.captcha = '';
          $scope.passwordRecoveryNotificationForm.$setPristine();
        }

        vm.dataLoadingNotification = false;

      }
    }

    function passwordRecovery() {

      vm.dataLoadingPassword = true;

      APIService.userCall('usersUserIdPut', [vm.form.password.userId, 'recoverPassword', '*/*', null, 'application/json', {
          userName: vm.form.username,
          password: {
            confirmationCode: vm.form.password.code,
            password: vm.form.password.password,
          },
          profileName: 'default',
          tenantDomain: 'carbon.super'

        }])
        .then(usersUserIdPutResponse);

      function usersUserIdPutResponse(response) {
        if (response.status === 200) {
          AlertService.success('Du kan nu logga in', 'Lösenordet är uppdaterat!',10000);
          $location.path('/');
          $location.search('username', null);
          $location.search('code', null);
        } else {
          AlertService.error(response.data.message, 'Problem att uppdatera lösenord');
          resetPasswordForm();
        }

        vm.dataLoadingPassword = false;

      }
    }

    function generateCaptcha() {
      APIService.userCall('captchasPost', [])
        .then(captchasPostResponse);

      function captchasPostResponse(response) {
        vm.form.captcha.imageId = response.data.imageId;
        vm.form.captcha.secretKey = response.data.secretKey;
        vm.form.captcha.captcha = '';

        $scope.passwordRecoveryNotificationForm.$setPristine();
        $scope.passwordRecoveryCaptchaForm.$setPristine();

        vm.captcha = APIService.getUserApiBasePath() + '/captchas/' + response.data.imageId;
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
