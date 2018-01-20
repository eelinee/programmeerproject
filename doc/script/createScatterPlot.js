/* Name: Eline Rietdijk
Studentnumber: 10811834

'createScatterPlot.js'
This script......*/

var diseaseData;
var hygieneData;
var year;
var scatterAxes;
var xVariable;
var yVariable;
var scatterTip;

function createScatter(data1, data2, currentYear) {
	
	diseaseData = data1
	hygieneData = data2
	year = currentYear
	console.log(year)
	xVariable = "External causes of morbidity and mortality"
	yVariable = "With access to sanitation services"

	var xVariableOptions = ["Certain infectious and parasitic diseases","Neoplasms","Diseases of the circulatory system","Endocrine nutritional and metabolic diseases","Mental and behavioural disorders","Diseases of the nervous system","Diseases of the digestive system", "Diseases of the respiratory system", "Pregnancy childbirth and the puerperium", "External causes of morbidity and mortality"]
	var yVariableOptions = keys

	yVariableOptions.push("BMI")
	yVariableOptions.push("Life expectancy")


	scatterData = combineData(diseaseData, hygieneData, xVariable, yVariable, year)
	console.log(scatterData)

	var legendaMarginScatter = 200
	var bottomMarginScatter = 200

	scatterWidth = width * 0.56 - margin.left - margin.right - legendaMarginScatter;
	scatterHeight = height - margin.top - margin.bottom - bottomMarginScatter;

	x = d3.scale.linear()
		.range([0, scatterWidth])
		
	y = d3.scale.linear()
		.range([0, scatterHeight])

	var scatterSvg = d3.select(".scatterDiv")
		.append("svg")
		.attr("id", "scatterSvg")
		.attr("width", scatterWidth + margin.left + margin.right + legendaMarginScatter)
		.attr("height", scatterHeight + margin.bottom + margin.top + bottomMarginScatter)

		// append g element with predefined margins
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var lableText = ["Deaths per 100 000 population", "Percentage of population"]

	var domainScatter = findDomain(scatterData, xVariable, yVariable)
	var xDomainScatter = domainScatter[0]
	var yDomainScatter = domainScatter[1]

	scatterAxes = createAxes(scatterSvg, scatterData, x, y, scatterHeight, scatterWidth, lableText, xDomainScatter, yDomainScatter, tickInt, tickPercentage, "scatter")
	createDots(scatterData, scatterSvg, x, y, xVariable, yVariable)
	createCheckBoxes(xVariableOptions, yVariableOptions, scatterSvg)

};

function combineData(diseaseData, hygieneData, xVariable, yVariable, year) {
	
	newData = []

	useData = Object.values(diseaseData[2005])

	missingDataTotal = []
	missingDataHygiene = []
	
	counter = 0
	

	for(var i = 0; i < useData.length; i ++) {
		if(useData[i]["TotalPopulation"] != "" && useData[i]["TotalPopulation"]) {
			if(useData[i][xVariable]["Total"] != "") {
				newData[counter] = {}
				newData[counter]["Country"] = useData[i].Country
				variable = useData[i][xVariable]["Total"] / useData[i]["TotalPopulation"] * 100000
				newData[counter]["xValue"] = variable
				newData[counter]["xVariable"] = xVariable
				counter += 1
			}
		}
		else {
			missingDataTotal.push(useData[i].Country)
		}
	};

	// console.log(hygieneData["Bhutan"][2013]["With handwashing facilities at home"])

	for(var i = 0; i < newData.length; i ++) {
		try {
			if(hygieneData[newData[i]["Country"]][year][yVariable] == "" ||
				!hygieneData[newData[i]["Country"]][year][yVariable]) {
				console.log(newData[i]["Country"])
				console.log(year)
				console.log(yVariable)
				missingDataTotal.push(newData[i]["Country"])
				missingDataHygiene.push(i)
				// console.log("deze variabele mist?")
				console.log(hygieneData[newData[i]["Country"]][year][yVariable])
				console.log("*****************************************************")
			}
			else {
				newData[i]["yValue"] = +hygieneData[newData[i]["Country"]][year][yVariable]
				newData[i]["yVariable"] = yVariable
			}
		}
		catch(err) {
			missingDataTotal.push(newData[i]["Country"])
			missingDataHygiene.push(i)
			// console.log("land mist?")
			// console.log(newData[i]["Country"])
		}
		
	}

	// console.log(missingDataHygiene)
	console.log("**************************************************")
	console.log(hygieneData)

	for(var i = 0; i < missingDataHygiene.length; i ++) {
		newData.splice(missingDataHygiene[i] - i, 1)
	}

	console.log(newData)
	return newData

}

