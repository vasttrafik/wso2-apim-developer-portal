/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityForumCtrl', CommunityForumCtrl);

  CommunityForumCtrl.$inject = ['$routeParams', '$scope', '$location', 'AlertService', 'APIService'];

  function CommunityForumCtrl($routeParams, $scope, $location, AlertService, APIService) {
    var vm = this;

    vm.addTopic = addTopic;
    vm.addForumUpdate = addForumUpdate;
    vm.updateForum = updateForum;
    vm.resetAddTopicForm = resetAddTopicForm;

    (function init() {

      vm.toggleForumUpdate = false;
      vm.form = {};

      APIService.communityCall('forumsIdGet', [$routeParams.forumId])
        .then(forumsIdGetResponse);

    })();

    function forumsIdGetResponse(response) {
      if (response.status === 200) {
        vm.forum = response.data;

      } else {
        AlertService.error('Problem att hämta forum');
      }
    }

    function addTopic() {
      vm.dataLoadingAddTopic = true;

      APIService.communityCall('topicsPost', [{
          forumId: vm.forum.id,
          subject: vm.form.topic.name,
          posts: [{
              topicId: vm.forum.topicId,
              forumId: vm.forum.id,
              type: 'question',
              text: vm.form.topic.question,
              textFormat: ($location.path().split('/')[1] === 'community' ? 'md' : 'html')
            }]
        }])
        .then(topicsPostResponse)
        .catch(function(response) {
          AlertService.error('Problem att skapa topic');
          vm.dataLoadingAddTopic = false;
        });

      function topicsPostResponse(response) {
        if (response.status === 201) {

          AlertService.success('Topic ' + response.data.name + ' skapad!');
          vm.forum.topics.push(response.data);
          resetAddTopicForm();

        } else {
          AlertService.error('Problem att skapa ny topic');
        }
        vm.dataLoadingAddTopic = false;
      }
    }

    function addForumUpdate() {

      vm.toggleForumUpdate = !vm.toggleForumUpdate;
      vm.form.name = angular.copy(vm.forum.name);
      vm.form.description = angular.copy(vm.forum.description);

    }

    function updateForum() {

      APIService.communityCall('forumsIdPut', [vm.forum.id, {
          categoryId: vm.forum.categoryId,
          name: vm.form.name,
          description: vm.form.description
        }])
        .then(forumsIdPutResponse);

      function forumsIdPutResponse(response) {
        if (response.status === 200) {
          AlertService.success('Forum uppdaterad!');
          vm.forum.name = vm.form.name;
          vm.forum.description = vm.form.description;
          vm.toggleForumUpdate = false;
        } else {
          AlertService.error('Problem att uppdatera forum');
        }
      }

    }

    function resetAddTopicForm() {
      vm.form.topic = {};
      $scope.addTopicForm.$setPristine();
    }

  }

})();
