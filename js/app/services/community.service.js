/*
  Handles functions related to community api.
*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .factory('CommunityService', CommunityService);

  CommunityService.$inject = ['$location', '$q', '$http', '$rootScope', 'APIService'];

  function CommunityService($location, $q, $http, $rootScope, APIService) {
    var service = {};

    service.getFirstTopicByLabel = getFirstTopicByLabel;
    service.getFirstTopicByLabels = getFirstTopicByLabels;
    service.getFirstPostByLabel = getFirstPostByLabel;
    service.getFirstPostByLabels = getFirstPostByLabels;
    service.isMember = isMember;
    service.getMemberId = getMemberId;
    service.isAdmin = isAdmin;
    service.addGravatarProfileInfoToPosts = addGravatarProfileInfoToPosts;
    service.addGravatarProfileInfoToPost = addGravatarProfileInfoToPost;
    service.setHasVotedToPost = setHasVotedToPost;
    service.setHasVotedToPosts = setHasVotedToPosts;
    service.redirectToTopic = redirectToTopic;

    return service;

    function getFirstTopicByLabel(label, forumId, categoryId) {
      return getFirstByLabel(label, forumId, categoryId, false);
    }

    function getFirstTopicByLabels(labels, forumId, categoryId) {
      return getFirstByLabels(labels, forumId, categoryId, false);
    }

    function getFirstPostByLabel(label, forumId, categoryId) {
      return getFirstByLabel(label, forumId, categoryId, true);
    }

    function getFirstPostByLabels(labels, forumId, categoryId) {
      return getFirstByLabels(labels, forumId, categoryId, true);
    }

    /* Retrieve the first topic or post with a specific label */
    function getFirstByLabel(label, forumId, categoryId, isPost) {
      var deferred = $q.defer();

      APIService.communityCall(isPost ? 'postsGet' : 'topicsGet', [label, null, null, 100])
        .then(function topicsGetResponse(response) {
          if (response.status === 200) {

            for (var i = 0; i < response.data.length; i++) {

              if (!forumId && !categoryId) {
                break;
              } else if (response.data[i].forumId === parseInt(forumId) || response.data[i].categoryId === parseInt(categoryId)) {
                break;
              }

            }
            deferred.resolve({
              label: label,
              data: (i < response.data.length) ? response.data[i] : {}
            });
          } else {
            errorResponse(response.status, 'Problem att hämta topic', deferred);
          }
        })
        .catch(function(err) {
          errorResponse(err.status, 'Problem att hämta topic', deferred);
        });

      return deferred.promise;
    }

    /* Retrieves the first post for a list of labels
     * The result is a combined object with all labels as keys
     */
    function getFirstByLabels(labels, forumId, categoryId, isPosts) {
      var deferred = $q.defer();

      var combinedResponse = {};
      var numberOfErrors = 0;

      for (var i = 0; i < labels.length; i++) {
        getFirstByLabel(labels[i], forumId, categoryId, isPosts)
          .then(getFirstByLabelResponse)
          .catch(function(err) {
            numberOfErrors++;

            /* Check if all promises failed or if all are done */
            if (numberOfErrors === labels.length) {
              errorResponse(404, 'Inga topics funna för labels ' + labels + ' och forumId ' + forumId + ' eller categoryId ' + categoryId, deferred);
            } else if (Object.keys(combinedResponse).length + numberOfErrors === labels.length) {
              deferred.resolve(combinedResponse);
            }
          });
      }

      function getFirstByLabelResponse(response) {
        combinedResponse[response.label] = response.data;

        /* Check if all promises has completed */
        if (Object.keys(combinedResponse).length + numberOfErrors === labels.length) {
          deferred.resolve(combinedResponse);
        }
      }

      return deferred.promise;
    }

    function isMember() {
      try {
        return $rootScope.globals.currentUser.memberId && $rootScope.user.loggedIn ? true : false;
      } catch (err) {
        return false;
      }
    }

    function isAdmin() {
      try {
        return $rootScope.globals.currentUser.role === 'community-admin' ? true : false;
      } catch (err) {
        return false;
      }
    }

    function getMemberId() {
      try {
        return $rootScope.globals.currentUser.memberId;
      } catch (err) {
        return -1;
      }
    }

    function errorResponse(status, message, deferred) {

      var response = {
        status: status,
        message: message
      };

      deferred.reject(response);
    }

    function addGravatarProfileInfoToPost(post) {

      post.createdBy.gravatarProfileInfo = {};

      if (post.createdBy.useGravatar) {
        var profileUrl = 'https://www.gravatar.com/' + post.createdBy.gravatarEmailHash + '.json?callback=JSON_CALLBACK';
        $http.jsonp(profileUrl).then(function(success) {
            if (Array.isArray(success.data.entry) && success.data.entry.length > 0) {
              post.createdBy.gravatarProfileInfo.name = success.data.entry[0].name.formatted;
              post.createdBy.gravatarProfileInfo.bioHTML = ''

              if (success.data.entry[0].aboutMe != null) {
                post.createdBy.gravatarProfileInfo.bioHTML = success.data.entry[0].aboutMe + '<br>';
              }

              if (success.data.entry[0].currentLocation != null) {
                post.createdBy.gravatarProfileInfo.bioHTML = post.createdBy.gravatarProfileInfo.bioHTML + success.data.entry[0].currentLocation + '<br>';
              }

              post.createdBy.gravatarProfileInfo.bioHTML = post.createdBy.gravatarProfileInfo.bioHTML + '<br>';

            }
          })
          .catch(function(error) {
            post.createdBy.gravatarProfileInfo.name = post.createdBy.signature;
            post.createdBy.gravatarProfileInfo.bioHTML = '';
          });
      } else {
        post.createdBy.gravatarProfileInfo.name = post.createdBy.signature;
        post.createdBy.gravatarProfileInfo.bioHTML = '';
      }

    }

    /* Cycles through all users and retrieves their gravatar profile info if available. Info is added to json object for createdBy */
    function addGravatarProfileInfoToPosts(posts) {

      angular.forEach(posts, function(value, key) {
        addGravatarProfileInfoToPost(value);
      });

    }

    function setHasVotedToPost(post) {

      if ($rootScope.user.loggedIn) {
        post.hasVoted = false;

        for (var i = 0; i < post.votes.length; i++) {
          if (post.votes[i].memberId === $rootScope.globals.currentUser.memberId) {
            post.hasVoted = true;
            break;
          }
        }
      }

    }

    function setHasVotedToPosts(posts) {

      angular.forEach(posts, function(value, key) {
        setHasVotedToPost(value);
      });
    }

    function redirectToTopic(topicId) {
      $location.path('/community/topic/' + topicId);
    }

  }

})();
