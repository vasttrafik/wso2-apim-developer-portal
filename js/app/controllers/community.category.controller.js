/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityCategoryCtrl', CommunityCategoryCtrl);

  CommunityCategoryCtrl.$inject = ['$routeParams', '$scope', 'AlertService', 'APIService'];

  function CommunityCategoryCtrl($routeParams, $scope, AlertService, APIService) {
    var vm = this;

    vm.addForum = addForum;
    vm.addCategoryUpdate = addCategoryUpdate;
    vm.updateCategory = updateCategory;
    vm.resetAddForumForm = resetAddForumForm;

    (function init() {

      vm.toggleCategoryUpdate = false;
      vm.form = {};

      APIService.communityCall('categoriesIdGet', [$routeParams.categoryId ? $routeParams.categoryId : 1])
        .then(categoriesIdGetResponse);

    })();

    function categoriesIdGetResponse(response) {
      if (response.status === 200) {
        vm.category = response.data;

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
          imageURL: vm.form.forum.imageURL
        }])
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
          AlertService.error('Problem att skapa nytt forum');
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

    }

    function updateCategory() {

      APIService.communityCall('categoriesIdPut', [vm.category.id, {
          id: vm.category.id,
          name: vm.form.name
        }])
        .then(categoriesIdPutResponse);

      function categoriesIdPutResponse(response) {
        if (response.status === 200) {
          AlertService.success('Kategori uppdaterad!');
          vm.category.name = vm.category.name;
          vm.toggleCategoryUpdate = false;
        } else {
          AlertService.error('Problem att uppdatera kategori');
        }
      }

    }

  }

})();
