/// <reference path="api.d.ts" />
/* global userBaseUrl */
var UserAPI;
(function(UserAPI) {
  /* tslint:disable:no-unused-variable member-ordering */
  (function(Client) {
    'use strict';

    var UserApi = (function() {
      function UserApi($http, basePath, $httpParamSerializer) {
        this.$http = $http;
        this.$httpParamSerializer = $httpParamSerializer;
        this.basePath = userBaseUrl;
        if (basePath) {
          this.basePath = basePath;
        }
      }
      UserApi.prototype.extendObj = function(objA, objB) {
        for (var key in objB) {
          if (objB.hasOwnProperty(key)) {
            objA[key] = objB[key];
          }
        }
        return objA;
      };
      UserApi.prototype.usersPut = function(accept, contentType, body, extraHttpRequestParams) {
        var path = this.basePath + '/users';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        headerParams['Accept'] = accept;
        headerParams['Content-Type'] = contentType;
        var httpRequestParams = {
          method: 'PUT',
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
      UserApi.prototype.usersPost = function(accept, contentType, body, extraHttpRequestParams) {
        var path = this.basePath + '/users';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        headerParams['Accept'] = accept;
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
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      UserApi.prototype.usersUserIdGet = function(userId, accept, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
        var path = this.basePath + '/users/{userId}'
          .replace('{' + 'userId' + '}', String(userId));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'userId' is set
        if (!userId) {
          throw new Error('Missing required parameter userId when calling usersUserIdGet');
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
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      UserApi.prototype.usersUserIdPut = function(userId, action, accept, contentType, body, extraHttpRequestParams) {
        var path = this.basePath + '/users/{userId}'
          .replace('{' + 'userId' + '}', String(userId));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'userId' is set
        if (!userId) {
          throw new Error('Missing required parameter userId when calling usersUserIdPut');
        }
        // verify required parameter 'action' is set
        if (!action) {
          throw new Error('Missing required parameter action when calling usersUserIdPut');
        }
        if (action !== undefined) {
          queryParameters['action'] = action;
        }
        headerParams['Accept'] = accept;
        headerParams['Content-Type'] = contentType;
        var httpRequestParams = {
          method: 'PUT',
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
      UserApi.prototype.captchasPut = function(accept, contentType, action, body, extraHttpRequestParams) {
        var path = this.basePath + '/captchas';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        if (action !== undefined) {
          queryParameters['action'] = action;
        }
        headerParams['Accept'] = accept;
        headerParams['Content-Type'] = contentType;
        var httpRequestParams = {
          method: 'PUT',
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
      UserApi.prototype.captchasPost = function(accept, contentType, extraHttpRequestParams) {
        var path = this.basePath + '/captchas';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        headerParams['Accept'] = accept;
        headerParams['Content-Type'] = contentType;
        var httpRequestParams = {
          method: 'POST',
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
      UserApi.prototype.captchasIdGet = function(id, accept, extraHttpRequestParams) {
        var path = this.basePath + '/captchas/{id}'
          .replace('{' + 'id' + '}', String(id));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'id' is set
        if (!id) {
          throw new Error('Missing required parameter id when calling captchasIdGet');
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
      UserApi.prototype.claimsGet = function(dialect, type, accept, extraHttpRequestParams) {
        var path = this.basePath + '/claims';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        // verify required parameter 'dialect' is set
        if (!dialect) {
          throw new Error('Missing required parameter dialect when calling claimsGet');
        }
        // verify required parameter 'type' is set
        if (!type) {
          throw new Error('Missing required parameter type when calling claimsGet');
        }
        if (dialect !== undefined) {
          queryParameters['dialect'] = dialect;
        }
        if (type !== undefined) {
          queryParameters['type'] = type;
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
      UserApi.prototype.notificationsPost = function(accept, contentType, body, extraHttpRequestParams) {
        var path = this.basePath + '/notifications';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        headerParams['Accept'] = accept;
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
          httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
      };
      UserApi.prototype.challengequestionsUsernameGet = function(accept, username, confirmation, questionId, extraHttpRequestParams) {
        var path = this.basePath + '/challengequestions/{username}'
          .replace('{' + 'username' + '}', String(username));
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        if (confirmation !== undefined) {
          queryParameters['confirmation'] = confirmation;
        }
        if (questionId !== undefined) {
          queryParameters['questionId'] = questionId;
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
      UserApi.prototype.challengequestionsGet = function(accept, extraHttpRequestParams) {
        var path = this.basePath + '/challengequestions';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
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
      UserApi.prototype.challengequestionsGet = function(accept, extraHttpRequestParams) {
        var path = this.basePath + '/challengequestions';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
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
      UserApi.prototype.challengequestionsPut = function(accept, contentType, body, extraHttpRequestParams) {
        var path = this.basePath + '/challengequestions';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        headerParams['Accept'] = accept;
        headerParams['Content-Type'] = contentType;
        var httpRequestParams = {
          method: 'PUT',
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
      UserApi.prototype.challengequestionsPost = function(accept, userId, body, extraHttpRequestParams) {
        var path = this.basePath + '/challengequestions';
        var queryParameters = {};
        var headerParams = this.extendObj({}, this.defaultHeaders);
        if (userId !== undefined) {
          queryParameters['userId'] = userId;
        }
        headerParams['Accept'] = accept;
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
      UserApi.$inject = ['$http', '$httpParamSerializer'];
      return UserApi;
    })();
    Client.UserApi = UserApi;
  })(UserAPI.Client || (UserAPI.Client = {}));
  var Client = UserAPI.Client;
})(UserAPI || (UserAPI = {}));
