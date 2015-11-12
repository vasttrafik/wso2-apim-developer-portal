// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApplicationsCtrl', ApplicationsCtrl);

  ApplicationsCtrl.$inject = ['$routeParams', '$scope', '$q', '$location', 'APIService', 'AlertService'];

  function ApplicationsCtrl($routeParams, $scope, $q, $location, APIService, AlertService) {
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
    vm.copySuccess = copySuccess;

    (function init() {
      vm.form = {};
      vm.form.application = {};

      getAllApplications()
        .then(function() {
          if ($routeParams.applicationId) {
            // If an application has been specified, open its details
            addApplicationDetails($routeParams.applicationId);
            // Clean up url
            $location.update_path('/applications'); // jshint ignore:line
          }
        });
    })();

    function getAllApplications() {
      var deferred = $q.defer();

      APIService.call('applicationsGet', [100, 0, null, 'application/json'])
        .then(applicationsGetResponse);

      function applicationsGetResponse(response) {
        if (response.status === 200) {
          vm.applications = response.data.list;
          deferred.resolve();
        } else {
          AlertService.error('Problem att hämta lista med applikationer');
          deferred.reject();
        }
      }

      return deferred.promise;
    }

    function addApplicationUpdate(applicationId) {
      for (var i = 0; i < vm.applications.length; i++) {
        if (vm.applications[i].id === applicationId) {
          vm.form.application.update = angular.copy(vm.applications[i]);
          break;
        }
      }

    }

    function addApplicationDetails(applicationId) {
      for (var i = 0; i < vm.applications.length; i++) {
        if (vm.applications[i].id === applicationId) {
          vm.form.application.details = angular.copy(vm.applications[i]);
          vm.curl = {};
          vm.curl.client = 'curl -k -d "grant_type=client_credentials" -H "Authorization: Basic ' +
            btoa(vm.applications[i].consumerKey +
              ':' + vm.applications[i].consumerSecret) +
            ', Content-Type: application/x-www-form-urlencoded" https://wso2api.vasttrafik.se:443/token';
          vm.curl.password = 'curl -k -d "grant_type=password&username=<USER>&password=<PASSWORD>" -H "Authorization: Basic ' +
            btoa(vm.applications[i].consumerKey +
              ':' + vm.applications[i].consumerSecret) +
            ', Content-Type: application/x-www-form-urlencoded" https://wso2api.vasttrafik.se:443/token';

          resetUpdateApplicationForm();
          break;
        }
      }
    }

    function addApplication() {

      vm.dataLoadingAddApplication = true;

      APIService.call('applicationsPost', [{
          name: vm.form.application.add.name,
          description: vm.form.application.add.description,
          callbackUrl: vm.form.application.add.callbackUrl,
          throttlingTier: 'Unlimited'
        }, 'application/json'])
        .then(applicationsPostResponse);

      function applicationsPostResponse(response) {
        if (response.status === 201) {
          vm.applications.push(response.data);

          AlertService.success('Applikationen ' + vm.form.application.add.name + ' skapad!');

          resetAddApplicationForm();

        } else {
          AlertService.error('Problem att skapa ny applikation');
        }
        vm.dataLoadingAddApplication = false;
      }
    }

    function updateApplication() {

      vm.dataLoadingUpdateApplication = true;

      APIService.call('applicationsApplicationIdPut', [{
          name: vm.form.application.update.name,
          description: vm.form.application.update.description,
          callbackUrl: vm.form.application.update.callbackUrl,
          tier: 'Unlimited'
        }, vm.form.application.update.id, 'application/json'])
        .then(applicationsApplicationIdPutResponse);

      function applicationsApplicationIdPutResponse(response) {
        if (response.status === 200) {

          AlertService.success('Applikationen ' + vm.form.application.update.name + ' uppdaterad!');

          // Simply in order to mock update
          //TODO: Remove this handling
          for (var i = 0; i < vm.applications.length; i++) {
            if (vm.applications[i].id === vm.form.application.update.id) {
              vm.applications[i] = response.data;
              break;
            }
          }

          resetUpdateApplicationForm();
          resetDetailsApplicationForm();

        } else {
          AlertService.error('Problem att uppdatera applikationen');
        }
        vm.dataLoadingUpdateApplication = false;
      }
    }

    function removeApplication(applicationId) {

      var i = 0;
      for (i; i < vm.applications.length; i++) {
        if (vm.applications[i].id === applicationId) {
          if (confirm('Är du säker på att du vill ta bort applikation ' + vm.applications[i].name + '? Betänk att även relaterade prenumerationer för applikationen kommer tas bort') === true) {
            APIService.call('applicationsApplicationIdDelete', [vm.applications[i].id])
              .then(applicationsApplicationIdDeleteResponse);
            break;
          }
        }
      }

      function applicationsApplicationIdDeleteResponse(response) {
        if (response.status === 200) {

          AlertService.success('Applikationen ' + vm.applications[i].name + ' borttagen!');

          if (vm.form.application.update != null && vm.form.application.update.id === applicationId) { // jshint ignore:line
            resetUpdateApplicationForm();
          }
          if (vm.form.application.details != null && vm.form.application.details.id === applicationId) { // jshint ignore:line
            resetDetailsApplicationForm();
          }
          getAllApplications(); // To ensure consistency

          // Simply in order to mock update
          //TODO: Remove this handling
          //vm.applications.splice(i, 1);

        } else {
          AlertService.error('Problem att ta bort applikationen');
        }
      }

    }

    function detailsApplication(applicationId) {

      APIService.call('applicationsApplicationIdTokensPost', [vm.form.application.details.validityTime, applicationId, 'application/json'])
        .then(applicationsApplicationIdTokensPostResponse);

      function applicationsApplicationIdTokensPostResponse(response) {
        if (response.status === 200) {

          AlertService.success('Ny nyckel genererad!');
          for (var i = 0; i < vm.applications.length; i++) {
            if (vm.applications[i].id === applicationId) {
              vm.applications[i] = response.data;
            }
          }
          vm.form.application.details = response.data;
          $scope.detailsApplicationForm.$setPristine();

        } else {
          AlertService.error('Problem att uppdatera applikationen');
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

    function resetDetailsApplicationForm() {
      vm.form.application.details = null;
      $scope.detailsApplicationForm.$setPristine();
    }

    function copySuccess(leadingText) {
      AlertService.success(leadingText + ' kopierad till urklipp');
      $scope.$apply();
    }

  }

})();
