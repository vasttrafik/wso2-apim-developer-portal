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
                UserService.SetUser(response.user);
                deferred.resolve(response);
              }
            }).catch(function(apiResponse) {
              response = {
                message: apiResponse.data.message
              };
              deferred.reject(response);
            });
        }).catch(function(apiResponse) {
          response = {
            message: apiResponse.data.message
          };
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function create(username, password, email, firstname, lastname) {
      var deferred = $q.defer();

      var response;
      apiClient.usersPost({
          userName: username,
          credential: password,
          claims: [{
            claimURI: "http://wso2.org/claims/emailaddress",
            value: email
          }, {
            claimURI: "http://wso2.org/claims/givenname",
            value: firstname
          }, {
            claimURI: "http://wso2.org/claims/lastname",
            value: lastname
          }]
        })
        .then(function(userAccountObject) {
          if (userAccountObject.status === 201) {
            response = {
              user: userAccountObject.data
            };
            deferred.resolve(response);

          } else {
            response = {
              message: userAccountObject.data.message
            };
            deferred.reject(response);
          }
        });

      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();

      var response;
      apiClient.securityPost('logout', null, null)
        .then(function(apiResponse) {
          if (apiResponse.status === 204 || apiResponse.status === 200) {
            UserService.ClearUser();
            deferred.resolve();
          } else {
            response = {
              message: apiResponse.data.message
            };
            deferred.reject(response);
          }

          $location.path('/');

        });

      return deferred.promise;
    }

  }

})();
