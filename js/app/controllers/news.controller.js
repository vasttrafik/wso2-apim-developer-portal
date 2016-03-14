/*global newsItems*/
/*global helper*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('NewsCtrl', NewsCtrl)
    .constant('newsItems', newsItems)
    .constant('helper', helper);

  NewsCtrl.$inject = ['$routeParams', '$location', '$scope', '$timeout', '$document'];

  function NewsCtrl($routeParams, $location, $scope, $timeout, $document) {
    var vm = this;

    vm.newsItems = [];
    vm.tags = [];
    vm.months = [];

    vm.toggleExpand = toggleExpand;
    vm.setTag = setTag;
    vm.toMonth = toMonth;

    (function init() {
      vm.newsItems = newsItems.filter(function(a) {

        vm.months.push(new Date(a.publishedDate).getMonth());

        if ($routeParams.month && $location.search().tag) {
          return (parseInt(new Date(a.publishedDate).getMonth()) + 1 === parseInt($routeParams.month)) && (a.tags.indexOf($location.search().tag) > -1);
        } else if ($routeParams.month) {
          return (parseInt(new Date(a.publishedDate).getMonth()) + 1 === parseInt($routeParams.month));
        } else if ($location.search().tag) {
          return (new Date(a.publishedDate).getMonth() === new Date().getMonth()) && (a.tags.indexOf($location.search().tag) > -1);
        } else {
          return new Date(a.publishedDate).getMonth() === new Date().getMonth();
        }
      });

      angular.forEach(vm.newsItems, function(keys, values) {
        vm.tags.push.apply(vm.tags, keys.tags);
        if (keys.id === $location.search().id) {
          keys.expand = true;
        } else {
          keys.expand = false;
        }
      });

      vm.tags = helper.getUniqueArray(vm.tags);
      vm.months = helper.getUniqueArray(vm.months);

      $timeout(function() {
        var idSection = angular.element(document.getElementById('newsArticle-' + $location.search().id));
        if (idSection.length > 0) {
          $document.scrollToElement(idSection, 100, 100);
        }
      }, 1000);

    })();

    function toggleExpand(index) {
      if (vm.newsItems[index].expand != null) {
        vm.newsItems[index].expand = !vm.newsItems[index].expand;
      } else {
        vm.newsItems[index].expand = true;
      }
    }

    function setTag(tag) {
      $location.search('id', null);
      $location.search('tag', tag);
    }

    function toMonth(month) {
      switch (month) {
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
