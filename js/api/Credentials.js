/// <reference path="api.d.ts" />
var API;
(function (API) {
    (function (Client) {
        'use strict';

        var Credentials = (function () {
            function Credentials() {
            }
            return Credentials;
        })();
        Client.Credentials = Credentials;
    })(API.Client || (API.Client = {}));
    var Client = API.Client;
})(API || (API = {}));
