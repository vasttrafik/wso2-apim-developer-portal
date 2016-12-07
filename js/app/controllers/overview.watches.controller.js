/*global helper*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('OverviewWatchesCtrl', OverviewWatchesCtrl);

  OverviewWatchesCtrl.$inject = ['$routeParams', '$http', 'APIService', 'AlertService', 'CommunityService'];

  function OverviewWatchesCtrl($routeParams, $http, APIService, AlertService, CommunityService) {
    var vm = this;

    vm.empty = false;

    vm.communityService = CommunityService;

    vm.removeTopicsWatch = removeTopicsWatch;
    vm.removeForumsWatch = removeForumsWatch;

    (function init() {

      if (CommunityService.isMember()) {
        APIService.communityCall('membersIdWatchesGet', [CommunityService.getMemberId(), true], false)
          .then(membersIdWatchesGetResponse);
      }

    })();

    function membersIdWatchesGetResponse(response) {

      if (response.status === 200) {

        vm.watches = {
          forums: [],
          topics: []
        };

        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].topicId != null) {
            CommunityService.addGravatarProfileInfoToPost(response.data[i].topic);
            vm.watches.topics.push(response.data[i]);
          } else {
            CommunityService.addGravatarProfileInfoToPost(response.data[i].forum.lastPost);
            vm.watches.forums.push(response.data[i]);
          }
        }

      } else {
        AlertService.error('Problem att hämta bevakningsstatus');
      }
    }

    function removeForumsWatch(forumId, watchId) {
      APIService.communityCall('forumsIdWatchesWatchIdDelete', [forumId, watchId])
        .then(forumsIdWatchesWatchIdDeleteResponse)
        .catch(function(response) {
          AlertService.error('Problem att sluta bevaka forum');
        });

      function forumsIdWatchesWatchIdDeleteResponse(response) {
        if (response.status === 200) {

          for (var i = 0; i < vm.watches.forums.length; i++) {
            if (vm.watches.forums[i].id === watchId) {
              vm.watches.forums.splice(i, 1);
            }
          }
          AlertService.success('Du bevakar inte längre detta forum!');
        } else {
          AlertService.errorWithStatus(response.status, 'Problem att sluta bevaka forum');
        }
      }

    }

    function removeTopicsWatch(topicId, watchId) {
      APIService.communityCall('topicsIdWatchesWatchIdDelete', [topicId, watchId])
        .then(topicsIdWatchesWatchIdDeleteResponse)
        .catch(function(response) {
          AlertService.error('Problem att sluta bevaka fråga');
        });

      function topicsIdWatchesWatchIdDeleteResponse(response) {
        if (response.status === 200) {

          for (var i = 0; i < vm.watches.topics.length; i++) {
            if (vm.watches.topics[i].id === watchId) {
              vm.watches.topics.splice(i, 1);
            }
          }
          AlertService.success('Du bevakar inte längre denna fråga!');
        } else {
          AlertService.errorWithStatus(response.status, 'Problem att sluta bevaka fråga');
        }
      }

    }

  }

})();
