/// <reference path="api.d.ts" />
var API;
(function (API) {
    (function (Client) {
        'use strict';

        var AuthenticatedUser = (function () {
            function AuthenticatedUser() {
            }
            return AuthenticatedUser;
        })();
        Client.AuthenticatedUser = AuthenticatedUser;
    })(API.Client || (API.Client = {}));
    var Client = API.Client;
})(API || (API = {}));
