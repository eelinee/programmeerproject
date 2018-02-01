/* Name: Eline Rietdijk
Studentnumber: 10811834

'createLineGraph.js'
This script......*/

var dataGraph;
var graphSvg;
var newLine;
var graphAxes;
var colorsGraph;
var currentDataGraph;
var mouseG;
var xGraph;
var yGraph;

/*
* This function initializes the creation of the line graph and is called from 
* the createVisualisation function in "project.js".
* Input arguments
*	- hygieneData: data that will be displayed in the line graph
*/
function createGraph(hygieneData) {

	var legendaMarginGraph = 140,

	// determine graphWidth and Height based on width and height
		graphWidth = width * 0.44 - margin.left - margin.right - legendaMarginGraph,
		graphHeight = height * 0.4 - margin.top - margin.bottom;

	dataGraph = hygieneData;
	currentDataGraph = hygieneData[currentCountry]

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


	// initialize standard domains and labeltext to create axes
	var xDomainGraph = [2000, 2015]
	var yDomainGraph = [100, 60]
	var lableTextGraph = ["Years", "Percentage of Population"]

	// create axes with createAxes function
	graphAxes = createAxes(graphSvg, currentDataGraph, xGraph, yGraph, 
		graphHeight, graphWidth, lableTextGraph, xDomainGraph, yDomainGraph, 
		tickYears, tickPercentage, "graph")

	// create newLine function to draw lines in the graph
	newLine = d3.svg.line()
		.x(function(d) {return xGraph(d.Year)})
		.y(function(d) {return yGraph(d.Value)})
		.interpolate("monotone")

	colorsGraph = d3.scale.category10();

	createLegenda(graphSvg, currentDataGraph, graphWidth);
	createInteractivityGraph(graphSvg, currentDataGraph, graphWidth, graphHeight);
	updateGraph(currentCountry);

}

/*
*This function updates the line graph to show data of the new country. This 
* function is called from 'createScatter.js', when a new country is clicked 
* in the dropdown menu or in the scatterplot 
* Input arguments
*	- clickedCountry: the country to show data of
*/
function updateGraph(clickedCountry) {
	currentDataGraph = dataGraph[clickedCountry]

	// remove missing data from current data list
	for(var i = 0; i < currentDataGraph.length; i ++) {
		if(!currentDataGraph[i]["Values"]) {
			currentDataGraph.splice(i, 1);
		}
	}

	// determine minimal y-value
	yNewMinGraph = ([
		d3.min(currentDataGraph, function(c) { 
			return d3.min(c.Values, function(d) { 
				return d.Value; 
			}); 
		})
	]);

	// if minimum y-value is outside standard domain, adjust domain
	if(yNewMinGraph < 60) {
		yGraph.domain([100, yNewMinGraph])
	}
	else {
		yGraph.domain([100, 60])
	}

	// update y-axis
	graphSvg.select("#ygraph")
			.transition().duration(500)
			.call(graphAxes[1]);

	var lines = graphSvg.selectAll(".line")
		.data(currentDataGraph)

	// remove unnessecary lines
	lines.exit().remove()

	// add new lines if needed
	lines.enter().append("path")
		.attr("class", "line")
		.style("stroke", function(d) {return colorsGraph(d.Id)})

	// update all lines with new data
	lines.transition()
		.duration(1000)
		.delay(function(d, i) {return i * 50})
		.attr("d", function(d) {return newLine(d.Values)} )

	// update interactive element with new data
	handleMouseMove([xGraph(currentYear), 0], mouseG)

	
}

/*
* This function creates a legenda for the line graph and is called from the 
* createGraph function is the current script. 
* Input arguments
*	- graphSvg: svg to append legenda
*	- currentDataGraph: data to base legenda on
*	- graphWidth: width of the graph 
*/
function createLegenda(graphSvg, currentDataGraph, graphWidth) {

	// append rect to contain color for each variable
	graphSvg.selectAll(".legendaColorbox")
		.data(currentDataGraph)
		.enter().append("rect")
		.attr("class", "legendaColorbox")
		.attr("x", graphWidth + 20)
		.attr("y", function(d, i) {return 15 + 50 * i})
		.attr("width", 20)
		.attr("height", 20)
		.style("fill", function(d) {return colorsGraph(d.Id)})

	// append text element to contain first line string of each variable
	graphSvg.selectAll(".legendaText1")
		.data(currentDataGraph)
		.enter().append("text")
		.attr("class", "legendaText1")
		.attr("x", graphWidth + 47)
		.attr("y", function(d, i) {return 20 + 50 * i})
		.attr("width", 110)
		.attr("height", 20)
		.text(function(d) {
			try {
				var words = d.Id.split(" ")
				if(words[2] != "facilities") {
					words = words.splice(0, 3)
				}
				else {
					words = words.splice(0, 2)
				}
				words = words.join(" ")
				return words
			}
			catch(err) {

			}
		})
		.style("text-anchor", "start")
		.style("font-size", 12)

	// append text element to contain second line string of each variable
	graphSvg.selectAll(".legendaText2")
		.data(currentDataGraph)
		.enter().append("text")
		.attr("class", "legendaText2")
		.attr("x", graphWidth + 47)
		.attr("y", function(d, i) {return 40 + 50 * i})
		.attr("width", 110)
		.attr("height", 20)
		.text(function(d) {
			try {
				var words = d.Id.split(" ")
				if(words[2] != "facilities") {
					words = words.splice(3)
				}
				else {
					words = words.splice(2)
				}
				words = words.join(" ")
				return words
			}
			catch(err) {

			}
		})
		.style("text-anchor", "start")
		.style("font-size", 12)
}

