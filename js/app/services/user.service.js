/*
  Handles user object stored in local storage.
  It's a combination of a UserAccountObject, AuthenticatedUserObject and a memberId for community section.

  {
  "id": "string",
  "memberId": "string",
  "userName": "string",
  "accessToken" : {
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

    service.setUser = setUser;
    service.getUser = getUser;
    service.clearUser = clearUser;
    service.getClaim = getClaim;
    service.setMemberId = setMemberId;
    service.setOrUpdateClaim = setOrUpdateClaim;

    return service;

    function setUser(user, communityProfile) {
      var deferred = $q.defer();

      try {
        user.memberId = ((communityProfile || user.memberId) ? user.id : null);
        localStorage.user = JSON.stringify(user);

        /* Update root scope globals object for easy access */
        $rootScope.globals = {
          currentUser: {
            id: user.id,
            role: (user.roles.indexOf('community-admin') > -1 ? 'community-admin' : 'community-member'),
            memberId: user.memberId,
            userName: user.userName,
            email: user.claims.filter(function(el) {
              return el.claimUri === 'http://wso2.org/claims/emailaddress';
            })[0].claimValue,
            firstName: user.claims.filter(function(el) {
              return el.claimUri === 'http://wso2.org/claims/givenname';
            })[0].claimValue,
            lastName: user.claims.filter(function(el) {
              return el.claimUri === 'http://wso2.org/claims/lastname';
            })[0].claimValue,
          }
        };

        deferred.resolve();

      } catch (err) {
        deferred.reject({
          message: 'Problem att skapa utökad användarinfo'
        });
      }

      return deferred.promise;
    }

    function getUser() {
      var deferred = $q.defer();
      if (!localStorage.user) {
        localStorage.user = JSON.stringify({});
      }

      deferred.resolve(JSON.parse(localStorage.user));
      return deferred.promise;
    }

    function clearUser() {
      $rootScope.globals = {};
      $rootScope.user.loggedIn = false;
      delete localStorage.user;
      delete $http.defaults.headers.common.Authorization;
    }

    function setMemberId(memberId) {
      var deferred = $q.defer();

      getUser()
        .then(function(userObject) {
          /* Update user with new meember id */
          setUser(userObject, true)
            .then(function() {
              deferred.resolve();
            })
            .catch(function() {
              deferred.reject({
                message: 'Problem att uppdatera UserObject'
              });
            });
        });

      return deferred.promise;
    }

    function setOrUpdateClaim(claimUri, claimValue) {
      var deferred = $q.defer();

      try {
        getUser()
          .then(function(userObject) {
            var claimsList = userObject.claims;

            /* Remove claim from list if it exists */
            for (var i = 0; i < userObject.claims.length; i++) {
              if (userObject.claims[i].claimUri === claimUri) {
                userObject.claims.splice(i, 1);
                break;
              }
            }

            /* Add claim to list */
            userObject.claims.push({
              claimUri: claimUri,
              claimValue: claimValue
            });

            /* Update user with new list of claims */
            setUser(userObject)
              .then(function() {
                deferred.resolve(claimsList);
              })
              .catch(function() {
                deferred.reject({
                  message: 'Problem att uppdatera UserObject'
                });
              });
          });
      } catch (err) {
        deferred.reject({
          message: 'Problem att skapa eller uppdatera claim'
        });
      }

      return deferred.promise;
    }

    function getClaim(claimUri) {
      var deferred = $q.defer();

      getUser()
        .then(function(userObject) {
          try {
            var claim = userObject.claims.filter(function(el) {
              return el.claimUri.indexOf(claimUri) > -1;
            })[0];

            deferred.resolve({
              success: true,
              object: claim
            });
          } catch (err) {
            deferred.resolve({
              success: true
            });
          }

        });
      return deferred.promise;
    }
  }

})();
