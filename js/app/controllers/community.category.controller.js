/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityCategoryCtrl', CommunityCategoryCtrl);

  CommunityCategoryCtrl.$inject = ['$routeParams', '$location', '$scope', 'AlertService', 'APIService', 'CommunityService'];

  function CommunityCategoryCtrl($routeParams, $location, $scope, AlertService, APIService, CommunityService) {
    var vm = this;

    vm.communityService = CommunityService;

    vm.locationPath = $location.path();

    vm.addForum = addForum;
    vm.addCategoryUpdate = addCategoryUpdate;
    vm.updateCategory = updateCategory;
    vm.resetAddForumForm = resetAddForumForm;

    (function init() {
      if ($location.path().indexOf('admin') > -1 && !CommunityService.isAdmin()) {
        $location.path('/');
      } else if (($location.path().indexOf('admin') === -1) && parseInt($routeParams.categoryId) === 1) {
        $location.path('/');
      }

      vm.toggleCategoryUpdate = false;
      vm.form = {};

      APIService.communityCall('categoriesIdGet', [$routeParams.categoryId ? $routeParams.categoryId : 1])
        .then(categoriesIdGetResponse);

      CommunityService.getFirstTopicByLabels(['popular', 'answered', 'unanswered'])
        .then(function(response) {
          vm.labels = response;
        });

    })();

    function categoriesIdGetResponse(response) {
      if (response.status === 200) {
        vm.category = response.data;

        angular.forEach(vm.category.forums, function(value, key) {
          if (value.lastPost != null) {
            CommunityService.addGravatarProfileInfoToPost(value.lastPost);
          }
        });

      } else {
        AlertService.error('Problem att hämta kategori');
      }
    }

    function addForum() {
      vm.dataLoadingAddForum = true;

      APIService.communityCall('forumsPost', [{
          categoryId: vm.category.id,
          name: vm.form.forum.name,
          description: vm.form.forum.description,
          imageURL: $scope.iconClass
        }], true)
        .then(forumsPostResponse)
        .catch(function(response) {
          AlertService.error('Problem att skapa forum');
          vm.dataLoadingAddForum = false;
        });

      function forumsPostResponse(response) {
        if (response.status === 201) {

          AlertService.success('Forum ' + response.data.name + ' skapad!');
          vm.category.forums.push(response.data);
          resetAddForumForm();

        } else {
          AlertService.errorWithStatus(response.status, 'Problem att skapa forum');
        }
        vm.dataLoadingAddForum = false;
      }
    }

    function resetAddForumForm() {
      vm.form.forum = {};
      $scope.addForumForm.$setPristine();
    }

    function addCategoryUpdate() {

      vm.toggleCategoryUpdate = !vm.toggleCategoryUpdate;
      vm.form.name = angular.copy(vm.category.name);
      vm.form.imageURL = angular.copy(vm.category.imageURL);

    }

    function updateCategory() {

      APIService.communityCall('categoriesIdPut', [vm.category.id, {
          id: vm.category.id,
          name: vm.form.name,
          isPublic: true,
          imageURL: vm.form.imageURL
        }])
        .then(categoriesIdPutResponse)
        .catch(function(response) {
          AlertService.error('Problem att uppdatera kategori');
        });

      function categoriesIdPutResponse(response) {
        if (response.status === 200) {
          AlertService.success('Kategori uppdaterad!');
          vm.category.name = response.data.name;
          vm.toggleCategoryUpdate = false;
        } else {
          AlertService.errorWithStatus(response.status, 'Problem att uppdatera kategori');
        }
      }

    }

  }

})();
