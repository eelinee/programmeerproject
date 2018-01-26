/* Name: Eline Rietdijk
Studentnumber: 10811834

'createLineGraph.js'
This script......*/

var graphSvg;
var lines;
var originalKeys;
var graphHeight;
var currentDataGraph;

function createGraph(hygieneData) {

	var legendaMarginLine = 140

	// determine graphWidth and Height based on width and height
	graphWidth = width * 0.44 - margin.left - margin.right - legendaMarginLine;
	graphHeight = height / 2 - margin.top - margin.bottom;

	// create x scale function. Ordinal, since x- variable is ordinal
	xGraph = d3.scale.linear()
		.range([0, graphWidth])

	// create y scale function. Linear, since y- variable is linear
	yGraph = d3.scale.linear()
		.range([0, graphHeight]);

	// select div and create svg with appriopriate width and height
	graphSvg = d3.select(".graphDiv")
		.append("svg")
		.attr("id", "graphSvg")
		.attr("width", graphWidth + margin.left + margin.right + legendaMarginLine)
		.attr("height", graphHeight + margin.bottom + margin.top)
		
		// append g element with predefined margins
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	
	currentDataGraph = hygieneData[currentCountry]

	// determine components of current data
	dataInfo = findInfo(currentDataGraph)
	min = dataInfo[0]
	max = dataInfo[1]
	missing = dataInfo[2]
	originalKeys = dataInfo[3]

	yDomainLine = [max, min]
	xDomainLine = [2000, 2015]
	
	// create components of the graph
	var lableText = ["Years", "Percentage of population"]
	graphAxes = createAxes(graphSvg, hygieneData[currentCountry], xGraph, yGraph, graphHeight, graphWidth, lableText, xDomainLine, yDomainLine, tickYears, tickPercentage, "graph")
	createLegenda(graphSvg, originalKeys)
	lines = createLines(hygieneData, originalKeys)
	// createInteractivity(graphSvg)


};


function createLines(hygieneData, categories) {

	var data = hygieneData[currentCountry]
	data = Object.values(data)

	// console.log("eerste", data)

	// var newLine = d3.svg.line()
	// 	.x(function(d) {return x(+d.Year)})
	// 	.y(function(d) {return y(+d[category])});

	lines = {}

	console.log(hygieneData)


	for(var i = 0; i < originalKeys.length; i ++) {
		lines[categories[i]] = d3.svg.line()
			.x(function(d) {return xGraph(+d.Year)})
			.y(function(d) {return yGraph(+d[categories[i]])});

		graphSvg.append("svg:path")
			.attr("class", "graphLine")
			.attr("id", "line" + i)
			.attr("d", lines[categories[i]](data))
			.style("stroke", function(d) {return lineColors(categories[i])})
	}

	// console.log(lines[categories[0]](data))
	

	// if(missing[category]) {
	// 		for(var i = 0; i < missing[category].length; i ++) {
	// 			delete data[missing[category][i]]
	// 		}
	// 	}


	// graphSvg.append("svg:path")
	// 	.attr("class", "graphLine")
	// 	.attr("id", "line" + category)
	// 	.attr("d", newLine(data))
	// 	.style("stroke", function(d) {return lineColors(category)})

	return lines
}


function createLegenda(graphSvg, originalKeys) {

	graphSvg.selectAll(".legendaColorbox")
		.data(originalKeys)
		.enter().append("rect")
		.attr("class", "legendaColorbox")
		.attr("x", graphWidth + 20)
		.attr("y", function(d, i) {return 15 + 50 * i})
		.attr("width", 20)
		.attr("height", 20)
		.style("fill", function(d) {return lineColors(d)})

	graphSvg.selectAll(".legendaText1")
		.data(originalKeys)
		.enter().append("text")
		.attr("class", "legendaText1")
		.attr("x", graphWidth + 47)
		.attr("y", function(d, i) {return 20 + 50 * i})
		.attr("width", 110)
		.attr("height", 20)
		.text(function(d) {
			var words = d.split(" ")
			if(words[2] == "to") {
				words = words.splice(0, 3)
			}
			else {
				words = words.splice(0, 2)
			}
			words = words.join(" ")
			return words
		})
		.style("text-anchor", "start")
		.style("font-size", 12)

	graphSvg.selectAll(".legendaText2")
		.data(originalKeys)
		.enter().append("text")
		.attr("class", "legendaText2")
		.attr("x", graphWidth + 47)
		.attr("y", function(d, i) {return 40 + 50 * i})
		.attr("width", 110)
		.attr("height", 20)
		.text(function(d) {
			var words = d.split(" ")
			if(words[2] == "to") {
				words = words.splice(3)
			}
			else {
				words = words.splice(2)
			}
			words = words.join(" ")
			return words
		})
		.style("text-anchor", "start")
		.style("font-size", 12)

}

