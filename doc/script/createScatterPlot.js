/* Name: Eline Rietdijk
Studentnumber: 10811834

'createScatterPlot.js'
This script......*/
var sunburstData;
var hygieneData;
var geographics;
var regionOptions;
var regionColorOptions;
var regionColors;
var scatterWidth;
var scatterHeight;
var xScatter;
var yScatter;
var scatterAxes;
var xVariable;
var yVariable;
var scatterSvg;

function createScatter(data1, data2, data3) {
	
	sunburstData = data1;
	hygieneData = data2;
	geographics = data3;

	// set x- and y-variables to initialize scatterplot
	xVariable = "External causes of morbidity and mortality"
	yVariable = "With access to sanitation services"

	// determine variables that user can choose for the x-axis
	var xVariableOptions = ["Certain infectious and parasitic diseases",
		"Neoplasms","Diseases of the circulatory system",
		"Endocrine nutritional and metabolic diseases",
		"Mental and behavioural disorders","Diseases of the digestive system",
		"Pregnancy childbirth and the puerperium",
		"External causes of morbidity and mortality"]
	
	// determine variables that user can choose for the y-axis
	var yVariableOptions = [];
	for(var i = 0; i < hygieneData[currentCountry].length; i ++) {
		yVariableOptions.push(hygieneData[currentCountry][i].Id);
	};

	// create regionColors array, fixing which color represent which region
	regionOptions = ["Europe","South America","Northern America","Asia", 
		"Middle East","Oceania","The Caribbean","Central America","Africa"];

	regionColorOptions = ["#39CCCC","#1f78b4","#001f3f","#33a02c","#F012BE",
		"#e31a1c","#85144b","#FFDC00","#ff7f00"];

	regionColors = d3.scale.ordinal()
		.domain(regionOptions)
		.range(regionColorOptions);

	// find data for the current xVariabele and yVariable
	scatterData2 = combineData2(sunburstData, hygieneData, xVariable, yVariable, 
		currentYear, geographics);

	var legendMarginScatter = 200,
		bottomMarginScatter = 200;

	scatterWidth = width * 0.56 - margin.left - margin.right - legendMarginScatter;
	scatterHeight = height - margin.top - margin.bottom - bottomMarginScatter;

	// create x and y transform functions
	xScatter = d3.scale.linear()
		.range([0, scatterWidth]);
		
	yScatter = d3.scale.linear()
		.range([0, scatterHeight]);

	// append svg to contain all elements of the scatterplot
	scatterSvg = d3.select(".scatterDiv")
		.append("svg")
		.attr("id", "scatterSvg")
		.attr("width", scatterWidth + margin.left + margin.right + legendMarginScatter)
		.attr("height", scatterHeight + margin.bottom + margin.top + bottomMarginScatter)

		// append g element with predefined margins
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// determine components for the x- and y-axis
	var lableText = ["Deaths per 100 000 population", "Percentage of population"]
	var domainScatter = findDomain(scatterData2, xVariable, yVariable)
	var xDomainScatter = domainScatter[0]
	var yDomainScatter = domainScatter[1]

	// create all components of the scatterplot
	scatterAxes = createAxes(scatterSvg, scatterData2, xScatter, yScatter, 
		scatterHeight, scatterWidth, lableText, xDomainScatter, yDomainScatter, 
		tickInt, tickPercentage, "scatter");
	createCountrySelector(scatterSvg, hygieneData);
	createCheckBoxes(xVariableOptions, yVariableOptions, scatterSvg);
	updateScatter(xVariable, yVariable, scatterSvg, currentYear);
	createlegendScatter(regionOptions, regionColors, scatterSvg, 
		(scatterWidth + 70), 400);

};

