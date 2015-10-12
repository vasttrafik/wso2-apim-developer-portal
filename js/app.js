(function () {
  'use strict';

  angular
  .module('vtPortal', ['ngRoute', 'ngSanitize'])
  .config(config)
  .run(run)
  .controller('FlashController', FlashController)
  .controller('LoginController', LoginController)
  .controller('LogoutController', LogoutController)
  .controller('RegisterController', RegisterController);

  config.$inject = ['$compileProvider', '$routeProvider', '$locationProvider'];
  function config($compileProvider, $routeProvider, $locationProvider) {

    $routeProvider

    .when('/', {
      controller: 'HomeController',
      templateUrl: 'js/home/home.view.html',
      controllerAs: 'vm'
    })

    .when('/profile', {
      controller: 'ProfileController',
      templateUrl: 'js/profile/profile.view.html',
      controllerAs: 'vm'
    })

  }

  run.$inject = ['$rootScope', '$location', '$http', 'AuthenticationService'];
  function run($rootScope, $location, $http, AuthenticationService) {

    $rootScope.user = {};

    // keep user logged in after page refresh
    AuthenticationService.GetCredentials()
    .then(function (user) {

      if (!$.isEmptyObject(user)) {
        $rootScope.user.loggedIn = true;

        $rootScope.globals = {
          currentUser: {
            userName: user.userName
          }
        };

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + user.token.token;
      } else {
        $rootScope.user.loggedIn = false;
      }
    });


    $rootScope.$on('$locationChangeStart', function (event, next, current) {

      // redirect to startpage page if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path(), ['/']) === -1;

      if (restrictedPage && !$rootScope.user.loggedIn) {
        $location.path('/');
      }

    });

  }

  FlashController.$inject = ['$rootScope','FlashService'];
  function FlashController($rootScope, FlashService) {
    var vm = this;

    vm.clearFlashMessage = clearFlashMessage;

    function clearFlashMessage() {
      FlashService.clearFlashMessage();
    }

  }

  LoginController.$inject = ['$rootScope', '$location', 'AuthenticationService', 'FlashService'];
  function LoginController($rootScope, $location, AuthenticationService, FlashService) {
    var vm = this;

    vm.login = login;
    vm.toggleRegister = toggleRegister;

    function login() {

      vm.dataLoading = true;
      AuthenticationService.Login(vm.username, vm.password, function (response) {

        if (response.success) {
          AuthenticationService.SetCredentials(response.user);
          $rootScope.user.loggedIn = true;
          vm.dataLoading = false;
        } else {
          FlashService.Error(response.message);
          vm.dataLoading = false;
        }
      });
    };

    function toggleRegister() {
      vm.dataLoading = false;
      $rootScope.user.register = true;
      FlashService.clearFlashMessage();

    };
  }

  LogoutController.$inject = ['$rootScope', '$location', 'AuthenticationService', 'FlashService'];
  function LogoutController($rootScope, $location, AuthenticationService, UserService, FlashService) {
    var vm = this;

    vm.logout = logout;

    function logout() {
      $rootScope.user.loggedIn = false;
      AuthenticationService.Logout();
    };
  }

  RegisterController.$inject = ['AuthenticationService', '$location', '$rootScope', 'FlashService'];
  function RegisterController(AuthenticationService, $location, $rootScope, FlashService) {
    var vm = this;

    vm.register = register;
    vm.toggleRegister = toggleRegister;

    function register() {
      vm.dataLoading = true;
      AuthenticationService.Register(username, password, email, function(response) {
        if (response.success) {
          FlashService.Success('Registration successful', true);
          $rootScope.user.register = false;
        } else {
          FlashService.Error(response.message);
          vm.dataLoading = false;
        }
      });
    }
    function toggleRegister() {
      vm.dataLoading = false;
      $rootScope.user.register = false;
      FlashService.clearFlashMessage();
    };
  }

})();
