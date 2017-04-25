/// <reference path="api.d.ts" />
/* global communityBaseUrl */
var CommunityAPI;
(function(CommunityAPI) {
  /* tslint:disable:no-unused-variable member-ordering */
  (function(Client) {
    'use strict';

    var CommunityApi = (function() {
      function CommunityApi($http, basePath, $httpParamSerializer) {
        this.$http = $http;
        this.$httpParamSerializer = $httpParamSerializer;
        this.basePath = communityBaseUrl;
        if (basePath) {
          this.basePath = basePath;
        }
      }
      CommunityApi.prototype.extendObj = function(objA, objB) {
        for (var key in objB) {
          if (objB.hasOwnProperty(key)) {
            objA[key] = objB[key];
          }
        }
        return objA;
      };
      /**
       *
       * Creates a new attachment
       * @param attachment The attachment to upload. May be multiple files.
       * @param authorization Standard http header
       */
      CommunityApi.prototype.attachmentsPost = function(attachment, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/attachments';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        var formParams = {};
        // verify required parameter 'attachment' is set
        if (!attachment) {
          throw new Error('Missing required parameter attachment when calling attachmentsPost');
        }
        headerParams['Content-Type'] = 'application/x-www-form-urlencoded';
        formParams['attachment'] = attachment;
        var httpRequestParams = {
          method: 'POST',
          url: localVarPath,
          json: false,
          data: this.$httpParamSerializer(formParams),
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Downloads an attachment
       * @param id Resource id
       * @param authorization Standard http header
       */
      CommunityApi.prototype.attachmentsIdGet = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/attachments/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling attachmentsIdGet');
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves forum categories
       * @param includePrivate If all (including private) categories should be included in the result
       * @param includeForums If forums should be included in the result
       */
      CommunityApi.prototype.categoriesGet = function(includePrivate, includeForums, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/categories';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        if (includePrivate !== undefined) {
          queryParameters['includePrivate'] = includePrivate;
        }
        if (includeForums !== undefined) {
          queryParameters['includeForums'] = includeForums;
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Admin function to create a category
       * @param authorization Standard http header
       * @param body The category to create
       */
      CommunityApi.prototype.categoriesPost = function(body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/categories';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        var httpRequestParams = {
          method: 'POST',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves a category, including all forums
       * @param id Resource id
       */
      CommunityApi.prototype.categoriesIdGet = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/categories/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling categoriesIdGet');
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Admin function to update a category
       * @param id Resource id
       * @param authorization Standard http header
       * @param body The category to update
       */
      CommunityApi.prototype.categoriesIdPut = function(id, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/categories/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling categoriesIdPut');
        }
        var httpRequestParams = {
          method: 'PUT',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Admin function to delete a category, including all forums
       * @param id Resource id
       * @param authorization Standard http header
       */
      CommunityApi.prototype.categoriesIdDelete = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/categories/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling categoriesIdDelete');
        }
        var httpRequestParams = {
          method: 'DELETE',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves forums belonging to a certain category, without topics
       * @param id Resource id
       * @param ifModifiedSince Standard http header
       * @param offset Starting point of the list
       * @param limit Maximum size array to return
       */
      CommunityApi.prototype.categoriesIdForumsGet = function(id, ifModifiedSince, offset, limit, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/categories/{id}/forums'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling categoriesIdForumsGet');
        }
        if (offset !== undefined) {
          queryParameters['offset'] = offset;
        }
        if (limit !== undefined) {
          queryParameters['limit'] = limit;
        }
        headerParams['If-Modified-Since'] = ifModifiedSince;
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves forums, without topics
       * @param name Retrieve a forum by name
       * @param label Only retrieve forums with this label
       * @param offset Starting point of the list
       * @param limit Maximum size array to return
       */
      CommunityApi.prototype.forumsGet = function(name, label, offset, limit, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/forums';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        if (name !== undefined) {
          queryParameters['name'] = name;
        }
        if (label !== undefined) {
          queryParameters['label'] = label;
        }
        if (offset !== undefined) {
          queryParameters['offset'] = offset;
        }
        if (limit !== undefined) {
          queryParameters['limit'] = limit;
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Admin function to create a forum
       * @param authorization Standard http header
       * @param body The forum to create
       */
      CommunityApi.prototype.forumsPost = function(body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/forums';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        var httpRequestParams = {
          method: 'POST',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves a forum, including all topics
       * @param id Resource id
       */
      CommunityApi.prototype.forumsIdGet = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/forums/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling forumsIdGet');
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Admin function to update a forum
       * @param id Resource id
       * @param authorization Standard http header
       * @param body The forum to update
       */
      CommunityApi.prototype.forumsIdPut = function(id, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/forums/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling forumsIdPut');
        }
        var httpRequestParams = {
          method: 'PUT',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Admin function to delete a forum, including all topics
       * @param id Resource id
       * @param authorization Standard http header
       */
      CommunityApi.prototype.forumsIdDelete = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/forums/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling forumsIdDelete');
        }
        var httpRequestParams = {
          method: 'DELETE',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Performs a partial match (auto-complete) to search for members
       * @param member The email or signature of the member
       * @param offset Starting point of the list
       * @param limit Maximum size array to return
       */
      CommunityApi.prototype.membersGet = function(member, offset, limit, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/members';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'member' is set
        if (!member) {
          throw new Error('Missing required parameter member when calling membersGet');
        }
        if (member !== undefined) {
          queryParameters['member'] = member;
        }
        if (offset !== undefined) {
          queryParameters['offset'] = offset;
        }
        if (limit !== undefined) {
          queryParameters['limit'] = limit;
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves a community member profile
       * @param id Resource id
       */
      CommunityApi.prototype.membersIdGet = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/members/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling membersIdGet');
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Updates a member profile
       * @param id Resource id
       * @param body The member profile to update
       */
      CommunityApi.prototype.membersIdPut = function(id, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/members/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling membersIdPut');
        }
        var httpRequestParams = {
          method: 'PUT',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Deletes a community member profile
       * @param id Resource id
       */
      CommunityApi.prototype.membersIdDelete = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/members/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling membersIdDelete');
        }
        var httpRequestParams = {
          method: 'DELETE',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Creates a member profile
       * @param body The member profile to create
       */
      CommunityApi.prototype.membersPost = function(body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/members';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        var httpRequestParams = {
          method: 'POST',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves posts, without edits
       * @param label Only retrieve posts with this label
       * @param query Query string that will be matched against the following attributes: createDate, createdBy, text, categoryId and forumId
       * @param offset Starting point of the list
       * @param limit Maximum size array to return
       */
      CommunityApi.prototype.postsGet = function(label, query, offset, limit, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/posts';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        if (label !== undefined) {
          queryParameters['label'] = label;
        }
        if (query !== undefined) {
          queryParameters['query'] = query;
        }
        if (offset !== undefined) {
          queryParameters['offset'] = offset;
        }
        if (limit !== undefined) {
          queryParameters['limit'] = limit;
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Creates a new post
       * @param body The post to create
       * @param authorization Standard http header
       */
      CommunityApi.prototype.postsPost = function(body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/posts';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'body' is set
        if (!body) {
          throw new Error('Missing required parameter body when calling postsPost');
        }
        var httpRequestParams = {
          method: 'POST',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves a post, including all edits
       * @param id Resource id
       */
      CommunityApi.prototype.postsIdGet = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/posts/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling postsIdGet');
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Updates a post
       * @param id Resource id
       * @param body A post object
       * @param authorization Standard http header
       * @param action An action parameter specifying the patch to perform
       */
      CommunityApi.prototype.postsIdPut = function(id, action, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/posts/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling postsIdPut');
        }
        // verify required parameter 'body' is set
        if (!body) {
          throw new Error('Missing required parameter body when calling postsIdPut');
        }
        if (action !== undefined) {
          queryParameters['action'] = action;
        }
        var httpRequestParams = {
          method: 'PUT',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Deletes a post, including all edits
       * @param id Resource id
       * @param authorization Standard http header
       */
      CommunityApi.prototype.postsIdDelete = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/posts/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling postsIdDelete');
        }
        var httpRequestParams = {
          method: 'DELETE',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves all versions of the post, sorted in descending order
       * @param id Resource id
       */
      CommunityApi.prototype.postsIdEditsGet = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/posts/{id}/edits'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling postsIdEditsGet');
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves posts in a topic
       * @param id Resource id
       * @param ifModifiedSince Standard http header
       * @param offset Starting point of the list
       * @param limit Maximum size array to return
       */
      CommunityApi.prototype.topicsIdPostsGet = function(id, ifModifiedSince, offset, limit, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics/{id}/posts'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling topicsIdPostsGet');
        }
        if (offset !== undefined) {
          queryParameters['offset'] = offset;
        }
        if (limit !== undefined) {
          queryParameters['limit'] = limit;
        }
        headerParams['If-Modified-Since'] = ifModifiedSince;
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves forum topics, without posts
       * @param id Resource id
       * @param ifModifiedSince Standard http header
       * @param offset Starting point of the list
       * @param limit Maximum size array to return
       */
      CommunityApi.prototype.forumsIdTopicsGet = function(id, ifModifiedSince, offset, limit, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/forums/{id}/topics'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling forumsIdTopicsGet');
        }
        if (offset !== undefined) {
          queryParameters['offset'] = offset;
        }
        if (limit !== undefined) {
          queryParameters['limit'] = limit;
        }
        headerParams['If-Modified-Since'] = ifModifiedSince;
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves topics, without posts
       * @param label Only retrieve topics with this label
       * @param query Query string that will be matched against the following attributes: createDate, createdBy, subject, text, categoryId and forumId
       * @param offset Starting point of the list
       * @param limit Maximum size array to return
       * @param setInfo If First and Last post should be set on each topic. Has a performance hit
       */
      CommunityApi.prototype.topicsGet = function(label, query, offset, limit, setInfo, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        if (label !== undefined) {
          queryParameters['label'] = label;
        }
        if (query !== undefined) {
          queryParameters['query'] = query;
        }
        if (offset !== undefined) {
          queryParameters['offset'] = offset;
        }
        if (limit !== undefined) {
          queryParameters['limit'] = limit;
        }
        if (setInfo !== undefined) {
          queryParameters['setInfo'] = setInfo;
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Creates a new topic
       * @param authorization Standard http header
       * @param body The topic to create
       */
      CommunityApi.prototype.topicsPost = function(body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        var httpRequestParams = {
          method: 'POST',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves a forum topic, inluding all posts
       * @param id Resource id
       */
      CommunityApi.prototype.topicsIdGet = function(id, includePosts, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};

        if (includePosts !== undefined) {
          queryParameters['includePosts'] = includePosts;
        }

        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling topicsIdGet');
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Updates a topic
       * @param id Resource id
       * @param authorization Standard http header
       * @param action The action to take
       * @param body The topic to update
       */
      CommunityApi.prototype.topicsIdPut = function(id, action, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling topicsIdPut');
        }
        if (action !== undefined) {
          queryParameters['action'] = action;
        }
        var httpRequestParams = {
          method: 'PUT',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Deletes a topic, inluding all posts
       * @param id Resource id
       * @param authorization Standard http header
       */
      CommunityApi.prototype.topicsIdDelete = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling topicsIdDelete');
        }
        var httpRequestParams = {
          method: 'DELETE',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Creates a vote
       * @param id Resource id
       * @param body The vote to create
       */
      CommunityApi.prototype.postsIdVotesPost = function(id, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/posts/{id}/votes'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling postsIdVotesPost');
        }
        var httpRequestParams = {
          method: 'POST',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves votes for a specific topic, possibly filtered by member id
       * @param id Resource id
       * @param memberId Filter by member id.
       */
      CommunityApi.prototype.topicsIdVotesGet = function(id, memberId, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics/{id}/votes'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling topicsIdVotesGet');
        }
        if (memberId !== undefined) {
          queryParameters['memberId'] = memberId;
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Creates a forum watch
       * @param id Resource id
       */
      CommunityApi.prototype.forumsIdWatchesPost = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/forums/{id}/watches'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling forumsIdWatchesPost');
        }
        var httpRequestParams = {
          method: 'POST',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Deletes a forum watch
       * @param id Resource id
       * @param watchId The forum watch id
       */
      CommunityApi.prototype.forumsIdWatchesWatchIdDelete = function(id, watchId, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/forums/{id}/watches/{watchId}'
          .replace('{' + 'id' + '}', String(id))
          .replace('{' + 'watchId' + '}', String(watchId));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling forumsIdWatchesWatchIdDelete');
        }
        // verify required parameter 'watchId' is set
        if (!watchId) {
          throw new Error('Missing required parameter watchId when calling forumsIdWatchesWatchIdDelete');
        }
        var httpRequestParams = {
          method: 'DELETE',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Deletes community member watches
       * @param id Resource id
       * @param body The watches to delete
       */
      CommunityApi.prototype.membersIdWatchesDelete = function(id, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/members/{id}/watches'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling membersIdWatchesDelete');
        }
        var httpRequestParams = {
          method: 'DELETE',
          url: localVarPath,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Retrieves the community member watches
       * @param id Resource id
       * @param setInfo If response should include topic and forum info
       * @param offset Starting point of the list
       * @param limit Maximum size array to return
       */
      CommunityApi.prototype.membersIdWatchesGet = function(id, setInfo, offset, limit, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/members/{id}/watches'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling membersIdWatchesGet');
        }
        if (setInfo !== undefined) {
          queryParameters['setInfo'] = setInfo;
        }
        if (offset !== undefined) {
          queryParameters['offset'] = offset;
        }
        if (limit !== undefined) {
          queryParameters['limit'] = limit;
        }
        var httpRequestParams = {
          method: 'GET',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Creates a topic watch
       * @param id Resource id
       */
      CommunityApi.prototype.topicsIdWatchesPost = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics/{id}/watches'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling topicsIdWatchesPost');
        }
        var httpRequestParams = {
          method: 'POST',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      /**
       *
       * Deletes a topic watch
       * @param id Resource id
       * @param watchId The topic watch id
       */
      CommunityApi.prototype.topicsIdWatchesWatchIdDelete = function(id, watchId, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics/{id}/watches/{watchId}'
          .replace('{' + 'id' + '}', String(id))
          .replace('{' + 'watchId' + '}', String(watchId));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling topicsIdWatchesWatchIdDelete');
        }
        // verify required parameter 'watchId' is set
        if (!watchId) {
          throw new Error('Missing required parameter watchId when calling topicsIdWatchesWatchIdDelete');
        }
        var httpRequestParams = {
          method: 'DELETE',
          url: localVarPath,
          json: true,
          params: queryParameters,
          headers: headerParams
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      CommunityApi.$inject = ['$http', '$httpParamSerializer'];
      return CommunityApi;
    })();
    Client.CommunityApi = CommunityApi;
  })(CommunityAPI.Client || (CommunityAPI.Client = {}));
  var Client = CommunityAPI.Client;
})(CommunityAPI || (CommunityAPI = {}));
