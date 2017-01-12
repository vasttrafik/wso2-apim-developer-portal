var CodegenAPI;
(function (CodegenAPI) {
    var Client;
    (function (Client) {
        'use strict';
        var CodegenApi = (function () {
            function CodegenApi($http, $httpParamSerializer, basePath) {
                this.$http = $http;
                this.$httpParamSerializer = $httpParamSerializer;
                this.basePath = 'https://generator.swagger.io/api';
                this.defaultHeaders = {};
                if (basePath !== undefined) {
                    this.basePath = basePath;
                }
            }
            CodegenApi.prototype.extendObj = function (objA, objB) {
                for (var key in objB) {
                    if (objB.hasOwnProperty(key)) {
                        objA[key] = objB[key];
                    }
                }
                return objA;
            };
            /**
             * Gets languages supported by the client generator
             *
             */
            CodegenApi.prototype.clientOptions = function (extraHttpRequestParams) {
                var localVarPath = this.basePath + '/gen/clients';
                var queryParameters = {};
                var headerParams = this.extendObj({}, this.defaultHeaders);
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
             * Downloads a pre-generated file
             * A valid &#x60;fileId&#x60; is generated by the &#x60;/clients/{language}&#x60; or &#x60;/servers/{language}&#x60; POST operations.  The fileId code can be used just once, after which a new &#x60;fileId&#x60; will need to be requested.
             * @param fileId
             */
            CodegenApi.prototype.downloadFile = function (fileId, extraHttpRequestParams) {
                var localVarPath = this.basePath + '/gen/download/{fileId}'
                    .replace('{' + 'fileId' + '}', String(fileId));
                var queryParameters = {};
                var headerParams = this.extendObj({}, this.defaultHeaders);
                // verify required parameter 'fileId' is not null or undefined
                if (fileId === null || fileId === undefined) {
                    throw new Error('Required parameter fileId was null or undefined when calling downloadFile.');
                }
                var httpRequestParams = {
                    method: 'GET',
                    url: localVarPath,
                    headers: headerParams,
                    responseType: 'blob'
                };
                if (extraHttpRequestParams) {
                    httpRequestParams = this.extendObj(httpRequestParams, extraHttpRequestParams);
                }
                return this.$http(httpRequestParams);
            };
            /**
             * Generates a client library
             * Accepts a &#x60;GeneratorInput&#x60; options map for spec location and generation options
             * @param language The target language for the client library
             * @param body Configuration for building the client library
             */
            CodegenApi.prototype.generateClient = function (language, body, extraHttpRequestParams) {
                var localVarPath = this.basePath + '/gen/clients/{language}'
                    .replace('{' + 'language' + '}', String(language));

                var queryParameters = {};
                var headerParams = this.extendObj({}, this.defaultHeaders);
                // verify required parameter 'language' is not null or undefined
                if (language === null || language === undefined) {
                    throw new Error('Required parameter language was null or undefined when calling generateClient.');
                }
                // verify required parameter 'body' is not null or undefined
                if (body === null || body === undefined) {
                    throw new Error('Required parameter body was null or undefined when calling generateClient.');
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
             * Returns options for a client library
             *
             * @param language The target language for the client library
             */
            CodegenApi.prototype.getClientOptions = function (language, extraHttpRequestParams) {
                var localVarPath = this.basePath + '/gen/clients/{language}'
                    .replace('{' + 'language' + '}', String(language));
                var queryParameters = {};
                var headerParams = this.extendObj({}, this.defaultHeaders);
                // verify required parameter 'language' is not null or undefined
                if (language === null || language === undefined) {
                    throw new Error('Required parameter language was null or undefined when calling getClientOptions.');
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
            CodegenApi.$inject = ['$http', '$httpParamSerializer', 'basePath'];
            return CodegenApi;
        })();
        Client.CodegenApi = CodegenApi;
    })(Client = CodegenAPI.Client || (CodegenAPI.Client = {}));
})(CodegenAPI || (CodegenAPI = {}));
