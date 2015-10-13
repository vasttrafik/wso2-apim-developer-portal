(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$rootScope', 'AlertService'];
  function HomeController($rootScope, AlertService) {
    var vm = this;

    //AlertService.Success('Some info you need to see!');

  }

})();
