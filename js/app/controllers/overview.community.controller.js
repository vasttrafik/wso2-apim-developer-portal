/*global helper*/
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('OverviewCommunityCtrl', OverviewCommunityCtrl);

  OverviewCommunityCtrl.$inject = ['$location', '$routeParams', '$http', 'APIService', 'AlertService', 'CommunityService'];

  function OverviewCommunityCtrl($location, $routeParams, $http, APIService, AlertService, CommunityService) {
    var vm = this;

    vm.type = 'questions';

    vm.questions = [];
    vm.posts = [];

    vm.communityService = CommunityService;

    vm.removeTopicsWatch = removeTopicsWatch;
    vm.removeForumsWatch = removeForumsWatch;

    vm.initializedtopics = false;
    vm.initializedWatches = false;

    (function init() {

      if (CommunityService.isMember()) {
        APIService.communityCall('membersIdWatchesGet', [CommunityService.getMemberId(), true], false)
          .then(membersIdWatchesGetResponse);
      }

      if ($routeParams.type != null) {
        vm.type = $routeParams.type;
        $location.update_path('/overview/community'); // jshint ignore:line
      }

      var query = ';createdBy:=:' + CommunityService.getMemberId();

      APIService.communityCall('postsGet', [null, query, null, 50], false)
        .then(function postsGetResponse(response) {
          if (response.status === 200) {
            var topicIds = [];
            var questionIds = [];
            for (var i = 0; i < response.data.length; i++) {
              if (!response.data[i].isDeleted && response.data[i].categoryId !== 1) {
                topicIds.push(response.data[i].topicId);

                if (response.data[i].type === 'question') {
                  questionIds.push(response.data[i].topicId);
                }
              }
            }

            topicIds = helper.getUniqueArray(topicIds);

            for (var j = 0; j < topicIds.length; j++) {
              getAddTopic(topicIds[j], $.inArray(topicIds[j], questionIds) !== -1);
            }

            vm.initializedtopics = true;

          } else {
            AlertService.error('Problem att hämta medverkande community inlägg');
          }
        })
        .catch(function(err) {
          AlertService.error('Problem att hämta medverkande community inlägg');
        });

    })();

    function getAddTopic(topicId, isQuestion) {
      APIService.communityCall('topicsIdGet', [topicId, false])
        .then(function topicsIdGetResponse(topicsResponse) {

          CommunityService.addGravatarProfileInfoToPost(topicsResponse.data);

          if (isQuestion) {
            vm.questions.push(topicsResponse.data);
          } else {
            vm.posts.push(topicsResponse.data);
          }

        }).catch(function(err) {
          // Might be that a topic has been deleted
          if (err.status !== 404) {
            AlertService.error('Problem att hämta medverkande community frågor');
          }
        });
    }

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

        vm.initializedWatches = true;

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
