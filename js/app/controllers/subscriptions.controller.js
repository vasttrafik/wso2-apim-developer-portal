(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('SubscriptionsCtrl', SubscriptionsCtrl);

  SubscriptionsCtrl.$inject = ['$scope', '$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function SubscriptionsCtrl($scope, $http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;

    vm.addSubscription = addSubscription;
    vm.addSubscriptionUpdate = addSubscriptionUpdate;
    vm.updateSubscription = updateSubscription;
    vm.removeSubscription = removeSubscription;
    vm.resetAddSubscriptionForm = resetAddSubscriptionForm;
    vm.resetUpdateSubscriptionForm = resetUpdateSubscriptionForm;

    vm.form = {};
    vm.form.subscription = {};

    APIService.call('subscriptionsGet', [0.0, 0.0])
      .then(subscriptionsGetResponse);

    function subscriptionsGetResponse(response) {
      if (response.status === 200) {
        vm.subscriptions = response.data.list;
      } else {
        AlertService.error("Problem retrieving subscription list");
      }
    }

    APIService.call('applicationsGet', [0.0, 0.0])
      .then(applicationsGetResponse);

    function applicationsGetResponse(response) {
      if (response.status === 200) {
        vm.applications = response.data.list;
      } else {
        AlertService.error("Problem retrieving application list");
      }
    }

    APIService.call('apisGet', [0.0, 0.0])
      .then(aPIsGetResponse);

    function aPIsGetResponse(response) {
      if (response.status === 200) {
        vm.apis = response.data.list;
      } else {
        AlertService.error("Problem retrieving apis list");
      }
    }

    function addSubscriptionUpdate(subscriptionNumber) {

      vm.form.subscription.update = {};

      vm.form.subscription.update.subscriptionId = vm.subscriptions[subscriptionNumber].subscriptionId;
      vm.form.subscription.update.api = vm.subscriptions[subscriptionNumber].api.name + "/" + vm.subscriptions[subscriptionNumber].api.version + "/" + vm.subscriptions[subscriptionNumber].api.provider;
      vm.form.subscription.update.application = vm.subscriptions[subscriptionNumber].application.applicationId;
      vm.form.subscription.update.subscriptionNumber = subscriptionNumber;
    }

    function addSubscription() {

      var apiDef = vm.form.subscription.add.api.split("/");

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

          AlertService.success("Prenumerationen skapad!");

          resetAddSubscriptionForm();

        } else {
          AlertService.error("Problem att skapa ny prenumeration");
        }
      }

    }

    function updateSubscription() {

      var apiDef = vm.form.subscription.update.api.split("/");

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

          AlertService.success("Prenumerationen uppdaterad!");

          //getAllApplications(); // To ensure consistency

          // Simply in order to mock update
          //TODO: Remove this handling
          vm.subscriptions[vm.form.subscription.update.subscriptionNumber] = response.data;
          resetUpdateSubscriptionForm();

        } else {
          AlertService.error("Problem att uppdatera prenumerationen");
        }
      }
    }

    function removeSubscription(subscriptionNumber) {

      if (confirm("Är du säker på att du vill ta bort prenumerationen mellan applikation " + vm.subscriptions[subscriptionNumber].application.name + " och API " + vm.subscriptions[subscriptionNumber].api.name + " " + vm.subscriptions[subscriptionNumber].api.version) === true) {
        APIService.call('subscriptionsSubscriptionIdDelete', [vm.subscriptions[subscriptionNumber].subscriptionId])
          .then(subscriptionsSubscriptionIdDeleteResponse);

      }

      function subscriptionsSubscriptionIdDeleteResponse(response) {
        if (response.status === 200) {

          AlertService.success("Prenumerationen mellan applikation " + vm.subscriptions[subscriptionNumber].application.name + " och API " + vm.subscriptions[subscriptionNumber].api.name + " " + vm.subscriptions[subscriptionNumber].api.version + " borttagen!");

          //getAllApplications(); // To ensure consistency

          // Simply in order to mock update
          //TODO: Remove this handling
          vm.subscriptions.splice(subscriptionNumber, 1);

        } else {
          AlertService.error("Problem att ta bort prenumerationen");
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
