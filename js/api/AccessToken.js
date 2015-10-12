/// <reference path="api.d.ts" />
var API;
(function (API) {
    (function (Client) {
        'use strict';

        var AccessToken = (function () {
            function AccessToken() {
            }
            return AccessToken;
        })();
        Client.AccessToken = AccessToken;
    })(API.Client || (API.Client = {}));
    var Client = API.Client;
})(API || (API = {}));
