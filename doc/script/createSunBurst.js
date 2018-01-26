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
var currentYear;
var colorSun;
var partition;
var sunSvg;
var arc;

function createSun(sunBurstData, currentCountry, currenTYear) {
	currentYear = currenTYear;
	sunburstData = sunBurstData
	var sunData = sunburstData[currentYear][currentCountry]

	var legendaMarginSun = 0;
	
	sunWidth = width * 0.44 - margin.left - margin.right - legendaMarginSun;
	sunHeight = height / 2 - margin.top - margin.bottom;

	radius = (Math.min(sunWidth, sunHeight) / 2) - 10

	var formatNumber = d3.format(",d")

	xSun = d3.scale.linear()
		.range([0, 2 * Math.PI])

	ySun = d3.scale.sqrt()
		.range([0, radius])

	colorSun = d3.scale.category20c();

	partition = d3.layout.partition()
		.value(function(d) { return d.size; });

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
		.attr("transform", "translate(" + sunWidth / 2 + "," + (sunHeight / 2) + ")");

	sunSvg.selectAll(".sunPath")
		.data(partition.nodes(sunData))
		.enter().append("path")
		.attr("class", "sunPath")
		.attr("d", arc)
		.style("fill", function(d) { return colorSun(d.name); })
		.on("click", clickSun)
		.append("title")
		.text(function(d) { return d.name + "\n" + formatNumber(d.value); });

	// d3.select(self.frameElement).style("height", sunHeight + "px")
};

function clickSun(d) {
	sunSvg.transition()
		.duration(750)
		.tween("scale", function() {
			var xdSun = d3.interpolate(xSun.domain(), [d.x, d.x + d.dx]),
				ydSun = d3.interpolate(ySun.domain(), [d.y, 1]),
				yrSun = d3.interpolate(ySun.range(), [d.y ? 20 : 0, radius]);
				console.log(xdSun())
			return function(t) { 
				xSun.domain(xdSun(t)); 
				console.log(xdSun(t))
				ySun.domain(ydSun(t)).range(yrSun(t)); 
			};
		})
		.selectAll(".sunPath")
			.attrTween("d", function(d) { return function() { return arc(d); }; })	
}

function updateSunburst(currentCountry) {
	sunData = sunburstData[currentYear][currentCountry];
	var sunPaths = sunSvg.selectAll(".sunPath")
		.data(partition.nodes(sunData))

	sunPaths.exit().remove();

	sunPaths.transition().duration(750)
		.attr("d", arc)
		.attr("data-name", function(d) {return d.Name})
		.attr("data-value", function(d) {return d.Value})
	// 	.style("fill", function(d) { return colorSun(d.Name)})
}

