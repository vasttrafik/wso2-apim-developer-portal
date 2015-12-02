var defaultBaseUrl = 'https://wso2publisher-test:9444/portal/api';
var userBaseUrl = 'https://wso2publisher-test:9444/vt-wso2-identity-mgmt-api';

var newsItems = [{
  id: '0',
  publishedDate: '2015-12-04',
  publishedBy: 'Lars Andersson',
  title: 'Nu lanserar vi vår nya utvecklarportal',
  contentUrl: 'js/app/views/news/newportal.view.html',
  tags: ['Api', 'Nytt']
}, {
  id: '1',
  publishedDate: '2015-12-04',
  publishedBy: 'Lars Andersson',
  title: 'Så kommer du åt ditt gamla konto!',
  contentUrl: 'js/app/views/news/old-account.view.html',
  tags: ['Api', 'Nytt']
}, {
  id: '2',
  publishedDate: '2015-12-04',
  publishedBy: 'Lars Andersson',
  title: 'Smart pendelparkering (SPP) – Nytt API!',
  contentUrl: 'js/app/views/news/spp-new-api.view.html',
  tags: ['Api', 'Nytt']
}, {
  id: '3',
  publishedDate: '2015-12-04',
  publishedBy: 'Lars Andersson',
  title: 'Förändringar i våra API:er',
  contentUrl: 'js/app/views/news/api-changes.view.html',
  tags: ['Api', 'Nytt']
}, {
  id: '4',
  publishedDate: '2015-12-04',
  publishedBy: 'Lars Andersson',
  title: 'Livemap - ny funktion i Reseplaneraren!',
  contentUrl: 'js/app/views/news/rp-livemap.view.html',
  tags: ['Api', 'Nytt']
}, {
  id: '5',
  publishedDate: '2015-12-04',
  publishedBy: 'Lars Andersson',
  title: 'Så byggde vi den nya portalen',
  contentUrl: 'js/app/views/news/portal-how.view.html',
  tags: ['Api', 'Nytt']
}];

var helper = {
  getUniqueArray: function(ar) {
    var j = {};

    ar.forEach(function(v) {
      j[v + '::' + typeof v] = v;
    });

    return Object.keys(j).map(function(v) {
      return j[v];
    });
  }
};
