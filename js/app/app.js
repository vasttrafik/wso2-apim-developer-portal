/*
  Main Angular module and controller for vtPortal.
*/

(function() {
  'use strict';

  angular
    .module('vtPortal', ['ngRoute', 'ngSanitize'])
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
    });

  }

  run.$inject = ['$rootScope', '$location', '$http', 'UserService'];

  function run($rootScope, $location, $http, UserService) {

    $rootScope.user = {};
    $rootScope.user.register = false;

    // keep user logged in after page refresh
    UserService.GetUser()
      .then(function(user) {

        if (!$.isEmptyObject(user)) {
          $rootScope.user.loggedIn = true;

          $rootScope.globals = {
            currentUser: {
              userName: user.userName
            }
          };

          $http.defaults.headers.common.Authorization = 'Bearer ' + user.token.token;
        } else {
          $rootScope.user.loggedIn = false;
        }
      });


    $rootScope.$on('$locationChangeStart', function(event, next, current) {

      // redirect to startpage page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/']) === -1;

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
    vm.register = register;
    vm.toggleRegister = toggleRegister;
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
      AuthenticationService.Logout();
    }

    function register() {
      vm.dataLoading = true;
      AuthenticationService.Register(username, password, email, function(response) {
        if (response.success) {
          AlertService.Success('Registration successful');
          $rootScope.user.register = false;
          vm.dataLoading = false;
        } else {
          AlertService.Error(response.message);
          vm.dataLoading = false;
        }
      });

    }

    function toggleRegister() {
      vm.dataLoading = false;
      $rootScope.user.register = !$rootScope.user.register;
      delete $rootScope.alert;
    }
  }

})();
