(function () {
  'use strict';

  angular
    .module('vtPortal')
    .controller('DocsCtrl', DocsCtrl);

  DocsCtrl.$inject = ['$routeParams', '$location', '$scope'];

  function DocsCtrl($routeParams, $location, $scope) {
    var vm = this;

    (function init() {

      vm.template = {
        name: $routeParams.doc + '.view.html',
        url: 'js/app/views/docs/' + $routeParams.doc + '.view.html'
      };
    })();

  }

})();
