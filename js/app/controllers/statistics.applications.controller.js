/*global chartConfig*/
/*global chart*/
(function() {
  'use strict';

  angular
    .module('vtPortal')
    .controller('StatisticsApplicationsCtrl', StatisticsApplicationsCtrl)
    .constant('chartconfig', chartConfig);

  StatisticsApplicationsCtrl.$inject = ['AlertService', 'APIService', 'jsonPath', '$http', '$timeout', '$scope', '$routeParams', '$location'];

  function StatisticsApplicationsCtrl(AlertService, APIService, jsonPath, $http, $timeout, $scope, $routeParams, $location) {
    var vm = this;

    (function init() {

      vm.applications = [];

      APIService.call('applicationsGet', [100, 0, null, 'application/json'])
        .then(applicationsGetResponse);

      /* Initiate charts to ng-directive */
      vm.charts = {};
      vm.charts.totalRequests = chartConfig.totalRequests;
      vm.charts.totalFaults = chartConfig.totalFaults;
      vm.charts.uniqueUsers = chartConfig.uniqueUsers;
      vm.charts.faultsPercentage = chartConfig.faultsPercentage;
      vm.charts.requestResponseTimes = [];

      $(document).ready(function() {
        $('body').tooltip({
          selector: '[data-toggle=tooltip]'
        });
      });

    })();

    function applicationsGetResponse(response) {
      if (response.status === 200) {
        vm.applications.push({
          name: 'Alla applikationer'
        });

        vm.applications.push.apply(vm.applications, response.data.list);

        if ($routeParams.applicationId) {
          for (var i = 0; i < vm.applications.length; i++) {
            if (vm.applications[i].id === parseInt($routeParams.applicationId)) {
              vm.selectedApplicationIndex = i.toString();
            }
          }

          // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
          $location.update_path('/statistics/applications'); // jshint ignore:line
        } else {
          $timeout(function() {
            vm.selectedApplicationIndex = '0'; // Set applications combined as initial view
          }, 0);

        }

      } else {
        AlertService.error('Problem att hämta lista med applikationer');
      }
    }

    /* Update statistics based on user choice of application */
    $scope.$watch('vm.selectedApplicationIndex', function() {

      if (vm.selectedApplicationIndex != null) {
        var application = vm.applications[vm.selectedApplicationIndex];

        if (vm.selectedApplicationIndex === '0') {
          APIService.call('statisticsGet', ['applications', ['totalRequestsFaults', 'faultsPercentage', 'requestResponseTimes', 'uniqueUsers']])
            .then(statisticsGetResponse);
        } else {
          APIService.call('statisticsApplicationNameGet', [encodeURIComponent(application.name), ['totalRequestsFaults', 'faultsPercentage', 'requestResponseTimes', 'uniqueUsers']])
            .then(statisticsGetResponse);
        }
      }

    });

    function statisticsGetResponse(response) {

      /* Reset */
      vm.statistics = {};
      vm.statistics.isEmpty = false;
      vm.statistics.totalRequests = 0;
      vm.statistics.totalFaults = 0;
      vm.statistics.uniqueUsers = 0;
      vm.statistics.uniqueUsersIsEmpty = false;
      vm.charts.requestResponseTimes = [];

      if (response.status === 200) {

        if (jsonPath(response.data, '$..[?(@.type=="totalRequestsFaults")]')) {
          setupTotalRequestFaultsChart(jsonPath(response.data, '$..[?(@.type=="totalRequestsFaults")]')[0]);
        }
        if (jsonPath(response.data, '$..[?(@.type=="faultsPercentage")]')) {
          setupFaultsPercentageChart(jsonPath(response.data, '$..[?(@.type=="faultsPercentage")]')[0]);
        }
        if (jsonPath(response.data, '$..[?(@.type=="uniqueUsers")]')) {
          setupUniqueUsersChart(jsonPath(response.data, '$..[?(@.type=="uniqueUsers")]')[0]);
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

    function setupTotalRequestFaultsChart(totalRequestsFaults) {

      calculateChangeValues(totalRequestsFaults.series);

      totalRequestsFaults.series[0].names.forEach(function(entry, index) {
        totalRequestsFaults.series[0].names[index] = entry.substring(5, entry.length);
      });
      totalRequestsFaults.series[1].names.forEach(function(entry, index) {
        totalRequestsFaults.series[1].names[index] = entry.substring(5, entry.length);
      });

      vm.charts.totalRequests.xAxis.categories = totalRequestsFaults.series[0].names;
      vm.charts.totalRequests.series[0].data = totalRequestsFaults.series[0].values;

      vm.charts.totalFaults.xAxis.categories = totalRequestsFaults.series[1].names;
      vm.charts.totalFaults.series[0].data = totalRequestsFaults.series[1].values;

      var valuesLength = totalRequestsFaults.series[0].values.length;
      for (var i = 0; i < valuesLength; i++) {
        vm.statistics.totalRequests += totalRequestsFaults.series[0].values[i];

        vm.statistics.totalFaults += totalRequestsFaults.series[1].values[i];
      }

      vm.charts.totalRequests.loading = false;
      vm.charts.totalFaults.loading = false;

    }

    function setupFaultsPercentageChart(faultsPercentage) {

      /* The returned series contains all data (names and data points) in one series.
       * The pie chart require each slice to have its own data object.
       */

      var dataList = [];
      for (var j = 0; j < faultsPercentage.series[0].names.length; j++) {

        var data = {
          showInLegend: false,
          name: faultsPercentage.series[0].names[j],
          y: faultsPercentage.series[0].values[j]
        };

        /* Pop out first slice to make chart more readable */
        if (j === 0) {
          data.sliced = true;
          data.selected = true;
        }

        dataList.push(data);

      }
      vm.charts.faultsPercentage.series[0].data = dataList;

      vm.charts.faultsPercentage.loading = false;

    }

    function setupUniqueUsersChart(uniqueUsers) {

      /* The returned series can contain up to 8 days of historical data in order to be able to compare values from a week ago.
       * After comparison has been made. Remove the first value and name from the series, as we only want to show a weeks worth
       * of data in the actual chart. The data is 'live', meaning that all dates are one day ahead of all other statistics.
       */

      var valuesLength = uniqueUsers.series[0].values.length;

      /* Check if second last date is from yesterday. This means that last element is from today and can be compared with */
      if (valuesLength > 1 && Date.create(uniqueUsers.series[0].names[valuesLength - 2]).isYesterday()) {
        vm.statistics.uniqueUsersDayChange = calculatePercentageChange(uniqueUsers.series[0].values[valuesLength - 1], uniqueUsers.series[0].values[valuesLength - 2]);
        vm.statistics.uniqueUsersDayChangeNumber = Math.abs(uniqueUsers.series[0].values[valuesLength - 1] - uniqueUsers.series[0].values[valuesLength - 2]);
      }

      /* Check if first date is from last week and last date is from today. This means it's possible to compare them */
      if (valuesLength > 1 && (Date.create(uniqueUsers.series[0].names[0]).daysAgo() === 7) && Date.create(uniqueUsers.series[0].names[valuesLength - 1]).isToday()) {
        vm.statistics.uniqueUsersWeekChange = calculatePercentageChange(uniqueUsers.series[0].values[valuesLength - 1], uniqueUsers.series[0].values[0]);
        vm.statistics.uniqueUsersWeekChangeNumber = Math.abs(uniqueUsers.series[0].values[valuesLength - 1] - uniqueUsers.series[0].values[0]);
        uniqueUsers.series[0].values.shift(); // Remove first day
        uniqueUsers.series[0].names.shift(); // Remove first value
      }

      uniqueUsers.series[0].names.forEach(function(entry, index) {
        uniqueUsers.series[0].names[index] = entry.substring(5, entry.length);
      });

      vm.charts.uniqueUsers.xAxis.categories = uniqueUsers.series[0].names;
      vm.charts.uniqueUsers.series[0].data = uniqueUsers.series[0].values;

      valuesLength = uniqueUsers.series[0].values.length;

      if (valuesLength > 1) {
        if (Date.create(new Date().getFullYear() + '-' + uniqueUsers.series[0].names[valuesLength - 1]).isToday()) {
          vm.statistics.uniqueUsers = uniqueUsers.series[0].values[valuesLength - 1];
        }

        vm.charts.uniqueUsers.loading = false;
      } else {
        vm.statistics.uniqueUsersIsEmpty = true;
      }

    }

    function setupRequestResponseTimesCharts(requestResponseTimes) {

      /* Check if response array is empty */
      if (requestResponseTimes[0].series[0].names.length > 0) {
        for (var l = 0; l < requestResponseTimes.length; l++) {
          vm.charts.requestResponseTimes[l] = JSON.parse(JSON.stringify(chartConfig.requestResponses)); // Create new chart object
          vm.charts.requestResponseTimes[l].func = function(chart) {
            $timeout(function() {
              chart.reflow();
            }, 1);
          };
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

      /* Check if second last date is 2 days ago. This means that last element is 1 days ago and can be compared with */
      if (valuesLength > 1 && Date.create(series[0].names[valuesLength - 2]).daysAgo() === 2) {
        vm.statistics.totalRequestsDayChangeNumber = Math.abs(series[0].values[valuesLength - 1] - series[0].values[valuesLength - 2]);
        vm.statistics.totalRequestsDayChange = calculatePercentageChange(series[0].values[valuesLength - 1], series[0].values[valuesLength - 2]);

        /* Check if series array contains fault series */
        if (series.length > 1) {
          vm.statistics.totalFaultsDayChangeNumber = Math.abs(series[1].values[valuesLength - 1] - series[1].values[valuesLength - 2]);
          vm.statistics.totalFaultsDayChange = calculatePercentageChange(series[1].values[valuesLength - 1], series[1].values[valuesLength - 2]);
        }

      }

      /* Check if first date is from last week and last date is from yesterday. This means it's possible to compare them */
      if (valuesLength > 1 && (Date.create(series[0].names[0]).daysAgo() === 8) && (Date.create(series[0].names[valuesLength - 1]).isYesterday())) {
        vm.statistics.totalRequestsWeekChangeNumber = Math.abs(series[0].values[valuesLength - 1] - series[0].values[0]);
        vm.statistics.totalRequestsWeekChange = calculatePercentageChange(series[0].values[valuesLength - 1], series[0].values[0]);
        series[0].names.shift(); // Remove first day
        series[0].values.shift(); // Remove first value

        /* Check if series array contains fault series */
        if (series.length > 1) {
          vm.statistics.totalFaultsWeekChangeNumber = Math.abs(series[1].values[valuesLength - 1] - series[1].values[0]);
          vm.statistics.totalFaultsWeekChange = calculatePercentageChange(series[1].values[valuesLength - 1], series[1].values[0]);
          series[1].names.shift(); // Remove first day
          series[1].values.shift(); // Remove first value
        }
      }

    }

    function calculatePercentageChange(value, previousValue) {
      if (value !== 0 && previousValue !== 0) {
        return Math.floor(((value / previousValue) * 100) - 100);
      } else {
        return 0;
      }

    }

  }
})();
