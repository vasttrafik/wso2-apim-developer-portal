(function () {
  'use strict';

  angular
    .module('vtPortal')
    .controller('NewsCtrl', NewsCtrl);

  NewsCtrl.$inject = ['$routeParams', '$location', '$scope'];

  function NewsCtrl($routeParams, $location, $scope) {
    var vm = this;
    
    vm.newsItems = [];

    vm.toggleIngress = toggleIngress;
    
    (function init() {
      vm.showIngress = true;

      initializeItems();
      
    })();
    

    function toggleIngress(index)
    {
      //angular.element('#' + index + 'intro').toggleClass('hidden');
      vm.showIgress = !vm.showIngress;
    }
    
    function initializeItems() {

      vm.newsItems = [];

      vm.newsItems.push({
        id: "1", publishedDate: "2015-11-01",
        publishedBy: "Lars Andersson",
        title: "Ny utvecklarportal",
        intro: "1: En kort beskrivning som är det enda som visas...",
        content: "Ne adhuc aliquid propriae ius, ei ludus consul offendit usu, iusto dolor " +
          "no has. Id ullum lobortis sit, discere mandamus necessitatibus mea ea, alia errem " +
          "probatus id sea. Usu quaestio intellegebat eu. Has duis modus malorum et, aperiri " +
          "intellegat constituto ad vim, tale modus sea ne. Mutat appetere volutpat et cum." +
          "Dicam consul intellegat pri in, in usu impedit meliore, in mei audiam commodo aperiri." +
          "Ad vis malorum evertitur, sed te illum decore. Mea cu ornatus vocibus fuisset. " +
          "His denique albucius et. Et accusata adipiscing mei, no omnis cotidieque vis, sale atqui accumsan per id." +
          "Petentium quaerendum mea ut, eos inimicus inciderint et, ius nibh ullamcorper eu. Id nibh possit accusam his, " +
          "at usu graeci maiorum, ne eum idque maiestatis efficiantur. No mei eros deserunt. Ex aeterno inermis eam, " +
          "aliquando liberavisse definitiones vis id. Aliquip quaestio ea has.",
        tags: ["Api","Nytt"]
      });

      vm.newsItems.push({
          id: "2",
          publishedDate: "2015-11-27",
          publishedBy: "Mikael",
          title: "Ny utvecklarportal 2",
          intro: "2: En kort beskrivning som är det enda som visas...",
          content: "<html>…</html>",
          tags: [
             "Api",
             "Nytt"
          ]
      });
    }
  }

})();