/*
* This function creates mouse action elements in the line graph. This function 
* is called from createGraph function in the current script when all components 
* of the line graph are created.
* Input arguments
*	- graphSvg: the svg to append mouse action elements
*	- currentDataGraph: data to base current action element positions on
*	- graphWidth: width of the line graph
*	- graphHeight: height of the line graph
*/
function createInteractivityGraph(graphSvg, currentDataGraph, graphWidth, graphHeight) {

	mouseG = graphSvg.append("g")
		.attr("class", "mouseG")

	// append vertical line to indicate current year and follow the mouse
	mouseG.append("line")
		.attr("class", "mouseLine")
		.attr("y1", 0)
		.attr("y2", graphHeight)
		.style("stroke", "black")
		.style("stroke-width", 1)
		.style("opacity", 1);

	// for each line, append a circle and text to follow the mouse 
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

	// append rect to catch mouse movements
	mouseG.append("rect")
		.attr("width", graphWidth)
		.attr("height", graphHeight)
		.attr("fill", "none")
		.attr("pointer-events", "all")

		// on mouseout, let the mouse elements indicate the current year
		.on("mouseout", function() {

			// call function that places all mouse elements in position
			handleMouseMove([xGraph(currentYear), 0], mouseG)
		})

		// on mousemove, let the mouse elements indicate the mouse position
		.on("mousemove", function(d) {

			// call function that places all mouse elements in position
			handleMouseMove(d3.mouse(this), mouseG)
		});
}

/*
* This function places all mouse elements in desired position and is called 
* from the updateGraph and createInteractivity functions in the current script.
* Input arguments:
*	- coorinates: coordinates to which the pointer elements should adjust.
*	- mouseG: g element containing the pointer elements
*/
function handleMouseMove(coordinates, mouseG) {


	mouseG.select(".mouseLine")
		.attr("x1", coordinates[0])
		.attr("x2", coordinates[0])

	mouseG.selectAll(".mousePerLine circle")
		.data(currentDataGraph)

		// set cx coordinates to mouse x-coordinate
		.attr("cx", coordinates[0])
		.attr("cy", function(d) {

			// find closest y-value for each line
			var closest = findClosestGraph(d, xGraph, coordinates)
			
			//if no close data for current line, set cy to 2000 (outside svg)
			if(closest == 2000) {
				return closest
			}

			// else, return closest value tranformed to coordinate
			return yGraph(+closest.Value)
		})


	mouseG.selectAll(".mousePerLine text")
		.data(currentDataGraph)

		// set x coordinates to mouse x-coordinate
		.attr("x", coordinates[0])
		.attr("y", function(d) {

			// find closest y-value for each line
			var closest = findClosestGraph(d, xGraph, coordinates)

			// if no close data for current line,  set y to 2000 (outside svg)
			if(closest == 2000) {
				return closest
			}

			// else, return closest value transformed to coordinate
			return yGraph(+closest.Value)
		})
		.attr("dy", "0.65em")
		.text(function(d) {

			var closest = findClosestGraph(d, xGraph, coordinates)

			// if closest was found, return value in percentage
			try {
				return closest.Value + "%"
			}

			// else, show no value
			catch(err) {
				return ""
			}
		})

	// if currentData contains only 3 variables, fourth is not available
	if(currentDataGraph.length < 4) {

		// do not show pointer elements for missing line
		mouseG.select("#mousePerLine3")
			.style("opacity", 0)
	}

	// if currentData contains more than 3 variables, fourth is available
	else {

		// show pointer elements again
		mouseG.select("#mousePerLine3")
			.style("opacity", 1)
	}
}

/* 
* This function finds the closest coordinates compared to desired coordinates 
* in a data array.
* Input variables
*	- d: data array to find closest coordinates in
*	- xGraph: function to transform values to coordinates
*	- coordinates: coordinates to find closest value for
*/
function findClosestGraph(d, xGraph, coordinates) {
	var closest = d.Values[0]

	for(var i = 0; i < d.Values.length; i ++) {
		if(Math.abs(xGraph(+closest.Year) - coordinates[0]) > Math.abs(xGraph(+d.Values[i].Year) - coordinates[0])) {
			closest = d.Values[i]
		}
	}

	// return 2000 if distance between coordinates and closest value is too high
	if(Math.abs(xGraph(+closest.Year) - coordinates[0]) > 15) {
		return 2000
	}
	else {
		return closest
	}

}
