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
var arc;
var sunPaths;
var sunColors;
var sunTip;

function createSun(sunBurstData, currentCountry) {

	
	sunburstData = sunBurstData
	var sunData = sunburstData[currentYear][currentCountry]


	var legendaMarginSun = 300;
	var titleDivMargin = 70;
	
	sunWidth = width * 0.44 - margin.left - margin.right - legendaMarginSun;
	sunHeight = height * 0.6 - titleDivMargin - margin.top - margin.bottom;

	radius = (Math.min(sunWidth, sunHeight) / 2 + 25)
	colorSun = d3.scale.category20c();


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
		.attr("transform", "translate(" + (- sunWidth * 1.7) + "," + (-200) + ")")
		.attr("class", "legendG")

	updateSunburst(currentCountry, currentYear)

	d3.select(self.frameElement).style("height", sunHeight + "px")

	sunTip = d3.tip()
		.attr("class", "tip")
		.offset([0,0])
		.html(function(d) {
			return "<p><h4>" + d.name + "</h4></p><p><text>" 
				+ d.value + " deaths</text></p>"
		})

	sunSvg.call(sunTip);
};

function createSunColors(data) {


	var sunColors = []
	var scaleColorsStart = ["#1c9099", "#cb181d", "#fd8d3c", "#e6550d", "#810f7c", "#aa6e28", "#911eb4", "#084594", "#08519c", "#6a51a3", "#31a354", "#911eb4", "#e6550d", "#de2d26", "#807dba", "#911eb4", "#e6194b", "#0082c8", "#005a32"]
	var scaleColorsEnd = ["#f6eff7", "#fff5f0", "#fdd0a2", "#fee6ce", "#88419d", "#fffac8", "#e6beff", "#f7fbff", "#eff3ff", "#f2f0f7", "#e5f5e0", "#e6beff", "#fee6ce", "#fcae91", "#dadaeb", "#e6beff", "#fabebe", "#aaffc3", "#f7fcf5"]

	var categories = [];

	var counter = 1

	for(var i = 0; i < data.children.length; i ++) {
		console.log("HIER LOG IK DAT ENE", i, data.children[i].children)
		categories.push(data.children[i].collectiveName)
		var domain = [0, data.children[i].children.length]
		var color = d3.scale.linear().domain(domain)
		// .interpolate(d3.interpolateHcl)
      	.range([d3.rgb(scaleColorsStart[i]), d3.rgb(scaleColorsEnd[i])]);
		sunColors[data.children[i].collectiveName] = color
	}

	return sunColors
}

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



	var sunData = sunburstData[currentYear][currentCountry];
	sunColors = createSunColors(sunData)

	if(!sunData) {
		sunSvg.selectAll("path").style("opacity", 0)
		sunSvg.selectAll(".textBox").style("opacity", 0)
		sunSvg.selectAll(".textBox2").style("opacity", 0)
		sunSvg.selectAll(".colorBox").style("opacity", 0)
		updateTitle("not available")
	}
	else {

		updateTitle("available")
		sunSvg.selectAll("path").style("opacity", 1)
		sunSvg.selectAll(".textBox").style("opacity", 1)
		sunSvg.selectAll(".textBox2").style("opacity", 1)
		sunSvg.selectAll(".colorBox").style("opacity", 1)
		sunSvg.select(".missingDataText").remove()
		
		var formatNumber = d3.format(",d")

		var partition = d3.layout.partition()
			.value(function(d) { return d.size; });

		sunPaths = sunSvg.selectAll(".sunPath")
				.data(partition.nodes(sunData))

		sunPaths.remove();

		sunPaths = sunSvg.selectAll(".sunPath")
			.data(partition.nodes(sunData))

var counter;
var previousCollectiveName = "All deaths"

var thisColor;
	
		sunPaths.enter().append("path")
			.attr("class", "sunPath")
			.style("fill", function(d, i) {
				if(!d.collectiveName) {
					return "#f5f5f5"
				}
				else {
					if(d.collectiveName != previousCollectiveName) {
						counter = 0
					}
					previousCollectiveName = d.collectiveName
					counter += 1
					return sunColors[d.collectiveName](counter - 1); }
				})
			.on("click", clickSun)
			.on("mouseover", function(d) {
				var self = this
				thisColor = self.style.fill

				d3.selectAll(".sunPath").filter(function(x) {return self != this; })
					.style("opacity", .2)

				d3.select(this).style("fill", function(d) {
					if(!d.collectiveName) {
						return "#5f5f5f"
					}
					else {
						return sunColors[d.collectiveName](0)}
					})

				sunTip.show(d)
			})
			.on("mouseout", function(d) {
				d3.selectAll(".sunPath")
					.style("opacity", 1)
				d3.select(this).style("fill", thisColor)
					.style("stroke", "#ffffff")

				sunTip.hide(d);
			})

		sunPaths
			.attr("d", arc)
			.attr("data-name", function(d) {return d.name})
			.attr("data-value", function(d) {return d.value})

		updateLegendaSun(sunData)
	}
}

