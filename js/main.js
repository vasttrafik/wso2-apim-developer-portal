/*global Highcharts*/
//var defaultBaseUrl = 'http://localhost:9763/portal-api';
var defaultBaseUrl = 'https://wso2publisher-test.vt.net:9444/portal-api';
//var userBaseUrl = 'http://localhost:9763/idmgt-api';
var userBaseUrl = 'https://wso2publisher-test.vt.net:9444/idmgt-api';
var communityBaseUrl = 'http://localhost:8080';

var chartConfig = {

  faultsPercentage: {
    options: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: null
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '{point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      credits: {
        enabled: false
      }
    },
    series: [{
      name: 'Fel',
      colorByPoint: true,
      data: []
    }]
  },

  uniqueUsers: {
    options: {
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      labels: {
        enabled: false
      },
      yAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        gridLineWidth: 1,
        lineColor: 'transparent',
        labels: {
          enabled: true
        },
        minorTickLength: 0,
        tickLength: 0,
        title: {
          text: null,
          enabled: false
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      credits: {
        enabled: false
      }
    },
    xAxis: {
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      labels: {
        enabled: true
      },
      minorTickLength: 0,
      tickLength: 0,
      title: {
        text: null,
      }
    },
    series: [{
      name: 'Unika användare',
      showInLegend: false,
      color: '#90ed7d',
      data: []

    }]
  },

  requestResponses: {
    options: {
      chart: {
        zoomType: 'xy'
      },
      title: {
        text: null
      },
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value} ms',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        title: {
          text: null,
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        min: 0,
        opposite: true

      }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: null,
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }

      }],
      tooltip: {
        shared: true
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      }
    },
    title: {
      text: null
    },
    xAxis: [{
      crosshair: true,
      labels: {
        rotation: -45
      }
    }],
    series: [{
      name: 'Antal requests',
      type: 'column',
      color: 'rgb(124, 181, 236)',
      yAxis: 1,
      data: [],

    }, {
      name: 'Genomsnittlig svarstid',
      type: 'spline',
      color: '#90ed7d',
      data: [],
      tooltip: {
        valueSuffix: ' ms'
      }
    }]
  },

  totalRequests: {
    options: {
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      labels: {
        enabled: false
      },
      yAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        gridLineWidth: 1,
        lineColor: 'transparent',
        labels: {
          enabled: true
        },
        minorTickLength: 0,
        tickLength: 0,
        title: {
          text: null,
          enabled: false
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      credits: {
        enabled: false
      }
    },
    xAxis: {
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      labels: {
        enabled: true
      },
      minorTickLength: 0,
      tickLength: 0,
      title: {
        text: null,
      }
    },
    series: [{
      name: 'Requests',
      showInLegend: false,
      data: []
    }]
  },

  totalRequestsSpline: {
    options: {
      title: {
        text: null
      },
      xAxis: {
        labels: {
          enabled: true
        }
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: null,
          enabled: false
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Requests',
        type: 'spline',
        showInLegend: false,
        pointWidth: 20,
        data: []
      }]
    }
  },

  totalFaults: {
    options: {
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      labels: {
        enabled: false
      },
      yAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        gridLineWidth: 1,
        lineColor: 'transparent',
        labels: {
          enabled: true
        },
        minorTickLength: 0,
        tickLength: 0,
        title: {
          text: null,
          enabled: false
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      credits: {
        enabled: false
      }
    },
    xAxis: {
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      labels: {
        enabled: true
      },
      minorTickLength: 0,
      tickLength: 0,
      title: {
        text: null,
      }
    },
    series: [{
      name: 'Fel',
      color: 'rgba(186,60,61,1)',
      showInLegend: false,
      data: []
    }]
  }
};

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
