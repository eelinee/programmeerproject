// HEADER 
// TOEVOEGEN

function createTitle() {
	
	titleWidth = width * 0.44;
	titleHeight = 70;

	// titleSvg = d3.select(".titleDiv")
	// 	.append("svg")
	// 	.attr("id", "titleSvg")
	// 	.attr("width", titleWidth)
	// 	.attr("height", titleHeight)
		// .append("g")
		// .attr("class", "titleG")

	// updateTitle(true)

	// console.log("HIERO", titleSvg.select("#titleG"))

	title = d3.select(".titleDiv")
		.append("text")
		.attr("class", "titleVis")

	updateTitle("available")
}

function updateTitle(availability) {
	if(availability == "available") {
		// var g = svg.select("#titleG")

		// console.log(g)


		title = d3.select(".titleDiv")
			.select(".titleVis").text(currentCountry + ", " + currentYear)
			.style("font-size", "50px")

		// title.append("text")
		// 	.attr("class", "titleVis")
		// 	.text(currentCountry + ", " + currentYear)

		console.log("HALLO")

		// svg.append("text")
		// 	.attr("class", "titleVis")
		// 	// .attr("x", 20)
		// 	// .attr("y", 20)
		// 	.text(currentCountry + ", " + currentYear)
	}

	else {
		title = d3.select(".titleDiv")
			.select(".titleVis").text("No disease data available for " + currentCountry + " in " + currentYear)
			.style("font-size", "20px")
	}
}