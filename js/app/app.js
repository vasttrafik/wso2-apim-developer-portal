/*
  Main Angular module and controller for vtPortal.
*/

(function() {
  'use strict';

  angular
    .module('vtPortal', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngPasswordStrength', 'ui.validate', 'angular-clipboard', 'ngLocationUpdate', 'swaggerUi', 'duScroll', 'angular-loading-bar', 'ngJSONPath', 'highcharts-ng', 'btford.markdown', 'ui.bootstrap', 'ui-iconpicker', 'angularUtils.directives.dirPagination','ja.qr'])
    .config(config)
    .factory('timeoutHttpIntercept', function($rootScope, $q) {
      return {
        'request': function(config) {
          config.timeout = 120000;
          return config;
        }
      };
    })
    .filter('camelize', function() {
      return function(input, all) {
        return input.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
          if (+match === 0) {
            return '';
          }
          return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
      };
    })
    .filter('relativeDate', function() {
      return function(input, all) {
        if (Date.create(input).isAfter(Date.now())) {
          return Date.create(Date.now()).relative();
        } else {
          return Date.create(input).relative();
        }
      };
    })
    .filter('hash', function() {
      return function(input, all) {
        return md5(input);
      };
    })
    .filter('removeMd', function() {
      return function(input, all) {

        return input
          // Remove HTML tags
          .replace(/<(.*?)>/g, '$1')
          // Remove setext-style headers
          .replace(/^[=\-]{2,}\s*$/g, '')
          // Remove footnotes?
          .replace(/\[\^.+?\](\: .*?$)?/g, '')
          .replace(/\s{0,2}\[.*?\]: .*?$/g, '')
          // Remove images
          .replace(/\!\[.*?\][\[\(].*?[\]\)]/g, '')
          // Remove inline links
          .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '$1')
          // Remove Blockquotes
          .replace(/>/g, '')
          // Remove reference-style links?
          .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
          // Remove atx-style headers
          .replace(/^\#{1,6}\s*([^#]*)\s*(\#{1,6})?/gm, '$1')
          .replace(/([\*_]{1,3})(\S.*?\S)\1/g, '$2')
          .replace(/(`{3,})(.*?)\1/gm, '$2')
          .replace(/^-{3,}\s*$/g, '')
          .replace(/`(.+?)`/g, '$1')
          .replace(/\n{2,}/g, '\n\n');
      };
    })
    .filter('cut', function() {
      return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
          var lastspace = value.lastIndexOf(' ');
          if (lastspace != -1) {
            //Also remove . and , so its gives a cleaner result.
            if (value.charAt(lastspace - 1) == '.' || value.charAt(lastspace - 1) == ',') {
              lastspace = lastspace - 1;
            }
            value = value.substr(0, lastspace);
          }
        }

        return value + (tail || ' …');
      };
    })
    .filter('trustAsHtml', function($sce) {
      return function(value) {
        return $sce.trustAsHtml(value);
      };
    })
    .run(run)
    .controller('MainCtrl', MainCtrl);

  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

  function config($routeProvider, $locationProvider, $httpProvider) {

    // To enforce timeout property on $http
    $httpProvider.interceptors.push('timeoutHttpIntercept');

    // To prevent pre-flight options request
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider

      .when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'js/app/views/home.view.html',
      controllerAs: 'vm'
    })

    .when('/contact:subject?', {
      controller: 'ContactCtrl',
      templateUrl: 'js/app/views/contact.view.html',
      controllerAs: 'vm'
    })

    .when('/guides/:guide', {
      controller: 'GuidesCtrl',
      templateUrl: 'js/app/views/guides.view.html',
      controllerAs: 'vm'
    })

    .when('/docs/:doc', {
      controller: 'DocsCtrl',
      templateUrl: 'js/app/views/docs.view.html',
      controllerAs: 'vm'
    })

    .when('/overview', {
      controller: 'OverviewCtrl',
      templateUrl: 'js/app/views/overview.view.html',
      controllerAs: 'vm'
    })

    .when('/overview/community/:type?', {
      controller: 'OverviewCommunityCtrl',
      templateUrl: 'js/app/views/overview.community.view.html',
      controllerAs: 'vm'
    })

    .when('/profile', {
      controller: 'ProfileCtrl',
      templateUrl: 'js/app/views/profile.view.html',
      controllerAs: 'vm'
    })

    .when('/applications/:applicationId?', {
      controller: 'ApplicationsCtrl',
      templateUrl: 'js/app/views/applications.view.html',
      controllerAs: 'vm'
    })

    .when('/subscriptions', {
      controller: 'SubscriptionsCtrl',
      templateUrl: 'js/app/views/subscriptions.view.html',
      controllerAs: 'vm'
    })

    .when('/apis', {
      controller: 'ApisCtrl',
      templateUrl: 'js/app/views/apis.view.html',
      controllerAs: 'vm'
    })

    .when('/activation', {
      controller: 'ActivationCtrl',
      templateUrl: 'js/app/views/activation.view.html',
      controllerAs: 'vm'
    })

    .when('/recover', {
      controller: 'RecoverCtrl',
      templateUrl: 'js/app/views/recover.view.html',
      controllerAs: 'vm'
    })

    .when('/community', {
      controller: 'CommunityCtrl',
      templateUrl: 'js/app/views/community.view.html',
      controllerAs: 'vm'
    })

    .when('/community/:label', {
      controller: 'CommunityLabelCtrl',
      templateUrl: 'js/app/views/community.label.view.html',
      controllerAs: 'vm'
    })

    .when('/community/category/:categoryId', {
      controller: 'CommunityCategoryCtrl',
      templateUrl: 'js/app/views/community.category.view.html',
      controllerAs: 'vm'
    })

    .when('/community/category/:categoryId/:label', {
      controller: 'CommunityLabelCtrl',
      templateUrl: 'js/app/views/community.label.view.html',
      controllerAs: 'vm'
    })

    .when('/community/forum/:forumId', {
      controller: 'CommunityForumCtrl',
      templateUrl: 'js/app/views/community.forum.view.html',
      controllerAs: 'vm'
    })

    .when('/community/forum/:forumId/:label', {
      controller: 'CommunityLabelCtrl',
      templateUrl: 'js/app/views/community.label.view.html',
      controllerAs: 'vm'
    })

    .when('/community/topic/:topicId', {
      controller: 'CommunityTopicCtrl',
      templateUrl: 'js/app/views/community.topic.view.html',
      controllerAs: 'vm'
    })

    .when('/api/:apiName/:apiVersion/:apiProvider/:direct?', {
      controller: 'ApiCtrl',
      templateUrl: 'js/app/views/api.view.html',
      controllerAs: 'vm'
    })

    .when('/statistics/apis', {
      controller: 'StatisticsApisCtrl',
      templateUrl: 'js/app/views/statistics.apis.view.html',
      controllerAs: 'vm'
    })

    .when('/statistics/applications/:applicationId?', {
      controller: 'StatisticsApplicationsCtrl',
      templateUrl: 'js/app/views/statistics.applications.view.html',
      controllerAs: 'vm'
    })

    .otherwise({
      redirectTo: '/'
    });

  }

  run.$inject = ['$rootScope', '$location', '$http', 'UserService', 'AuthenticationService', 'swaggerModules', 'swaggerUiExternalReferences', 'swagger1ToSwagger2Converter', 'swaggerUiXmlFormatter', 'swaggerAuthentication'];

  function run($rootScope, $location, $http, UserService, AuthenticationService, swaggerModules, swaggerUiExternalReferences, swagger1ToSwagger2Converter, swaggerUiXmlFormatter, swaggerAuthentication) {

    swaggerModules.add(swaggerModules.BEFORE_PARSE, swaggerUiExternalReferences);
    swaggerModules.add(swaggerModules.BEFORE_PARSE, swagger1ToSwagger2Converter);
    swaggerModules.add(swaggerModules.AFTER_EXPLORER_LOAD, swaggerUiXmlFormatter);
    swaggerModules.add(swaggerModules.BEFORE_EXPLORER_LOAD, swaggerAuthentication);

    $rootScope.user = {};
    $rootScope.user.create = false;
    $rootScope.user.totp = false;

    // keep user logged in after page refresh
    UserService.getUser()
      .then(function(user) {

        if (!$.isEmptyObject(user)) {
          $rootScope.user.loggedIn = true;
          UserService.setUser(user, (user.memberId ? true : false), user.communityPoints, user.gravatarEmailHash); // Since this also sets the user scope
          AuthenticationService.setLogoutTimer();

          $http.defaults.headers.common['X-JWT-Assertion'] = user.accessToken.token;
        } else {
          $rootScope.user.loggedIn = false;
        }
      });

    $rootScope.$on('$locationChangeStart', function(event, next, current) {

      // redirect to startpage if not logged in and trying to access a restricted page
      var restrictedPage = $.inArray($location.path().split('/')[1], ['', 'apis', 'api', 'guides', 'docs', 'news', 'activation', 'recover', 'contact', 'blog', 'calendar', 'community']) === -1;

      if ($location.path().split('/')[1] === 'statistics') {
        restrictedPage = $location.path().split('/')[2] !== 'apis';
      }

      if (restrictedPage && !$rootScope.user.loggedIn) {
        $location.path('/');
      }

    });

  }

  MainCtrl.$inject = ['$location', '$rootScope', '$scope', '$filter', 'AuthenticationService', 'AlertService', 'APIService', 'CommunityService'];

  function MainCtrl($location, $rootScope, $scope, $filter, AuthenticationService, AlertService, APIService, CommunityService) {
    var vm = this;

    vm.login = login;
    vm.logout = logout;
    vm.create = create;
    vm.toggleCreate = toggleCreate;
    vm.toggleTotp = toggleTotp;
    vm.togglePasswordRecovery = togglePasswordRecovery;
    vm.toggleUsernameRecovery = toggleUsernameRecovery;
    vm.clearAlertMessage = AlertService.clearAlertMessageAndDigest;
    vm.clearMenuAlertMessage = AlertService.clearMenuAlertMessageAndDigest;
    vm.isCommunityAdmin = CommunityService.isAdmin;
    vm.isMember = CommunityService.isMember;

    var logoutPromise;

    (function init() {
      APIService.userCall('claimsGet', ['http://wso2.org/claims', 'user'])
        .then(claimsGetResponse);

      function claimsGetResponse(response) {
        // Only include claims set to be displayed by default
        var claims = response.data.filter(function(a) {
          return a.supportedByDefault === 'true' && a.claimUri !== 'http://wso2.org/claims/challengeQuestion1' && a.claimUri !== 'http://wso2.org/claims/identity/accountLocked';
        });

        // Sort the claims in correct order.
        claims.sort(function(a, b) {
          return a.displayOrder - b.displayOrder;
        });

        vm.claims = claims;
        vm.user = {};

        for (var i = 0; i < vm.claims.length; i++) {
          vm.claims[i].claimValue = $filter('camelize')(vm.claims[i].description);
          vm.user[vm.claims[i].claimValue] = {};
          vm.user[vm.claims[i].claimValue].claimUri = vm.claims[i].claimUri;

          // Must initiate this value as it's not mandatory
          if (vm.claims[i].claimUri === 'http://wso2.org/claims/mailinglist') {
            vm.user[vm.claims[i].claimValue].value = false;
          }
          // Must initiate this value as it's not mandatory
          if (vm.claims[i].claimUri === 'http://wso2.org/claims/secretKey') {
            vm.user[vm.claims[i].claimValue].value = '';
          }
          // Must initiate this value as it's not mandatory
          if (vm.claims[i].claimUri === 'http://wso2.org/claims/enableTOTP') {
            vm.user[vm.claims[i].claimValue].value = false;
          }
        }

      }
    })();

    function login() {
      vm.dataLoading = true;

      function loginResponse(response) {
        if (response != null && response.status === 100) {
          vm.dataLoading = false;
          $rootScope.user.totp = true;
        } else {
          $rootScope.user.loggedIn = true;
          $rootScope.user.totp = false;
          vm.dataLoading = false;
          AlertService.clearMenuAlertMessage();
          $location.path('/overview');
          vm.username = '';
          vm.password = '';
          vm.totp = '';
          $scope.form.$setPristine();
        }
      }

      if (!vm.totp) {
        AuthenticationService.login(vm.username, vm.password).then(loginResponse).catch(function(response) {
          if (response.status === 401) {

            if (response.message === 'RemoteUserStoreManagerServiceUserStoreExceptionException') {
              AlertService.menuError('Kontakta api@vasttrafik.se om kontot är låst', 'Felaktigt användarnamn eller låst konto');
            } else {
              AlertService.menuError('Användarnamn och lösenord stämmer inte.', 'Problem att logga in');
            }
            vm.password = '';
            $scope.form.$setPristine();
          } else {
            AlertService.menuError(response.message, 'Problem att logga in');
          }
          vm.dataLoading = false;
        });
      } else {
        AuthenticationService.login(vm.username, vm.password, vm.totp).then(loginResponse).catch(function(response) {

          if (response.status === 401) {

            if (response.message === 'RemoteUserStoreManagerServiceUserStoreExceptionException') {
              AlertService.menuError('Kontakta api@vasttrafik.se om kontot är låst', 'Felaktigt användarnamn eller låst konto');
            } else {
              AlertService.menuError('Felaktig TOTP-kod.', 'Problem att logga in');
            }
            vm.totp = '';
            $scope.form.$setPristine();
          } else {
            AlertService.menuError(response.message, 'Problem att logga in');
          }
          vm.dataLoading = false;
        });
      }
    }

    function logout() {
      $rootScope.user.loggedIn = false;
      $rootScope.user.create = false;
      $rootScope.user.totp = false;
      AuthenticationService.logout();
      $location.path('/');
    }

    function create() {
      vm.dataLoading = true;
      AuthenticationService.create(vm.user, vm.claims).then(function(response) {
        AlertService.success('Du kommer få ett mail med instruktioner för att aktivera ditt konto', 'Registrering skickad!', 20000);
        $location.path('/activation').search('username', vm.user.username);
        $rootScope.user.create = false;
        vm.dataLoading = false;
        $('.menu-user').click();
      }).catch(function(response) {
        AlertService.menuError(response.message, 'Problem att skapa kontot: ');
        vm.dataLoading = false;
      });
    }

    function toggleCreate(create) {
      vm.dataLoading = false;

      if (create != null) {
        $rootScope.user.create = create;
      } else {
        $rootScope.user.create = !$rootScope.user.create;
      }
      $rootScope.user.totp = false;
      delete $rootScope.alert;
      delete $rootScope.menuAlert;
    }

    function toggleTotp() {
      vm.dataLoading = false;
      $rootScope.user.totp = false;
      vm.totp = '';
      delete $rootScope.alert;
      delete $rootScope.menuAlert;
    }

    function togglePasswordRecovery() {
      $location.path('/recover').search('username', vm.username || '');
      $('.menu-user').click();
    }

    function toggleUsernameRecovery() {
      $location.path('/recover');
      $location.search('username', null);
      $location.search('code', null);
      $('.menu-user').click();
    }
  }

})();
