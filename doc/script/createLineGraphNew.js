/* Name: Eline Rietdijk
Studentnumber: 10811834

'createLineGraph.js'
This script......*/

var lineGraphData;
var graphSvg;
var newLine;
var graphAxes;
var colorsGraph;
var currentDataGraph;
var mouseG;

function createGraph(hygieneData, currentCountry, currentYear) {
	lineGraphData = hygieneData

	var legendaMarginGraph = 140;

	// determine graphWidth and Height based on width and height
	graphWidth = width * 0.44 - margin.left - margin.right - legendaMarginGraph;
	graphHeight = height / 2 - margin.top - margin.bottom;

	// create x scale function. Ordinal, since x- variable is ordinal
	xGraph = d3.scale.linear()
		.range([0, graphWidth])

	// create y scale function. Linear, since y- variable is linear
	yGraph = d3.scale.linear()
		.range([0, graphHeight]);

	// select div and create svg with appropriate width and height
	graphSvg = d3.select(".graphDiv")
		.append("svg")
		.attr("id", "graphSvg")
		.attr("width", graphWidth + margin.left + margin.top + legendaMarginGraph)
		.attr("height", graphHeight + margin.bottom + margin.top)

	// append g element with predefined margins
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	currentDataGraph = lineGraphData[currentCountry]
	console.log(lineGraphData)

	xDomainGraph = [2000, 2015]
	yDomainGraph = [100, 60]

	// create components of the graph
	var lableTextGraph = ["Years", "Percentage of Population"]
	graphAxes = createAxes(graphSvg, currentDataGraph, xGraph, yGraph, graphHeight, graphWidth, lableTextGraph, xDomainGraph, yDomainGraph, tickYears, tickPercentage, "graph")

	newLine = d3.svg.line()
		.x(function(d) {return xGraph(d.Year)})
		.y(function(d) {return yGraph(d.Value)})
		.interpolate("monotone")

	colorsGraph = d3.scale.category10();

	graphSvg.selectAll(".line")
		.data(currentDataGraph)
		.enter().append("path")
		.attr("class", "line")
		.style("stroke", function(d) {return colorsGraph(d.Id)})

	createLegenda(graphSvg, currentDataGraph);
	createInteractivityGraph(graphSvg, currentDataGraph, currentYear);
	updateGraph(currentCountry);

}

function updateGraph(clickedCountry) {
	currentDataGraph = lineGraphData[clickedCountry]

	for(var i = 0; i < currentDataGraph.length; i ++) {
		if(!currentDataGraph[i]["Values"]) {
			currentDataGraph.splice(i, 1);
		}
	}

	yNewMinGraph = ([
		d3.min(currentDataGraph, function(c) { return d3.min(c.Values, function(d) { return d.Value; }); })
	]);

	if(yNewMinGraph < 60) {
		yGraph.domain([100, yNewMinGraph])
	}
	else {
		yGraph.domain([100, 60])
	}

	graphSvg.select("#ygraph")
			.transition().duration(500)
			.call(graphAxes[1]);

	var lines = graphSvg.selectAll(".line")
		.data(currentDataGraph)

	lines.exit().remove()

	lines.enter().append("path")
		.attr("class", "line")
		.style("stroke", function(d) {return colorsGraph(d.Id)})

	// var transition = graphSvg.transition().duration(100000000), 
	// 	delay = function(d, i) {return i * 50};

	lines.transition()
		.duration(1000)
		.delay(function(d, i) {return i * 50})
		.attr("d", function(d) {return newLine(d.Values)} )

	handleMouseMove([xGraph(currentYear), 0], mouseG)

	
}

