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
    vm.tags = [];
    vm.months = [];
    vm.month = $routeParams.month ? toMonth($routeParams.month - 1) : null;

    vm.toggleExpand = toggleExpand;
    vm.setTag = setTag;
    vm.toMonth = toMonth;

    (function init() {

      APIService.communityCall('forumsIdGet', [($location.path().split('/')[1] === 'news' ? 1 : 2)])
        .then(forumsIdGetResponse);

      function forumsIdGetResponse(response) {
        if (response.status === 200) {
          vm.mediaItems = response.data.topics.filter(function(a) {

            vm.months.push(new Date(a.createDate).getMonth());

            if ($routeParams.month && $location.search().tag) {
              return (parseInt(new Date(a.createDate).getMonth()) + 1 === parseInt($routeParams.month)) && (a.tags.indexOf($location.search().tag) > -1);
            } else if ($routeParams.month) {
              return (parseInt(new Date(a.createDate).getMonth()) + 1 === parseInt($routeParams.month));
            } else if ($location.search().tag) {
              return a.tags.indexOf($location.search().tag) > -1;
            } else {
              return true;
            }
          });

          angular.forEach(vm.mediaItems, function(keys, values) {
            vm.tags.push.apply(vm.tags, keys.tags);
            if (parseInt(keys.id) === parseInt($location.search().id)) {
              keys.expand = true;
            } else {
              keys.expand = false;
            }
          });

          vm.tags = helper.getUniqueArray(vm.tags);
          vm.months = helper.getUniqueArray(vm.months);

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

      console.log(id);

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

    function setTag(tag) {
      $location.search('id', null);
      $location.search('tag', tag);
    }

    function toMonth(month) {
      switch (parseInt(month)) {
        case 0:
          return 'Januari';
        case 1:
          return 'Februari';
        case 2:
          return 'Mars';
        case 3:
          return 'April';
        case 4:
          return 'Maj';
        case 5:
          return 'Juni';
        case 6:
          return 'Juli';
        case 7:
          return 'Augusti';
        case 8:
          return 'September';
        case 9:
          return 'Oktober';
        case 10:
          return 'Novermber';
        case 11:
          return 'December';
      }
    }

  }

})();