/* 
* This function finds the domain of desired data. It works for data with a 
* different structure that the d3 domain functions do.
* Input arguments:
*	- domainData: data to find domain for
*	- xVariabe: x-variable to find domain for
*	- yVariable: y-variable to find domain for
*/
function findDomain(domainData, xVariable, yVariable) {

	var xMin;
	var xMax; 
	var yMin;
	var yMax;

	for (var i = 0; i < domainData.length; i ++) {
		if (!xMax || domainData[i]["xValue"] > xMax) {
			xMax = domainData[i]["xValue"];
		};
		if ((!xMin && xMin != 0) || domainData[i]["xValue"] < xMin) {
			xMin = domainData[i]["xValue"];
		};
		if ((!yMin && yMin != 0) || domainData[i]["yValue"] < yMin) {
			yMin = domainData[i]["yValue"];
		};
		if (!yMax || domainData[i]["yValue"] > yMax) {
			yMax = domainData[i]["yValue"];
		};
	}

	// add a margin of -2, except for when minimum value is already 0
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

/*
* This function creates checkboxes for each variable that can be selected to 
* be shown in the scatterplot.
* Input arguments:
*	- xVariables: the x-variables that can be selected
*	- yVariables: the y-variables that can be selected
*	- scatterSvg: the svg on which the checkboxes should be created
*/
function createCheckBoxes(xVariables, yVariables, scatterSvg) {

	// create a title above the y-axis variable checkboxes
	scatterSvg.append("text")
		.attr("class", "checkBoxTitle")
		.attr("x", scatterWidth + 125)
		.attr("y", 0)
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
		.attr("y", function(d, i) {return 20 + 55 * i})
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
			updateScatter(xVariable, yVariable, scatterSvg, currentYear)		
		})

	// add variable names to checkboxes
	scatterSvg.selectAll("#yCheckText1")
		.data(yVariables)
		.enter().append("text")
		.attr("class", "yCheckText")
		.attr("id", "yCheckText1")
		.attr("x", scatterWidth + 125)
		.attr("y", function(d, i) {return 43 + 55 * i})
		.text(function(d) { return wrapText(d, 3)[0]})

	// add remaining words of variable names to checkboxes
	scatterSvg.selectAll("#yCheckText2")
		.data(yVariables)
		.enter().append("text")
		.attr("class", "yCheckText")
		.attr("id", "yCheckText2")
		.attr("x", scatterWidth + 125)
		.attr("y", function(d, i) {return 60 + 55 * i})
		.text(function(d) { return wrapText(d, 3)[1]})

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
			updateScatter(xVariable, yVariable, scatterSvg, currentYear)	
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

/*
* This function creates a dropdown menu to choose a new country for the 
* visualisations.
* Input arguments:
*	- scatterSvg: the svg on which the dropdown should be created
*	- hygieneData: the data from which all countrynames will be selected
*/
function createCountrySelector(scatterSvg, hygieneData) {

	// select and sort all countrynames
	var options = Object.keys(hygieneData);
	options.sort();

	dropdownMenu = d3.select("#dropdownMenuCountry");

	// for each country, append an option to the dropdown menu
	var countrySelectors = dropdownMenu.selectAll(".m")
		.data(options)
		.enter().append("li")
		.append("a")
		.attr("class", "m")
		.attr("value", function(d) {return d})
		.text(function(d) {return d})
		.on("click", onclickSelector)
}

/*
* This function performs the update actions when a country is selected in the 
* dropdown menu.
*/
function onclickSelector() {

	currentCountry = this.getAttribute("value");

	// show black stroke of the dot that represents current country
	d3.selectAll(".dot").style("stroke", "none");
	d3.select("#" + currentCountry).style("stroke", "black");

	// update the graph and the sunburst
	updateGraph(currentCountry);
	updateSunburst(currentCountry, currentYear);
};

