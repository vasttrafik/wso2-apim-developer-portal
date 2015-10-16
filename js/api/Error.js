/// <reference path="api.d.ts" />
var API;
(function (API) {
    (function (Client) {
        'use strict';

        var Error = (function () {
            function Error() {
            }
            return Error;
        })();
        Client.Error = Error;
    })(API.Client || (API.Client = {}));
    var Client = API.Client;
})(API || (API = {}));
