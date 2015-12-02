'use strict';

angular
  .module('swaggerUi')
  .service('swaggerAuthentication', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {

    /**
     * Module entry point
     */
    this.execute = function(data) {
      var deferred = $q.defer();
      data.headers.Authorization = 'Bearer ' + $rootScope.user.swagger.accessToken;
      data.headers.Host = 'api.vasttrafik.se';
      deferred.resolve(true);
      return deferred.promise;
    };

  }]);
