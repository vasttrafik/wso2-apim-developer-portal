/// <reference path="api.d.ts" />
var API;
(function (API) {
    (function (Client) {
        'use strict';

        var Application = (function () {
            function Application() {
            }
            return Application;
        })();
        Client.Application = Application;
    })(API.Client || (API.Client = {}));
    var Client = API.Client;
})(API || (API = {}));
