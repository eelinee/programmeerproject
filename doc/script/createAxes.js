function createAxes(graphSvg, currentData, x, y, height, width, lableText, xDomain, yDomain, xFormat, yFormat, axesId) {

	y.domain(yDomain)
	x.domain(xDomain)

	// create xAxis variable with scale x function
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.tickFormat(function(d) {return xFormat(d)});

	// create yAxis variable with scale y function
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")

		// return y-values in percentages using the "%" sign
		.tickFormat(function(d) {return yFormat(d)});

	// create lineColors function to fill lines in linegraph
	lineColors = d3.scale.category10();

	// append g element to contain x-axis
	graphSvg.append("g")
		.attr("class", "x axis")
		.attr("id", "x" + axesId)
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)

		// append label with corresponding text
		.append("text")
		.attr("class", "axisText")
		.attr("x", width)
		.attr("y", 23)
		.attr("dy", ".71em")
		.text(lableText[0]);

	// add g element to contain y-axis 
	graphSvg.append("g")
		.attr("class", "y axis")
		.attr("id", "y" + axesId)
		.attr("transform", "translate(" + 0 + ", 0)")
		.call(yAxis)

		// append label with corresponding text
		.append("text")
		.attr("class", "axisText")
		.attr("transform", "rotate(-90)")
		.attr("x", 0)
		.attr("y", - margin.left + 5)
		.attr("dy", ".71em")
		.text(lableText[1]);

	return [xAxis, yAxis]
}

function tickYears(d) {

	return "'" + ("0" + (d - 2000)).slice(-2)
}

function tickPercentage(d) {
	return d + "%"
}

function tickInt(d) {
	return d
}

function showMissingData(country, year, svg) {
	
	svg.select(".missingDataText").remove()

	svg.append("text")
		.attr("x", 40)
		.attr("class", "missingDataText")
		.text("No data available for " + country + " in " + year)
}