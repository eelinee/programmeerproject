/* Name: Eline Rietdijk
Project: programmeerproject minor programmeren
Studentnumber: 10811834

'project.js'
This script initializes the creation of the three data visualisations for my 
project.
*/

var currentYear;
var currentCountry;

window.onload = function() {

	// load datasets using a queue
	d3.queue()
	.defer(d3.json, "../data/sunBurstData.json")
	.defer(d3.json, "../data/linegraphData.json")
	.defer(d3.json, "../data/geographics.json")
	.await(createVisualisation);
};

function createVisualisation(error, diseaseData, hygieneData, geographics) {
	if (error) {
		console.log(error)
		alert("Could not load data");
	};

	$('[data-toggle="popover"]').popover();

	// define total size of parentdiv
	margin = {top: 20, right: 20, bottom: 45, left: 70}, 

		width = 1500;
		height = 700;

	d3.select(".parentDiv")
		.style("width", width)

	// define currentYear and currentCountry to start with
	currentYear = "2005";
	currentCountry = "Egypt";

	// create all visualisations
	createGraph(hygieneData);
	createScatter(diseaseData, hygieneData, geographics);
	createSun(diseaseData);
	updateTitle("available");

	// when the input range changes update the circle 
	d3.select("#myRange").on("input", function() {
		currentYear = +this.value;
  		updateVisualisations();
	});

};

/*
* This function calls all update functions with currentYear and currentCountry 
* and is called from the createVisualisations function in the current script.
*/
function updateVisualisations() {

	// update sunburst, mouse elements in the line graph and scatter
	updateSunburst(currentCountry, currentYear)
	handleMouseMove([xGraph(currentYear), 0], mouseG)
	updateScatter(xVariable, yVariable, scatterSvg, currentYear)

	// set stroke to black only for the dot that represents the currentCountry
	d3.selectAll(".dot").style("stroke", "none")
	d3.select("#" + currentCountry).style("stroke", "black")
}