/*
Handles authentication of the user.
*/

(function() {
  'use strict';

  angular
    .module('vtPortal')
    .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$location', 'UserService', '$httpParamSerializer'];

  function AuthenticationService($http, $location, UserService, $httpParamSerializer) {
    var service = {};
    var apiClient = new API.Client.DefaultApi($http, null, $httpParamSerializer);

    service.login = login;
    service.logout = logout;
    service.create = create;

    return service;

    function login(username, password, callback, refreshToken) {

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
              success: true,
              user: authenticatedUserObject.data
            };

            // Retrieve further user information based on userId from login response
            apiClient.usersUserIdGet(authenticatedUserObject.data.userId)
              .then(function(userAccountObject) {
                if (userAccountObject.status === 200) {
                  response.user.claims = userAccountObject.data.claims;
                  UserService.SetUser(response.user);
                  callback(response);
                }
              }, function(apiResponse) {
                response = {
                  success: false,
                  message: apiResponse.data.message
                };
                callback(response);
              });
          }
        }, function(apiResponse) {
          response = {
            success: false,
            message: apiResponse.data.message
          };
          callback(response);
        });

    }

    function create(username, password, email, callback) {

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
              success: true,
              user: userAccountObject.data
            };

          } else {
            response = {
              success: false,
              message: userAccountObject.data.message
            };
          }
          callback(response);
        });

    }

    function logout(callback) {

      var response;
      apiClient.securityPost('logout', null, null)
        .then(function(apiResponse) {
          if (apiResponse.status === 204 || apiResponse.status === 200) {
            response = {
              success: true
            };
            UserService.ClearUser();
          } else {
            response = {
              success: false,
              message: apiResponse.data.message
            };
          }

          $location.path('/');

          if (callback != null) { // jshint ignore:line
            callback(response);
          }
        });

    }

  }

})();
