/* Name: Eline Rietdijk
Project: programmeerproject minor programmeren
Studentnumber: 10811834

"helpers.js"
This script contains helper functions that are called from different 
javascript files building the three visualisations of this project.
*/

/* 
* This function updates the title that is shown in the html page. This title 
* shows the current country and year and alerts user if data is unavailable.
* Input arguments:
*	- availability: "available" if data is available
*/
function updateTitle(availability) {
	
	// append title to intended div
	title = d3.select(".titleDiv")
		.append("text")
		.attr("class", "titleVis");

	var countryLength = currentCountry.length
	var fontSize = "40px"

	if(countryLength > 27) {
		fontSize = "30px"
	}

	if(availability == "available") {

		// show current country and year if data is available
		title = d3.select(".titleDiv")
			.select(".titleVis").text(currentCountry + ", " + currentYear)
			.style("font-size", fontSize);
	}

	else {

		// show user data is unavailable for current country and year combi
		title = d3.select(".titleDiv")
			.select(".titleVis").text("No disease data available for " 
				+ currentCountry + " in " + currentYear)
			.style("font-size", "20px")
			.style("top", "50%");
	};
};

/*
* This function create axes with desired components and is called from the 
* createScatter function in "createScatterPlot.js" and the createGraph function 
* in "createLineGraph.js"
* Input arguments
*	- graphSvg: the svg on which to append the axes
*	- currentData: data that should fit on the axes
*	- x: the x scale function that is used for the data
*	- y: the y scale function that is used for the data
*	- height: the height of the svg 
*	- width: the width of the svg
*	- labletext: the text that should appear on the x- and y-axis ([x, y])
*	- xDomain: domain of the x-values 
*	- yDomain: domain of the y-values
*	- xFormat: format function of the x-values display
*	- yFormat: format function of the y-values display
*	- axesId: string that will be set as the axes id
*/
function createAxes(graphSvg, currentData, x, y, height, width, lableText, xDomain, yDomain, xFormat, yFormat, axesId) {

	y.domain(yDomain);
	x.domain(xDomain);

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

	return [xAxis, yAxis];
}

/* 
* This function returns a given year in two digits and an apostrophe and is 
* called from the createAxes function in the current script.
* Input arguments:
*	- d: year (int)
*/
function tickYears(d) {

	return "'" + ("0" + (d - 2000)).slice(-2);
};

/* 
* This function returns a given int or float in percentage format and is called 
* from the createAxes function in the current script.
* Input arguments:
*	- d: int or float to pe displayed as percentage
*/
function tickPercentage(d) {
	return d + "%";
};

/* 
* This function returns a variable without changing it and is called from the 
* createAxes function in the current script.
* Input arguments:
*	- d: variable
*/
function tickInt(d) {
	return d;
};

/*
* This function returns a given string in parts and is called in the 
* updateLegendaSun function in "createSunBurst.js", the createLegenda function in 
* "createLineGraph.js" and the "createCheckboxes" function in 
* "createScatterPlot.js"
* Input arguments
*	- string: the string to be wrapped
*	- maxWords: the maximum amount of words that is allowed for each part of 
*	the string
*/
function wrapText(string, maxWords) {

	// split string into array of words and determine amount of words 
	var string = string.split(" ");
	var stringLength = string.length;

	// if the amount of words exceeds the maximum amount of words
	if(string.length > maxWords) {

		// divide the array in two seperate arrays
		var string1 = string.splice(0, maxWords);
		var string2 = string;

		// join and return the two strings
		string1 = string1.join(" ");
		string2 = string2.join(" ");
		return [string1, string2];
	}

	// if not, return the string unchanged and give a space as second argument
	else {
		return [string.join(" "), " "];
	};
};