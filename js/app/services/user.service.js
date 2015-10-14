/*
  Handles user object stored in local storage.
  It's a combination of a UserAccountObject and an AuthenticatedUserObject.

  {
  "userId": "string",
  "userName": "string",
  "token": {
    "token": "string",
    "refreshToken": "string",
    "expiresIn": number
  },
  "claims" : [
    {
	   "claimURI" : "http://wso2.org/claims/givenname",
	   "value" : "string"
    },
    {
	   "claimURI" : "http://wso2.org/claims/lastname",
	   "value" : "string"
    },
    {
	   "claimURI" : "http://wso2.org/claims/emailaddress",
	   "value" : "string"
    }
  ]
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

      $rootScope.globals = {
        currentUser: {
          userName: user.userName,
          email: user.claims.filter(function(el){
            return el.claimURI === "http://wso2.org/claims/emailaddress";
          })[0].value,
          firstName: user.claims.filter(function(el){
            return el.claimURI === "http://wso2.org/claims/givenname";
          })[0].value,
          lastName: user.claims.filter(function(el){
            return el.claimURI === "http://wso2.org/claims/lastname";
          })[0].value,
        }
      };

      deferred.resolve({
        success: true
      });

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
