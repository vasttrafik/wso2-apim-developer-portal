/*
Handles authentication of the user.
*/

(function() {
  'use strict';

  angular
    .module('vtPortal')
    .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$location', 'UserService', '$httpParamSerializer', '$q'];

  function AuthenticationService($http, $location, UserService, $httpParamSerializer, $q) {
    var service = {};
    var apiClient = new API.Client.DefaultApi($http, null, $httpParamSerializer);
    var userApiClient = new UserAPI.Client.UserApi($http, null, $httpParamSerializer);

    service.login = login;
    service.logout = logout;
    service.create = create;

    return service;

    function login(username, password, refreshToken) {
      var deferred = $q.defer();

      var action = 'login';

      if (refreshToken != null) { // jshint ignore:line
        action = 'refreshToken';
      }

      var response;

      apiClient.securityPost(action, refreshToken, {
          userName: username,
          credential: password
        })
        .then(function(authenticatedUserObject) {
          if (authenticatedUserObject.status === 200 || authenticatedUserObject.status === 201) {
            response = {
              user: authenticatedUserObject.data
            };
          }
        }).then(function() {
          // Retrieve further user information based on userId from login response
          apiClient.usersUserIdGet(response.user.userId)
            .then(function(userAccountObject) {
              if (userAccountObject.status === 200) {
                response.user.claims = userAccountObject.data.claims;
                UserService.setUser(response.user);
                deferred.resolve(response);
              }
            }).catch(function(apiResponse) {
              apiErrorResponse(apiResponse, deferred);
            });

        }).catch(function(apiResponse) {
          apiErrorResponse(apiResponse, deferred);
        });

      return deferred.promise;
    }

    function create(userFormObj) {
      var deferred = $q.defer();

      // Collect dynamic claims for post
      var claims = [];
      for (var property in userFormObj) {
        if (userFormObj.hasOwnProperty(property) && userFormObj[property].claimUri) {
          claims.push({
            claimUri: userFormObj[property].claimUri,
            claimValue: userFormObj[property].value
          });
        }
      }

      var response;
      userApiClient.usersPost('*/*','application/json',{
          userName: userFormObj.username,
          password: {password: userFormObj.password},
          claims: claims,
          profileName: 'default',
          tenantDomain: 'carbon.super'
        })
        .then(function(userAccountObject) {
          if (userAccountObject.status === 200) {
            response = {
              status: userAccountObject.status,
              user: userAccountObject.data
            };
            deferred.resolve(response);

          } else {
            apiErrorResponse(userAccountObject, deferred);
          }
        }).catch(function(apiResponse) {
          apiErrorResponse(apiResponse, deferred);
        });

      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();

      var response;
      apiClient.securityPost('logout', null, null)
        .then(function(apiResponse) {
          if (apiResponse.status === 204 || apiResponse.status === 200) {

            response = {
              status: apiResponse.status
            };

            deferred.resolve(response);
          } else {
            apiErrorResponse(apiResponse, deferred);
          }

        }).catch(function(apiResponse) {
          apiErrorResponse(apiResponse, deferred);
        });

      UserService.clearUser();
      $location.path('/');
      return deferred.promise;
    }

    function apiErrorResponse(apiResponse, deferred) {
      var response = {
        status: apiResponse.status,
        message: apiResponse.data.message
      };
      deferred.reject(response);
    }

  }

})();
