/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityCtrl', CommunityCtrl);

  CommunityCtrl.$inject = ['AlertService', 'APIService'];

  function CommunityCtrl(AlertService, APIService) {
    var vm = this;

    (function init() {

      APIService.communityCall('categoriesGet', [true])
        .then(categoriesGetResponse);

    })();

    function categoriesGetResponse(response) {
      if (response.status === 200) {
        vm.categories = response.data;
      } else {
        AlertService.error('Problem att hämta lista med kategorier');
      }
    }

  }

})();
