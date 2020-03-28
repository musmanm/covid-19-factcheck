import React, { Component} from 'react';
import './PageThree.scss';
import axios from "axios";


class PageThree extends Component {
	state = {width: '1200px', height: '2100px'};

	componentDidMount() {
		document.querySelector(".arrow__up").addEventListener("click", function() {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
		document.querySelector(".arrow__down").addEventListener("click", function() {
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: "smooth"
			});
		});

		let search = document.getElementById("search");
		search.addEventListener("keyup", function() {
			var value = this.value.toLowerCase();
			console.log("value", value);
			const rows = document.querySelectorAll("tbody tr");
			const rowsArray = Array.prototype.slice.call(rows);
			rowsArray.forEach(function(element, index, array) {
				var tdCountry = element.childNodes[0].innerHTML.toLowerCase();
				if (tdCountry.indexOf(value) > -1) {
					//console.log(tdCountry, tdCountry.indexOf(value));
					element.classList.remove("hidden");
				} else {
					element.classList.add("hidden");
				}
			});
		});

		let preloader = document.querySelector(".preloader");

		//Add a request interceptor
		axios.interceptors.request.use(
		  function(config) {
		    //console.log("request sent", new Date());
		    return config;
		  },
		  function(error) {
		    preloader.classList.add("preloader--hidden");
		    alert(error);
		    return Promise.reject(error);
		  }
		);

		//Add a response interceptor
		axios.interceptors.response.use(
		  function(response) {
		    preloader.classList.add("preloader--hidden");
		    return response;
		  },
		  function(error) {
		    preloader.classList.add("preloader--hidden");
		    alert(error);
		    return Promise.reject(error);
		  }
		);

		let validation = {
			isNumber: function(str) {
				//  /^\d+$/g is equal to /^[0-9]+$/g;
				var patt = /^\d+$/g;
				return patt.test(str);
			}
		};

	axios
	  .all([this.getGlobalData(), this.getCountriesData()])
	  .then(
	    axios.spread(function(global, countries) {
	      //global
	      console.log("%c全球 Global", "color: #fb5e53");
	      console.log("確診 Cases", global.data.cases);
	      console.log("死亡 Deaths", global.data.deaths);
	      console.log("康復 Recovered", global.data.recovered);

	      var totalCases = global.data.cases.toLocaleString();
	      var totalDeaths = global.data.deaths.toLocaleString();
	      var totalRecovered = global.data.recovered.toLocaleString();

	      document.getElementsByClassName(
	        "global__cases"
	      )[0].childNodes[1].innerHTML = totalCases;
	      document.getElementsByClassName(
	        "global__recovered"
	      )[0].childNodes[1].innerHTML = totalRecovered;
	      document.getElementsByClassName(
	        "global__deaths"
	      )[0].childNodes[1].innerHTML = totalDeaths;

	      //countries
	      const tbody = document.getElementsByTagName("tbody")[0];
	      var countries = countries.data;
	      countries.forEach(function(element, index, array) {
	        const tr = document.createElement("tr");
	        var values = [
	          element.country,
	          element.cases,
	          element.deaths,
	          element.recovered
	        ];
	        values.forEach(function(element, index, array) {
	          const td = document.createElement("td");
	          element =
	            validation.isNumber(element) === "NaN"
	              ? element
	              : element.toLocaleString();
	          td.innerHTML = element;
	          tr.appendChild(td);
	        });
	        tbody.appendChild(tr);
	      });
	    })
	  )
	  .catch(function(error) {
	    console.log(error);
	  });
	}

	getGlobalData = () => {
		return axios.get("https://corona.lmao.ninja/all");
	}

	getCountriesData = () => {
		return axios.get("https://corona.lmao.ninja/countries");
	}

	changeOrder = () => {
		const value = document.getElementById("select").value;
		const index = document.getElementById("select").selectedIndex;
		//console.log(value, index);
		const rows = document.querySelectorAll("tbody tr");
		const rowsArray = Array.prototype.slice.call(rows);
		rowsArray
			.sort(function(A, B) {
				var num1 = A.childNodes[index].innerHTML;
				num1 = num1.replace(",", "");
				var num2 = B.childNodes[index].innerHTML;
				num2 = num2.replace(",", "");
				return num2 - num1;
			})
			.forEach(function(tr) {
				tr.parentElement.appendChild(tr);
			});
		//console.log(rowsArray);
	}

	render(){
		return (
			<React.Fragment>
				<div className="preloader">
					<div className="preloader__content">
						<div className="preloader__loader"></div>
						<div className="preloader__txt">Loading ...</div>
					</div>
				</div>
				<div className="container">
						<div className="statistics">
							<div className="global">
									<div className="global__title">
										corona virus disease 19 (covid-19)
									</div>
									<div className="global__cases">
										<h1></h1>
										<h2>Total Cases</h2>
									</div>
									<div className="global__deaths">
										<h1></h1>
										<h2>Total Deaths</h2>
									</div>
									<div className="global__recovered">
										<h1></h1>
										<h2>Total Recovered</h2>
									</div>
							</div>
							<input type="text" id="search" name="country" placeholder="Search Countries"/>
							<select className="custom-select" id="select" onChange={() => this.changeOrder()} defaultValue="">
									<option disabled="">Sort By</option>
									<option value="cases">Total Cases</option>
									<option value="deaths">Total Deaths</option>
									<option value="recovered">Total Recoveries</option>
							</select>
							<table className="table">
									<thead>
										<tr>
											<th>Country</th>
											<th>Cases</th>
											<th>Deaths</th>
											<th>Recovered</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
							</table>
						</div>
					<div className="arrow">
							<div className="arrow__up"> </div>
							<div className="arrow__down"> </div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default PageThree;
