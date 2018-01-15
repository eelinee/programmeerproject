/* Name: Eline Rietdijk
Studentnumber: 10811834

'createSunBurst.js'
This script......*/

function createSun(diseaseData) {
	console.log("SUNBURST")
	
	sunWidth = width / 2.5;
	sunHeight = height / 2;

	var sunSvg = d3.select(".sunDiv")
		.append("svg")
		.attr("id", "sunSvg")
		.attr("width", sunWidth)
		.attr("height", sunHeight);
};