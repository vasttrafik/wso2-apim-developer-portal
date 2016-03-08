/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityForumCtrl', CommunityForumCtrl);

  CommunityForumCtrl.$inject = ['AlertService', 'APIService', '$routeParams'];

  function CommunityForumCtrl(AlertService, APIService, $routeParams) {
    var vm = this;

    vm.addTopic = addTopic;

    (function init() {

      APIService.communityCall('forumsIdGet', [$routeParams.forumId])
        .then(categoriesIdGetResponse);

    })();

    function categoriesIdGetResponse(response) {
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
          subject: vm.form.topic.subject
        }])
        .then(topicsPostResponse)
        .catch(function(response) {
          AlertService.error('Problem att skapa topic');
          vm.dataLoadingAddTopic = false;
        });

      function topicsPostResponse(response) {
        if (response.status === 201) {
          vm.forum.topics.push(response.data);

          AlertService.success('Topic ' + response.subject + ' skapad!');

          resetAddTopicForm();

        } else {
          AlertService.error('Problem att skapa ny applikation');
        }
        vm.dataLoadingAddApplication = false;
      }
    }

  }

})();
