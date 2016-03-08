/*
  Handles calls towards backend api.
*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .factory('APIService', APIService);

  APIService.$inject = ['$http', 'AuthenticationService', 'AlertService', 'UserService', '$q', '$httpParamSerializer'];

  function APIService($http, AuthenticationService, AlertService, UserService, $q, $httpParamSerializer) {
    var service = {};
    var apiClient = new API.Client.DefaultApi($http, null, $httpParamSerializer); // jshint ignore:line
    var userApiClient = new UserAPI.Client.UserApi($http, null, $httpParamSerializer); // jshint ignore:line
    var communityApiClient = new CommunityAPI.Client.CommunityApi($http, null, $httpParamSerializer); // jshint ignore:line

    service.call = call;
    service.userCall = userCall;
    service.communityCall = communityCall;
    service.getApiBasePath = getApiBasePath;
    service.getUserApiBasePath = getUserApiBasePath;
    service.getCommunityApiBasePath = getCommunityApiBasePath;

    return service;

    function getApiBasePath() {
      return apiClient.basePath;
    }

    function getUserApiBasePath() {
      return userApiClient.basePath;
    }

    function getCommunityApiBasePath() {
      return communityApiClient.basePath;
    }

    /*
      Wrapper function for calls towards user backend API
    */
    function userCall(funcName, args, doNotLogout) {
      var deferred = $q.defer();

      userApiClient[funcName].apply(userApiClient, args)
        .then(function(response) {
          deferred.resolve(response);
        }, function(response) {
          apiErrorResponse(response, deferred, doNotLogout);
        })
        .catch(function(response) {
          apiErrorResponse(response, deferred);
        });

      return deferred.promise;

    }

    /*
      Wrapper function for calls towards user backend API
    */
    function communityCall(funcName, args, doNotLogout) {
      var deferred = $q.defer();

      communityApiClient[funcName].apply(communityApiClient, args)
        .then(function(response) {
          deferred.resolve(response);
        }, function(response) {
          apiErrorResponse(response, deferred, doNotLogout);
        })
        .catch(function(response) {
          apiErrorResponse(response, deferred);
        });

      return deferred.promise;

    }

    /*
      Wrapper function for calls towards backend API
    */
    function call(funcName, args, doNotLogout) {
      var deferred = $q.defer();

      apiClient[funcName].apply(apiClient, args)
        .then(function(response) {
          deferred.resolve(response);
        }, function(response) {
          apiErrorResponse(response, deferred, doNotLogout);
        })
        .catch(function(response) {
          apiErrorResponse(response, deferred);
        });

      return deferred.promise;

    }

    function apiErrorResponse(apiResponse, deferred, doNotLogout) {

      var response = {
        status: apiResponse.status,
      };

      if (apiResponse.status === 401) {
        if (doNotLogout) {
          UserService.clearUser();
          AlertService.error('Du måste logga in för att få tillgång till denna resurs');
        } else {
          AuthenticationService.logout();
          AlertService.error('Användaren är inte autentiserad');
        }
      } else if (apiResponse.status === -1) {
        response.message = 'Frågan som ställdes fick inget svar inom utsatt tid';
        AlertService.error('Frågan som ställdes fick inget svar inom utsatt tid', 'Timeout:');
      } else {
        response.message = apiResponse.data.message;
      }

      deferred.reject(response);
    }
  }

})();
