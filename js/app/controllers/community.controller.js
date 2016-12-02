/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityCtrl', CommunityCtrl);

  CommunityCtrl.$inject = ['$location', 'AlertService', 'APIService', 'CommunityService'];

  function CommunityCtrl($location, AlertService, APIService, CommunityService) {
    var vm = this;

    vm.communityService = CommunityService;

    vm.locationPath = $location.path();

    (function init() {

      APIService.communityCall('categoriesGet', [false, true])
        .then(categoriesGetResponse);

      CommunityService.getFirstTopicByLabels(['popular', 'answered', 'unanswered'])
        .then(function(response) {
          vm.labels = response;
        });

    })();

    function categoriesGetResponse(response) {
      if (response.status === 200) {
        vm.categories = response.data;

        angular.forEach(vm.categories, function(value, key) {

          if (value.lastPost && value.lastPost.length > 0) {
            // Find the latest post in each category
            var forums = value.lastPost = value.forums.sort(function(a, b) {
              if (b.lastPost != null && a.lastPost != null) {
                return new Date(b.lastPost.createDate).getTime() - new Date(a.lastPost.createDate).getTime();
              }
            });

            for (var i = 0; i < forums.length; i++) {
              if (forums[i].lastPost != null && !forums[i].lastPost.isDeleted) {
                value.lastPost = forums[i].lastPost;
                break;
              }
            }

            // Add gravatar info to found last posts
            CommunityService.addGravatarProfileInfoToPost(value.lastPost);
          }

        });

      } else {
        AlertService.error('Problem att hämta lista med kategorier');
      }
    }

  }

})();
