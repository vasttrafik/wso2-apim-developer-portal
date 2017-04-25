/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['AlertService', 'APIService'];

  function HomeCtrl(AlertService, APIService) {
    var vm = this;

    vm.newsItems = [];

    (function init() {

      APIService.communityCall('forumsIdGet', [1])
        .then(forumsIdNewsGetResponse);

      APIService.communityCall('forumsIdGet', [2])
        .then(forumsIdBlogGetResponse);

      APIService.communityCall('forumsIdGet', [3])
        .then(forumsIdCalendarGetResponse);

    })();

    function forumsIdNewsGetResponse(response) {
      if (response.status === 200) {
        vm.newsItems = response.data.topics;

      } else {
        AlertService.error('Problem att hämta nyheter');
      }
    }

    function forumsIdBlogGetResponse(response) {
      if (response.status === 200) {
        vm.blogItems = response.data.topics;

      } else {
        AlertService.error('Problem att hämta nyheter');
      }
    }

    function forumsIdCalendarGetResponse(response) {
      if (response.status === 200) {
        vm.calendarItems = response.data.topics;

      } else {
        AlertService.error('Problem att hämta kalender');
      }
    }

  }

})();
