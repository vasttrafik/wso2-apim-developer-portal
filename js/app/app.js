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

    .when('/profile', {
      controller: 'ProfileCtrl',
      templateUrl: 'js/app/views/profile.view.html',
      controllerAs: 'vm'
    })

    .when('/apis', {
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
    UserService.GetUser()
      .then(function(user) {

        if (!$.isEmptyObject(user)) {
          $rootScope.user.loggedIn = true;
          UserService.SetUser(user); // Since this also sets the user scope

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

  MainCtrl.$inject = ['$rootScope', 'AuthenticationService', 'AlertService'];

  function MainCtrl($rootScope, AuthenticationService, AlertService) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;
    vm.create = create;
    vm.toggleCreate = toggleCreate;
    vm.clearAlertMessage = AlertService.ClearAlertMessage;

    function login() {

      vm.dataLoading = true;
      AuthenticationService.Login(vm.username, vm.password, function(response) {

        if (response.success) {
          $rootScope.user.loggedIn = true;
          vm.dataLoading = false;
        } else {
          AlertService.Error(response.message);
          vm.dataLoading = false;
        }
      });

    }

    function logout() {
      $rootScope.user.loggedIn = false;
      $rootScope.user.create = false;
      AuthenticationService.Logout();
    }

    function create() {
      vm.dataLoading = true;
      AuthenticationService.Create(username, password, email, function(response) {
        if (response.success) {
          AlertService.Success('Skapade kontot!');
          $rootScope.user.create = false;
          vm.dataLoading = false;
        } else {
          AlertService.Error(response.message);
          vm.dataLoading = false;
        }
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
