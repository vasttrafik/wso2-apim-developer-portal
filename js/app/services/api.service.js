/*
Handles calls towards backend api.
*/

(function() {
  'use strict';

  angular
    .module('vtPortal')
    .factory('APIService', APIService);

  APIService.$inject = ['$http', 'AuthenticationService', 'AlertService', '$q', '$httpParamSerializer'];

  function APIService($http, AuthenticationService, AlertService, $q, $httpParamSerializer) {
    var service = {};
    var apiClient = new API.Client.DefaultApi($http, null, $httpParamSerializer);
    var userApiClient = new UserAPI.Client.UserApi($http, null, $httpParamSerializer);

    service.call = call;
    service.userCall = userCall;
    service.getApiBasePath = getApiBasePath;
    service.getUserApiBasePath = getUserApiBasePath;

    return service;

    function getApiBasePath() {
      return apiClient.basePath;
    }

    function getUserApiBasePath() {
      return userApiClient.basePath;
    }

    /*
      Wrapper function for calls towards user backend API
    */
    // TODO: Add error handling
    function userCall(funcName, args) {
      var deferred = $q.defer();

      userApiClient[funcName].apply(userApiClient, args)
        .then(function(response) {
          deferred.resolve(response);

        }, function(response) {
          if (response.status === 401) {

            AuthenticationService.Logout();
            AlertService.error('Användaren är inte autentiserad', false);
            apiErrorResponse('Användaren är inte autentiserad', deferred);

          } else {
            // TODO: Change to reject
            deferred.resolve(response);

          }
        });

      return deferred.promise;

    }

    /*
      Wrapper function for calls towards backend API
    */
    // TODO: Change to reject
    function call(funcName, args) {
      var deferred = $q.defer();

      apiClient[funcName].apply(apiClient, args)
        .then(function(response) {

          deferred.resolve(response);

        }, function(response) {
          if (response.status === 401) {

            AuthenticationService.logout();
            AlertService.error('Användaren är inte autentiserad');
            apiErrorResponse(response, deferred);

          } else {
            // TODO: Change to reject
            deferred.resolve(response);

          }
        });

      return deferred.promise;

      /*
      Currently not supporting this refreshToken handling.

      if((Math.abs((new Date() - new Date(localStorage.tokenGrantedTime)) / 1000) > JSON.parse(localStorage.user).token.expiresIn)) {

      console.log("Our token has expired, need to retrieve a new one");

      Login(null, null, function(response) {
      if(response.success) {
      authResponse = {success: true};
      console.log("Retrieved new token");
      SetUser(response.user);
    }
    else {
    authResponse = {success: false, message: response.message};
    console.log("Failed to retrieved new token");
  }

  callback(authResponse);

}, JSON.parse(localStorage.user).token.refreshToken);
} else {
console.log("No need to retrieve new token");
callback({success: true});
}
*/

    }
  }

  function apiErrorResponse(apiResponse, deferred) {
    var response = {
      status: apiResponse.status,
      message: apiResponse.data.message
    };
    deferred.reject(response);
  }

})();
