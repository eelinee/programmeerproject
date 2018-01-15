/* Name: Eline Rietdijk
Studentnumber: 10811834

'createLineGraph.js'
This script......*/

function createGraph(hygieneData) {
	
	// years = ["'00", "'01", "'02", "'03", "'04", "'05", "'06", "'07", "'08", "'09", "'10", "'11", "'12", "'13", "'14", "'15"]

	console.log(hygieneData)

	graphWidth = width / 2.5 - margin.left - margin.right;
	graphHeight = height / 2 - margin.top - margin.bottom;

	x = d3.scale.ordinal()
		.range(0, graphWidth - 100)
		.domain(Array.from(new Array(15), (x,i) => i + 2000))
		.rangeRoundBands([0, graphWidth - 100])

	y = d3.scale.linear()
		.range([0, graphHeight])
		.domain([100, 0]) // dit nog specifieker maken voor de data

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.tickFormat(function(d) {return d });

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
	
	graphSvg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + graphHeight + ")")
		.call(xAxis)
		.append("text")
		.attr("class", "label")
		.attr("x", graphWidth - 60)
		.attr("y", 5)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("font-size", "13")
		.text("Year");

	console.log(graphSvg)
	// add g element with y-axis 
	graphSvg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + 0 + ", 0)")
		.call(yAxis)

		// append label with corresponding text
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", 0)
		.attr("y", - margin.left + 5)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("font-size", "13")
		.style("font-weight", "bold")
		.text("percentage of population");

	d3.selectAll(".tick")
		.style("font-size", "13")

	categories = ["With access to drinking water", "With access to sanitation services",
		"With handwashing facilities at home", "That practices open defecation"]

	var lines = {};
	lines[categories[0]] = createLine(hygieneData, categories[0])

	console.log(lines)
};

function createLine(hygieneData, category) {
	
	newLine = d3.svg.line()
		.x(function(d) {console.log(d.Year); return x(d.Year)})
		.y(function(d) {console.log(d[category]); return y(d[category])});

	var data = hygieneData[currentCountry]

	graphSvg = d3.select("#graphSvg")

	graphSvg.append("path")
		.attr("d", newLine(data))
		.style("stroke", "black")

	console.log(newLine(data))

	return currentCountry
}