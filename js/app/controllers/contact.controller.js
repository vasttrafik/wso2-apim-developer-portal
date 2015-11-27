
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ContactCtrl', ContactCtrl);

  ContactCtrl.$inject = ['$location', '$scope', '$rootScope', '$routeParams', 'AlertService', 'APIService'];

  function ContactCtrl($location, $scope, $rootScope, $routeParams, AlertService, APIService) {
    var vm = this;

    vm.submitContact = submitContact;
    vm.resetContactForm = resetContactForm;

    (function init() {
      resetContactForm();
    })();

    function submitContact() {
      vm.dataLoadingContact = true;

      APIService.call('messagesPost', [{
          messageType: 'EMAIL',
          from: vm.form.contact.email,
          to: 'api@vasttrafik.se',
          subject: 'Meddelande ifrån kontaktformulär',
          body: vm.form.contact.message,
          contentType: 'text/plain'
        }])
        .then(messagesPostResponse)
        .catch(function(response) {
          AlertService.error('Problem att skicka meddelandet!');
        });

      function messagesPostResponse(response) {
        if (response.status === 201) {
          AlertService.success('Meddelandet har mottagits!', 5000);
          resetContactForm();
        } else {
          AlertService.error('Problem att skicka meddelandet!');
        }

        vm.dataLoadingContact = false;
      }

    }

    function resetContactForm() {
      vm.form = {};
      vm.form.contact = {};

      if ($rootScope.user.loggedIn) {
        vm.form.contact.email = $rootScope.globals.currentUser.email;
      }

      vm.form.contact.message = null;
      if ($scope.contactForm != null) {
        $scope.contactForm.$setPristine();
      }
    }

  }

})();
