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
      CommunityApi.prototype.attachmentsPost = function(attachment, authorization, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/attachments';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        var formParams = {};
        // verify required parameter 'attachment' is set
        if (!attachment) {
          throw new Error('Missing required parameter attachment when calling attachmentsPost');
        }
        headerParams['Authorization'] = authorization;
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
      CommunityApi.prototype.attachmentsIdGet = function(id, authorization, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/attachments/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling attachmentsIdGet');
        }
        headerParams['Authorization'] = authorization;
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
        var path = this.basePath + '/categories';
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
          url: path,
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
       * @param body The category to create
       */
      CommunityApi.prototype.categoriesPost = function(body, extraHttpRequestParams) {
        var path = this.basePath + '/categories';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        var httpRequestParams = {
          method: 'POST',
          url: path,
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
      CommunityApi.prototype.categoriesPost = function(authorization, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/categories';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        headerParams['Authorization'] = authorization;
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
      CommunityApi.prototype.categoriesIdPut = function(id, authorization, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/categories/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling categoriesIdPut');
        }
        headerParams['Authorization'] = authorization;
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
      CommunityApi.prototype.categoriesIdDelete = function(id, authorization, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/categories/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling categoriesIdDelete');
        }
        headerParams['Authorization'] = authorization;
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
       * Retrieves forums, without topics
       * @param name Retrieve a forum by name
       * @param label Only retrieve forums with this label
       * @param offset Starting point of the list
       * @param limit Maximum size array to return
       */
      CommunityApi.prototype.forumsGet = function(name, label, offset, limit, extraHttpRequestParams) {
        var path = this.basePath + '/forums';
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
          url: path,
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
      CommunityApi.prototype.forumsPost = function(authorization, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/forums';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        headerParams['Authorization'] = authorization;
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
      CommunityApi.prototype.forumsIdPut = function(id, authorization, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/forums/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling forumsIdPut');
        }
        headerParams['Authorization'] = authorization;
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
      CommunityApi.prototype.forumsIdDelete = function(id, authorization, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/forums/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling forumsIdDelete');
        }
        headerParams['Authorization'] = authorization;
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
      CommunityApi.prototype.postsPost = function(body, authorization, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/posts';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'body' is set
        if (!body) {
          throw new Error('Missing required parameter body when calling postsPost');
        }
        headerParams['Authorization'] = authorization;
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
      CommunityApi.prototype.postsIdPut = function(id, body, authorization, action, extraHttpRequestParams) {
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
        headerParams['Authorization'] = authorization;
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
      CommunityApi.prototype.postsIdDelete = function(id, authorization, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/posts/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling postsIdDelete');
        }
        headerParams['Authorization'] = authorization;
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
       */
      CommunityApi.prototype.topicsGet = function(label, query, offset, limit, extraHttpRequestParams) {
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
      CommunityApi.prototype.topicsPost = function(authorization, body, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        headerParams['Authorization'] = authorization;
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
      CommunityApi.prototype.topicsIdGet = function(id, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
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
      CommunityApi.prototype.topicsIdPut = function(id, authorization, action, body, extraHttpRequestParams) {
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
        headerParams['Authorization'] = authorization;
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
      CommunityApi.prototype.topicsIdDelete = function(id, authorization, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/topics/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling topicsIdDelete');
        }
        headerParams['Authorization'] = authorization;
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
