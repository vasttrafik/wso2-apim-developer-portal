/*
  Main Angular module and controller for vtPortal.
*/

(function() {
  'use strict';

  angular
    .module('vtPortal', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngPasswordStrength', 'ui.validate', 'angular-clipboard', 'ngLocationUpdate', 'swaggerUi', 'duScroll'])
    .config(config)
    .filter('camelize', function() {
      return function(input, all) {
        return input.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
          if (+match === 0) return "";
          return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
      };
    })
    .run(run)
    .controller('MainCtrl', MainCtrl);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {

    $routeProvider

      .when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'js/app/views/home.view.html',
      controllerAs: 'vm'
    })

    .when('/contact', {
      controller: 'ContactCtrl',
      templateUrl: 'js/app/views/contact.view.html',
      controllerAs: 'vm'
    })

    .when('/guides/:guide', {
      controller: 'GuidesCtrl',
      templateUrl: 'js/app/views/guides.view.html',
      controllerAs: 'vm'
    })

    .when('/overview', {
      controller: 'OverviewCtrl',
      templateUrl: 'js/app/views/overview.view.html',
      controllerAs: 'vm'
    })

    .when('/profile', {
      controller: 'ProfileCtrl',
      templateUrl: 'js/app/views/profile.view.html',
      controllerAs: 'vm'
    })

    .when('/applications/:applicationId?', {
      controller: 'ApplicationsCtrl',
      templateUrl: 'js/app/views/applications.view.html',
      controllerAs: 'vm'
    })

    .when('/subscriptions', {
      controller: 'SubscriptionsCtrl',
      templateUrl: 'js/app/views/subscriptions.view.html',
      controllerAs: 'vm'
    })

    .when('/apis', {
      controller: 'ApisCtrl',
      templateUrl: 'js/app/views/apis.view.html',
      controllerAs: 'vm'
    })

    .when('/activation', {
      controller: 'ActivationCtrl',
      templateUrl: 'js/app/views/activation.view.html',
      controllerAs: 'vm'
    })

    .when('/recover', {
      controller: 'RecoverCtrl',
      templateUrl: 'js/app/views/recover.view.html',
      controllerAs: 'vm'
    })

    .when('/api/:apiName/:apiVersion/:apiProvider', {
      controller: 'ApiCtrl',
      templateUrl: 'js/app/views/api.view.html',
      controllerAs: 'vm'
    })

    .otherwise({
      redirectTo: '/'
    });

  }

  run.$inject = ['$rootScope', '$location', '$http', 'UserService', 'swaggerModules', 'swaggerUiExternalReferences', 'swagger1ToSwagger2Converter'];

  function run($rootScope, $location, $http, UserService, swaggerModules, swaggerUiExternalReferences, swagger1ToSwagger2Converter) {

    swaggerModules.add(swaggerModules.BEFORE_PARSE, swaggerUiExternalReferences);
    swaggerModules.add(swaggerModules.BEFORE_PARSE, swagger1ToSwagger2Converter);

    $rootScope.user = {};
    $rootScope.user.create = false;

    // keep user logged in after page refresh
    UserService.getUser()
      .then(function(user) {

        if (!$.isEmptyObject(user)) {
          $rootScope.user.loggedIn = true;
          UserService.setUser(user); // Since this also sets the user scope

          $http.defaults.headers.common.Authorization = 'Bearer ' + user.token.token;
        } else {
          $rootScope.user.loggedIn = false;
        }
      });


    $rootScope.$on('$locationChangeStart', function(event, next, current) {

      // redirect to startpage page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path().split('/')[1], ['', 'apis', 'api', 'guides', 'activation', 'recover']) === -1;

      if (restrictedPage && !$rootScope.user.loggedIn) {
        $location.path('/');
      }

    });

  }

  MainCtrl.$inject = ['$location', '$rootScope', '$filter', 'AuthenticationService', 'AlertService', 'APIService'];

  function MainCtrl($location, $rootScope, $filter, AuthenticationService, AlertService, APIService) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;
    vm.create = create;
    vm.toggleCreate = toggleCreate;
    vm.togglePasswordRecovery = togglePasswordRecovery;
    vm.clearAlertMessage = AlertService.clearAlertMessageAndDigest;

    (function init() {
      APIService.userCall('claimsGet', ['http://wso2.org/claims', 'user'])
        .then(claimsGetResponse);

      function claimsGetResponse(response) {
        // Only include claims set to be displayed by default
        var claims = response.data.filter(function(a) {
          return a.supportedByDefault === 'true';
        });

        // Sort the claims in correct order.
        claims.sort(function(a, b) {
          return a.displayOrder - b.displayOrder;
        });

        vm.claims = claims;
        vm.user = {};

        for (var i = 0; i < vm.claims.length; i++) {
          vm.claims[i].claimValue = $filter('camelize')(vm.claims[i].description);
          vm.user[vm.claims[i].claimValue] = {};
          vm.user[vm.claims[i].claimValue].claimUri = vm.claims[i].claimUri;
        }

      }
    })();

    function login() {
      vm.dataLoading = true;
      AuthenticationService.login(vm.username, vm.password).then(
        function(response) {
          $rootScope.user.loggedIn = true;
          vm.dataLoading = false;
          AlertService.clearAlertMessage();
          $location.path('/overview');

        }).catch(function(response) {
        if (response.status === 401) {
          AlertService.error("användarnamn och lösenord stämmer inte.", "Problem att logga in: ");
        } else {
          AlertService.error(response.message, "Problem att logga in: ");
        }
        vm.dataLoading = false;
      });

    }

    function logout() {
      $rootScope.user.loggedIn = false;
      $rootScope.user.create = false;
      AuthenticationService.logout();
      $location.path('/');
    }

    function create() {
      vm.dataLoading = true;
      AuthenticationService.create(vm.user, vm.claims).then(function(response) {
        AlertService.success('Du kommer få ett mail med instruktioner för att akivera ditt konto', 'Registrering skickad!', 10000);
        $rootScope.user.create = false;
        vm.dataLoading = false;
      }).catch(function(response) {
        AlertService.error(response.message);
        vm.dataLoading = false;
      });
    }

    function toggleCreate(create) {
      vm.dataLoading = false;

      if (create != null) { // jshint ignore:line
        $rootScope.user.create = create;
      } else {
        $rootScope.user.create = !$rootScope.user.create;
      }
      delete $rootScope.alert;
    }

    function togglePasswordRecovery() {
      $location.path('/recover').search('username', vm.username);
    }
  }

})();
