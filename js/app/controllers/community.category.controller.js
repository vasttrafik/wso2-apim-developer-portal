/*global newsItems*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('CommunityCategoryCtrl', CommunityCategoryCtrl);

  CommunityCategoryCtrl.$inject = ['AlertService', 'APIService', '$routeParams', '$scope'];

  function CommunityCategoryCtrl(AlertService, APIService, $routeParams, $scope) {
    var vm = this;

    vm.addForum = addForum;
    vm.resetAddForumForm = resetAddForumForm;

    (function init() {

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

  }

})();
