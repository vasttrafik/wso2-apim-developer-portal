(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('SwaggerCtrl', SwaggerCtrl);

  SwaggerCtrl.$inject = ['$rootScope', '$http', 'AlertService'];

  function SwaggerCtrl($rootScope, $http, AlertService) {
    var vm = this;

    // In order to conform to githubs Access-Control-Allow-Headers options
    var headers = $http.defaults.headers;
    delete headers.common['Authorization'];
    vm.swaggerUrl = 'https://raw.githubusercontent.com/vasttrafik/wso2-apim-developer-portal-api/master/swagger/portal-api.json';

  }

})();
