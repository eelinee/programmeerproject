/* Name: Eline Rietdijk
Studentnumber: 10811834

'project.js'
This script......*/

window.onload = function() {

	// load datasets using a queue
	d3.queue()
	.defer(d3.csv, "totalDeaths.csv")
	.defer(d3.csv, "totalPopulation.csv")
	.await(createVisualisation);
};

function createVisualisation(error, totalDeaths, totalPopulation) {
	if (error) {
		alert("Could not load data");
	};

	console.log(totalPopulation);


};