/*
* This function updates the scatterplot to show data of the currently chosen 
* x- and y-variables in the current year and is called upon a change in current 
* year, x-variable or y-variable.
* Input arguments:
*	- xVariable: the currently chosen x-variable
*	- yVariable: the currently chosen y-variable
*	- scatterSvg: the svg on which to update the plot
*	- currentYear: the currently chosen year
*/
function updateScatter(xVariable, yVariable, scatterSvg, currentYear) {

	// create a tip to show country name and x- and y-values
	var scatterTip = d3.tip()
		.attr("class", "tip")
		.offset([0,0])
		.html(function(d, i) {
			return "<p><h4>" + d.Country + "<h4></p><p><text>("
				+ Math.round(d["xValue"] * 100) / 100 + "," 
				+ Math.round(d["yValue"] * 100) / 100
				+ ") </text></p>" 
		});

	scatterSvg.call(scatterTip);

	// scatterSvg = d3.select(".scatterSvg")
	var transition = scatterSvg.transition().duration(750), 
		delay = function(d, i) {return i * 50};

	// get new data for the x- and y-variable and currentYear
	newData2 = combineData2(sunburstData, hygieneData, xVariable, yVariable, 
		currentYear, geographics);
	
	// determine domain of new data
	domains = findDomain(newData2, xVariable, yVariable);
	xScatter.domain(domains[0]);
	yScatter.domain(domains[1]);

	// append new data to dots, remove and append dots if nessecary
	var dots = scatterSvg.selectAll(".dot")
		.data(newData2);

	dots.exit().remove();

	dots.enter().append("circle")
		.attr("id", function(d) { return d.Country; })
		.attr("class", "dot")
		.style("stroke-width", "2px")
		.attr("r", 6)
		.style("fill", function(d) { return regionColors(d.Region); })

		// add mouse events 
		.on("mouseover", function(d, i) {

			// on mouseover, show scatterTip containing corresponding values
			scatterTip.show(d, yVariable, xVariable);

			// increase dot radius
			d3.select(this).attr("r", 10);

			// decrease opacity for all dots except for current
			var self = this
			d3.selectAll(".dot").filter(function(x) { return self != this; })
				.style("opacity", .1);
		})
		.on("mouseout", function(d, i) {

			// on mouseout, hide scatterTip containing corresponding values
			scatterTip.hide(d);
			d3.select(this).attr("r", 6);
			
			// increase opacity for all dots (if opacity was less than 1)
			d3.selectAll(".dot")
				.style("opacity", 1);
		})
		.on("click", function(d, i) {

			// show a black stroke for the dot that represents current country
			d3.selectAll(".dot").style("stroke", "none");
			d3.select(this).style("stroke", "black");

			// update graph and sunburst with new currentCountry
			d3.select('select').property('value', d.Country)
			currentCountry = d.Country;
			updateGraph(currentCountry);
			updateSunburst(currentCountry, currentYear);
		});

	// change position of the dots
	dots.transition()
		.duration(750)
		.attr("cx", function(d) { return xScatter(d["xValue"]); })
		.attr("cy", function(d) { return yScatter(d["yValue"]); })
		.style("fill", function(d) { return regionColors(d.Region); });

	// update x- and y-axes
	scatterSvg.select("#xscatter")
		.transition()
		.duration(500)
		.call(scatterAxes[0]);

	scatterSvg.select("#yscatter")
		.transition()
		.duration(500)
		.call(scatterAxes[1]);

	// only set stroke to black of dot that represents currentCountry
	scatterSvg.selectAll(".dot")
		.style("stroke", "none")
		.attr("id", function(d) { return d.Country; });

	scatterSvg.select("#" + currentCountry)
		.style("stroke", "black");
};

/*
* This function returns data of desired variables and year and is called in the 
* createScatter and updateScatter functions in the current script.
* Input arguments
*	- sunburstData: data from which the x-variable will be selected
*	- hygieneData: data from which the y-variable will be selected
*	- xVariable: the x-variable to select
*	- yVariable: the y-variable to select
*	- year: the year from which to select data
*	- geographics: data from which the region and amount of population of a 
*	country will be selected
*/
function combineData2(diseaseData, hygieneData, xVariable, yVariable, year, geographics) {

	var combinedData = []
	var counter = 0
	var missendeData = []
	var missingHygiene = []

	// select disease data of current year and determine all countries
	var useDiseasedata = diseaseData[year]
	var countries = Object.keys(sunburstData[year])

	// loop over all countries
	for(var i = 0; i < countries.length; i ++) {

		// if country is available in geographics list, add to newData
		try {
			if(geographics[countries[i]][year].trim() != "") {

				// add array containing country, region and variable names
				combinedData[counter] = {}
				combinedData[counter]["Country"] = countries[i]
				combinedData[counter]["xVariable"] = xVariable
				combinedData[counter]["yVariable"] = yVariable
				combinedData[counter]["Region"] = geographics[countries[i]].Region

				// determine size of x-value
				xSize = findDiseaseValue(useDiseasedata[countries[i]], xVariable)

				// calculate size per 100.000 population
				combinedData[counter]["xValue"] = xSize / 
					+geographics[countries[i]][year] * 100000

				// keep track of amount of countries added to combinedData
				counter += 1
			}
		}

		// if country is not available, don't add to newdata
		catch(err) {
		}
		
	}

	// loop over each country array in new data
	for(var i = 0; i < combinedData.length; i ++) {

		// if country is available in hygieneData, determine y-size
		if(hygieneData[combinedData[i]["Country"]]) {
			ySize = findHygieneValue(hygieneData[combinedData[i]["Country"]], 
				yVariable, currentYear);

			// if y-size is available, add y-value to country array
			if(ySize) {
				combinedData[i]["yValue"] = ySize;
			}

			// else, remember current i as missingdata
			else {
				missingHygiene.push(i);
			};
		}
		// else, remember current i as missingdata
		else {
			missingHygiene.push(i);
		};
	};

	// remove all arrays of countries with missing y-value
	for(var i = 0; i < missingHygiene.length; i ++) {
		combinedData.splice(missingHygiene[i] - i, 1);
	};

	return combinedData
};

