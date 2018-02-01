// HEADER 
// TOEVOEGEN

function createTitle() {
	
	

	// titleSvg = d3.select(".titleDiv")
	// 	.append("svg")
	// 	.attr("id", "titleSvg")
	// 	.attr("width", titleWidth)
	// 	.attr("height", titleHeight)
		// .append("g")
		// .attr("class", "titleG")

	// updateTitle(true)

	// console.log("HIERO", titleSvg.select("#titleG"))

	
}

function updateTitle(availability) {
	titleWidth = width * 0.44;
	titleHeight = 70;
	title = d3.select(".titleDiv")
		.append("text")
		.attr("class", "titleVis")

	if(availability == "available") {


		title = d3.select(".titleDiv")
			.select(".titleVis").text(currentCountry + ", " + currentYear)
			.style("font-size", "50px")
	}

	else {
		title = d3.select(".titleDiv")
			.select(".titleVis").text("No disease data available for " + currentCountry + " in " + currentYear)
			.style("font-size", "20px")
		console.log("HIERZO!!")
	}
}