function findInfo(currentDataGraph) {
	
	// initialize variable to store the max value and missing values
	var max;
	var min;
	var missing = {};

	// get the key names in one year (variables are same for each year)
	currentKeys = Object.keys(currentDataGraph["2000"])

	// remember index for the key of "year", this value doesn't count for max
	var index = currentKeys.indexOf("Year")
	currentKeys.splice(index, 1)

	// loop through all variables of currentDataGraph
	for(var i = 2000; i < 2016; i ++) {
		for(var j = 0; j < currentKeys.length; j ++) {

			if (!max || parseInt(currentDataGraph[i][currentKeys[j]]) > max) {

					// this value is the new maximum
					max = currentDataGraph[i][currentKeys[j]]
				}
			if (!min || parseInt(currentDataGraph[i][currentKeys[j]]) < min) {
				min = currentDataGraph[i][currentKeys[j]]
			}
			if (currentDataGraph[i][currentKeys[j]] === "") {
				if(!missing[currentKeys[j]]) {
					missing[currentKeys[j]] = []
				}
				missing[currentKeys[j]].push(i)
			}
		}
		
	}

	if(parseInt(min) > 10) {
		min = parseInt(min) - 10
	}
	else {
		min = 0
	}
	if(parseInt(max) < 95) {
		max = parseInt(max) + 5
	}
	else {
		max = 100
	}

	// console.log(missing)
	return [min, max, missing, currentKeys]
}

// function updateLine(clickedDot) {

// 	currentCountry = clickedDot["id"]
// 	currentDataGraph = hygieneData[currentCountry]

	

// 	// determine components of current data
// 	dataInfo = findInfo(currentDataGraph)
// 	min = dataInfo[0]
// 	max = dataInfo[1]
// 	missing = dataInfo[2]
// 	currentKeys = dataInfo[3]

// 	// update domain
// 	yGraph.domain([max, min])

// 	// update y-axis
// 	graphSvg.select("#ygraph")
// 		.transition().duration(500)
// 		.call(graphAxes[1])

// 	currentDataGraph = Object.values(currentDataGraph)
// 	console.log(lines[currentKeys[0]](currentDataGraph))

// 	console.log("tweede", currentDataGraph)


// 	for(var i = 0; i < originalKeys.length; i ++) {
// 		if(currentKeys.indexOf(originalKeys[i]) >= 0) {

// 			line = graphSvg.select("#line" + i)
// 				.transition().duration(750)
// 				.attr("d", lines[currentKeys[i]](currentDataGraph))
// 				.style("opacity", 1)
// 			}
// 		else {
// 			d3.select("#line" + i)
// 				.style("opacity", 0)
// 		}
// 	}

// }

// function createInteractivity(graphSvg) {
// 	mouseG = graphSvg.append("g")
// 		.attr("class", "mouseG");

// 	mouseG.append("line")
// 		.attr("class", "pointerLine")
// 		.attr("x1", 20)
// 		.attr("x2", 20)
// 		.attr("y1", 0)
// 		.attr("y2", graphHeight);

// 	// mouseG.selectAll(".pointerCircle")
// 	// 	.data(hygieneData).enter()
// 	// 	.append("circle")
// 	// 	.attr("class","pointerCircle")
// 	// 	.attr("cx", )

// 	mouseG.append("rect")
// 		.attr("width", graphWidth + margin.left + margin.right)
// 		.attr("height", graphHeight + margin.bottom + margin.top)
// 		.attr("fill", "none")
// 		.attr("pointer-events", "all")
// 		.on("mouseout", function() {
// 			mouseG.select(".pointerLine")
// 				.style("opacity", 0)
// 			mouseG.selectAll(".pointerCircle")
// 				.style("opacity", 0)
// 			mouseG.selectAll(".pointerText")
// 				.style("opacity", 0)
// 		})

// 		.on("mousemove", function() {
// 			handleMouseMove(d3.mouse(this), xGraph, yGraph, mouseG)
// 		});
// }		

// function handleMouseMove(coordinates, x, y, mouseG) {

// 	mouseG.select(".pointerLine")
// 		.attr("x1", coordinates[0])
// 		.attr("x2", coordinates[0])

// 	console.log(currentDataGraph)
// 	closest = currentDataGraph[2000]
// 	console.log(xGraph(2000))
// 	console.log(xGraph(2001))
// 	console.log(xGraph(+currentDataGraph[2000]["Year"]))
// 	console.log(coordinates[0])

// 	for(var i = 2000; i < 2016; i ++) {
// 		if ((Math.abs(xGraph(+currentDataGraph[i]["Year"])) - coordinates[0]) <
// 			(Math.abs(xGraph(+closest["Year"])) - coordinates[0])) {
// 			console.log("current:")
// 			console.log(+closest["Year"])
// 			closest = currentDataGraph[i]
// 			console.log("closer:")
// 			console.log(+closest["Year"])
// 		}
// 		else {
// 			console.log(closest)
// 		}
// 	}
// }
