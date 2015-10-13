/// <reference path="api.d.ts" />
var API;
(function (API) {
    /* tslint:disable:no-unused-variable member-ordering */
    (function (Client) {
        'use strict';

        var DefaultApi = (function () {
            function DefaultApi($http, basePath, $httpParamSerializer) {
                this.$http = $http;
                this.$httpParamSerializer = $httpParamSerializer;
                this.basePath = 'http://localhost:8080';
                if (basePath) {
                    this.basePath = basePath;
                }
            }
            DefaultApi.prototype.apisGet = function (limit, offset, query, accept, ifNoneMatch, extraHttpRequestParams) {
                var path = this.basePath + '/apis';

                var queryParameters = {};
                var headerParams = {};

                // verify required parameter 'limit' is set
                if (!limit) {
                    throw new Client.Error('Missing required parameter limit when calling apisGet');
                }

                // verify required parameter 'offset' is set
                if (!offset) {
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

            DefaultApi.prototype.apisApiIdGet = function (apiId, accept, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
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

            DefaultApi.prototype.apisApiIdDocumentsGet = function (limit, offset, apiId, query, accept, ifNoneMatch, extraHttpRequestParams) {
                var path = this.basePath + '/apis/{apiId}/documents';

                path = path.replace('{' + 'apiId' + '}', String(apiId));

                var queryParameters = {};
                var headerParams = {};

                // verify required parameter 'limit' is set
                if (!limit) {
                    throw new Client.Error('Missing required parameter limit when calling apisApiIdDocumentsGet');
                }

                // verify required parameter 'offset' is set
                if (!offset) {
                    throw new Client.Error('Missing required parameter offset when calling apisApiIdDocumentsGet');
                }

                // verify required parameter 'apiId' is set
                if (!apiId) {
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

            DefaultApi.prototype.apisApiIdDocumentsDocumentIdGet = function (apiId, documentId, accept, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
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

            DefaultApi.prototype.applicationsGet = function (limit, offset, query, accept, ifNoneMatch, extraHttpRequestParams) {
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

            DefaultApi.prototype.applicationsPost = function (body, contentType, extraHttpRequestParams) {
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

            DefaultApi.prototype.applicationsApplicationIdGet = function (applicationId, accept, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
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

            DefaultApi.prototype.applicationsApplicationIdPut = function (body, applicationId, contentType, ifMatch, ifUnmodifiedSince, extraHttpRequestParams) {
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

            DefaultApi.prototype.applicationsApplicationIdDelete = function (applicationId, ifMatch, ifUnmodifiedSince, extraHttpRequestParams) {
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

            DefaultApi.prototype.applicationsApplicationIdTokensPost = function (validityTime, applicationId, contentType, extraHttpRequestParams) {
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

            DefaultApi.prototype.securityPost = function (action, refreshToken, body, contentType, extraHttpRequestParams) {
                var path = this.basePath + '/security';

                var queryParameters = {};
                var headerParams = {};

                // verify required parameter 'action' is set
                if (!action) {
                    throw new Client.Error('Missing required parameter action when calling securityPost');
                }

                if (action !== undefined) {
                    queryParameters['action'] = action;
                }

                if (refreshToken !== undefined) {
                    queryParameters['refreshToken'] = refreshToken;
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

            DefaultApi.prototype.subscriptionsGet = function (accept, ifNoneMatch, extraHttpRequestParams) {
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

            DefaultApi.prototype.subscriptionsPost = function (body, contentType, extraHttpRequestParams) {
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

            DefaultApi.prototype.subscriptionsSubscriptionIdGet = function (subscriptionId, accept, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
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

            DefaultApi.prototype.subscriptionsSubscriptionIdPut = function (body, subscriptionId, contentType, ifMatch, ifUnmodifiedSince, extraHttpRequestParams) {
                var path = this.basePath + '/subscriptions/{subscriptionId}';

                path = path.replace('{' + 'subscriptionId' + '}', String(subscriptionId));

                var queryParameters = {};
                var headerParams = {};

                // verify required parameter 'body' is set
                if (!body) {
                    throw new Client.Error('Missing required parameter body when calling subscriptionsSubscriptionIdPut');
                }

                // verify required parameter 'subscriptionId' is set
                if (!subscriptionId) {
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

            DefaultApi.prototype.subscriptionsSubscriptionIdDelete = function (subscriptionId, ifMatch, ifUnmodifiedSince, extraHttpRequestParams) {
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

            DefaultApi.prototype.subscriptionsSubscriptionIdBlockSubscriptionPut = function (subscriptionId, extraHttpRequestParams) {
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

            DefaultApi.prototype.tiersGet = function (accept, ifNoneMatch, extraHttpRequestParams) {
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

            DefaultApi.prototype.usersPost = function (body, contentType, extraHttpRequestParams) {
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

            DefaultApi.prototype.usersUserIdGet = function (userId, accept, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
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

            DefaultApi.prototype.usersUserIdPut = function (action, body, userId, contentType, ifMatch, ifUnmodifiedSince, extraHttpRequestParams) {
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
