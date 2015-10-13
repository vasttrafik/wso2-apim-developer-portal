/// <reference path="api.d.ts" />
var API;
(function (API) {
    (function (Client) {
        'use strict';

        var User = (function () {
            function User() {
            }
            return User;
        })();
        Client.User = User;
    })(API.Client || (API.Client = {}));
    var Client = API.Client;
})(API || (API = {}));
