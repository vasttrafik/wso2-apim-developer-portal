/*global defaultBaseUrl*/
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('ApiCtrl', ApiCtrl)
    .constant('defaultBaseUrl', defaultBaseUrl);

  ApiCtrl.$inject = ['$window', '$http', '$httpParamSerializer', '$rootScope', '$scope', '$location', '$routeParams', '$timeout', 'APIService', 'AlertService'];

  function ApiCtrl($window, $http, $httpParamSerializer, $rootScope, $scope, $location, $routeParams, $timeout, APIService, AlertService) {
    var vm = this;

    var codegenClient = new CodegenAPI.Client.CodegenApi($http, $httpParamSerializer); // jshint ignore:line

    vm.addSubscription = addSubscription;
    vm.resetAddSubscriptionForm = resetAddSubscriptionForm;
    vm.downloadClient = downloadClient;
    vm.getClientOptionsCeilingNumber = getClientOptionsCeilingNumber;

    (function init() {

      vm.defaultBaseUrl = defaultBaseUrl;
      vm.documents = {};
      vm.applications = {};

      if ($routeParams.direct) {
        // Check if we're coming to this page directly or from api list.
        vm.direct = true;
        // Clean up url
        $location.update_path('/api/' + $routeParams.apiName + '/' + $routeParams.apiVersion + '/' + $routeParams.apiProvider); // jshint ignore:line
      }

      // To make loading of this data faster
      vm.apiName = $routeParams.apiName;
      vm.apiVersion = $routeParams.apiVersion;
      vm.apiProvider = $routeParams.apiProvider;
      vm.apiIdSingle = $routeParams.apiName + '--' + $routeParams.apiVersion + '_' + $routeParams.apiProvider;

      vm.applicationsSubscribing = [];

      codegenClient.clientOptions()
        .then(function(clientOptionsResponse) {
          vm.clientOptions = [];
          angular.forEach(clientOptionsResponse.data, function(value) {
            vm.clientOptions.push({
              type: value,
              text: value.replace('csharp', 'C#')
                .replace('CsharpDotNet2', 'C# .Net 2.0')
                .replace('qt5cpp', 'Qt 5 C++')
                .replace('objc', 'Objective-C')
                .replace(new RegExp('-', 'g'), ' ')
                .replace(/\w\S*/g, function(txt) {
                  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                })
            });
          });
        });

      $scope.$on('cfpLoadingBar:completed', function(event, data) {
        if (vm.accessToken != null) {
          $rootScope.user.accessToken = vm.accessToken;
        }
      });

      APIService.call('apisApiIdGet', [vm.apiIdSingle])
        .then(aPIsIdGetResponse)
        .then(getDocumentsForApi);

      if ($rootScope.user.loggedIn) {
        APIService.call('applicationsGet', [100, 0])
          .then(applicationsGetResponse);

        // Event fired when all $http loads completed
        $scope.$on('cfpLoadingBar:completed', function(event, data) {
          $timeout(function() {
            // Adding accessToken to API Console if there's a subscribing application with a key
            if (vm.accessToken != null) {
              $rootScope.user.accessToken = vm.accessToken;
            }
          }, 100);
        });
      }

    })();

    function getClientOptionsCeilingNumber() {
      return $window.Math.ceil(vm.clientOptions.length / 3);
    }

    function applicationsGetResponse(response) {

      if (response.status === 200) {
        vm.applications = response.data.list.filter(function(a) {
          for (var i = 0; i < a.subscriptions.length; i++) {
            if (a.subscriptions[i].api.name === vm.apiName && a.subscriptions[i].api.version === vm.apiVersion && a.subscriptions[i].api.provider === vm.apiProvider) {
              vm.applicationsSubscribing.push(a);

              // Adding accessToken to API Console if there's a subscribing application with a key
              if (vm.accessToken == null) {
                vm.accessToken = (a.accessToken != null ? a.accessToken : null);
              }

              return false;
            }
          }
          return true;
        });
      } else {
        AlertService.error('Problem att hämta lista med applikationer');
      }
    }

    function getDocumentsForApi() {
      APIService.call('apisApiIdDocumentsGet', [100, 0, vm.apiIdSingle])
        .then(apisApiIdDocumentsGetResponse);
    }

    function aPIsIdGetResponse(response) {
      if (response.status === 200) {
        vm.api = response.data;
        vm.imageUrl = vm.defaultBaseUrl + '/' + response.data.imageUrl;

        var config = {
          responseType: 'blob'
        };
        $http.get(vm.imageUrl, config)
          .then(function(response) {
            vm.imageSrc = URL.createObjectURL(response.data);
          });

        vm.apiId = vm.api.name + '/' + vm.api.version + '/' + vm.api.provider;
        vm.swaggerUrl = vm.defaultBaseUrl + '/' + response.data.swagger;
        vm.useAccessToken = response.data.status !== 'DEPRECATED';

      } else {
        AlertService.error('Problem att hämta detaljer för API');
      }
    }

    function apisApiIdDocumentsGetResponse(docResponse) {
      if (docResponse.status === 200) {
        vm.documents = docResponse.data.list;
      } else {
        AlertService.error('Problem att hämta lista med dokument för API');
      }
    }

    function addSubscription() {
      vm.dataLoadingAddSubscription = true;

      var apiDef = vm.apiId.split('/');

      APIService.call('subscriptionsPost', [{
          application: {
            id: vm.selectedApplicationId
          },
          api: {
            name: apiDef[0],
            version: apiDef[1],
            provider: apiDef[2]
          }
        }, 'application/json'])
        .then(subscriptionsPostResponse);

      function subscriptionsPostResponse(response) {
        if (response.status === 201) {
          AlertService.success('Prenumerationen skapad!');
          $location.path('/subscriptions');

        } else {
          AlertService.error('Problem att skapa ny prenumeration');
        }
        vm.dataLoadingAddSubscription = false;
      }
    }

    function resetAddSubscriptionForm() {
      vm.selectedApplicationId = null;
      $scope.addSubscriptionForm.$setPristine();
    }

    /* Downloads client stubb from generator.swagger.io*/
    function downloadClient(type) {
      codegenClient.generateClient(type, '{"swaggerUrl":"' + vm.swaggerUrl + '"}')
        .then(function(generateClientResponse) {
          codegenClient.downloadFile(generateClientResponse.data.code)
            .then(function(downloadFileResponse) {
              $window.saveAs(downloadFileResponse.data, type + '-client-generated.zip');
            });
        });
    }

  }

})();
