/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityTopicCtrl', CommunityTopicCtrl);

  CommunityTopicCtrl.$inject = ['$routeParams', '$scope', '$location', 'AlertService', 'APIService', 'CommunityService'];

  function CommunityTopicCtrl($routeParams, $scope, $location, AlertService, APIService, CommunityService) {
    var vm = this;

    vm.communityService = CommunityService;

    vm.addAnswer = addAnswer;
    vm.addComment = addComment;
    vm.addVote = addVote;
    vm.removePost = removePost;
    vm.updatePost = updatePost;
    vm.togglePostComment = togglePostComment;
    vm.togglePostCommentUpdate = togglePostCommentUpdate;
    vm.setAnswer = setAnswer;
    vm.resetAddAnswerForm = resetAddAnswerForm;
    vm.addPostCommentUpdate = addPostCommentUpdate;
    vm.addTopicUpdate = addTopicUpdate;
    vm.updateTopic = updateTopic;
    vm.removeTopic = removeTopic;

    (function init() {

      if ($location.path().indexOf('admin') > -1 && !CommunityService.isAdmin()) {
        $location.path('/');
      }

      vm.togglePostsComments = [];
      vm.toggleTopicUpdate = false;
      vm.togglePostsCommentsUpdate = [];
      vm.form = {};
      vm.form.posts = [];
      vm.form.comments = [];

      APIService.communityCall('topicsIdGet', [$routeParams.topicId])
        .then(topicsIdGetResponse);

    })();

    function topicsIdGetResponse(response) {
      if (response.status === 200) {

        vm.topic = response.data;

        CommunityService.addGravatarProfileInfoToPosts(vm.topic.posts);
        CommunityService.setHasVotedToPosts(vm.topic.posts);

        /* Initiating input for admin purposes */
        vm.form.posts[vm.topic.posts[0].id] = angular.copy(vm.topic.posts[0].text);
        vm.form.subject = angular.copy(vm.topic.subject);

      } else {
        AlertService.error('Problem att hämta fråga');
      }
    }

    function addComment(postId) {

      APIService.communityCall('postsPost', [{
          topicId: vm.topic.id,
          forumId: vm.topic.forumId,
          type: 'comment',
          text: vm.form.comments[postId],
          textFormat: 'md',
          commentTo: {
            id: postId
          }
        }])
        .then(postsPostCommentResponse)
        .catch(function(response) {
          AlertService.error('Problem att skicka kommentar');
        });

      function postsPostCommentResponse(response) {
        if (response.status === 201) {
          AlertService.success('Kommentar skickat!');
          CommunityService.addGravatarProfileInfoToPost(response.data);
          vm.topic.posts.push(response.data);
          togglePostComment(postId);

        } else {
          AlertService.errorWithStatus(response.status, 'Problem att skicka kommentar');
        }
      }

    }

    function addAnswer() {

      APIService.communityCall('postsPost', [{
          topicId: vm.topic.id,
          forumId: vm.topic.forumId,
          type: 'answer',
          text: vm.form.answer,
          textFormat: 'md'
        }])
        .then(postsPostAnswerResponse)
        .catch(function(response) {
          AlertService.error('Problem att skicka svar');
        });

      function postsPostAnswerResponse(response) {
        if (response.status === 201) {
          AlertService.success('Svar skickat!');
          CommunityService.addGravatarProfileInfoToPost(response.data);
          vm.topic.posts.push(response.data);
          vm.topic.numberOfAnswers++;
          resetAddAnswerForm();

        } else {
          AlertService.errorWithStatus(response.status, 'Problem att skicka svar');
        }
      }
    }

    function addVote(postId, type) {

      APIService.communityCall('postsIdVotesPost', [postId, {
          topicId: vm.topic.id,
          postId: postId,
          type: type,
          points: 1
        }])
        .then(postsIdVotesPostResponse)
        .catch(function(response) {
          AlertService.error('Problem att skicka röst');
        });

      function postsIdVotesPostResponse(response) {
        if (response.status === 201) {
          AlertService.success('Röst skickat!');

          for (var i = 0; i < vm.topic.posts.length; i++) {

            if (vm.topic.posts[i].id === postId) {
              // Add vote to post, update points awarded
              vm.topic.posts[i].votes.push(response.data);
              vm.topic.posts[i].pointsAwarded++;
              // Update has voted property
              CommunityService.setHasVotedToPost(vm.topic.posts[i]);
              break;
            }
          }

        } else {
          AlertService.errorWithStatus(response.status, 'Problem att skicka röst');
        }
      }

    }

    function addTopicUpdate() {

      vm.toggleTopicUpdate = !vm.toggleTopicUpdate;
      vm.form.subject = angular.copy(vm.topic.subject);

    }

    function removePost(postId, comment) {

      var i = 0;
      for (i; i < vm.topic.posts.length; i++) {
        if (vm.topic.posts[i].id === postId) {
          if (confirm('Är du säker på att du vill ta bort ' + (comment ? 'kommentaren' : 'svaret') + ': ' + vm.topic.posts[i].text.substring(0, 20) + '...?') === true) {
            APIService.communityCall('postsIdDelete', [postId])
              .then(postsIdDeleteResponse)
              .catch(function(response) {
                AlertService.error('Problem att ta bort svar');
              });
            break;
          }
        }
      }

      function postsIdDeleteResponse(response) {
        if (response.status === 200) {
          AlertService.success((comment ? 'Kommentaren' : 'Svaret') + ' borttaget!');
          vm.topic.posts[i].isDeleted = true;
          vm.topic.numberOfPosts--;
          if (!comment) {
            vm.topic.numberOfAnswers--;
          }
          /* If the deleted post was the appointed answer. Remove it from topic */
          if (vm.topic.answeredByPostId === vm.topic.posts[i].id) {
            vm.topic.answeredByPostId = null;
          }
        } else {
          AlertService.errorWithStatus(response.status, 'Problem att ta bort svar');
        }
      }
    }

    function updatePost(postId) {

      var i = 0;
      for (i; i < vm.topic.posts.length; i++) {
        if (vm.topic.posts[i].id === postId) {
          APIService.communityCall('postsIdPut', [postId, 'edited', {
              id: postId,
              forumId: vm.topic.forumId,
              topicId: vm.topic.id,
              type: vm.topic.posts[i].type,
              textFormat: vm.topic.posts[i].textFormat,
              text: vm.form.posts[postId]
            }])
            .then(postsIdPutResponse)
            .catch(function(response) {
              AlertService.error('Problem att uppdatera inlägg');
            });
          break;
        }
      }

      function postsIdPutResponse(response) {
        if (response.status === 200) {
          AlertService.success('Inlägg uppdaterat!');
          vm.topic.posts[i] = response.data;
          vm.form.posts[response.data.id] = response.data.text;
          togglePostCommentUpdate(postId);
        } else {
          AlertService.errorWithStatus(response.status, 'Problem att uppdatera inlägg');
        }
      }

    }

    function updateTopic() {

      APIService.communityCall('topicsIdPut', [vm.topic.id, 'subject', {
          id: vm.topic.id,
          forumId: vm.topic.forumId,
          subject: vm.form.subject
        }])
        .then(topicsIdPutResponse)
        .catch(function(response) {
          AlertService.error('Problem att uppdatera fråga');
        });

      function topicsIdPutResponse(response) {
        if (response.status === 200) {
          AlertService.success('Fråga uppdaterad!');
          vm.topic.subject = vm.form.subject;
          vm.toggleTopicUpdate = false;
        } else {
          AlertService.errorWithStatus(response.status, 'Problem att uppdatera fråga');
        }
      }

    }

    function removeTopic() {

      if (confirm('Är du säker på att du vill ta bort denna fråga?') === true) {
        APIService.communityCall('topicsIdDelete', [vm.topic.id])
          .then(topicsIdDeleteResponse)
          .catch(function(response) {
            AlertService.error('Problem att ta bort fråga');
          });
      }

      function topicsIdDeleteResponse(response) {
        if (response.status === 200) {
          AlertService.success('Topic borttagen!');

          $location.path('/' + ($location.path().split('/')[1] === 'community' ? 'community' : 'admin') + '/forum/' + vm.topic.forumId); // Redirect to parent forum

        } else {
          AlertService.errorWithStatus(response.status, 'Problem att ta bort fråga');
        }
      }

    }

    function setAnswer(postId) {

      for (var i = 0; i < vm.topic.posts.length; i++) {
        if (vm.topic.posts[i].id === postId) {
          break;
        }
      }

      APIService.communityCall('postsIdPut', [postId, 'answered', vm.topic.posts[i]])
        .then(postsIdPutResponse)
        .catch(function(response) {
          AlertService.error('Problem att specificera utpekat svar till frågan');
        });

      function postsIdPutResponse(response) {
        if (response.status === 200) {
          AlertService.success('Specificerade utpekat svar till frågan');

          vm.topic.answeredByPostId = postId;
          vm.topic.posts[i].isAnswer = true;
        } else {
          AlertService.errorWithStatus(response.status, 'Problem att specificera utpekat svar till frågan');
        }
      }
    }

    function resetAddAnswerForm() {
      vm.form.answer = '';
      $scope.addAnswerForm.$setPristine();
    }

    function addPostCommentUpdate(id) {
      for (var i = 0; i < vm.topic.posts.length; i++) {
        if (vm.topic.posts[i].id === id) {
          vm.form.posts[id] = angular.copy(vm.topic.posts[i].text);
          break;
        }
      }
      togglePostCommentUpdate(id);
    }

    function togglePostComment(commentId) {
      if (vm.togglePostsComments.indexOf(commentId) === -1) {
        vm.togglePostsComments.push(commentId);
      } else {
        vm.togglePostsComments.splice(vm.togglePostsComments.indexOf(commentId), 1);
        delete vm.form.comments[commentId];
      }
    }

    function togglePostCommentUpdate(id) {
      if (vm.togglePostsCommentsUpdate.indexOf(id) === -1) {
        vm.togglePostsCommentsUpdate.push(id);
      } else {
        vm.togglePostsCommentsUpdate.splice(vm.togglePostsCommentsUpdate.indexOf(id), 1);
        delete vm.form.posts[id];
      }
    }

  }

})();
