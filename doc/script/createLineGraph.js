/* Name: Eline Rietdijk
Studentnumber: 10811834

'createLineGraph.js'
This script......*/

function createGraph(hygieneData) {
	
	console.log(hygieneData)

	var legendaMargin = 140

	// determine graphWidth and Height based on width and height
	graphWidth = width * 0.44 - margin.left - margin.right - legendaMargin;
	graphHeight = height / 2 - margin.top - margin.bottom;

	// create x scale function. Ordinal, since x- variable is ordinal
	x = d3.scale.linear()
		.range([0, graphWidth])
		.domain([2000, 2015])
		// .rangeRoundBands([0, graphWidth - 100])

	var x2 = d3.scale.linear()
		.range([100, 300])
		.domain([100, 400]);

	// create y scale function. Linear, since y- variable is linear
	y = d3.scale.linear()
		.range([0, graphHeight])
		.domain([100, 0]) // SPECIFIEKER MAKEN

	// select div and create svg with appriopriate width and height
	var graphSvg = d3.select(".graphDiv")
		.append("svg")
		.attr("id", "graphSvg")
		.attr("width", graphWidth + margin.left + margin.right + legendaMargin)
		.attr("height", graphHeight + margin.bottom + margin.top)
		
		// append g element with predefined margins
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	
	// determine components of current data
	dataInfo = findMax(hygieneData[currentCountry])
	max = dataInfo[0]
	missing = dataInfo[1]
	keys = dataInfo[2]
	
	// create components of the graph
	createAxes(graphSvg, hygieneData[currentCountry], x, y, max, missing)
	createLegenda(graphSvg, keys)
	lines = {}
	for(var i = 0; i < keys.length; i ++) {
		lines[keys[i]] = createLines(hygieneData, keys[i], graphSvg)
	}
};

function createAxes(graphSvg, currentData, x, y, max, missing) {

	// create xAxis variable with scale x function
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.tickFormat(function(d) {

			// for the years 2000 - 2009, return '01 for example
			if(d % 2000 < 10) {
				return "'0" + d % 2000;
			}

			// for the years 2010 - 2015, just return '10, for example
			else {
				return "'" + d % 2000;
			};
		});

	// create yAxis variable with scale y function
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")

		// return y-values in percentages using the "%" sign
		.tickFormat(function(d) {return d + "%"});

	// create lineColors function to fill lines in linegraph
	lineColors = d3.scale.category10();

	// append g element to contain x-axis
	graphSvg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + graphHeight + ")")
		.call(xAxis)

		// append label with corresponding text
		.append("text")
		.attr("class", "axisText")
		.attr("x", graphWidth)
		.attr("y", 23)
		.attr("dy", ".71em")
		.text("Year");

	// add g element to contain y-axis 
	graphSvg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + 0 + ", 0)")
		.call(yAxis)

		// append label with corresponding text
		.append("text")
		.attr("class", "axisText")
		.attr("transform", "rotate(-90)")
		.attr("x", 0)
		.attr("y", - margin.left + 5)
		.attr("dy", ".71em")
		.text("percentage of population");
}

function createLines(hygieneData, category, graphSvg) {

	var newLine = d3.svg.line()
		.x(function(d) {return x(+d.Year)})
		.y(function(d) {return y(+d[category])});

	var data = hygieneData[currentCountry]

	if(missing[category]) {
			for(var i = 0; i < missing[category].length; i ++) {
				delete data[missing[category][i]]
			}
		}

	data = Object.values(data)

	graphSvg.append("svg:path")
		.attr("class", "graphLine")
		.attr("d", newLine(data))
		.style("stroke", function(d) {return lineColors(category)})

	return newLine
}


function createLegenda(graphSvg, keys) {

	graphSvg.selectAll(".legendaColorbox")
		.data(keys)
		.enter().append("rect")
		.attr("class", "legendaColorbox")
		.attr("x", graphWidth + 20)
		.attr("y", function(d, i) {return 15 + 50 * i})
		.attr("width", 20)
		.attr("height", 20)
		.style("fill", function(d) {return lineColors(d)})

	// graphSvg.selectAll(".legendaTextbox")
	// 	.data(keys)
	// 	.enter().append("rect")
	// 	.attr("class", "legendaTextbox")
	// 	.attr("x", graphWidth + 45)
	// 	.attr("y", function(d, i) {return 5 + 50 * i})
	// 	.attr("width", 110)
	// 	.attr("height", 40)
	// 	.style("stroke", function(d) {return lineColors(d)})
	// 	.style("fill", "none")

	graphSvg.selectAll(".legendaText1")
		.data(keys)
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
		.data(keys)
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

function findMax(currentData) {
	
	// initialize variable to store the max value and missing values
	var max;
	var missing = {};

	// get the key names in one year (variables are same for each year)
	keys = Object.keys(currentData["2000"])

	// remember index for the key of "year", this value doesn't count for max
	var index = keys.indexOf("Year")
	keys.splice(index, 1)

	// loop through all variables of currentData
	for(var i = 2000; i < 2016; i ++) {
		for(var j = 0; j < keys.length; j ++) {

			if (!max || parseInt(currentData[i][keys[j]]) > max) {

					// this value is the new maximum
					max = currentData[i][keys[j]]
				}
			if (currentData[i][keys[j]] === "") {
				if(!missing[keys[j]]) {
					missing[keys[j]] = []
				}
				missing[keys[j]].push(i)
			}
		}
		
	}

	// console.log(missing)
	return [max, missing, keys]
}