/* Name: Eline Rietdijk
Studentnumber: 10811834

'createScatterPlot.js'
This script......*/

function createScatter(diseaseData, generalData) {
	console.log("SCATTER")
	
	scatterWidth = (width / 3) * 2;
	scatterHeight = height;

	var scatterSvg = d3.select(".scatterDiv")
		.append("svg")
		.attr("id", "scatterSvg")
		.attr("width", scatterWidth)
		.attr("height", scatterHeight);
};
