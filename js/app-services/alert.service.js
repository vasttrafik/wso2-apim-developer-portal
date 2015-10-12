/*
  Handles alerts shown to the user.
*/

(function () {
  'use strict';

  angular
  .module('vtPortal')
  .factory('AlertService', AlertService);

  AlertService.$inject = ['$rootScope'];
  function AlertService($rootScope, $sce) {
    var service = {};

    service.Success = Success;
    service.Error = Error;
    service.clearAlertMessage = clearAlertMessage;

    return service;

    function clearAlertMessage() {
      var alert = $rootScope.alert;
      if (alert) {
          $rootScope.$apply(function () {
            delete $rootScope.alert;
          });
      }
    }

    function Success(message) {
      $rootScope.alert = {
        message: message,
        type: 'success'
      };
    }

    function Error(message) {
      $rootScope.alert = {
        message: message,
        type: 'error'
      };
    }
  }

})();
