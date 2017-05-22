/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityForumCtrl', CommunityForumCtrl);

  CommunityForumCtrl.$inject = ['$routeParams', '$scope', '$location', 'AlertService', 'APIService', 'CommunityService'];

  function CommunityForumCtrl($routeParams, $scope, $location, AlertService, APIService, CommunityService) {
    var vm = this;

    vm.communityService = CommunityService;

    vm.locationPath = $location.path();

    vm.internalForum = true;

    vm.addTopic = addTopic;
    vm.addForumUpdate = addForumUpdate;
    vm.addWatch = addWatch;
    vm.removeWatch = removeWatch;
    vm.updateForum = updateForum;
    vm.removeForum = removeForum;
    vm.resetAddTopicForm = resetAddTopicForm;

    (function init() {

      if ($.inArray(parseInt($routeParams.forumId), [1, 2, 3, 4]) === -1) {
        vm.internalForum = false;
      }

      vm.toggleForumUpdate = false;
      vm.form = {};
      vm.watches = {};
      vm.watches.isWatching = false;

      APIService.communityCall('forumsIdGet', [$routeParams.forumId])
        .then(forumsIdGetResponse);

      CommunityService.getFirstTopicByLabels(['popular', 'answered', 'unanswered'], $routeParams.forumId)
        .then(function(response) {
          vm.labels = response;
        });

      if (CommunityService.isMember()) {
        APIService.communityCall('membersIdWatchesGet', [CommunityService.getMemberId()])
          .then(membersIdWatchesGetResponse);
      }

    })();

    function forumsIdGetResponse(response) {
      if (response.status === 200) {
        vm.forum = response.data;

        CommunityService.addGravatarProfileInfoToPosts(vm.forum.topics);

      } else {
        AlertService.error('Problem att hämta forum');
      }
    }

    function membersIdWatchesGetResponse(response) {

      if (response.status === 200) {
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].forumId === parseInt($routeParams.forumId)) {
            vm.watches.isWatching = true;
            vm.watches.id = response.data[i].id;
            break;
          }
        }
      } else if (response.status !== 401) {
        AlertService.error('Problem att hämta bevakningsstatus för detta forum');
      }
    }

    function addWatch() {
      APIService.communityCall('forumsIdWatchesPost', [$routeParams.forumId])
        .then(forumsIdWatchesPostResponse)
        .catch(function(response) {
          AlertService.error('Problem att bevaka forum');
        });

      function forumsIdWatchesPostResponse(response) {
        if (response.status === 201) {
          AlertService.success('Du bevakar nu detta forum!');
          vm.watches.isWatching = true;
          vm.watches.id = response.data.id;
        } else {
          AlertService.errorWithStatus(response.status, 'Problem att bevaka forum');
        }
      }

    }

    function removeWatch() {
      APIService.communityCall('forumsIdWatchesWatchIdDelete', [$routeParams.forumId, vm.watches.id])
        .then(forumsIdWatchesWatchIdDeleteResponse)
        .catch(function(response) {
          AlertService.error('Problem att sluta bevaka forum');
        });

      function forumsIdWatchesWatchIdDeleteResponse(response) {
        if (response.status === 200) {
          vm.watches.isWatching = false;
          vm.watches.id = -1;
          AlertService.success('Du bevakar inte längre detta forum!');
        } else {
          AlertService.errorWithStatus(response.status, 'Problem att sluta bevaka forum');
        }
      }

    }

    function addTopic() {
      vm.dataLoadingAddTopic = true;

      APIService.communityCall('topicsPost', [{
          forumId: vm.forum.id,
          subject: vm.form.addTopic.subject,
          posts: [{
            topicId: vm.forum.topicId,
            forumId: vm.forum.id,
            type: 'question',
            text: vm.form.addTopic.question,
            textFormat: ($location.path().split('/')[1] === 'community' ? 'md' : 'html')
          }]
        }], true)
        .then(topicsPostResponse)
        .catch(function(response) {
          AlertService.error('Problem att skapa fråga');
          vm.dataLoadingAddTopic = false;
        });

      function topicsPostResponse(response) {
        if (response.status === 201) {

          AlertService.success('Fråga ' + response.data.subject + ' skapad!');
          //vm.forum.topics.push(response.data);
          $location.path('/community/topic/' + response.data.id);

          resetAddTopicForm();

        } else {
          AlertService.errorWithStatus(response.status, 'Problem att skapa ny fråga');
        }
        vm.dataLoadingAddTopic = false;
      }
    }

    function addForumUpdate() {

      vm.toggleForumUpdate = !vm.toggleForumUpdate;
      vm.form.name = angular.copy(vm.forum.name);
      vm.form.description = angular.copy(vm.forum.description);
      vm.form.imageURL = angular.copy(vm.forum.imageURL);

    }

    function updateForum() {

      APIService.communityCall('forumsIdPut', [vm.forum.id, {
          categoryId: vm.forum.categoryId,
          name: vm.form.name,
          description: vm.form.description,
          imageURL: vm.form.imageURL
        }])
        .then(forumsIdPutResponse)
        .catch(function(response) {
          AlertService.error('Problem att uppdatera forum');
        });

      function forumsIdPutResponse(response) {
        if (response.status === 200) {
          AlertService.success('Forum uppdaterat!');
          vm.forum.name = vm.form.name;
          vm.forum.description = vm.form.description;
          vm.toggleForumUpdate = false;
        } else {
          AlertService.errorWithStatus(response.status, 'Problem att uppdatera forum');
        }
      }

    }

    function resetAddTopicForm() {
      vm.form.addTopic = {};
      $scope.addTopicForm.$setPristine();
    }

    function removeForum() {

      if (confirm('Är du säker på att du vill ta bort detta forum?') === true) {
        APIService.communityCall('forumsIdDelete', [vm.forum.id])
          .then(forumsIdDeleteResponse)
          .catch(function(response) {
            AlertService.error('Problem att ta bort forum');
          });
      }

      function forumsIdDeleteResponse(response) {
        if (response.status === 200) {
          AlertService.success('Forum borttaget!');

          $location.path('/' + ($location.path().split('/')[1] === 'community' ? 'community' : 'admin') + '/category/' + vm.forum.categoryId); // Redirect to parent catrgory

        } else {
          AlertService.errorWithStatus(response.status, 'Problem att ta bort forum');
        }
      }

    }

  }

})();
