/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('HomeCtrl', HomeCtrl)
    .constant('newsItems', newsItems);

  HomeCtrl.$inject = ['AlertService', 'APIService'];

  function HomeCtrl(AlertService, APIService) {
    var vm = this;

    vm.newsItems = [];

    (function init() {

      APIService.communityCall('forumsIdGet', [10])
        .then(forumsIdGetResponse);

    })();

    function forumsIdGetResponse(response) {
      if (response.status === 200) {
        vm.newsItems = response.data.topics;

      } else {
        AlertService.error('Problem att hämta nyheter');
      }
    }

  }

})();
