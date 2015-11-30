/*
  Handles authentication of the user.
*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$location', '$httpParamSerializer', '$q', '$timeout', 'UserService', 'AlertService'];

  function AuthenticationService($http, $location, $httpParamSerializer, $q, $timeout, UserService, AlertService) {
    var service = {};
    var apiClient = new API.Client.DefaultApi($http, null, $httpParamSerializer); // jshint ignore:line
    var userApiClient = new UserAPI.Client.UserApi($http, null, $httpParamSerializer); // jshint ignore:line

    service.login = login;
    service.logout = logout;
    service.create = create;
    service.setLogoutTimer = setLogoutTimer;

    var logoutPromise;

    return service;

    function login(username, password, refreshToken) {
      var deferred = $q.defer();

      var action = 'login';

      /*
      if (refreshToken != null) { // jshint ignore:line
        action = 'refreshToken';
      }
      */

      var userObject = {};

      apiClient.securityPost(action, refreshToken, {
          userName: username,
          credential: password
        }, 'application/json')
        .then(securityPostResponse)
        .then(usersUserIdGet)
        .catch(function(apiResponse) {
          apiErrorResponse(apiResponse, deferred);
        });

      function securityPostResponse(authenticatedUserObject) {
        if (authenticatedUserObject.status === 200 || authenticatedUserObject.status === 201) {
          userObject = authenticatedUserObject.data;
          $http.defaults.headers.common.Authorization = 'Bearer ' + userObject.accessToken.token;
        } else {
          apiErrorResponse(authenticatedUserObject, deferred);
        }
      }

      function usersUserIdGet() {

        // Retrieve further user information based on userId from login response
        userApiClient.usersUserIdGet(userObject.userId, 'application/json', 'Bearer ' + userObject.accessToken.token)
          .then(usersUserIdGetResponse)
          .catch(function(apiResponse) {
            apiErrorResponse(apiResponse, deferred);
          });

        function usersUserIdGetResponse(userAccountObject) {

          if (userAccountObject.status === 200) {

            userAccountObject.data.accessToken = userObject.accessToken;

            UserService.setUser(userAccountObject.data)
              .then(function(response) {
                setLogoutTimer();
                deferred.resolve();
              });
          }
        }
      }

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
      userApiClient.usersPost('*/*', 'application/json', {
          userName: userFormObj.username,
          password: {
            password: userFormObj.password
          },
          claims: claims,
          profileName: 'default',
          tenantDomain: 'carbon.super'
        })
        .then(usersPostResponse)
        .catch(function(apiResponse) {
          apiErrorResponse(apiResponse, deferred);
        });

      function usersPostResponse(userAccountObject) {
        if (userAccountObject.status === 200) {
          response = {
            status: userAccountObject.status,
            user: userAccountObject.data
          };
          deferred.resolve(response);

        } else {
          apiErrorResponse(userAccountObject, deferred);
        }
      }

      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();

      var response;
      apiClient.securityPost('logout')
        .then(securityPostResponse)
        .catch(function(apiResponse) {
          apiErrorResponse(apiResponse, deferred);
        });

      function securityPostResponse(apiResponse) {
        if (apiResponse.status === 204 || apiResponse.status === 200) {

          response = {
            status: apiResponse.status
          };

          deferred.resolve(response);
        } else {
          apiErrorResponse(apiResponse, deferred);
        }
      }

      $timeout.cancel(logoutPromise); // Cancel the logout promise
      UserService.clearUser();
      $location.path('/');
      return deferred.promise;
    }

    function apiErrorResponse(apiResponse, deferred) {

      var response = {
        status: apiResponse.status,
        message: 'Ett oväntat problem uppstod'
      };

      if (apiResponse.data != null && apiResponse.data.message != null) {
        response = {
          status: apiResponse.status,
          message: apiResponse.data.message
        };
      }
      deferred.reject(response);
    }

    function setLogoutTimer() {
      // Automaticly logout the user after 30 minutes
      $timeout.cancel(logoutPromise); // Cancel the logout promise
      logoutPromise = $timeout(function() {
        AlertService.error('Du kommer att bli automatiskt utloggad om 1 minut');
        $timeout(function() {
          AlertService.success('Du har blivit automatiskt utloggad. Var vänlig logga in igen');
          logout();
        }, 60000);
      }, 1740000);
    }

  }

})();
