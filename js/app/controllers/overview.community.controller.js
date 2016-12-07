/*global helper*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('OverviewCommunityCtrl', OverviewCommunityCtrl);

  OverviewCommunityCtrl.$inject = ['$routeParams', '$http', 'APIService', 'AlertService', 'CommunityService'];

  function OverviewCommunityCtrl($routeParams, $http, APIService, AlertService, CommunityService) {
    var vm = this;

    vm.empty = false;

    vm.communityService = CommunityService;

    (function init() {

      vm.text = 'ämnen';
      var query = ';createdBy:=:' + CommunityService.getMemberId();
      if ($routeParams.type != null) {
        query = $routeParams.type === 'questions' ? query + '#AND;type:=:question' : query + '#AND;type:!=:question';
        vm.text = $routeParams.type === 'questions' ? 'frågor' : 'inlägg';
      }

      APIService.communityCall('postsGet', [null, query, null, 50], false)
        .then(function postsGetResponse(response) {
          if (response.status === 200) {
            vm.topics = [];
            var topicIds = [];
            for (var i = 0; i < response.data.length; i++) {
              if (!response.data[i].isDeleted && response.data[i].categoryId !== 1) {
                topicIds.push(response.data[i].topicId);
              }
            }

            if (topicIds.length === 0) {
              vm.empty = true;
            }

            for (var j = 0; j < topicIds.length; j++) {
              getAddTopic(topicIds[j]);
            }
          } else {
            AlertService.error('Problem att hämta medverkande community inlägg');
          }
        })
        .catch(function(err) {
          AlertService.error('Problem att hämta medverkande community inlägg');
        });

    })();

    function getAddTopic(topicId) {
      APIService.communityCall('topicsIdGet', [topicId, false])
        .then(function topicsIdGetResponse(topicsResponse) {
          CommunityService.addGravatarProfileInfoToPost(topicsResponse.data);
          vm.topics.push(topicsResponse.data);
        }).catch(function(err) {
          // Might be that a topic has been deleted
          if (err.status !== 404) {
            AlertService.error('Problem att hämta medverkande community frågor');
          }
        });
    }

  }

})();
