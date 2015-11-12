(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('SubscriptionsCtrl', SubscriptionsCtrl);

  SubscriptionsCtrl.$inject = ['$scope', '$http', 'APIService', 'AlertService'];

  function SubscriptionsCtrl($scope, $http, APIService, AlertService) {
    var vm = this;

    vm.addSubscription = addSubscription;
    vm.addSubscriptionUpdate = addSubscriptionUpdate;
    vm.updateSubscription = updateSubscription;
    vm.removeSubscription = removeSubscription;
    vm.resetAddSubscriptionForm = resetAddSubscriptionForm;
    vm.resetUpdateSubscriptionForm = resetUpdateSubscriptionForm;

    (function init() {
      vm.form = {};
      vm.form.subscription = {};

      APIService.call('subscriptionsGet', [])
        .then(subscriptionsGetResponse);

      APIService.call('applicationsGet', [100, 0, null, 'application/json'])
        .then(applicationsGetResponse);

      APIService.call('apisGet', [100, 0, null, 'application/json'])
        .then(aPIsGetResponse);
    })();

    function subscriptionsGetResponse(response) {
      console.log(response.status);
      if (response.status === 200) {
        vm.subscriptions = response.data.list;
      } else {
        AlertService.error('Problem att hämta listan över prenumerationer');
      }
    }

    function applicationsGetResponse(response) {
      if (response.status === 200) {
        vm.applications = response.data.list;
      } else {
        AlertService.error('Problem att hämta listan över applikationer');
      }
    }

    function aPIsGetResponse(response) {
      if (response.status === 200) {
        vm.apis = response.data.list;
      } else {
        AlertService.error('Problem att hämta listan över APIer');
      }
    }

    function addSubscriptionUpdate(subscriptionId) {

      vm.form.subscription.update = {};

      for (var i = 0; i < vm.subscriptions.length; i++) {
        if (vm.subscriptions[i].subscriptionId === subscriptionId) {
          vm.form.subscription.update.subscriptionId = vm.subscriptions[i].subscriptionId;
          vm.form.subscription.update.api = vm.subscriptions[i].api.name + '/' + vm.subscriptions[i].api.version + '/' + vm.subscriptions[i].api.provider;
          vm.form.subscription.update.application = vm.subscriptions[i].application.applicationId;
          break;
        }
      }

    }

    function addSubscription() {

      vm.dataLoadingAddSubscription = true;

      var apiDef = vm.form.subscription.add.api.split('/');

      APIService.call('subscriptionsPost', [{
          application: {
            applicationId: vm.form.subscription.add.application
          },
          api: {
            name: apiDef[0],
            version: apiDef[1],
            provider: apiDef[2]
          }
        }])
        .then(subscriptionsPostResponse);

      function subscriptionsPostResponse(response) {
        if (response.status === 200) {
          vm.subscriptions.push(response.data);

          AlertService.success('Prenumerationen skapad!');

          resetAddSubscriptionForm();

        } else {
          AlertService.error('Problem att skapa ny prenumeration');
        }
        vm.dataLoadingAddSubscription = false;
      }
    }

    function updateSubscription() {

      vm.dataLoadingUpdateSubscription = true;

      var apiDef = vm.form.subscription.update.api.split('/');

      APIService.call('subscriptionsSubscriptionIdPut', [{
          application: {
            applicationId: vm.form.subscription.update.application
          },
          api: {
            name: apiDef[0],
            version: apiDef[1],
            provider: apiDef[2]
          }
        }, vm.form.subscription.update.subscriptionId])
        .then(subscriptionsSubscriptionIdPutResponse);

      function subscriptionsSubscriptionIdPutResponse(response) {
        if (response.status === 200) {

          AlertService.success('Prenumerationen uppdaterad!');

          //getAllApplications(); // To ensure consistency

          // Simply in order to mock update
          //TODO: Remove this handling
          for (var i = 0; i < vm.subscriptions.length; i++) {
            if (vm.subscriptions[i].subscriptionId === vm.form.subscription.update.subscriptionId) {
              vm.subscriptions[i] = response.data;
              break;
            }
          }

          resetUpdateSubscriptionForm();

        } else {
          AlertService.error('Problem att uppdatera prenumerationen');
        }
        vm.dataLoadingUpdateSubscription = false;
      }
    }

    function removeSubscription(subscriptionId) {

      var i = 0;
      for (i; i < vm.subscriptions.length; i++) {
        if (vm.subscriptions[i].subscriptionId === subscriptionId) {
          if (confirm('Är du säker på att du vill ta bort prenumerationen mellan applikation ' +
              vm.subscriptions[i].application.name + ' och API ' + vm.subscriptions[i].api.name + ' ' + vm.subscriptions[i].api.version) === true) {
            APIService.call('subscriptionsSubscriptionIdDelete', [vm.subscriptions[i].subscriptionId])
              .then(subscriptionsSubscriptionIdDeleteResponse);
            break;
          }
        }
      }

      function subscriptionsSubscriptionIdDeleteResponse(response) {
        if (response.status === 200) {

          if (vm.form.subscription.update != null && vm.form.subscription.update.subscriptionId === subscriptionId) { // jshint ignore:line
            resetUpdateSubscriptionForm();
          }

          AlertService.success('Prenumerationen mellan applikation ' +
            vm.subscriptions[i].application.name + ' och API ' + vm.subscriptions[i].api.name + ' ' + vm.subscriptions[i].api.version + ' borttagen!');

          //getAllApplications(); // To ensure consistency

          // Simply in order to mock update
          //TODO: Remove this handling
          vm.subscriptions.splice(i, 1);

        } else {
          AlertService.error('Problem att ta bort prenumerationen');
        }
      }

    }

    function resetAddSubscriptionForm() {

      vm.form.subscription.add.api = null;
      vm.form.subscription.add.application = null;

      $scope.addSubscriptionForm.$setPristine();

    }

    function resetUpdateSubscriptionForm() {

      vm.form.subscription.update = null;

    }

  }

})();
