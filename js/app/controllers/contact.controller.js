(function () {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ContactCtrl', ContactCtrl);

  ContactCtrl.$inject = ['$location', '$scope', '$routeParams', 'AlertService', 'APIService'];

  function ContactCtrl($location, $scope, $routeParams, AlertService, APIService) {
    var vm = this;

    vm.generateCaptcha = generateCaptcha;
    vm.submitContact = submitContact;

    (function init() {
      vm.form = {};
      vm.form.contact = {};

      generateCaptcha();

    })();

    function generateCaptcha() {
      APIService.userCall('captchasPost', [])
        .then(captchasPostResponse);

      function captchasPostResponse(response) {
        vm.form.contact.imageId = response.data.imageId;
        vm.form.contact.secretKey = response.data.secretKey;

        vm.captcha = APIService.getUserApiBasePath() + '/captchas/' + response.data.imageId;
      }
    }

    function submitContact() {
      var alertResponse = " Vi kommer kontakta dig på adress " + vm.form.contact.email;
      AlertService.success(alertResponse, 'Kontakt mottagen!', 5000);
      vm.dataLoading = false;
      //TODO Error handling and service endpoint to save contact.

    }
  }
})();