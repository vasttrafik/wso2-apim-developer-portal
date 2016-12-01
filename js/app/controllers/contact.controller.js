
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ContactCtrl', ContactCtrl);

  ContactCtrl.$inject = ['$timeout', '$location', '$scope', '$rootScope', '$routeParams', 'AlertService', 'APIService'];

  function ContactCtrl($timeout, $location, $scope, $rootScope, $routeParams, AlertService, APIService) {
    var vm = this;

    vm.submitContact = submitContact;
    vm.resetContactForm = resetContactForm;

    (function init() {
      resetContactForm();

      if ($rootScope.user.loggedIn && $routeParams.subject) {
        // Check if we're coming to this page directly or from api list.
        vm.form.contact.subject = $routeParams.subject;

        $timeout(function() {
          angular.element(document.getElementById('contact-tab-2')).trigger('click');
        }, 0);
      }

    })();

    function submitContact() {
      vm.dataLoadingContact = true;

      APIService.call('messagesPost', [{
          messageType: 'EMAIL',
          from: vm.form.contact.email,
          to: 'api@vasttrafik.se',
          subject: 'Meddelande ifrån kontaktformulär: ' + vm.form.contact.subject,
          body: vm.form.contact.message,
          contentType: 'text/plain'
        }], true)
        .then(messagesPostResponse)
        .catch(function(response) {
          AlertService.error('Problem att skicka meddelandet!');
        });

      function messagesPostResponse(response) {
        if (response.status === 201) {
          AlertService.success('Meddelandet har mottagits!', '', 5000);
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
