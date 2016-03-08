/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityCtrl', CommunityCtrl);

  CommunityCtrl.$inject = ['AlertService', 'APIService', '$document'];

  function CommunityCtrl(AlertService, APIService, $document) {
    var vm = this;

    (function init() {

      APIService.communityCall('categoriesGet', [])
        .then(categoriesGetResponse);

        $(document).ready(function() {
          $('body').tooltip({
            selector: '[data-toggle=tooltip]',
          });
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
