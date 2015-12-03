// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApplicationsCtrl', ApplicationsCtrl);

  ApplicationsCtrl.$inject = ['$routeParams', '$rootScope', '$scope', '$q', '$location', 'APIService', 'AlertService'];

  function ApplicationsCtrl($routeParams, $rootScope, $scope, $q, $location, APIService, AlertService) {
    var vm = this;

    vm.addApplication = addApplication;
    vm.updateApplication = updateApplication;
    vm.removeApplication = removeApplication;
    vm.detailsApplication = detailsApplication;
    vm.detailsApplicationGenerateToken = detailsApplicationGenerateToken;
    vm.addApplicationUpdate = addApplicationUpdate;
    vm.addApplicationDetails = addApplicationDetails;
    vm.resetAddApplicationForm = resetAddApplicationForm;
    vm.resetUpdateApplicationForm = resetUpdateApplicationForm;
    vm.resetDetailsApplicationForm = resetDetailsApplicationForm;
    vm.copySuccess = copySuccess;

    (function init() {
      vm.form = {};
      vm.form.application = {};

      vm.subscriptionsRetrieved = false;

      getAllApplications()
        .then(function() {

          // Need to check subscriptions in order to be able to generate a new key
          APIService.call('subscriptionsGet', [])
            .then(subscriptionsGetResponse)
            .catch(function() {
              vm.subscriptionsRetrieved = true;
              AlertService.error('Problem att hämta lista med prenumerationer. Det kommer tyvärr inte gå att skapa någon ny access token för någon applikation så länge problemet kvarstår');
            });

          if ($routeParams.applicationId) {
            // If an application has been specified, open its details
            addApplicationDetails(parseInt($routeParams.applicationId));
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

      if (vm.subscriptionsRetrieved) {
        vm.notAllowedToGenerateToken = false;
        for (var j = 0; j < vm.subscriptions.length; j++) {
          if (vm.subscriptions[j].application.id === applicationId && vm.subscriptions[j].api.status.toUpperCase() === 'DEPRECATED') {
            vm.notAllowedToGenerateToken = true;
            break;
          }
        }
      }

      for (var i = 0; i < vm.applications.length; i++) {
        if (vm.applications[i].id === applicationId) {
          vm.form.application.details = angular.copy(vm.applications[i]);

          vm.form.application.details.generateToken = {};
          vm.form.application.details.generateToken.validityTime = 3600;
          vm.form.application.details.validityTime = 3600;

          vm.curl = {};
          vm.curl.client = 'curl -k -d "grant_type=client_credentials" -H "Authorization: Basic ' +
            btoa(vm.applications[i].consumerKey +
              ':' + vm.applications[i].consumerSecret) +
            ', Content-Type: application/x-www-form-urlencoded" https://api.vasttrafik.se:443/token';
          vm.curl.password = 'curl -k -d "grant_type=password&username=<USER>&password=<PASSWORD>" -H "Authorization: Basic ' +
            btoa(vm.applications[i].consumerKey +
              ':' + vm.applications[i].consumerSecret) +
            ', Content-Type: application/x-www-form-urlencoded" https://api.vasttrafik.se:443/token';

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
          throttlingTier: 'Unlimited'
        }, 'application/json;charset=utf-8'])
        .then(applicationsPostResponse)
        .catch(function(response) {
          AlertService.error('Problem att skapa applikationen');
          vm.dataLoadingAddApplication = false;
        });

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

          if (vm.form.application.update != null && vm.form.application.update.id === applicationId) {
            resetUpdateApplicationForm();
          }
          if (vm.form.application.details != null && vm.form.application.details.id === applicationId) {
            resetDetailsApplicationForm();
          }

          vm.applications.splice(i, 1);

        } else {
          AlertService.error('Problem att ta bort applikationen');
        }
      }

    }

    function detailsApplication(applicationId) {

      APIService.call('applicationsApplicationIdTokensPost', [vm.form.application.details, vm.form.application.details.validityTime, applicationId, 'application/json'])
        .then(applicationsApplicationIdTokensPostResponse);

      function applicationsApplicationIdTokensPostResponse(response) {
        if (response.status === 200 || response.status === 201) {

          AlertService.success('Ny access token genererad!');
          for (var i = 0; i < vm.applications.length; i++) {
            if (vm.applications[i].id === applicationId) {
              vm.applications[i] = response.data;
            }
          }
          vm.form.application.details = response.data;
          $scope.detailsApplicationForm.$setPristine();

        } else {
          AlertService.error('Problem att generera ny access token');
        }
      }
    }

    function detailsApplicationGenerateToken(applicationId) {

      APIService.call('applicationsApplicationIdTokensPost', [{}, vm.form.application.details.generateToken.validityTime, applicationId, 'application/json'])
        .then(applicationsApplicationIdTokensPostResponse);

      function applicationsApplicationIdTokensPostResponse(response) {
        if (response.status === 200 || response.status === 201) {

          AlertService.success('Ny access token genererad!');
          for (var i = 0; i < vm.applications.length; i++) {
            if (vm.applications[i].id === applicationId) {
              vm.applications[i] = response.data;
              vm.addApplicationDetails(applicationId);
              break;
            }
          }

        } else {
          AlertService.error('Problem att generera ny access token');
        }
      }
    }

    function subscriptionsGetResponse(response) {
      vm.subscriptionsRetrieved = true;
      if (response.status === 200) {
        vm.subscriptions = response.data.list;
      } else {
        AlertService.error('Problem att hämta lista med prenumerationer. Det kommer tyvärr inte gå att skapa någon ny access token för någon applikation så länge problemet kvarstår');
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
