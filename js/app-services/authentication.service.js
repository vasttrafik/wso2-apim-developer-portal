(function () {
  'use strict';

  angular
  .module('vtPortal')
  .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$location', '$rootScope', '$timeout', 'FlashService', '$q', '$httpParamSerializer'];
  function AuthenticationService($http, $location, $rootScope, $timeout, FlashService, $q, $httpParamSerializer) {
    var service = {};
    var apiClient = new API.Client.DefaultApi($http, null, $httpParamSerializer);

    service.Login = Login;
    service.Logout = Logout;
    service.Register = Register;
    service.PreEmptivelyAuthenticate = PreEmptivelyAuthenticate;
    service.SetCredentials = SetCredentials;
    service.GetCredentials = GetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    function Login(username, password, callback, refreshToken) {

      FlashService.clearFlashMessage();

      var action = 'login';

      if(refreshToken != null) {
        action = 'refreshToken';
      }

        var response;
        apiClient.securityPost(action, refreshToken, {userName:	username, credential: password})
        .then(function (authenticatedUserObject) {
          if(authenticatedUserObject.status === 200 || authenticatedUserObject.status === 201) {
            response = { success: true, user: authenticatedUserObject.data };

          } else {
            response = { success: false, message: authenticatedUserObject.data.message };
          }
          callback(response);
        });

    }

    function Register(username, password, email, callback) {

      FlashService.clearFlashMessage();

        var response;
        apiClient.usersPost({userName: username, credential: password, claims: [{claimURI: "email", value: email }]})
        .then(function (userAccountObject) {
          if(userAccountObject.status === 201) {
            response = { success: true, user: userAccountObject.data };

          } else {
            response = { success: false, message: userAccountObject.data.message };
          }
          callback(response);
        });

    }

    function Logout(callback) {

        var response;
        apiClient.securityPost('logout', null, null)
        .then(function (apiResponse) {
          if(apiResponse.status === 204 || apiResponse.status === 200) {
            response = { success: true }
            ClearCredentials();
          } else {
            response = { success: false, message: apiResponse.data.message };
          }

          $location.path('/');

          if(callback != null) {
            callback(response);
          }
        });

    }

    function PreEmptivelyAuthenticate(callback) {

      var authResponse;
      /*
      Currently not supporting this refreshToken handling.
      if((Math.abs((new Date() - new Date(localStorage.tokenGrantedTime)) / 1000) > JSON.parse(localStorage.user).token.expiresIn)) {

        console.log("Our token has expired, need to retrieve a new one");

        Login(null, null, function(response) {
          if(response.success) {
              authResponse = {success: true};
              console.log("Retrieved new token");
              SetCredentials(response.user);
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
      callback({success: true});

    }

    function SetCredentials(user) {
      var deferred = $q.defer();
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + user.token.token; // jshint ignore:line
      localStorage.user = JSON.stringify(user);
      localStorage.tokenGrantedTime = new Date();
      deferred.resolve({ success: true });

      $rootScope.globals = {
        currentUser: {
          userName: user.userName
        }
      };

      return deferred.promise;
    }

    function GetCredentials() {
      var deferred = $q.defer();
      if(!localStorage.user){
        localStorage.user = JSON.stringify([]);
      }

      deferred.resolve(JSON.parse(localStorage.user));
      return deferred.promise;
    }

    function ClearCredentials() {
      $rootScope.globals = {};
      localStorage.user = [];
      $rootScope.user.loggedIn = false;
      $http.defaults.headers.common.Authorization = 'Bearer ';
    }
  }

})();