/*
* This function finds the disease value for the combineData function in the 
* current script.
* Input arguments:
*	- useData: data in which to search for the value
*	- xVariable: the value to search in data 
*/
function findDiseaseValue(useData, xVariable) {

	var root;
	var totalSize = 0;

	// loop through all children of useData to find the xVariable
	for(var i = 0; i < useData["children"].length; i ++) {
		if(useData["children"][i]["name"] == xVariable) {

			// remember the root of the xVariable and break out of loop
			root = useData["children"][i];
			break;
		};
	};

	// loop through all children of the root
	for(var i = 0; i < root["children"].length; i ++) {

		// add size of each child to total size
		totalSize += root["children"][i]["size"];
	};

	return totalSize
};

/*
* This function finds the hygiene value for the combineData function in the 
* current script.
* Input arguments:
*	- useData: data in which to search for the value
*	- yVariable: the value to search in data
*	- year: the year for which to search data
*/
function findHygieneValue(useData, yVariable, year) {

	var root;
	var size;

	// try to find the root that contains the yVariable
	try {
		for(var i = 0; i < useData.length; i ++) {
			if(useData[i].Id == yVariable) {

				// remember root that contains yVariable and break out of loop
				root = useData[i];
				break;
			};
		};

		// loop through the root that contains the yVariable
		for(var i = 0; i < root.Values.length; i ++) {

			// set size to the value of the current year
			if(root.Values[i].Year == +year) {
				size = +root.Values[i].Value;
			};
		};
	}

	// if the root of the yVariable is not found, size remains undefined
	catch(err) {
	};

	return size
}

/*
* This function creates a legend for the scatterplot and is called in the 
* createScatter function in the current script.
* Input arguments
*	- categories: the categories to display in the legend
*	- colors: the colorfunction used to distinguish the categories
*	- svg: the svg to create legend on
*	- xStart: the x-coordinate on which the legend should start
*	- yStart: the y-coordinate on which the legend should start
*/
function createlegendScatter(categories, colors, svg, xStart, yStart) {

	// append a g element for each category
	var legend = svg.selectAll(".legendG")
		.data(categories)
		.enter().append("g")
		.attr("class", "legendG")
		.attr("transform", function(d, i) {

			// place g elements underneath eachother
			return "translate("+ xStart + "," + (yStart + 20 * i) + ")";
		});

	// append legend text to g elements
	svg.selectAll(".legendG")
		.append("text")
		.attr("dx", "1em")
		.attr("dy", "0.6em")
		.attr("id", function(d) {return d})

		// add mouse events
		.on("mouseover", function(d) {

			// select all dots not representing the current category
			var self = this
			d3.selectAll(".dot").filter(function(x) { 
				return self["id"] != x.Region; 
			})

				// decrease opacity for selected dots
				.style("opacity", .1);
		})
		.on("mouseout", function(d) {

			// restore opacity for all dots
			d3.selectAll(".dot").style("opacity", 1)
		})

		// show category name
		.text(function(d) {return d})

	// add rects to each g element to contain category color
	svg.selectAll(".legendG")
		.append("rect")
		.attr("height", 10)
		.attr("width", 10)
		.attr("id", function(d) {return d})

		// add mouse events
		.on("mouseover", function(d) {

			// select all dots not representing the current cateogry
			var self = this;
			d3.selectAll(".dot").filter(function(x) {
				return self["id"] != x.Region; 
			})

				// decrease opacity for selected dots
				.style("opacity", .1);
		})
		.on("mouseout", function(d) {

			// restore opacity for all dots
			d3.selectAll(".dot").style("opacity", 1);
		})
		.style("fill", function(d) { return colors(d); });
};