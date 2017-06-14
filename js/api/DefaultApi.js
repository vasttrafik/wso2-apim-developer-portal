/// <reference path="api.d.ts" />
/* global defaultBaseUrl */
var API;
(function(API) {
  /* tslint:disable:no-unused-variable member-ordering */
  (function(Client) {
    'use strict';

    var DefaultApi = (function() {
      function DefaultApi($http, basePath, $httpParamSerializer) {
        this.$http = $http;
        this.$httpParamSerializer = $httpParamSerializer;
        this.basePath = defaultBaseUrl;
        //this.basePath = 'http://localhost:8080';
        if (basePath) {
          this.basePath = basePath;
        }
      }
      DefaultApi.prototype.apisGet = function(limit, offset, query, accept, ifNoneMatch, extraHttpRequestParams) {
        var path = this.basePath + '/apis';

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'limit' is set
        if (limit == null) {
          throw new Client.Error('Missing required parameter limit when calling apisGet');
        }
        // verify required parameter 'offset' is set
        if (offset == null) {
          throw new Client.Error('Missing required parameter offset when calling apisGet');
        }

        if (limit !== undefined) {
          queryParameters['limit'] = limit;
        }

        if (offset !== undefined) {
          queryParameters['offset'] = offset;
        }

        if (query !== undefined) {
          queryParameters['query'] = query;
        }

        headerParams['Accept'] = accept;

        headerParams['If-None-Match'] = ifNoneMatch;

        var httpRequestParams = {
          method: 'GET',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }
        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.apisApiIdGet = function(apiId, accept, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
        var path = this.basePath + '/apis/{apiId}';

        path = path.replace('{' + 'apiId' + '}', String(apiId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'apiId' is set
        if (!apiId) {
          throw new Client.Error('Missing required parameter apiId when calling apisApiIdGet');
        }

        headerParams['Accept'] = accept;

        headerParams['If-None-Match'] = ifNoneMatch;

        headerParams['If-Modified-Since'] = ifModifiedSince;

        var httpRequestParams = {
          method: 'GET',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.apisApiIdDocumentsGet = function(limit, offset, apiId, query, accept, ifNoneMatch, extraHttpRequestParams) {
        var path = this.basePath + '/apis/{apiId}/documents';

        path = path.replace('{apiId}', String(apiId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'limit' is set
        if (limit == null) {
          throw new Client.Error('Missing required parameter limit when calling apisApiIdDocumentsGet');
        }

        // verify required parameter 'offset' is set
        if (offset == null) {
          throw new Client.Error('Missing required parameter offset when calling apisApiIdDocumentsGet');
        }

        // verify required parameter 'apiId' is set
        if (apiId == null) {
          throw new Client.Error('Missing required parameter apiId when calling apisApiIdDocumentsGet');
        }

        if (limit !== undefined) {
          queryParameters['limit'] = limit;
        }

        if (offset !== undefined) {
          queryParameters['offset'] = offset;
        }

        if (query !== undefined) {
          queryParameters['query'] = query;
        }

        headerParams['Accept'] = accept;

        headerParams['If-None-Match'] = ifNoneMatch;

        var httpRequestParams = {
          method: 'GET',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.apisApiIdDocumentsDocumentIdGet = function(apiId, documentId, accept, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
        var path = this.basePath + '/apis/{apiId}/documents/{documentId}';

        path = path.replace('{' + 'apiId' + '}', String(apiId));

        path = path.replace('{' + 'documentId' + '}', String(documentId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'apiId' is set
        if (!apiId) {
          throw new Client.Error('Missing required parameter apiId when calling apisApiIdDocumentsDocumentIdGet');
        }

        // verify required parameter 'documentId' is set
        if (!documentId) {
          throw new Client.Error('Missing required parameter documentId when calling apisApiIdDocumentsDocumentIdGet');
        }

        headerParams['Accept'] = accept;

        headerParams['If-None-Match'] = ifNoneMatch;

        headerParams['If-Modified-Since'] = ifModifiedSince;

        var httpRequestParams = {
          method: 'GET',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.apisApiIdImageGet = function(apiId, accept, extraHttpRequestParams) {
        var path = this.basePath + '/apis/{apiId}/image'
          .replace('{' + 'apiId' + '}', String(apiId));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'apiId' is set
        if (!apiId) {
          throw new Error('Missing required parameter apiId when calling apisApiIdImageGet');
        }
        headerParams['Accept'] = accept;
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
      DefaultApi.prototype.apisApiIdSwaggerGet = function(apiId, accept, extraHttpRequestParams) {
        var path = this.basePath + '/apis/{apiId}/swagger'
          .replace('{' + 'apiId' + '}', String(apiId));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'apiId' is set
        if (!apiId) {
          throw new Error('Missing required parameter apiId when calling apisApiIdSwaggerGet');
        }
        headerParams['Accept'] = accept;
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

      DefaultApi.prototype.applicationsGet = function(limit, offset, query, accept, ifNoneMatch, extraHttpRequestParams) {
        var path = this.basePath + '/applications';

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'limit' is set
        if (limit == null) {
          throw new Client.Error('Missing required parameter limit when calling applicationsGet');
        }

        // verify required parameter 'offset' is set
        if (offset == null) {
          throw new Client.Error('Missing required parameter offset when calling applicationsGet');
        }

        if (limit !== undefined) {
          queryParameters['limit'] = limit;
        }

        if (offset !== undefined) {
          queryParameters['offset'] = offset;
        }

        if (query !== undefined) {
          queryParameters['query'] = query;
        }

        headerParams['Accept'] = accept;

        headerParams['If-None-Match'] = ifNoneMatch;

        var httpRequestParams = {
          method: 'GET',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.applicationsPost = function(body, contentType, extraHttpRequestParams) {
        var path = this.basePath + '/applications';

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'body' is set
        if (!body) {
          throw new Client.Error('Missing required parameter body when calling applicationsPost');
        }

        headerParams['Content-Type'] = contentType;

        var httpRequestParams = {
          method: 'POST',
          url: path,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.applicationsApplicationIdGet = function(applicationId, accept, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
        var path = this.basePath + '/applications/{applicationId}';

        path = path.replace('{' + 'applicationId' + '}', String(applicationId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'applicationId' is set
        if (!applicationId) {
          throw new Client.Error('Missing required parameter applicationId when calling applicationsApplicationIdGet');
        }

        headerParams['Accept'] = accept;

        headerParams['If-None-Match'] = ifNoneMatch;

        headerParams['If-Modified-Since'] = ifModifiedSince;

        var httpRequestParams = {
          method: 'GET',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.applicationsApplicationIdPut = function(body, applicationId, contentType, ifMatch, ifUnmodifiedSince, extraHttpRequestParams) {
        var path = this.basePath + '/applications/{applicationId}';

        path = path.replace('{' + 'applicationId' + '}', String(applicationId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'body' is set
        if (!body) {
          throw new Client.Error('Missing required parameter body when calling applicationsApplicationIdPut');
        }

        // verify required parameter 'applicationId' is set
        if (!applicationId) {
          throw new Client.Error('Missing required parameter applicationId when calling applicationsApplicationIdPut');
        }

        headerParams['Content-Type'] = contentType;

        headerParams['If-Match'] = ifMatch;

        headerParams['If-Unmodified-Since'] = ifUnmodifiedSince;

        var httpRequestParams = {
          method: 'PUT',
          url: path,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.applicationsApplicationIdDelete = function(applicationId, ifMatch, ifUnmodifiedSince, extraHttpRequestParams) {
        var path = this.basePath + '/applications/{applicationId}';

        path = path.replace('{' + 'applicationId' + '}', String(applicationId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'applicationId' is set
        if (!applicationId) {
          throw new Client.Error('Missing required parameter applicationId when calling applicationsApplicationIdDelete');
        }

        headerParams['If-Match'] = ifMatch;

        headerParams['If-Unmodified-Since'] = ifUnmodifiedSince;

        var httpRequestParams = {
          method: 'DELETE',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.applicationsApplicationIdTokensPost = function(body, validityTime, applicationId, contentType, extraHttpRequestParams) {
        var path = this.basePath + '/applications/{applicationId}/tokens';

        path = path.replace('{' + 'applicationId' + '}', String(applicationId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'validityTime' is set
        if (!validityTime) {
          throw new Client.Error('Missing required parameter validityTime when calling applicationsApplicationIdTokensPost');
        }

        // verify required parameter 'applicationId' is set
        if (!applicationId) {
          throw new Client.Error('Missing required parameter applicationId when calling applicationsApplicationIdTokensPost');
        }

        if (validityTime !== undefined) {
          queryParameters['validityTime'] = validityTime;
        }

        headerParams['Content-Type'] = contentType;

        var httpRequestParams = {
          method: 'POST',
          url: path,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.messagesPost = function(body, extraHttpRequestParams) {
        var path = this.basePath + '/messages';
        var queryParameters = {};
        // verify required parameter 'body' is set
        if (!body) {
          throw new Error('Missing required parameter body when calling messagesPost');
        }
        var httpRequestParams = {
          method: 'POST',
          url: path,
          json: true,
          data: body,
          params: queryParameters
        };
        if (extraHttpRequestParams) {
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.authenticatePost = function(body, contentType, extraHttpRequestParams) {
        var path = this.basePath + '/authenticate';

        var queryParameters = {};
        var headerParams = {};

        headerParams['Content-Type'] = contentType;

        var httpRequestParams = {
          method: 'POST',
          url: path,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      /**
       *
       * Retrieves combined statistics for chosen source
       * @param source if retrieved statistics should be for all apis ('apis') or for applications ('applications') (if logged in).
       * @param type List of statistic types.
       * @param grouping Date grouping for statistics. Defaults to / day.
       * @param period Period of statistics data to include. Defaults to 'week'.
       * @param source Source of statistics info. Either for API gateway or applications.
       */
      DefaultApi.prototype.statisticsGet = function (source, type, period, grouping, extraHttpRequestParams) {
          var path = this.basePath + '/statistics';
          var queryParameters = {};
          var headerParams = {};

          if (!source) {
              throw new Error('Missing required parameter source when calling statisticsGet');
          }
          // verify required parameter 'type' is set
          if (!type) {
              throw new Error('Missing required parameter type when calling statisticsApiNameApiVersionGet');
          }

          if (source !== undefined) {
              queryParameters['source'] = source;
          }
          if (type !== undefined) {
              queryParameters['type'] = type;
          }
          if (period !== undefined) {
              queryParameters['period'] = period;
          }
          if (grouping !== undefined) {
              queryParameters['grouping'] = grouping;
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
       * Deletes statistics (anonymizes) for the logged in user.
       */
      DefaultApi.prototype.statisticsDelete = function (extraHttpRequestParams) {
          var path = this.basePath + '/statistics';
          var queryParameters = {};
          var headerParams = {};
          var httpRequestParams = {
              method: 'DELETE',
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
       * Retrieves statistics available for specified applicationId
       * @param apiName The api name
       * @param apiVersion The api version
       * @param type Statistics type
       * @param period Period of statistics data to include. Defaults to 'week'.
       * @param grouping Date grouping for statistics. Defaults to / day.
       */
      DefaultApi.prototype.statisticsApiNameApiVersionGet = function (apiName, apiVersion, type, period, grouping, extraHttpRequestParams) {
          var path = this.basePath + '/statistics/{apiName}/{apiVersion}'
              .replace('{' + 'apiName' + '}', String(apiName))
              .replace('{' + 'apiVersion' + '}', String(apiVersion));
          var queryParameters = {};
          var headerParams = {};
          // verify required parameter 'apiName' is set
          if (!apiName) {
              throw new Error('Missing required parameter apiName when calling statisticsApiNameApiVersionGet');
          }
          // verify required parameter 'apiVersion' is set
          if (!apiVersion) {
              throw new Error('Missing required parameter apiVersion when calling statisticsApiNameApiVersionGet');
          }
          // verify required parameter 'type' is set
          if (!type) {
              throw new Error('Missing required parameter type when calling statisticsApiNameApiVersionGet');
          }
          if (period !== undefined) {
              queryParameters['period'] = period;
          }
          if (grouping !== undefined) {
              queryParameters['grouping'] = grouping;
          }
          if (type !== undefined) {
              queryParameters['type'] = type;
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
       * Retrieves statistics available for specified applicationId
       * @param applicationName The application name
       * @param type Statistics type
       * @param grouping Date grouping for statistics. Defaults to / day.
       */
      DefaultApi.prototype.statisticsApplicationNameGet = function (applicationName, type, grouping, extraHttpRequestParams) {
          var path = this.basePath + '/statistics/{applicationName}'
              .replace('{' + 'applicationName' + '}', String(applicationName));
          var queryParameters = {};
          var headerParams = {};
          // verify required parameter 'applicationName' is set
          if (!applicationName) {
              throw new Error('Missing required parameter applicationName when calling statisticsApplicationNameGet');
          }
          // verify required parameter 'type' is set
          if (!type) {
              throw new Error('Missing required parameter type when calling statisticsApplicationNameGet');
          }
          if (grouping !== undefined) {
              queryParameters['grouping'] = grouping;
          }
          if (type !== undefined) {
              queryParameters['type'] = type;
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

      DefaultApi.prototype.subscriptionsGet = function(accept, ifNoneMatch, extraHttpRequestParams) {
        var path = this.basePath + '/subscriptions';

        var queryParameters = {};
        var headerParams = {};
        headerParams['Accept'] = accept;

        headerParams['If-None-Match'] = ifNoneMatch;

        var httpRequestParams = {
          method: 'GET',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.subscriptionsPost = function(body, contentType, extraHttpRequestParams) {
        var path = this.basePath + '/subscriptions';

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'body' is set
        if (!body) {
          throw new Client.Error('Missing required parameter body when calling subscriptionsPost');
        }

        headerParams['Content-Type'] = contentType;

        var httpRequestParams = {
          method: 'POST',
          url: path,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.subscriptionsSubscriptionIdGet = function(subscriptionId, accept, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
        var path = this.basePath + '/subscriptions/{subscriptionId}';

        path = path.replace('{' + 'subscriptionId' + '}', String(subscriptionId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'subscriptionId' is set
        if (!subscriptionId) {
          throw new Client.Error('Missing required parameter subscriptionId when calling subscriptionsSubscriptionIdGet');
        }

        headerParams['Accept'] = accept;

        headerParams['If-None-Match'] = ifNoneMatch;

        headerParams['If-Modified-Since'] = ifModifiedSince;

        var httpRequestParams = {
          method: 'GET',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.subscriptionsSubscriptionIdPut = function(body, subscriptionId, contentType, ifMatch, ifUnmodifiedSince, extraHttpRequestParams) {
        var path = this.basePath + '/subscriptions/{subscriptionId}';

        path = path.replace('{' + 'subscriptionId' + '}', String(subscriptionId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'body' is set
        if (body == null) {
          throw new Client.Error('Missing required parameter body when calling subscriptionsSubscriptionIdPut');
        }

        // verify required parameter 'subscriptionId' is set
        if (subscriptionId == null) {
          throw new Client.Error('Missing required parameter subscriptionId when calling subscriptionsSubscriptionIdPut');
        }

        headerParams['Content-Type'] = contentType;

        headerParams['If-Match'] = ifMatch;

        headerParams['If-Unmodified-Since'] = ifUnmodifiedSince;

        var httpRequestParams = {
          method: 'PUT',
          url: path,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.subscriptionsSubscriptionIdDelete = function(subscriptionId, ifMatch, ifUnmodifiedSince, extraHttpRequestParams) {
        var path = this.basePath + '/subscriptions/{subscriptionId}';

        path = path.replace('{' + 'subscriptionId' + '}', String(subscriptionId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'subscriptionId' is set
        if (!subscriptionId) {
          throw new Client.Error('Missing required parameter subscriptionId when calling subscriptionsSubscriptionIdDelete');
        }

        headerParams['If-Match'] = ifMatch;

        headerParams['If-Unmodified-Since'] = ifUnmodifiedSince;

        var httpRequestParams = {
          method: 'DELETE',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.subscriptionsSubscriptionIdBlockSubscriptionPut = function(subscriptionId, extraHttpRequestParams) {
        var path = this.basePath + '/subscriptions/{subscriptionId}/block-subscription';

        path = path.replace('{' + 'subscriptionId' + '}', String(subscriptionId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'subscriptionId' is set
        if (!subscriptionId) {
          throw new Client.Error('Missing required parameter subscriptionId when calling subscriptionsSubscriptionIdBlockSubscriptionPut');
        }

        var httpRequestParams = {
          method: 'PUT',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.tiersGet = function(accept, ifNoneMatch, extraHttpRequestParams) {
        var path = this.basePath + '/tiers';

        var queryParameters = {};
        var headerParams = {};
        headerParams['Accept'] = accept;

        headerParams['If-None-Match'] = ifNoneMatch;

        var httpRequestParams = {
          method: 'GET',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.usersPost = function(body, contentType, extraHttpRequestParams) {
        var path = this.basePath + '/users';

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'body' is set
        if (!body) {
          throw new Client.Error('Missing required parameter body when calling usersPost');
        }

        headerParams['Content-Type'] = contentType;

        var httpRequestParams = {
          method: 'POST',
          url: path,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.usersUserIdGet = function(userId, accept, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
        var path = this.basePath + '/users/{userId}';

        path = path.replace('{' + 'userId' + '}', String(userId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'userId' is set
        if (!userId) {
          throw new Client.Error('Missing required parameter userId when calling usersUserIdGet');
        }

        headerParams['Accept'] = accept;

        headerParams['If-None-Match'] = ifNoneMatch;

        headerParams['If-Modified-Since'] = ifModifiedSince;

        var httpRequestParams = {
          method: 'GET',
          url: path,
          json: true,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };

      DefaultApi.prototype.usersUserIdPut = function(action, body, userId, contentType, ifMatch, ifUnmodifiedSince, extraHttpRequestParams) {
        var path = this.basePath + '/users/{userId}';

        path = path.replace('{' + 'userId' + '}', String(userId));

        var queryParameters = {};
        var headerParams = {};

        // verify required parameter 'action' is set
        if (!action) {
          throw new Client.Error('Missing required parameter action when calling usersUserIdPut');
        }

        // verify required parameter 'body' is set
        if (!body) {
          throw new Client.Error('Missing required parameter body when calling usersUserIdPut');
        }

        // verify required parameter 'userId' is set
        if (!userId) {
          throw new Client.Error('Missing required parameter userId when calling usersUserIdPut');
        }

        if (action !== undefined) {
          queryParameters['action'] = action;
        }

        headerParams['Content-Type'] = contentType;

        headerParams['If-Match'] = ifMatch;

        headerParams['If-Unmodified-Since'] = ifUnmodifiedSince;

        var httpRequestParams = {
          method: 'PUT',
          url: path,
          json: true,
          data: body,
          params: queryParameters,
          headers: headerParams
        };

        if (extraHttpRequestParams) {
          for (var k in extraHttpRequestParams) {
            if (extraHttpRequestParams.hasOwnProperty(k)) {
              httpRequestParams[k] = extraHttpRequestParams[k];
            }
          }
        }

        return this.$http(httpRequestParams);
      };
      DefaultApi.$inject = ['$http', '$httpParamSerializer'];
      return DefaultApi;
    })();
    Client.DefaultApi = DefaultApi;
  })(API.Client || (API.Client = {}));
  var Client = API.Client;
})(API || (API = {}));
