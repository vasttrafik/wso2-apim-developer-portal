/// <reference path="api.d.ts" />
var API;
(function (API) {
    (function (Client) {
        'use strict';

        var Claim = (function () {
            function Claim() {
            }
            return Claim;
        })();
        Client.Claim = Claim;
    })(API.Client || (API.Client = {}));
    var Client = API.Client;
})(API || (API = {}));
