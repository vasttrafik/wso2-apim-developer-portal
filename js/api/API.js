/// <reference path="api.d.ts" />
var API;
(function (_API) {
    (function (Client) {
        'use strict';

        var API = (function () {
            function API() {
            }
            return API;
        })();
        Client.API = API;

        (function (API) {
            (function (VisibilityEnum) {
                VisibilityEnum[VisibilityEnum["public"] = 'public'] = "public";
                VisibilityEnum[VisibilityEnum["private"] = 'private'] = "private";
            })(API.VisibilityEnum || (API.VisibilityEnum = {}));
            var VisibilityEnum = API.VisibilityEnum;
        })(Client.API || (Client.API = {}));
        var API = Client.API;
    })(_API.Client || (_API.Client = {}));
    var Client = _API.Client;
})(API || (API = {}));
