/* Name: Eline Rietdijk
Studentnumber: 10811834

'createLineGraph.js'
This script......*/

function createGraph(hygieneData) {
	
	years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]

	graphWidth = width / 3 - margin.left - margin.right;
	graphHeight = height / 2 - margin.top - margin.bottom;

	x = d3.scale.ordinal()
		.range([margin.left], graphWidth)
		.domain(years)

	y = d3.scale.linear()
		.range([margin.top, graphHeight])
		.domain([100, 0]) // dit nog specifieker maken voor de data

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickFormat(function(d) {return d + "%"})

	// select div and create svg with appriopriate width and height
	var graphSvg = d3.select(".graphDiv")
		.append("svg")
		.attr("id", "graphSvg")
		.attr("width", graphWidth + margin.left + margin.right)
		.attr("height", graphHeight + margin.bottom + margin.top)
		
		// append g element with predefined margins
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.style("fill", "red");
	
	graphSvg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + graphHeight + ")")
		.call(xAxis)
		.append("text")
		.attr("class", "label")
		.attr("x", graphWidth)
		.attr("y", 0)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("font-size", "13")
		.text("Year");

	// add g element with y-axis 
	graphSvg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + 0 + ", 0)")
		.call(yAxis)

		// append label with corresponding text
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", - margin.top)
		.attr("y", - margin.left)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("font-size", "13")
		.text("percentage of population");
};