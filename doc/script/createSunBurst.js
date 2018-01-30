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

function createSun(sunBurstData, currentCountry) {

	
	sunburstData = sunBurstData
	var sunData = sunburstData[currentYear][currentCountry]
	console.log("HIER IN DE Sun", sunData)
	console.log("HIER IN DE Sun", sunData.children[0])
	sunColors = createSunColors(sunData)


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
};

function createSunColors(data) {

	console.log("HOOOOI", data.children[0])

	var sunColors = []
	var scaleColorsStart = ["#aa6e28", "#3cb44b", "#ffe119", "#0082c8", "#3cb44b", "#800000", "#ffe119", "#0082c8", "#3cb44b", "#800000", "#ffe119", "#0082c8", "#3cb44b", "#800000", "#ffe119", "#0082c8", "#3cb44b", "#800000", "#ffe119", "#0082c8"]
	var scaleColorsEnd = ["#fffac8"]

	var categories = [];

	var counter = 1

	for(var i = 0; i < data.children.length; i ++) {
		categories.push(data.children[i].collectiveName)
		var domain = [0, data.children[i].children.length]
		console.log("HET DOMAIN VAN RONDE ", i, domain)
		var color = d3.scale.linear().domain(domain)
		// .interpolate(d3.interpolateHcl)
      	.range([d3.rgb(scaleColors[i]), d3.rgb('#ffffff')]);
		sunColors[data.children[i].collectiveName] = color
		// if(data.children[i].children.length != 0) {
		// 	counter += data.children[i].children.length + 1
		// }
		// console.log("KINDERLENGTE ", data.children[i].children.length)
		// console.log("IN RONDE ", i + 1, "ZITTEN WE OP COUNTER ", counter)
	}

	console.log("HALLOOOO", sunColors)
	console.log("HALSAKLJALADHF", sunColors["Neoplasms"])
	console.log(categories)

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

	console.log("ON CLICK GEBEURTENIS", d)	

	updateLegendaSun(d)
}

function updateSunburst(currentCountry, currentYear) {



	var sunData = sunburstData[currentYear][currentCountry];
	// console.log("UPDATE GEBEURTENIS", sunData)

	if(!sunData) {
		sunSvg.selectAll("path").style("opacity", 0)
		sunSvg.selectAll(".textBox").style("opacity", 0)
		sunSvg.selectAll(".textBox2").style("opacity", 0)
		sunSvg.selectAll(".colorBox").style("opacity", 0)
		updateTitle("not available")
		console.log("niet aanwezig")
	}
	else {

		updateTitle("available")
		console.log("wel aanwezig")
		console.log("DE DATA", sunData)
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

	
		sunPaths.enter().append("path")
			.attr("class", "sunPath")
			.style("fill", function(d, i) {
				console.log("HIER!!!!", d.name, i); 
				if(!d.collectiveName) {
					return colorSun(d.name)
				}
				else {
					console.log(i)
					if(d.collectiveName != previousCollectiveName) {
						counter = 0
					}
					previousCollectiveName = d.collectiveName
					counter += 1
					return sunColors[d.collectiveName](counter - 1); }
				})
			.on("click", clickSun)
			.append("title")
			.text(function(d) { return d.name + "\n" + formatNumber(d.value); });


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
					categoriesSun.push(rootSun["children"][i].name)
				}
				else {
					console.log(rootSun["children"][i].name)
				}
			}			
		}
	}
	else {
		categoriesSun.push(rootSun.name)
	}

	var colorBoxes = legend.selectAll(".colorBox")
		.data(categoriesSun)

	colorBoxes.exit().remove();

	console.log(categoriesSun)

	colorBoxes.enter().append("rect")
		.attr("class", "colorBox")
		.attr("width", 20)
		.attr("height", 30)
	
	colorBoxes.transition().duration(500)
		.delay(function(d, i) {return i * 50})
		.attr("x", 0)
		.attr("y", function(d, i) {return 40 + 35 * i})
		.style("fill", function(d) {return colorSun(d)})

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
		.text(function(d) { console.log(wrapText(d, 5)); return wrapText(d, 4)[0]; })

	textBoxes2.enter().append("text")
		.attr("class", "textBox2")

	textBoxes2.transition().duration(500)
		.delay(function(d, i) { return i * 50 })
		.attr("x", 25)
		.attr("y", function(d, i) {return 53 + 35 * i})
		.attr("dy", "1em")
		.text(function(d) { return wrapText(d, 4)[1]})




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