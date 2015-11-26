(function () {
  'use strict';

  angular
    .module('vtPortal')
    .controller('NewsCtrl', NewsCtrl);

  NewsCtrl.$inject = ['$routeParams', '$location', '$scope'];

  function NewsCtrl($routeParams, $location, $scope) {
    var vm = this;
       
    vm.toggleIngress = toggleIngress;
    
    (function init() {
      vm.showIngress = true;
    })();
    

    function toggleIngress()
    {
      vm.showIngress= !vm.showIngress;
    }

  }

})();
