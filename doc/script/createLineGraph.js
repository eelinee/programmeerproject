/* Name: Eline Rietdijk
Studentnumber: 10811834

'createLineGraph.js'
This script......*/

function createGraph(hygieneData) {

	var legendaMarginLine = 140

	// determine graphWidth and Height based on width and height
	graphWidth = width * 0.44 - margin.left - margin.right - legendaMarginLine;
	graphHeight = height / 2 - margin.top - margin.bottom;

	// create x scale function. Ordinal, since x- variable is ordinal
	x = d3.scale.linear()
		.range([0, graphWidth])

	// create y scale function. Linear, since y- variable is linear
	y = d3.scale.linear()
		.range([0, graphHeight]);

	// select div and create svg with appriopriate width and height
	var graphSvg = d3.select(".graphDiv")
		.append("svg")
		.attr("id", "graphSvg")
		.attr("width", graphWidth + margin.left + margin.right + legendaMarginLine)
		.attr("height", graphHeight + margin.bottom + margin.top)
		
		// append g element with predefined margins
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	
	// determine components of current data
	dataInfo = findInfo(hygieneData[currentCountry])
	min = dataInfo[0]
	max = dataInfo[1]
	missing = dataInfo[2]
	keys = dataInfo[3]

	yDomainLine = [max, min]
	xDomainLine = [2000, 2015]
	
	// create components of the graph
	var lableText = ["Years", "Percentage of population"]
	xValue = tickYears
	yValue = tickPercentage
	createAxes(graphSvg, hygieneData[currentCountry], x, y, graphHeight, graphWidth, lableText, xDomainLine, yDomainLine, xValue, yValue)
	createLegenda(graphSvg, keys)
	lines = {}
	for(var i = 0; i < keys.length; i ++) {
		lines[keys[i]] = createLines(hygieneData, keys[i], graphSvg)
	}
};


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

function findInfo(currentData) {
	
	// initialize variable to store the max value and missing values
	var max;
	var min;
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
			if (!min || parseInt(currentData[i][keys[j]]) < min) {
				min = currentData[i][keys[j]]
			}
			if (currentData[i][keys[j]] === "") {
				if(!missing[keys[j]]) {
					missing[keys[j]] = []
				}
				missing[keys[j]].push(i)
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
	return [min, max, missing, keys]
}

