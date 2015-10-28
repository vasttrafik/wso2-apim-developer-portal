/// <reference path="api.d.ts" />
var UserAPI;
(function (UserAPI) {
    /* tslint:disable:no-unused-variable member-ordering */
    (function (Client) {
        'use strict';

        var UserApi = (function () {
            function UserApi($http, basePath, $httpParamSerializer) {
                this.$http = $http;
                this.$httpParamSerializer = $httpParamSerializer;
                this.basePath = 'https://wso2publisher-test:9444/vt-wso2-identity-mgmt-api';
                if (basePath) {
                    this.basePath = basePath;
                }
            }
            UserApi.prototype.usersPut = function (body, accept, contentType, extraHttpRequestParams) {
                var path = this.basePath + '/users';

                var queryParameters = {};
                var headerParams = {};
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
                    for (var k in extraHttpRequestParams) {
                        if (extraHttpRequestParams.hasOwnProperty(k)) {
                            httpRequestParams[k] = extraHttpRequestParams[k];
                        }
                    }
                }

                return this.$http(httpRequestParams);
            };

            UserApi.prototype.usersPost = function (accept, contentType, body, extraHttpRequestParams) {
                var path = this.basePath + '/users';

                var queryParameters = {};
                var headerParams = {};
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
                    for (var k in extraHttpRequestParams) {
                        if (extraHttpRequestParams.hasOwnProperty(k)) {
                            httpRequestParams[k] = extraHttpRequestParams[k];
                        }
                    }
                }

                return this.$http(httpRequestParams);
            };

            UserApi.prototype.usersUserIdGet = function (userId, accept, authorization, ifNoneMatch, ifModifiedSince, extraHttpRequestParams) {
                var path = this.basePath + '/users/{userId}';

                path = path.replace('{' + 'userId' + '}', String(userId));

                var queryParameters = {};
                var headerParams = {};

                // verify required parameter 'userId' is set
                if (!userId) {
                    throw new Client.Error('Missing required parameter userId when calling usersUserIdGet');
                }

                headerParams['Accept'] = accept;

                headerParams['Authorization'] = authorization;

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

            UserApi.prototype.usersUserIdPut = function (userId, action, accept, authorization, contentType, body, extraHttpRequestParams) {
                var path = this.basePath + '/users/{userId}';

                path = path.replace('{' + 'userId' + '}', String(userId));

                var queryParameters = {};
                var headerParams = {};

                // verify required parameter 'userId' is set
                if (!userId) {
                    throw new Client.Error('Missing required parameter userId when calling usersUserIdPut');
                }

                // verify required parameter 'action' is set
                if (!action) {
                    throw new Client.Error('Missing required parameter action when calling usersUserIdPut');
                }

                if (action !== undefined) {
                    queryParameters['action'] = action;
                }

                headerParams['Accept'] = accept;

                headerParams['Authorization'] = authorization;

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
                    for (var k in extraHttpRequestParams) {
                        if (extraHttpRequestParams.hasOwnProperty(k)) {
                            httpRequestParams[k] = extraHttpRequestParams[k];
                        }
                    }
                }

                return this.$http(httpRequestParams);
            };
            UserApi.prototype.captchasPut = function (accept, contentType, action, body, extraHttpRequestParams) {
                var path = this.basePath + '/captchas';

                var queryParameters = {};
                var headerParams = {};
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
                    for (var k in extraHttpRequestParams) {
                        if (extraHttpRequestParams.hasOwnProperty(k)) {
                            httpRequestParams[k] = extraHttpRequestParams[k];
                        }
                    }
                }

                return this.$http(httpRequestParams);
            };

            UserApi.prototype.captchasPost = function (accept, contentType, extraHttpRequestParams) {
                var path = this.basePath + '/captchas';

                var queryParameters = {};
                var headerParams = {};
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
                    for (var k in extraHttpRequestParams) {
                        if (extraHttpRequestParams.hasOwnProperty(k)) {
                            httpRequestParams[k] = extraHttpRequestParams[k];
                        }
                    }
                }

                return this.$http(httpRequestParams);
            };

            UserApi.prototype.captchasIdGet = function (id, accept, extraHttpRequestParams) {
                var path = this.basePath + '/captchas/{id}';

                path = path.replace('{' + 'id' + '}', String(id));

                var queryParameters = {};
                var headerParams = {};

                // verify required parameter 'id' is set
                if (!id) {
                    throw new Client.Error('Missing required parameter id when calling captchasIdGet');
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
                    for (var k in extraHttpRequestParams) {
                        if (extraHttpRequestParams.hasOwnProperty(k)) {
                            httpRequestParams[k] = extraHttpRequestParams[k];
                        }
                    }
                }

                return this.$http(httpRequestParams);
            };
            UserApi.prototype.claimsGet = function (dialect, type, accept, extraHttpRequestParams) {
                var path = this.basePath + '/claims';

                var queryParameters = {};
                var headerParams = {};

                // verify required parameter 'dialect' is set
                if (!dialect) {
                    throw new Client.Error('Missing required parameter dialect when calling claimsGet');
                }

                // verify required parameter 'type' is set
                if (!type) {
                    throw new Client.Error('Missing required parameter type when calling claimsGet');
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
                    for (var k in extraHttpRequestParams) {
                        if (extraHttpRequestParams.hasOwnProperty(k)) {
                            httpRequestParams[k] = extraHttpRequestParams[k];
                        }
                    }
                }

                return this.$http(httpRequestParams);
            };
            UserApi.prototype.notificationsPost = function (accept, contentType, body, extraHttpRequestParams) {
                var path = this.basePath + '/notifications';

                var queryParameters = {};
                var headerParams = {};
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
                    for (var k in extraHttpRequestParams) {
                        if (extraHttpRequestParams.hasOwnProperty(k)) {
                            httpRequestParams[k] = extraHttpRequestParams[k];
                        }
                    }
                }

                return this.$http(httpRequestParams);
            };
            UserApi.prototype.challengequestionsGet = function (accept, username, confirmation, extraHttpRequestParams) {
                var path = this.basePath + '/challengequestions';

                var queryParameters = {};
                var headerParams = {};
                if (username !== undefined) {
                    queryParameters['username'] = username;
                }

                if (confirmation !== undefined) {
                    queryParameters['confirmation'] = confirmation;
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
                    for (var k in extraHttpRequestParams) {
                        if (extraHttpRequestParams.hasOwnProperty(k)) {
                            httpRequestParams[k] = extraHttpRequestParams[k];
                        }
                    }
                }

                return this.$http(httpRequestParams);
            };

            UserApi.prototype.challengequestionsIdGet = function (id, accept, username, confirmation, extraHttpRequestParams) {
                var path = this.basePath + '/challengequestions/{id}';

                path = path.replace('{' + 'id' + '}', String(id));

                var queryParameters = {};
                var headerParams = {};

                // verify required parameter 'id' is set
                if (!id) {
                    throw new Client.Error('Missing required parameter id when calling challengequestionsIdGet');
                }

                if (username !== undefined) {
                    queryParameters['username'] = username;
                }

                if (confirmation !== undefined) {
                    queryParameters['confirmation'] = confirmation;
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
                    for (var k in extraHttpRequestParams) {
                        if (extraHttpRequestParams.hasOwnProperty(k)) {
                            httpRequestParams[k] = extraHttpRequestParams[k];
                        }
                    }
                }

                return this.$http(httpRequestParams);
            };

            UserApi.prototype.challengequestionsIdAnswersPost = function (id, accept, contentType, body, extraHttpRequestParams) {
                var path = this.basePath + '/challengequestions/{id}/answers';

                path = path.replace('{' + 'id' + '}', String(id));

                var queryParameters = {};
                var headerParams = {};

                // verify required parameter 'id' is set
                if (!id) {
                    throw new Client.Error('Missing required parameter id when calling challengequestionsIdAnswersPost');
                }

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
                    for (var k in extraHttpRequestParams) {
                        if (extraHttpRequestParams.hasOwnProperty(k)) {
                            httpRequestParams[k] = extraHttpRequestParams[k];
                        }
                    }
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
