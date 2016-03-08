/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityCategoryCtrl', CommunityCategoryCtrl);

  CommunityCategoryCtrl.$inject = ['AlertService', 'APIService', '$routeParams'];

  function CommunityCategoryCtrl(AlertService, APIService, $routeParams) {
    var vm = this;

    (function init() {

      APIService.communityCall('categoriesIdGet', [$routeParams.categoryId])
        .then(categoriesIdGetResponse);

    })();

    function categoriesIdGetResponse(response) {
      if (response.status === 200) {
        vm.category = response.data;

      } else {
        AlertService.error('Problem att hämta kategori');
      }
    }

  }

})();
