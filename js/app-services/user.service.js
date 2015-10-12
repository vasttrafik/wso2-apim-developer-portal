(function () {
  'use strict';

  angular
  .module('vtPortal')
  .factory('UserService', UserService);

  UserService.$inject = ['$http', '$location', '$rootScope', '$q'];
  function UserService($http, $location, $rootScope, $q) {
    var service = {};

    service.SetCredentials = SetCredentials;
    service.GetCredentials = GetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

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
