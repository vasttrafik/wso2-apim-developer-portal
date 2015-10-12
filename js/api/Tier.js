/// <reference path="api.d.ts" />
var API;
(function (API) {
    (function (Client) {
        'use strict';

        var Tier = (function () {
            function Tier() {
            }
            return Tier;
        })();
        Client.Tier = Tier;
    })(API.Client || (API.Client = {}));
    var Client = API.Client;
})(API || (API = {}));
