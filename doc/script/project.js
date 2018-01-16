/* Name: Eline Rietdijk
Studentnumber: 10811834

'project.js'
This script......*/


window.onload = function() {

	// load datasets using a queue
	d3.queue()
	// .defer(d3.csv, "sunburstData.json")
	.defer(d3.json, "linegraphData2.json")
	.await(createVisualisation);
};

function createVisualisation(error, hygieneData) {
	if (error) {
		alert("Could not load data");
	};

	margin = {top: 20, right: 20, bottom: 45, left: 70}, 

		width = 1500;
		height = 650;

	d3.select(".parentDiv")
		.style("width", width)

	currentYear = "2015";
	currentCountry = "Algeria";


	// createScatter(diseaseData, hygieneData, currentCountry, currentYear);
	createGraph(hygieneData);
	// createSun(diseaseData, currentCountry, currentYear);
};
