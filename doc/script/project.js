/* Name: Eline Rietdijk
Studentnumber: 10811834

'project.js'
This script......*/


window.onload = function() {

	// load datasets using a queue
	d3.queue()
	.defer(d3.json, "sunburstData.json")
	.defer(d3.json, "linegraphData2.json")
	.defer(d3.json, "sunburstData50.json")
	.await(createVisualisation);
};

function createVisualisation(error, diseaseData, hygieneData, sunburstData) {
	if (error) {
		alert("Could not load data");
	};

	margin = {top: 20, right: 20, bottom: 45, left: 70}, 

		width = 1500;
		height = 650;

	d3.select(".parentDiv")
		.style("width", width)

	currentYear = "2012";
	currentCountry = "Afghanistan";

	createGraph(hygieneData);

	d3.queue()
	.defer(d3.json, "sunburstData.json")
	createScatter(diseaseData, hygieneData, currentYear);
	
	createSun(sunburstData, currentCountry, currentYear);
};