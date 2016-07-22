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

    vm.addTopic = addTopic;
    vm.addForumUpdate = addForumUpdate;
    vm.updateForum = updateForum;
    vm.removeForum = removeForum;
    vm.resetAddTopicForm = resetAddTopicForm;

    (function init() {

      if ($location.path().indexOf('admin') > -1 && !CommunityService.isAdmin()) {
        $location.path('/');
      }

      vm.toggleForumUpdate = false;
      vm.form = {};

      APIService.communityCall('forumsIdGet', [$routeParams.forumId])
        .then(forumsIdGetResponse);

      CommunityService.getFirstTopicByLabels(['popular', 'answered', 'unanswered'], $routeParams.forumId)
        .then(function(response) {
          vm.labels = response;
        });

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
          subject: vm.form.topic.subject,
          posts: [{
            topicId: vm.forum.topicId,
            forumId: vm.forum.id,
            type: 'question',
            text: vm.form.topic.question,
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
          vm.forum.topics.push(response.data);
          resetAddTopicForm();

        } else {
          AlertService.error('Problem att skapa ny fråga');
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
        .then(forumsIdPutResponse);

      function forumsIdPutResponse(response) {
        if (response.status === 200) {
          AlertService.success('Forum uppdaterat!');
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

    function removeForum() {

      if (confirm('Är du säker på att du vill ta bort detta forum?') === true) {
        APIService.communityCall('forumsIdDelete', [vm.forum.id])
          .then(forumsIdDeleteResponse);
      }

      function forumsIdDeleteResponse(response) {
        if (response.status === 200) {
          AlertService.success('Forum borttaget!');

          $location.path('/' + ($location.path().split('/')[1] === 'community' ? 'community' : 'admin') + '/category/' + vm.forum.categoryId); // Redirect to parent catrgory

        } else {
          AlertService.error('Problem att ta bort forum');
        }
      }

    }

  }

})();
