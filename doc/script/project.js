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

	margin = {top: 20, right: 20, bottom: 30, left: 70}, 

		width = 1350;
		height = 600;

	d3.select(".parentDiv")
		.style("width", width)

	currentYear = "2015";
	currentCountry = "Armenia";


	// createScatter(diseaseData, hygieneData, currentCountry, currentYear);
	createGraph(hygieneData);
	// createSun(diseaseData, currentCountry, currentYear);
};
