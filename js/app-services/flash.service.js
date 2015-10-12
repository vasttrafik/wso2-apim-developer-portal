(function () {
  'use strict';

  angular
  .module('vtPortal')
  .factory('FlashService', FlashService);

  FlashService.$inject = ['$rootScope'];
  function FlashService($rootScope, $sce) {
    var service = {};

    service.Success = Success;
    service.Error = Error;
    service.clearFlashMessage = clearFlashMessage;

    return service;

    function clearFlashMessage() {
      var flash = $rootScope.flash;
      if (flash) {
          $rootScope.$apply(function () {
            delete $rootScope.flash;
          });
      }
    }

    function Success(message, keepAfterLocationChange) {
      $rootScope.flash = {
        message: message,
        type: 'success'
      };
    }

    function Error(message, keepAfterLocationChange) {
      $rootScope.flash = {
        message: message,
        type: 'error'
      };
    }
  }

})();
