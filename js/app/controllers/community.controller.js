/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityCtrl', CommunityCtrl);

  CommunityCtrl.$inject = ['AlertService', 'APIService', 'CommunityService'];

  function CommunityCtrl(AlertService, APIService, CommunityService) {
    var vm = this;

    vm.communityService = CommunityService;

    (function init() {

      APIService.communityCall('categoriesGet', [false])
        .then(categoriesGetResponse);

      CommunityService.getFirstTopicByLabels(['popular', 'answered', 'unanswered'])
        .then(function(response) {
          vm.labels = response;
        });

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
