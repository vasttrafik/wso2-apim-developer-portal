(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$rootScope', 'AlertService'];

  function HomeCtrl($rootScope, AlertService) {
    var vm = this;

    //AlertService.Success('Some info you need to see!');

  }

})();
