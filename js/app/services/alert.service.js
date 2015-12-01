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
    service.menuSuccess = menuSuccess;
    service.error = error;
    service.menuError = menuError;
    service.clearAlertMessage = clearAlertMessage;
    service.clearMenuAlertMessage = clearMenuAlertMessage;
    service.clearAlertMessageAndDigest = clearAlertMessageAndDigest;
    service.clearMenuAlertMessageAndDigest = clearMenuAlertMessageAndDigest;

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

    function success(message, heading, timeout) {
      var timeoutValue = 4000;
      if (timeout != null) { // jshint ignore:line
        timeoutValue = timeout;
      }

      $rootScope.alert = {
        message: message,
        heading: heading,
        type: 'success'
      };

      $timeout(clearAlertMessage, timeoutValue);
    }

    function error(message, heading, timeout) { // jshint ignore:line
      var timeoutValue = 10000;
      if (timeout != null) { // jshint ignore:line
        timeoutValue = timeout;
      }

      $rootScope.alert = {
        message: message,
        heading: heading,
        type: 'error'
      };

      $timeout(clearAlertMessage, timeoutValue);
    }

    function clearMenuAlertMessage() {
      var menuAlert = $rootScope.menuAlert;
      if (menuAlert) {
        delete $rootScope.menuAlert;
      }
    }

    function clearMenuAlertMessageAndDigest() {
      var menuAlert = $rootScope.menuAlert;
      if (menuAlert) {
        $rootScope.$apply(function() {
          clearMenuAlertMessage();
        });
      }
    }

    function menuSuccess(message, heading, timeout) {
      var timeoutValue = 4000;
      if (timeout != null) { // jshint ignore:line
        timeoutValue = timeout;
      }

      $rootScope.menuAlert = {
        message: message,
        heading: heading,
        type: 'success'
      };

      $timeout(clearMenuAlertMessage, timeoutValue);
    }

    function menuError(message, heading, timeout) { // jshint ignore:line
      var timeoutValue = 10000;
      if (timeout != null) { // jshint ignore:line
        timeoutValue = timeout;
      }

      $rootScope.menuAlert = {
        message: message,
        heading: heading,
        type: 'error'
      };

      $timeout(clearMenuAlertMessage, timeoutValue);
    }

  }

})();
