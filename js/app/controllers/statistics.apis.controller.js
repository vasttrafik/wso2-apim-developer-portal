/*global chartConfig*/
/*global chart*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('StatisticsApisCtrl', StatisticsApisCtrl)
    .constant('chartconfig', chartConfig);

  StatisticsApisCtrl.$inject = ['AlertService', 'APIService', 'jsonPath', '$http', '$timeout', '$scope'];

  function StatisticsApisCtrl(AlertService, APIService, jsonPath, $http, $timeout, $scope) {
    var vm = this;

    (function init() {

      vm.apis = [];
      vm.periods = [{
        value: 'week',
        label: 'senaste veckan'
      }, {
        value: 'month',
        label: 'senaste månaden'
      }, {
        value: 'quarter',
        label: 'senaste kvartalet'
      }];

      // Initial period is week
      vm.selectedPeriodIndex = '0';

      APIService.call('apisGet', [100, 0, null, 'application/json'])
        .then(apisGetResponse);

      /* Initiate charts to ng-directive */
      vm.charts = {};
      vm.charts.totalRequests = chartConfig.totalRequests;
      vm.charts.requestResponseTimes = [];

      $(document).ready(function() {
        $('body').tooltip({
          selector: '[data-toggle=tooltip]',
        });
      });

    })();

    function apisGetResponse(response) {
      if (response.status === 200) {
        vm.apis.push({
          name: 'Alla API:er',
          version: '',
        });

        vm.apis.push.apply(vm.apis, response.data.list);
        vm.selectedApiIndex = '0'; // Set apis combined as initial view

      } else {
        AlertService.error('Problem att hämta lista med API:er');
      }
    }

    /* Update statistics based on user choice of API and period */
    $scope.$watchCollection('[vm.selectedApiIndex, vm.selectedPeriodIndex]', function() {

      if (vm.selectedApiIndex != null) {
        var api = vm.apis[vm.selectedApiIndex];
        var period = vm.periods[vm.selectedPeriodIndex].value;

        if (vm.selectedApiIndex === '0') {
          APIService.call('statisticsGet', ['apis', ['totalRequests', 'requestResponseTimes'], period])
            .then(statisticsGetResponse);
        } else {
          APIService.call('statisticsApiNameApiVersionGet', [api.name, api.version, ['totalRequests', 'requestResponseTimes'], period])
            .then(statisticsGetResponse);
        }
      }

    });

    function statisticsGetResponse(response) {

      /* Reset */
      vm.statistics = {};
      vm.statistics.totalRequests = 0;

      vm.charts.requestResponseTimes = [];

      if (response.status === 200) {

        if (jsonPath(response.data, '$..[?(@.type=="totalRequests")]')) {
          setupTotalRequestsChart(jsonPath(response.data, '$..[?(@.type=="totalRequests")]')[0]);
        }

        if (jsonPath(response.data, '$..[?(@.type=="requestResponseTimes")]')) {
          setupRequestResponseTimesCharts(jsonPath(response.data, '$..[?(@.type=="requestResponseTimes")]'));
        }

        /* Fixes layout bug with HighCharts */
        $timeout(function() {
          $(window).resize();
        }, 0);

      } else {
        AlertService.error('Problem att hämta statistik');
      }
    }

    function setupTotalRequestsChart(totalRequests) {

      calculateChangeValues(totalRequests.series);

      vm.charts.totalRequests.xAxis.categories = totalRequests.series[0].names;
      vm.charts.totalRequests.series[0].data = totalRequests.series[0].values;

      var valuesLength = totalRequests.series[0].values.length;
      for (var i = 0; i < valuesLength; i++) {
        vm.statistics.totalRequests += totalRequests.series[0].values[i];
      }

      /* Valuable variable for view, as we can't be sure statistics is empty from initial totalRequests variable */
      if (vm.statistics.totalRequests !== 0) {
        vm.charts.totalRequests.loading = false;
      }

    }

    function setupRequestResponseTimesCharts(requestResponseTimes) {

      /* Check if response array is empty */
      if (requestResponseTimes[0].series[0].names.length > 0) {
        for (var l = 0; l < requestResponseTimes.length; l++) {
          vm.charts.requestResponseTimes[l] = JSON.parse(JSON.stringify(chartConfig.requestResponses)); // Create new chart object
          vm.charts.requestResponseTimes[l].xAxis[0].categories = requestResponseTimes[l].series[0].names;
          vm.charts.requestResponseTimes[l].title.text = requestResponseTimes[l].api + '.' + requestResponseTimes[l].apiVersion;
          vm.charts.requestResponseTimes[l].series[0].data = requestResponseTimes[l].series[0].values; // Number of requests
          vm.charts.requestResponseTimes[l].series[1].data = requestResponseTimes[l].series[1].values; // Response times
        }
      }

    }

    function calculateChangeValues(series) {

      /* The returned series can contain up to 8 days of historical data in order to be able to compare values from a week ago.
       * After comparison has been made. Remove the first value and name from the series, as we only want to show a weeks worth
       * of data in the actual chart. The data is historical and is calculated with yesterday as last day.
       */

      var valuesLength = series[0].values.length;

      /* Check if second last date is 3 days ago. This means that last element is 2 days ago and can be compared with */
      if (valuesLength > 1 && Date.create(series[0].names[valuesLength - 2]).is('3 days ago')) {
        vm.statistics.totalRequestsDayChangeNumber = Math.abs(series[0].values[valuesLength - 1] - series[0].values[valuesLength - 2]);
        vm.statistics.totalRequestsDayChange = calculatePercentageChange(series[0].values[valuesLength - 1], series[0].values[valuesLength - 2]);

      }
      /* Check if first date is from last week and last date is from yesterday. This means it's possible to compare them */
      if (valuesLength > 1 && Date.create(series[0].names[0]).is('9 days ago') && Date.create(series[0].names[valuesLength - 1]).is('2 days ago')) {
        vm.statistics.totalRequestsWeekChangeNumber = Math.abs(series[0].values[valuesLength - 1] - series[0].values[0]);
        vm.statistics.totalRequestsWeekChange = calculatePercentageChange(series[0].values[valuesLength - 1], series[0].values[0]);
        series[0].names.shift(); // Remove first day
        series[0].values.shift(); // Remove first value
      }

    }

    function calculatePercentageChange(value, previousValue) {
      return Math.floor(((value / previousValue) * 100) - 100);
    }

  }
})();
