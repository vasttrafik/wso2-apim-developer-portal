/*global mediaItems*/
/*global helper*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('MediaCtrl', MediaCtrl)
    .constant('helper', helper);

  MediaCtrl.$inject = ['$routeParams', '$location', '$scope', '$timeout', '$document', 'APIService', 'AlertService'];

  function MediaCtrl($routeParams, $location, $scope, $timeout, $document, APIService, AlertService) {
    var vm = this;

    vm.mediaItems = [];
    vm.years = [];
    vm.year = $routeParams.year ? $routeParams.year : null;

    vm.toggleExpand = toggleExpand;

    (function init() {

      APIService.communityCall('forumsIdGet', [($location.path().split('/')[1] === 'news' ? 1 : 2)])
        .then(forumsIdGetResponse);

      function forumsIdGetResponse(response) {
        if (response.status === 200) {
          vm.mediaItems = response.data.topics.filter(function(a) {

            vm.years.push('20' + String(new Date(a.createDate).getYear()).substring(1,3));

            if ($routeParams.year) {
              return (parseInt('20' + String(new Date(a.createDate).getYear()).substring(1,3))  === parseInt($routeParams.year));
            } else {
              return true;
            }
          });

          angular.forEach(vm.mediaItems, function(keys, values) {
            if (parseInt(keys.id) === parseInt($location.search().id)) {
              keys.expand = true;
            } else {
              keys.expand = false;
            }
          });

          vm.years = helper.getUniqueArray(vm.years);

          if ($location.search().id) {
            $timeout(function() {
              var idSection = angular.element(document.getElementById('mediaArticle-' + $location.search().id));
              $document.scrollToElement(idSection, ($location.path().split('/')[1] === 'news' ? 100 : 50), 100);
            }, 1000);
          }

        } else {
          AlertService.error('Problem att hämta nyheter');
        }
      }

    })();

    function toggleExpand(id) {

      for (var i = 0; i < vm.mediaItems.length; i++) {
        if (vm.mediaItems[i].id === id) {
          if (vm.mediaItems[i].expand != null) {
            vm.mediaItems[i].expand = !vm.mediaItems[i].expand;
          } else {
            vm.mediaItems[i].expand = true;
          }
        }
      }
    }

  }

})();
