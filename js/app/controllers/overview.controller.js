/*global helper*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('OverviewCtrl', OverviewCtrl);

  OverviewCtrl.$inject = ['$http', 'APIService', 'AlertService', 'CommunityService'];

  function OverviewCtrl($http, APIService, AlertService, CommunityService) {
    var vm = this;

    vm.communityService = CommunityService;

    (function init() {
      APIService.call('applicationsGet', [100, 0, null, 'application/json'])
        .then(applicationsGetResponse);

      APIService.call('subscriptionsGet', [])
        .then(subscriptionsGetResponse);

    })();

    function subscriptionsGetResponse(response) {
      if (response.status === 200) {
        vm.subscriptions = response.data.list;
      } else {
        AlertService.error('Problem att hämta lista med prenumerationer');
      }
    }

    function applicationsGetResponse(response) {
      if (response.status === 200) {
        vm.applications = response.data.list;
      } else {
        AlertService.error('Problem att hämta lista med applikationer');
      }
    }

  }

})();