function updateLegendaSun(rootSun) {



	var legend = sunSvg.select(".legendG")

	var categoriesSun = []

	console.log(rootSun["children"])

	if(rootSun["children"]) {
		for(var i = 0; i < rootSun["children"].length; i ++) {
			if(categoriesSun.length < 9) {
				if(rootSun["children"][i].size !== 0){
					categoriesSun.push({"name": rootSun["children"][i].name, "collectiveName": rootSun["children"][i].collectiveName})
				}
				else {
					console.log(rootSun["children"][i].name)
				}
			}			
		}
	}
	else {
		categoriesSun.push({"name": rootSun.name, "collectiveName": rootSun.collectiveName})
	}

	var colorBoxes = legend.selectAll(".colorBox")
		.data(categoriesSun)

	colorBoxes.exit().remove();

	colorBoxes.enter().append("rect")
		.attr("class", "colorBox")
		.attr("width", 20)
		.attr("height", 30)
		.on("mouseover", function(d) {
			var self = this
			var allPaths = d3.selectAll(".sunPath")
			var filteredPaths = d3.selectAll(".sunPath").filter(function(x) { return x.collectiveName != self["id"]})
			if(filteredPaths[0].length == allPaths[0].length) {
				filteredPaths = d3.selectAll(".sunPath").filter(function(x) {return x.name != self["id"]})
			}
			filteredPaths.style("opacity", .2)
		})
		.on("mouseout", function(d) {
			d3.selectAll(".sunPath")
				.style("opacity", 1)
		})

	
	colorBoxes.transition().duration(500)
		.delay(function(d, i) {return i * 50})
		.attr("x", 0)
		.attr("y", function(d, i) {return 40 + 35 * i})
		.attr("id", function(d) {return d.name})
		.style("fill", function(d, i) {
			if(i == 0) {
				previousCollectiveName = "All deaths"
			}
			if(d.collectiveName != previousCollectiveName) {
						counter = 0
				}
			previousCollectiveName = d.collectiveName
			counter += 1
			return sunColors[d.collectiveName](counter - 1)
		})

	var textBoxes = legend.selectAll(".textBox")
		.data(categoriesSun)

	textBoxes.exit().remove();

	textBoxes.enter().append("text")
		.attr("class", "textBox")

	var textBoxes2 = legend.selectAll(".textBox2")
		.data(categoriesSun)

	textBoxes2.exit().remove();

	textBoxes.transition().duration(500)
		.delay(function(d, i) {return i * 50})
		.attr("x", 25)
		.attr("y", function(d, i) {return 53 + 35 * i})
		.attr("dy", "0em")
		.text(function(d) { return wrapText(d.name, 4)[0]; })

	textBoxes2.enter().append("text")
		.attr("class", "textBox2")

	textBoxes2.transition().duration(500)
		.delay(function(d, i) { return i * 50 })
		.attr("x", 25)
		.attr("y", function(d, i) {return 53 + 35 * i})
		.attr("dy", "1em")
		.text(function(d) { return wrapText(d.name, 4)[1]})




}

function wrapText(string, maxWords) {
	var string = string.split(" ")
	var stringLength = string.length
	if(string.length > maxWords) {
		var string1 = string.splice(0, maxWords)
		var string2 = string
		string1 = string1.join(" ")
		string2 = string2.join(" ")

		return [string1, string2]
	}
	else {
		return [string.join(" "), " "]
	}
}