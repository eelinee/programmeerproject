/* Name: Eline Rietdijk
Studentnumber: 10811834

'project.js'
This script......*/

var currentYear;
var currentCountry;


window.onload = function() {

	// load datasets using a queue
	d3.queue()
	.defer(d3.json, "sunburstData.json")
	.defer(d3.json, "linegraphData2.json")
	.defer(d3.json, "sunBurstData50.json")
	.defer(d3.json, "linegraphDataNew.json")
	.defer(d3.json, "geographics.json")
	.defer(d3.csv, "totalPopulationRegion.csv")
	.await(createVisualisation);
};

function createVisualisation(error, diseaseData, hygieneData, sunburstData, lijnData, geographics, oud) {
	if (error) {
		alert("Could not load data");
	};

	margin = {top: 20, right: 20, bottom: 45, left: 70}, 

		width = 1500;
		height = 650;

	d3.select(".parentDiv")
		.style("width", width)

	currentYear = "2014";
	currentCountry = "Suriname";

	createGraph(lijnData);

	createScatter(sunburstData, lijnData, geographics, oud);
	
	createSun(sunburstData, currentCountry);

	// when the input range changes update the circle 
	d3.select("#myRange").on("input", function() {
		currentYear = +this.value;
  		updateVisualisations();
	});

};

function updateVisualisations() {
	updateSunburst(currentCountry, currentYear)
	handleMouseMove([xGraph(currentYear), 0], mouseG)
	updateScatter(xVariable, yVariable, scatterSvg, currentYear)
}