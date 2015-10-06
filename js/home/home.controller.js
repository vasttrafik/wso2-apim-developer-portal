(function () {
  'use strict';

  angular
  .module('vtPortal')
  .controller('HomeController', HomeController)
  .directive('header', function(){
    return {
      templateUrl: 'partials/header.html'
    }
  })
  .directive('footer', function () {
    return {
      templateUrl: 'partials/footer.html'
    }
  });

  HomeController.$inject = ['UserService', '$rootScope'];
  function HomeController(UserService, $rootScope) {
    var vm = this;

    vm.user = null;
    vm.allUsers = [];
    vm.deleteUser = deleteUser;

    initController();

    function initController() {
      loadCurrentUser();
      loadAllUsers();
    }

    function loadCurrentUser() {
      UserService.GetByUsername($rootScope.globals.currentUser.username)
      .then(function (user) {
        vm.user = user;
      });
    }

    function loadAllUsers() {
      UserService.GetAll()
      .then(function (users) {
        vm.allUsers = users;
      });
    }

    function deleteUser(id) {
      UserService.Delete(id)
      .then(function () {
        loadAllUsers();
      });
    }
  }

})();
