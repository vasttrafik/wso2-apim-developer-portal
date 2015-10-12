/*
  Handles alerts shown to the user.
*/

(function () {
  'use strict';

  angular
  .module('vtPortal')
  .factory('AlertService', AlertService);

  AlertService.$inject = ['$rootScope'];
  function AlertService($rootScope) {
    var service = {};

    service.Success = Success;
    service.Error = Error;
    service.ClearAlertMessage = ClearAlertMessage;

    return service;

    function ClearAlertMessage() {
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
