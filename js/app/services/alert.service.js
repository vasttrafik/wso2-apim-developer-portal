/*
  Handles alerts shown to the user.
*/

(function() {
  'use strict';

  angular
    .module('vtPortal')
    .factory('AlertService', AlertService);

  AlertService.$inject = ['$rootScope', '$timeout'];

  function AlertService($rootScope, $timeout) {
    var service = {};

    service.success = success;
    service.error = error;
    service.clearAlertMessage = clearAlertMessage;
    service.clearAlertMessageAndDigest = clearAlertMessageAndDigest;

    return service;

    function clearAlertMessage() {

      var alert = $rootScope.alert;
      if (alert) {
          delete $rootScope.alert;
        }
    }

    function clearAlertMessageAndDigest() {
      var alert = $rootScope.alert;
      if (alert) {
        $rootScope.$apply(function() {
          clearAlertMessage();
        });
      }
    }

    function success(message, heading) {

      $rootScope.alert = {
        message: message,
        heading: heading,
        type: 'success'
      };

      $timeout(clearAlertMessage,5000);
    }

    function error(message, heading) { // jshint ignore:line

      $rootScope.alert = {
        message: message,
        heading: heading,
        type: 'error'
      };

      $timeout(clearAlertMessage,10000);
    }
  }

})();
