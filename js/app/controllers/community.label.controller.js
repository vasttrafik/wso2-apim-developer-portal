(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityLabelCtrl', CommunityLabelCtrl);

  CommunityLabelCtrl.$inject = ['$routeParams', '$scope', '$location', 'AlertService', 'APIService', 'CommunityService'];

  function CommunityLabelCtrl($routeParams, $scope, $location, AlertService, APIService, CommunityService) {
    var vm = this;

    vm.communityService = CommunityService;

    vm.isForum = $location.path().split('/')[2] === 'forum';
    vm.isCategory = $location.path().split('/')[2] === 'category';

    vm.text = '';

    if ($location.path().indexOf('unanswered') !== -1) {
      vm.text = 'Senast obesvarade frågor';
    } else if ($location.path().indexOf('popular') !== -1) {
      vm.text = 'Populära frågor';
    } else if ($location.path().indexOf('answered') !== -1) {
      vm.text = 'Senast besvarade frågor';
    }

    (function init() {

      var forumId = $routeParams.forumId;
      var categoryId = $routeParams.categoryId;

      APIService.communityCall('topicsGet', [$routeParams.label, null, null, 100, true])
        .then(function topicsGetResponse(response) {
          if (response.status === 200) {

            var array = [];

            for (var i = 0; i < response.data.length; i++) {

              if ((!vm.isForum && !vm.isCategory) || (response.data[i].forumId === parseInt(forumId) || response.data[i].categoryId === parseInt(categoryId))) {
                array.push(response.data[i]);
              }
            }

            vm.topics = array;
            CommunityService.addGravatarProfileInfoToPosts(vm.topics);
          } else {
            AlertService.error('Problem att hämta frågor');
          }
        })
        .catch(function(err) {
          AlertService.error('Problem att hämta frågor');
        });

    })();

  }

})();