function createDots(scatterData, scatterSvg, x, y, xVariable, yVariable) {

	scatterColors = d3.scale.category20()

	scatterTip = d3.tip()
		.attr("class", "tip")
		.offset([0,0])
		.html(function(d, i) {
			return "<p><strong>" + d.Country + "</strong></p><p><text>("
				+ Math.round(d["xValue"] * 100) / 100 + "," + Math.round(d["yValue"] * 100) / 100
				+ ") </text></p>"
		});

	scatterSvg.call(scatterTip)

	scatterSvg.selectAll(".dot")
		.data(scatterData)
		.enter().append("circle")
		.attr("id", function(d) {return d.Country})
		.attr("class", "dot")
		.style("stroke-width", "2px")
		.attr("r", 6)
		.attr("cx", function(d) {return x(d["xValue"])})
		.attr("cy", function(d) {return y(d["yValue"])})
		.style("fill", function(d) {return scatterColors(d.Country)})
		.on("mouseover", function(d, i) {

			// on mouseover, show scatterTip containing corresponding values
			scatterTip.show(d, yVariable, xVariable);

			// increase dot radius
			d3.select(this).attr("r", 10)

			// decrease opacity for all dots except for current
			var self = this
			d3.selectAll(".dot").filter(function(x) {return self != this; })
				.style("opacity", .2)
		})
		.on("mouseout", function(d, i) {

			// on mouseout, hide scatterTip containing corresponding values
			scatterTip.hide(d);
			d3.select(this).attr("r", 6)
			
			// increase opacity for all dots (if opacity was less than 1)
			d3.selectAll(".dot")
				.style("opacity", 1)
		})
		.on("click", function(d, i) {
			d3.selectAll(".dot").style("stroke", "none")
			d3.select(this).style("stroke", "black")
		})
}

function findDomain(domainData, xVariable, yVariable) {

	var xMin;
	var xMax; 
	var yMin;
	var yMax;

	for (var i = 0; i < domainData.length; i ++) {
		if (!xMax || domainData[i]["xValue"] > xMax) {
			xMax = domainData[i]["xValue"]
		}
		if ((!xMin && xMin != 0) || domainData[i]["xValue"] < xMin) {
			xMin = domainData[i]["xValue"]
		}
		if ((!yMin && yMin != 0) || domainData[i]["yValue"] < yMin) {
			yMin = domainData[i]["yValue"]
		}
		if (!yMax || domainData[i]["yValue"] > yMax) {
			yMax = domainData[i]["yValue"]
		}
	}

	if(yMin > 2) {
		yMin = yMin - 2
	}
	else {
		yMin = 0
	}
	if(xMin >= 2) {
		xMin = xMin - 2
	}
	else {
		xMin = 0
	}	

	return [[xMin, xMax],[yMax, yMin]]
}

