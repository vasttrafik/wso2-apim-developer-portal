(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('DocsCtrl', DocsCtrl);

  DocsCtrl.$inject = ['$routeParams', '$location', '$scope', '$anchorScroll'];

  function DocsCtrl($routeParams, $location, $scope, $anchorScroll) {
    var vm = this;

    vm.scrollTo = scrollTo;

    (function init() {
      $anchorScroll.yOffset = 100;
      vm.template = {
        name: $routeParams.doc + '.view.html',
        url: 'js/app/views/docs/' + $routeParams.doc + '.view.html'
      };
    })();

    function scrollTo(hash) { // jshint ignore:line
      if ($location.hash() !== hash) {
        $location.hash(hash);
      } else {
        $anchorScroll();
      }
    }
  }

})();
