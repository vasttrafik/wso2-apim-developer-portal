/// <reference path="api.d.ts" />
var API;
(function (API) {
    (function (Client) {
        'use strict';

        var Subscription = (function () {
            function Subscription() {
            }
            return Subscription;
        })();
        Client.Subscription = Subscription;
    })(API.Client || (API.Client = {}));
    var Client = API.Client;
})(API || (API = {}));
