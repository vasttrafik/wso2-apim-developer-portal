/*
  Main Angular module and controller for vtPortal.
*/

(function() {
  'use strict';

  angular
    .module('vtPortal', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngPasswordStrength', 'ui.validate'])
    .config(config)
    .run(run)
    .controller('MainCtrl', MainCtrl);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {

    $routeProvider

      .when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'js/app/views/home.view.html',
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

    .when('/application', {
      controller: 'ApplicationsCtrl',
      templateUrl: 'js/app/views/applications.view.html',
      controllerAs: 'vm'
    })

    .when('/subscription', {
      controller: 'SubscriptionCtrl',
      templateUrl: 'js/app/views/subscription.view.html',
      controllerAs: 'vm'
    })

    .when('/api', {
      controller: 'ApisCtrl',
      templateUrl: 'js/app/views/apis.view.html',
      controllerAs: 'vm'
    })

    .otherwise({
      redirectTo: '/'
    });

  }

  run.$inject = ['$rootScope', '$location', '$http', 'UserService'];

  function run($rootScope, $location, $http, UserService) {

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
      var restrictedPage = $.inArray($location.path(), ['/', '/apis']) === -1;

      if (restrictedPage && !$rootScope.user.loggedIn) {
        $location.path('/');
      }

    });

  }

  MainCtrl.$inject = ['$location', '$rootScope', 'AuthenticationService', 'AlertService'];

  function MainCtrl($location, $rootScope, AuthenticationService, AlertService) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;
    vm.create = create;
    vm.toggleCreate = toggleCreate;
    vm.clearAlertMessage = AlertService.clearAlertMessageAndDigest;

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
      AuthenticationService.create(vm.user.username, vm.user.password, vm.user.email, vm.user.firstname, vm.user.lastname).then(function(response) {
        AlertService.success('Skapade kontot!');
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
  }

})();
