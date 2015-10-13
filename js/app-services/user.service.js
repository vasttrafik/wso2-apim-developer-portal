/*
  Handles user object stored in local storage.

  {
  "userId": "string",
  "userName": "string",
  "token": {
    "token": "string",
    "refreshToken": "string",
    "expiresIn": number
  }
}

*/

(function() {
  'use strict';

  angular
    .module('vtPortal')
    .factory('UserService', UserService);

  UserService.$inject = ['$http', '$rootScope', '$q'];

  function UserService($http, $rootScope, $q) {
    var service = {};

    service.SetUser = SetUser;
    service.GetUser = GetUser;
    service.ClearUser = ClearUser;

    return service;

    function SetUser(user) {
      var deferred = $q.defer();
      $http.defaults.headers.common.Authorization = 'Bearer ' + user.token.token;
      localStorage.user = JSON.stringify(user);
      localStorage.tokenGrantedTime = new Date();
      deferred.resolve({
        success: true
      });

      $rootScope.globals = {
        currentUser: {
          userName: user.userName
        }
      };

      return deferred.promise;
    }

    function GetUser() {
      var deferred = $q.defer();
      if (!localStorage.user) {
        localStorage.user = JSON.stringify([]);
      }

      deferred.resolve(JSON.parse(localStorage.user));
      return deferred.promise;
    }

    function ClearUser() {
      $rootScope.globals = {};
      $rootScope.user.loggedIn = false;
      localStorage.user = [];
      $http.defaults.headers.common.Authorization = 'Bearer ';
    }
  }

})();
