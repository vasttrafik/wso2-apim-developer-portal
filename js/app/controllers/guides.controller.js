(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('GuidesCtrl', GuidesCtrl);

  GuidesCtrl.$inject = ['$routeParams'];

  function GuidesCtrl($routeParams) {
    var vm = this;
    vm.template = { name: $routeParams.guide + '.view.html', url: 'js/app/views/guides/' + $routeParams.guide + '.view.html'};
  }

})();
