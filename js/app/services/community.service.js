/*
  Handles functions related to community api.
*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .factory('CommunityService', CommunityService);

  CommunityService.$inject = ['$q', 'APIService'];

  function CommunityService($q, APIService) {
    var service = {};

    service.getFirstTopicByLabel = getFirstTopicByLabel;
    service.getFirstTopicByLabels = getFirstTopicByLabels;
    service.getFirstPostByLabel = getFirstPostByLabel;
    service.getFirstPostByLabels = getFirstPostByLabels;

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

      APIService.communityCall(isPost ? 'postsGet' : 'topicsGet', [label])
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

    function errorResponse(status, message, deferred) {

      var response = {
        status: status,
        message: message
      };

      deferred.reject(response);
    }

  }

})();
