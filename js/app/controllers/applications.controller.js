(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApplicationsCtrl', ApplicationsCtrl);

  ApplicationsCtrl.$inject = ['$scope', '$http', '$httpParamSerializer', 'APIService', 'AlertService'];

  function ApplicationsCtrl($scope, $http, $httpParamSerializer, APIService, AlertService) {
    var vm = this;

    vm.addApplication = addApplication;
    vm.updateApplication = updateApplication;
    vm.removeApplication = removeApplication;
    vm.addApplicationUpdate = addApplicationUpdate;
    vm.resetAddApplicationForm = resetAddApplicationForm;
    vm.resetUpdateApplicationForm = resetUpdateApplicationForm;

    vm.form = {};
    vm.form.application = {};

    getAllApplications();

    function getAllApplications() {
      APIService.call('applicationsGet', [0.0, 0.0])
        .then(applicationsGetResponse);

      function applicationsGetResponse(response) {
        if (response.status === 200) {
          vm.applications = response.data.list;
        } else {
          AlertService.error("Problem retrieving application list");
        }
      }
    }

    function addApplicationUpdate(applicationNumber) {
      vm.form.application.update = angular.copy(vm.applications[applicationNumber]);
      vm.form.application.update.applicationNumber = applicationNumber;
    }


    function addApplication() {

      APIService.call('applicationsPost', [{
          name: vm.form.application.add.name,
          description: vm.form.application.add.description,
          callbackUrl: vm.form.application.add.callbackUrl
        }])
        .then(applicationsPostResponse);

      function applicationsPostResponse(response) {
        if (response.status === 200) {
          vm.applications.push(response.data);

          AlertService.success("Applikationen " + vm.form.application.add.name + " skapad!");

          resetAddApplicationForm();

        } else {
          AlertService.error("Problem att skapa ny applikation");
        }
      }
    }

    function updateApplication() {

      APIService.call('applicationsApplicationIdPut', [{
          name: vm.form.application.update.name,
          description: vm.form.application.update.description,
          callbackUrl: vm.form.application.update.callbackUrl
        }, vm.form.application.update.applicationId])
        .then(applicationsApplicationIdPutResponse);

      function applicationsApplicationIdPutResponse(response) {
        if (response.status === 200) {

          AlertService.success("Applikationen " + vm.form.application.update.name + " uppdaterad!");

          //getAllApplications(); // To ensure consistency

          // Simply in order to mock update
          //TODO: Remove this handling
          vm.applications[vm.form.application.update.applicationNumber] = response.data;
          resetUpdateApplicationForm();

        } else {
          AlertService.error("Problem att uppdatera applikationen");
        }
      }
    }

    function removeApplication(applicationNumber) {

      if (confirm("Är du säker på att du vill ta bort applikation " + vm.applications[applicationNumber].name +  "? Betänk att även relaterade prenumerationer för applikationen kommer tas bort") === true) {
        APIService.call('applicationsApplicationIdDelete', [vm.applications[applicationNumber].applicationId])
          .then(applicationsApplicationIdDeleteResponse);

      }

      function applicationsApplicationIdDeleteResponse(response) {
        if (response.status === 200) {

          AlertService.success("Applikationen " + vm.applications[applicationNumber].name + " borttagen!");

          //getAllApplications(); // To ensure consistency

          // Simply in order to mock update
          //TODO: Remove this handling
          vm.applications.splice(applicationNumber, 1);

        } else {
          AlertService.error("Problem att ta bort applikationen");
        }
      }

    }

    function resetAddApplicationForm() {

      vm.form.application.add.name = '';
      vm.form.application.add.callbackUrl = '';
      vm.form.application.add.description = '';

      $scope.addApplicationForm.$setPristine();

    }

    function resetUpdateApplicationForm() {

      vm.form.application.update = null;
      $scope.updateApplicationForm.$setPristine();

    }

  }

})();