function createCheckBoxes(xVariables, yVariables, scatterSvg) {
		// """Creates a checkbox with a variable name for each x-variable and 
		// 	y-variable that can be selected.

		// 	Keyword arguments:
		// 	xVariables: the x-variables that can be selected
		// 	yVariables: the y-variables that can be selected
		// 	scatterSvg: the svg on which the checkboxes should be created"""

	// create a title above the y-axis variable checkboxes
	scatterSvg.append("text")
		.attr("class", "checkBoxTitle")
		.attr("x", scatterWidth + 125)
		.attr("y", 25)
		.text("y-axis variable")
		.style("font-size", 15)
		.style("font-weight", "bold")
		.style("text-anchor", "middle")

	// create a checkbox for each yVariable that can be selected
	scatterSvg.selectAll(".yCheckBox")
		.data(yVariables)
		.enter().append("rect")
		.attr("class", "yCheckBox")
		.attr("id", function(d, i) {return "yCheckBox" + i})
		.attr("x", scatterWidth + 50)
		.attr("y", function(d, i) {return 45 + 55 * i})
		.attr("width", 150)
		.attr("height", 50)
		.style("fill", "whitesmoke")
		.style("stroke", "black")
		.on("click", function(d) {

			// on click, color only this ycheckbox steelblue
			d3.selectAll(".yCheckBox").style("fill", "whitesmoke")
			d3.select(this).style("fill", "steelblue")

			// update scatterplot with new yVariable, xVariable stays the same
			yVariable = d
			updateScatter(xVariable, yVariable, scatterSvg)		
		})

	// add variable names to checkboxes
	scatterSvg.selectAll("#yCheckText1")
		.data(yVariables)
		.enter().append("text")
		.attr("class", "yCheckText")
		.attr("id", "yCheckText1")
		.attr("x", scatterWidth + 125)
		.attr("y", function(d, i) {return 65 + 55 * i})
		.text(function(d) {

			// show variable names until the third word
			var words = d.split(" ")
			words = words.splice(0, 2)
			return words.join(" ")
		})

	// add remaining words of variable names to checkboxes
	scatterSvg.selectAll("#yCheckText2")
		.data(yVariables)
		.enter().append("text")
		.attr("class", "yCheckText")
		.attr("id", "yCheckText2")
		.attr("x", scatterWidth + 125)
		.attr("y", function(d, i) {return 80 + 55 * i})
		.text(function(d) {

			// show variable names starting from the third word
			var words = d.split(" ")
			words = words.splice(2)
			return words.join(" ")
		})

	// create a textbox for each xVariable that can be selected
	scatterSvg.selectAll(".xCheckBox")
		.data(xVariables)
		.enter().append("rect")
		.attr("class", "xCheckBox")
		.attr("id", function(d, i) {return "xCheckBox" + i})

		// create every third box on a new line
		.attr("x", function(d, i) {return 300 * (i % 2)})
		.attr("y", function(d, i) {return scatterHeight + 50 + 35 * Math.floor(i / 2)})

		.attr("width", 290)
		.attr("height", 30)
		.style("fill", "whitesmoke")
		.style("stroke", "black")
		.on("click", function(d) {

			// on click, color only this xcheckbox steelblue
			d3.selectAll(".xCheckBox").style("fill", "whitesmoke")
			d3.select(this).style("fill", "steelblue")

			// update scatterplot with new xVariable, yVariable stays the same
			xVariable = d
			updateScatter(xVariable, yVariable, scatterSvg)	
		})

	// add variable names to checkboxes
	scatterSvg.selectAll(".xCheckText")
		.data(xVariables)
		.enter().append("text")
		.attr("class", "xCheckText")

		// add every third variable name on a new line, like the checkboxes
		.attr("x", function(d, i) {return 5 + 300 * (i % 2)})
		.attr("y", function(d, i) {return scatterHeight + 68 + 35 * Math.floor(i / 2)})
		.text(function(d) {return d})

	// color the checkboxes containing the currently selected variables
	d3.select("#xCheckBox" + xVariables.indexOf(xVariable))
		.style("fill", "steelblue")
	d3.select("#yCheckBox" + yVariables.indexOf(yVariable))
		.style("fill", "steelblue")
}

function updateScatter(xVariable, yVariable, scatterSvg) {

	// scatterSvg = d3.select(".scatterSvg")
	var transition = scatterSvg.transition().duration(750), 
		delay = function(d, i) {return i * 50};

	newData = combineData(diseaseData, hygieneData, xVariable, yVariable, year)

	domains = findDomain(newData, xVariable, yVariable)
	x.domain(domains[0])
	y.domain(domains[1])

	var dots = scatterSvg.selectAll(".dot")
		.data(newData);

	dots.exit().remove();//remove unneeded circles
	dots.enter().append("circle")
		.attr("id", function(d) {return d.Country})
		.attr("class", "dot")
		.style("stroke-width", "2px")
		.attr("r", 6)
		.style("fill", function(d) {return scatterColors(d.Country)})
		.on("mouseover", function(d, i) {

			// on mouseover, show scatterTip containing corresponding values
			scatterTip.show(d, yVariable, xVariable);

			// increase dot radius
			d3.select(this).attr("r", 10)

			// decrease opacity for all dots except for current
			var self = this
			d3.selectAll(".dot").filter(function(x) {return self != this; })
				.style("opacity", .2)
		})
		.on("mouseout", function(d, i) {

			// on mouseout, hide scatterTip containing corresponding values
			scatterTip.hide(d);
			d3.select(this).attr("r", 6)
			
			// increase opacity for all dots (if opacity was less than 1)
			d3.selectAll(".dot")
				.style("opacity", 1)
		})
		.on("click", function(d, i) {
			d3.selectAll(".dot").style("stroke", "none")
			d3.select(this).style("stroke", "black")
		});

	dots.transition()
		.duration(750)
		.attr("cx", function(d) { return x(d["xValue"])})
		.attr("cy", function(d) { return y(d["yValue"])})

	// Update X Axis
	scatterSvg.select("#xscatter")
		.transition()
		.duration(500)
		.call(scatterAxes[0]);

	// Update Y Axis
	scatterSvg.select("#yscatter")
		.transition()
		.duration(500)
		.call(scatterAxes[1]);
}