function createLegenda(graphSvg, currentDataGraph) {

	graphSvg.selectAll(".legendaColorbox")
		.data(currentDataGraph)
		.enter().append("rect")
		.attr("class", "legendaColorbox")
		.attr("x", graphWidth + 20)
		.attr("y", function(d, i) {return 15 + 50 * i})
		.attr("width", 20)
		.attr("height", 20)
		.style("fill", function(d) {return colorsGraph(d.Id)})

	graphSvg.selectAll(".legendaText1")
		.data(currentDataGraph)
		.enter().append("text")
		.attr("class", "legendaText1")
		.attr("x", graphWidth + 47)
		.attr("y", function(d, i) {return 20 + 50 * i})
		.attr("width", 110)
		.attr("height", 20)
		.text(function(d) {
			var words = d.Id.split(" ")
			if(words[2] != "facilities") {
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
		.data(currentDataGraph)
		.enter().append("text")
		.attr("class", "legendaText2")
		.attr("x", graphWidth + 47)
		.attr("y", function(d, i) {return 40 + 50 * i})
		.attr("width", 110)
		.attr("height", 20)
		.text(function(d) {
			var words = d.Id.split(" ")
			if(words[2] != "facilities") {
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

function createInteractivityGraph(graphSvg, currentDataGraph, currentYear) {

	mouseG = graphSvg.append("g")
		.attr("class", "mouseG")

	mouseG.append("line")
		.attr("class", "mouseLine")
		// .attr("x1", xGraph(currentYear))
		// .attr("x2", xGraph(currentYear))
		.attr("y1", 0)
		.attr("y2", graphHeight)
		.style("stroke", "black")
		.style("stroke-width", 1)
		.style("opacity", 1);

	var mousePerLine = mouseG.selectAll(".mousePerLine")
		.data(currentDataGraph)
		.enter().append("g")
		.attr("class", "mousePerLine")
		.attr("id", function(d, i) {return "mousePerLine" + i} );

	mousePerLine.append("circle")
		.attr("r", 7)
		.attr("id", function(d, i) {return "circle" + i})
		.style("stroke", function(d) { return colorsGraph(d.Id); })
		.style("fill", "none")
		.style("stroke-width", 1)
		.style("opacity", 1);

	mousePerLine.append("text")
		.attr("transform", "translate(10,3)");

	mouseG.append("rect")
		.attr("width", graphWidth)
		.attr("height", graphHeight)
		.attr("fill", "none")
		.attr("pointer-events", "all")
		.on("mouseout", function() {
			handleMouseMove([xGraph(currentYear), 0], mouseG)
		})
		.on("mousemove", function(d) {
			handleMouseMove(d3.mouse(this), mouseG)

		});
}

function handleMouseMove(coordinates, mouseG) {

	mouseG.select(".mouseLine")
		.attr("x1", coordinates[0])
		.attr("x2", coordinates[0])

	mouseG.selectAll(".mousePerLine circle")
		.data(currentDataGraph)
		// .transition().duration(1000)
		// .delay(function(d, i) {return i * 50})
		.attr("cx", coordinates[0])
		.attr("cy", function(d) {
			var closest = findClosestGraph(d, xGraph, coordinates)
			if(closest == 2000) {
				return closest
			}
			return yGraph(+closest.Value)
		})
	mouseG.selectAll(".mousePerLine text")
		.data(currentDataGraph)
		.attr("x", coordinates[0])
		.attr("y", function(d) {
			var closest = findClosestGraph(d, xGraph, coordinates)
			if(closest == 2000) {
				return closest
			}
			return yGraph(+closest.Value)
		})
		.text(function(d) {
			closest = findClosestGraph(d, xGraph, coordinates)
			try {
				return closest.Value + "%"
			}
			catch(err) {
				return "2000"
			}
		})
	if(currentDataGraph.length < 4) {
		mouseG.select("#mousePerLine3")
			.attr("cy", 2000)
	}
}

function findClosestGraph(d, xGraph, coordinates) {
	var closest = d.Values[0]
	for(var i = 0; i < d.Values.length; i ++) {
		if(Math.abs(xGraph(+closest.Year) - coordinates[0]) > Math.abs(xGraph(+d.Values[i].Year) - coordinates[0])) {
			closest = d.Values[i]
		}
	}
	if(Math.abs(xGraph(+closest.Year) - coordinates[0]) > 15) {
		return 2000
	}
	else {
		return closest
	}

}
