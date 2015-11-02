(function () {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ContactCtrl', ContactCtrl);

  ContactCtrl.$inject = ['$rootScope', '$scope', '$location', '$routeParams', 'AlertService'];

  function ContactCtrl($rootScope, $scope, $location, $routeParams, AlertService) {
    var vm = this;


    (function init() {
      
    })();
  }
})();