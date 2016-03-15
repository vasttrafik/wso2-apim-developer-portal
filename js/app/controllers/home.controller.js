/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('HomeCtrl', HomeCtrl)
    .constant('newsItems', newsItems);

  HomeCtrl.$inject = ['AlertService'];

  function HomeCtrl(AlertService) {
    var vm = this;

    vm.newsItems = [];

    (function init() {
      vm.newsItems = newsItems;

    })();

  }

})();
