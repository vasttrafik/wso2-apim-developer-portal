(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApplicationsCtrl', ApplicationsCtrl);

  ApplicationsCtrl.$inject = ['$routeParams', '$scope', '$http', '$httpParamSerializer', '$q', '$location', 'APIService', 'AlertService'];

  function ApplicationsCtrl($routeParams, $scope, $http, $httpParamSerializer, $q, $location, APIService, AlertService) {
    var vm = this;

    vm.addApplication = addApplication;
    vm.updateApplication = updateApplication;
    vm.removeApplication = removeApplication;
    vm.detailsApplication = detailsApplication;
    vm.addApplicationUpdate = addApplicationUpdate;
    vm.addApplicationDetails = addApplicationDetails;
    vm.resetAddApplicationForm = resetAddApplicationForm;
    vm.resetUpdateApplicationForm = resetUpdateApplicationForm;
    vm.resetDetailsApplicationForm = resetDetailsApplicationForm;

    vm.form = {};
    vm.form.application = {};

    getAllApplications()
      .then(function() {

        if ($routeParams.applicationId) {
          for (var i = 0; i < vm.applications.length; i++) {
            if (vm.applications[i].applicationId === $routeParams.applicationId) {
              addApplicationDetails(i);
              break;
            }
          }
          // Clean up url
          $location.update_path('/applications');
        }

      });

    function getAllApplications() {
      var deferred = $q.defer();

      APIService.call('applicationsGet', [0.0, 0.0])
        .then(applicationsGetResponse);

      function applicationsGetResponse(response) {
        if (response.status === 200) {
          vm.applications = response.data.list;
          deferred.resolve();
        } else {
          AlertService.error("Problem retrieving application list");
          deferred.reject();
        }
      }

      return deferred.promise;
    }

    function addApplicationUpdate(applicationNumber) {
      vm.form.application.update = angular.copy(vm.applications[applicationNumber]);
      vm.form.application.update.applicationNumber = applicationNumber;
    }

    function addApplicationDetails(applicationNumber) {
      vm.form.application.details = angular.copy(vm.applications[applicationNumber]);
      vm.form.application.details.applicationNumber = applicationNumber;
    }


    function addApplication() {

      vm.dataLoadingAddApplication = true;

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
          vm.dataLoadingAddApplication = false;
      }
    }

    function updateApplication() {

      vm.dataLoadingUpdateApplication = true;

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
        vm.dataLoadingUpdateApplication = false;
      }
    }

    function removeApplication(applicationNumber) {

      if (confirm("Är du säker på att du vill ta bort applikation " + vm.applications[applicationNumber].name + "? Betänk att även relaterade prenumerationer för applikationen kommer tas bort") === true) {
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

    function detailsApplication() {

      APIService.call('applicationsApplicationIdTokensPost', [vm.form.application.details.validityTime, vm.form.application.details.applicationId])
        .then(applicationsApplicationIdTokensPostResponse);

      function applicationsApplicationIdTokensPostResponse(response) {
        if (response.status === 200) {

          AlertService.success("Ny nyckel genererad!");
          vm.form.application.details = response.data;
          $scope.detailsApplicationForm.$setPristine();

        } else {
          AlertService.error("Problem att uppdatera applikationen");
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
      vm.form.application.details = null;
      $scope.updateApplicationForm.$setPristine();

    }

    function resetDetailsApplicationForm() {
      vm.form.application.details = null;
      vm.form.application.update = null;
      $scope.detailsApplicationForm.$setPristine();
    }

  }

})();
