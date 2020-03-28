import React, { Component} from 'react';
import './PageTwo.css';
import Chart from 'chart'

class PageTwo extends Component {
  state = {firstRender: false, graph: false};

  labels = [];
  days = {};


  
  countries = [
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
  
  population = [
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


  setGraph = () => {
    this.setState({graph: true} );
    }
    
  doFetch = () =>{
    console.log('1');
    console.log(document.getElementById("confirmed"));

  let confirmed_cvs = document.getElementById("confirmed").getContext("2d");
  let rate_cvs = document.getElementById("rate").getContext("2d");
  let recovery_cvs = document.getElementById("recovery").getContext("2d");
  console.log('1.1');
  let config = {
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

  console.log('2');
  fetch("https://pomber.github.io/covid19/timeseries.json")
.then(response => {
  console.log('3');
  return response.json();

})
.then(data => {
  console.log('5');
  let cconfig = JSON.parse(JSON.stringify(config));
  console.log('6');
  console.log(config);
  cconfig.data.datasets = this.getDatasets(
    data,
    this.getDays,
    this.countries,
    false,
    this.population
  );
  cconfig.data.labels = this.labels;
  let chartc = new Chart(confirmed_cvs, cconfig);
  console.log(chartc);

  cconfig = JSON.parse(JSON.stringify(config));
  cconfig.options.title.text = "Corona infection rate comparison";
  cconfig.options.scales.yAxes[0].scaleLabel.labelString =
    "Confirmed today/yesterday";
  cconfig.options.scales.yAxes[0].ticks.min = 0;
  cconfig.options.scales.yAxes[0].ticks.callback = function(value) {
    return value + "%";
  };
  cconfig.data.datasets = this.getDatasets(data, this.getRate, this.countries, true);
  cconfig.data.labels = this.labels;
  var chartr = new Chart(rate_cvs, cconfig);
  console.log(chartr);
  cconfig = JSON.parse(JSON.stringify(config));
  cconfig.options.title.text = "Corona infected comparison";
  cconfig.options.scales.yAxes[0].scaleLabel.labelString =
    "Confirmed - recovered - dead per capita";
  cconfig.data.datasets = this.getDatasets(
    data,
    this.getInfected,
    this.countries,
    false,
    this.population
  );
  console.log('cconfig.data.datasets');
  console.log(cconfig.data.datasets);
  // this.setGraph();
  this.setState({ firstRender: true});
  cconfig.data.labels = this.labels;
  var chartrc = new Chart(recovery_cvs, cconfig);
  console.log(chartrc);
  console.log('4');
  

});
  }

  componentDidUpdate() {
    console.log('123213123');
    if(!this.state.firstRender) {
     this.doFetch();
     
    // this.setState({ firstRender: true});
    }
  }


  getDays = (data, country, population) =>{
    var confirmed = [];
    for (var day of data[country]) {
      if (day["confirmed"] < 25) continue;
      confirmed.push(day["confirmed"]);

      if (confirmed.length > this.labels.length) this.labels.push(this.labels.length);
    }
    this.days[country] = confirmed;
    return confirmed;
  }

  getInfected = (data, country) =>{
    var infected = [];
    for (var day of data[country]) {
      if (day["confirmed"] < 25) continue;
      infected.push(day["confirmed"] - day["deaths"] - day["recovered"]);
    }
    return infected;
  }

  getRate=(data, country) =>{
    var confirmed = this.days[country];
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

  getDatasets=(data, fn, countries, fill, population) =>{
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
    console.log('dataset');
    console.log(datasets);
    return datasets;
  }


  render(){
    //  const { state } = this;
    //  const setState = state => this.setState(state);


     return (
      <div className='myBody'>
        <div onClick= { () => { this.setState((prevState)=> {return {firstRender: !prevState.firstRender} })}  }>YOLO</div>
        <canvas id="confirmed"></canvas>
        <canvas id="rate"></canvas>
        <p className='myP'>
          Percent of new cases in comparison to previous day. Note: these numbers are a total of positive reported cases, so they may be affected by rate of testing and results.
        </p>
        <canvas id="recovery"></canvas>
        <p className='myP myPP' ><a href="https://github.com/pomber/covid19">Data Source available here</a></p>
      </div>
      );
  }
}

export default PageTwo;