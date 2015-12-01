/// <reference path="../views/news/portal-how.view.html" />
/// <reference path="../views/news/portal-how.view.html" />
/// <reference path="../views/news/portal-how.view.html" />
(function() {
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

    function toggleIngress(index) {
      vm.showIgress = !vm.showIngress;
    }

    function initializeItems() {

      vm.newsItems = [];

      vm.newsItems.push({
        id: '1',
        publishedDate: '2015-12-04',
        publishedBy: 'Lars Andersson',
        title: 'Nu lanserar vi vår nya utvecklarportal',
        intro: '',
        contentUrl: '/js/app/views/news/newportal.view.html',
        content:'',
        tags: ['Api', 'Nytt']
      });
      vm.newsItems.push({
        id: '2',
        publishedDate: '2015-12-04',
        publishedBy: 'Lars Andersson',
        title: 'Så kommer du åt ditt gamla konto!',
        intro: '',
        contentUrl: '/js/app/views/news/old-account.view.html',
        content: '',
        tags: ['Api', 'Nytt'
        ]
      });
      vm.newsItems.push({
        id: '3',
        publishedDate: '2015-12-04',
        publishedBy: 'Lars Andersson',
        title: 'Smart pendelparkering (SPP) – Nytt API!',
        intro: '',
        contentUrl: '/js/app/views/news/spp-new-api.view.html',
        content: '',
        tags: ['Api', 'Nytt']
      });
      vm.newsItems.push({
        id: '4',
        publishedDate: '2015-12-04',
        publishedBy: 'Lars Andersson',
        title: 'Förändringar i våra API:er',
        intro: '',
        contentUrl: '/js/app/views/news/api-changes.view.html',
        content: '',
        tags: ['Api', 'Nytt']
      });
      vm.newsItems.push({
        id: '5',
        publishedDate: '2015-12-04',
        publishedBy: 'Lars Andersson',
        title: 'Livemap - ny funktion i Reseplaneraren!',
        intro: '',
        contentUrl: '/js/app/views/news/rp-livemap.view.html',
        content: '',
        tags: ['Api', 'Nytt']
      });
      vm.newsItems.push({
        id: '6',
        publishedDate: '2015-12-04',
        publishedBy: 'Lars Andersson',
        title: 'Så byggde vi den nya portalen',
        intro: '',
        contentUrl: '/js/app/views/news/portal-how.view.html',
        content: '',
        tags: ['Api', 'Nytt']
      });

      
    }
  }

})();
