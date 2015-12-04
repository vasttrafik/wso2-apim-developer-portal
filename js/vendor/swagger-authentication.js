'use strict';

angular
  .module('swaggerUi')
  .service('swaggerAuthentication', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {

    /**
     * Module entry point
     */
    this.execute = function(data) {
      var deferred = $q.defer();
      if ($rootScope.user.accessToken != null) {
        data.headers.Authorization = 'Bearer ' + $rootScope.user.accessToken;
      }
      deferred.resolve(true);
      return deferred.promise;
    };

  }]);
