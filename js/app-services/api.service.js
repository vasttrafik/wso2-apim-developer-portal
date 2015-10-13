/*
Handles authentication of the user.
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

    service.Call = Call;

    return service;

    /*
      Wrapper function for calls towards backend API
    */
    function Call(funcName, args) {
      var deferred = $q.defer();

      apiClient[funcName].apply(apiClient, args)
        .then(function(response) {

          deferred.resolve(response);

        }, function(response) {
          if (response.status === 401) {

            AuthenticationService.Logout();
            AlertService.Error("User not authenticated", false);
            deferred.reject('User not authenticated');

          } else {

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

})();
