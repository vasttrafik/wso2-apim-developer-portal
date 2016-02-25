(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ActivationCtrl', ActivationCtrl);

  ActivationCtrl.$inject = ['$location', '$scope', 'APIService', 'AlertService'];

  function ActivationCtrl($location, $scope, APIService, AlertService) {
    var vm = this;

    vm.activateAccount = activateAccount;
    vm.generateCaptcha = generateCaptcha;

    (function init() {
      generateCaptcha();

      vm.form = {};
      vm.form.activation = {};
      vm.form.activation.username = $location.search().username;
      vm.form.activation.code = $location.search().code;
    })();

    function activateAccount() {
      APIService.userCall('usersPut', ['application/json', 'application/json', {
          username: vm.form.activation.username,
          code: vm.form.activation.code.trim(),
          captcha: {
            imageId: vm.form.activation.imageId,
            secretKey: vm.form.activation.secretKey,
            userAnswer: vm.form.activation.captcha
          },
          tenantDomain: 'carbon.super'
        }, '*/*', 'application/json'])
        .then(usersPutResponse)
        .catch(activateAccountError);

      function usersPutResponse(response) {
        if (response.data.verified) {
          activationSuccess();
        } else {
          activationError();
        }
      }

      function activateAccountError(response) {
        // To combat unique constraint violation
        if ((response.status === 500) && (response.message.indexOf('Violation of UNIQUE KEY constraint') > -1)) {
          activationSuccess();
        } else {
          activationError();
        }
      }

      function activationSuccess() {
        AlertService.success('Nu kan du logga in', 'Ditt konto är aktiverat!', 10000);
        $location.path('/');
        $location.search('username', null);
        $location.search('code', null);
      }

      function activationError() {
        AlertService.error('Försök igen', 'Problem vid verifiering av konto');
        generateCaptcha();
        vm.form.activation.captcha = '';
        $scope.activateAccountForm.$setPristine();
      }
    }

    function generateCaptcha() {
      APIService.userCall('captchasPost', [])
        .then(captchasPostResponse);

      function captchasPostResponse(response) {
        vm.form.activation.imageId = response.data.imageId;
        vm.form.activation.secretKey = response.data.secretKey;

        vm.captcha = APIService.getUserApiBasePath() + '/captchas/' + response.data.imageId;
      }
    }

  }

})();
