/* Name: Eline Rietdijk
Studentnumber: 10811834

'createSunBurst.js'
This script......*/

var sunSvg;
var xSun;
var ySun;
var arc;
var radius;
var times;
var sunburstData;
var colorSun;
var partition;
var sunSvg;
var arc;

function createSun(sunBurstData, currentCountry) {

	sunburstData = sunBurstData
	var sunData = sunburstData[currentYear][currentCountry]

	var legendaMarginSun = 300;
	
	sunWidth = width * 0.44 - margin.left - margin.right - legendaMarginSun;
	sunHeight = height / 2 - margin.top - margin.bottom;

	radius = (Math.min(sunWidth, sunHeight) / 2 + 25)


	xSun = d3.scale.linear()
		.range([0, 2 * Math.PI])

	ySun = d3.scale.sqrt()
		.range([0, radius])



	arc = d3.svg.arc()
		.startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, xSun(d.x))); })
		.endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, xSun(d.x + d.dx))); })
		.innerRadius(function(d) { return Math.max(0, ySun(d.y)); })
		.outerRadius(function(d) { return Math.max(0, ySun(d.y + d.dy)); });

	sunSvg = d3.select(".sunDiv")
		.append("svg")
		.attr("id", "sunSvg")
		.attr("width", sunWidth + margin.left + margin.right + legendaMarginSun)
		.attr("height", sunHeight + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + (sunWidth / 1.6 + legendaMarginSun) + "," + sunHeight / 1.6 + ")");

	sunSvg.append("g")
		.attr("transform", "translate(" + (- sunWidth * 1.7) + "," + (-135) + ")")
		.attr("class", "legendG")

	updateSunburst(currentCountry, currentYear)

	d3.select(self.frameElement).style("height", sunHeight + "px")
};

function clickSun(d) {

	sunSvg.transition()
		.duration(750)
		.tween("scale", function() {
			var xdSun = d3.interpolate(xSun.domain(), [d.x, d.x + d.dx]),
				ydSun = d3.interpolate(ySun.domain(), [d.y, 1]),
				yrSun = d3.interpolate(ySun.range(), [d.y ? 20 : 0, radius]);
			return function(t) { 
				xSun.domain(xdSun(t));
				ySun.domain(ydSun(t)).range(yrSun(t)); 
			};
		})
		.selectAll(".sunPath")
			.attrTween("d", function(d) { return function() { return arc(d); }; })	

	updateLegendaSun(d)
}

function updateSunburst(currentCountry, currentYear) {

	sunData = sunburstData[currentYear][currentCountry];

	if(!sunData) {
		sunSvg.selectAll("path").style("opacity", 0)
		showMissingData(currentCountry, currentYear, sunSvg)
	}
	else {

		console.log(sunData)
		sunSvg.selectAll("path").style("opacity", 1)
		sunSvg.select(".missingDataText").remove()
		colorSun = d3.scale.category20c();

		var formatNumber = d3.format(",d")

		partition = d3.layout.partition()
			.value(function(d) { return d.size; });

		sunPaths = sunSvg.selectAll(".sunPath")
			.data(partition.nodes(sunData))

	
		sunPaths.enter().append("path")
			.attr("class", "sunPath")
			.style("fill", function(d) { return colorSun(d.name); })
			.on("click", clickSun)
			.append("title")
			.text(function(d) { return d.name + "\n" + formatNumber(d.value); });

		sunPaths.exit().remove();

		sunPaths.transition()
			.duration(750)
			.attr("d", arc)
			.attr("data-name", function(d) {return d.name})
			.attr("data-value", function(d) {return d.value})

		updateLegendaSun(sunData)
	}
}

function updateLegendaSun(rootSun) {

	legend = sunSvg.select(".legendG")

	categoriesSun = []

	console.log(rootSun["children"])

	if(rootSun["children"]) {
		for(var i = 0; i < rootSun["children"].length; i ++) {
			if(rootSun["children"][i].size !== 0){
				// console.log("hallo")
				categoriesSun.push(rootSun["children"][i].name)
			}
			else {
				console.log(rootSun["children"][i].name)
			}
		}
	}
	else {
		categoriesSun.push(rootSun.name)
	}

	colorBoxes = legend.selectAll(".colorBox")
		.data(categoriesSun)

	colorBoxes.exit().remove();

	console.log(categoriesSun)

	colorBoxes.enter().append("rect")
		.attr("class", "colorBox")
		.attr("width", 20)
		.attr("height", 20)
	
	colorBoxes.transition().duration(500)
		.delay(function(d, i) {return i * 50})
		.attr("x", 0)
		.attr("y", function(d, i) {return 0 + 25 * i})
		.style("fill", function(d) {return colorSun(d)})

	textBoxes = legend.selectAll(".textBox")
		.data(categoriesSun)

	textBoxes.exit().remove();

	textBoxes.enter().append("text")
		.attr("class", "textBox")

	textBoxes.transition().duration(500)
		.delay(function(d, i) {return i * 50})
		.attr("x", 25)
		.attr("y", function(d, i) {return 13 + 25 * i})
		.text(function(d) { return d; })
}

