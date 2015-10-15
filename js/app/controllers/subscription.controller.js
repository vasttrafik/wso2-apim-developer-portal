(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('SubscriptionCtrl', SubscriptionCtrl);

  SubscriptionCtrl.$inject = ['$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function SubscriptionCtrl($http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;

  }

})();
