/* Name: Eline Rietdijk
Studentnumber: 10811834

'project.js'
This script......*/


window.onload = function() {

	// load datasets using a queue
	d3.queue()
	// .defer(d3.csv, "totalDeaths.csv")
	// .defer(d3.csv, "totalPopulation.csv")
	// .defer(d3.csv, "drinkingwaterPopulation.csv")
	.defer(d3.csv, "rawData.json")
	.await(createVisualisation);
};

function createVisualisation(error, rawData) {
	if (error) {
		alert("Could not load data");
	};

	// console.log("HALLO")

	margin = {top: 20, right: 20, bottom: 30, left: 60}, 

		width = 1350;
		height = 600;

	currentdata = [];

	console.log(rawData[1])

	// createGraph(drinkingWater);
	// createScatter(totalPopulation, totalDeaths);
	// createSun(totalDeaths)

};
