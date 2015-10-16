/// <reference path="api.d.ts" />
var API;
(function (API) {
    (function (Client) {
        'use strict';

        var Document = (function () {
            function Document() {
            }
            return Document;
        })();
        Client.Document = Document;
    })(API.Client || (API.Client = {}));
    var Client = API.Client;
})(API || (API = {}));
