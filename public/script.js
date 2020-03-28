"use strict";

var labels = [];
var days = {};

function getDays(data, country, population) {
  var confirmed = [];
  for (var day of data[country]) {
    if (day["confirmed"] < 25) continue;
    confirmed.push(day["confirmed"]);

    if (confirmed.length > labels.length) labels.push(labels.length);
  }
  days[country] = confirmed;
  return confirmed;
}

function getInfected(data, country) {
  var infected = [];
  for (var day of data[country]) {
    if (day["confirmed"] < 25) continue;
    infected.push(day["confirmed"] - day["deaths"] - day["recovered"]);
  }
  return infected;
}

function getRate(data, country) {
  var confirmed = days[country];
  var rate = [0];
  for (var i = 1; i < confirmed.length; i++) {
    rate.push((confirmed[i] / confirmed[i - 1] - 1) * 100);
  }

  var avgd = [0, 0, 0, 0, 0];
  for (var i = 4; i < rate.length; i++) {
    avgd.push(
      ((rate[i] + rate[i - 1] + rate[i - 2] + rate[i - 3]) / 4).toFixed(2)
    );
  }

  return avgd;
}

function getDatasets(data, fn, countries, fill, population) {
  var datasets = [];

  for (var i = 0; i < countries.length; i++) {
    datasets.push({
      label: countries[i],
      fill: fill,
      data: fn(data, countries[i])
    });
    // Use per capita if population is provided.
    if (Array.isArray(population) && population.length) {
      for (var k in datasets[i].data) {
        datasets[i].data[k] = (datasets[i].data[k] / population[i]) * 100000;
      }
    }
  }

  return datasets;
}

var confirmed_cvs = document.getElementById("confirmed").getContext("2d");
var rate_cvs = document.getElementById("rate").getContext("2d");
var recovery_cvs = document.getElementById("recovery").getContext("2d");

var countries = [
  "US",
  "Japan",
  "Italy",
  "China",
  "Singapore",
  "Canada",
  "United Kingdom",
  "Korea, South",
  "Iran",
  "Spain",
  "Germany",
  "France"
];

var population = [
  331002651,
  126476461,
  60461826,
  1439323776,
  5850342,
  37742154,
  67886011,
  51269185,
  83992949,
  46754778,
  83783942,
  65273511
];

var config = {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    datasets: null,
    labels: null
  },
  // Configuration options go here
  options: {
    responsive: true,
    plugins: {
      colorschemes: {
        scheme: "brewer.SetThree12"
      }
    },
    legend: {
      labels: {}
    },
    title: {
      display: true,
      fontColor: "white",
      text: "Corona Virus Confirmed Cases (per Capita)"
    },
    tooltips: {
      mode: "index",
      intersect: false
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            fontColor: "white",
            labelString: "Days since 25 confirmed"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            fontColor: "white",
            labelString: "Confirmed per capita"
          },
          ticks: {}
        }
      ]
    }
  }
};

fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    var cconfig = JSON.parse(JSON.stringify(config));
    cconfig.data.datasets = getDatasets(
      data,
      getDays,
      countries,
      false,
      population
    );
    cconfig.data.labels = labels;
    var chartc = new Chart(confirmed_cvs, cconfig);
    console.log(chartc);

    cconfig = JSON.parse(JSON.stringify(config));
    cconfig.options.title.text = "Corona infection rate comparison";
    cconfig.options.scales.yAxes[0].scaleLabel.labelString =
      "Confirmed today/yesterday";
    cconfig.options.scales.yAxes[0].ticks.min = 0;
    cconfig.options.scales.yAxes[0].ticks.callback = function(value) {
      return value + "%";
    };
    cconfig.data.datasets = getDatasets(data, getRate, countries, true);
    cconfig.data.labels = labels;
    var chartr = new Chart(rate_cvs, cconfig);
    console.log(chartr);
    cconfig = JSON.parse(JSON.stringify(config));
    cconfig.options.title.text = "Corona infected comparison";
    cconfig.options.scales.yAxes[0].scaleLabel.labelString =
      "Confirmed - recovered - dead per capita";
    cconfig.data.datasets = getDatasets(
      data,
      getInfected,
      countries,
      false,
      population
    );
    cconfig.data.labels = labels;
    var chartrc = new Chart(recovery_cvs, cconfig);
    console.log(chartrc);
  });
