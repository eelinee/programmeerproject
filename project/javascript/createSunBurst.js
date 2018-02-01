/* Name: Eline Rietdijk
Project: programmeerproject minor programmeren
Studentnumber: 10811834

'createSunBurst.js'
This script creates the sunburst visualisation and contains the functions to
update the sunburst to show data of a different year or country.
*/

var sunSvg;
var xSun;
var ySun;
var arc;
var radius;
var sunburstData;
var arc;
var sunPaths;
var sunColors;
var sunTip;

/*
* This function initializes the creation of the sunburst and is called from 
* the createVisualisation function in "project.js".
* Input arguments
*	- data: data that will be displayed in this sunburst
*/
function createSun(data) {

	sunburstData = data; 
	var sunData = sunburstData[currentYear][currentCountry]; 

	// create margins for legenda and title
	var legendaMarginSun = 300,
		titleDivMargin = 70;
	
	var sunWidth = width * 0.44 - margin.left - margin.right - legendaMarginSun,
		sunHeight = height * 0.6 - titleDivMargin - margin.top - margin.bottom;

	radius = (Math.min(sunWidth, sunHeight) / 2 + 25);

	// create transform functions for x- and y-coordinates
	xSun = d3.scale.linear()
		.range([0, 2 * Math.PI]);

	ySun = d3.scale.sqrt()
		.range([0, radius]);

	// create arc function that will be used to create the sunburst
	arc = d3.svg.arc()
		.startAngle(function(d) { 
			return Math.max(0, 
				Math.min(2 * Math.PI, xSun(d.x))); })
		.endAngle(function(d) { 
			return Math.max(0, 
				Math.min(2 * Math.PI, xSun(d.x + d.dx))); })
		.innerRadius(function(d) { return Math.max(0, ySun(d.y)); })
		.outerRadius(function(d) { return Math.max(0, ySun(d.y + d.dy)); });

	// create svg so append sunburst and its components
	sunSvg = d3.select(".sunDiv")
		.append("svg")
		.attr("id", "sunSvg")
		.attr("width", sunWidth + margin.left + margin.right + legendaMarginSun)
		.attr("height", sunHeight + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + (sunWidth / 1.6 + legendaMarginSun) 
			+ "," + sunHeight / 1.6 + ")");

	sunSvg.append("g")
		.attr("transform", "translate(" + (- sunWidth * 1.7) + "," 
			+ (-200) + ")")
		.attr("class", "legendG")

	// create colorfunction for sunburst based on sunData
	sunColors = createSunColors(sunData)

	// update sunburst for current country and current year
	updateSunburst(currentCountry, currentYear)

	// create and call d3 tooltip that shows the name and value of the disease
	sunTip = d3.tip()
		.attr("class", "tip")
		.offset([0,0])
		.html(function(d) {
			return "<p><h4>" + d.name + "</h4></p><p><text>" 
				+ d.value + " deaths</text></p>"
		});

	sunSvg.call(sunTip);
};

/* 
* This function creates a colorfunction for each different category in a given 
* dataset and is called in the createSun function in the current script.
* Input arguments:
*	- data: dataset for which to create colorfunctions
*/
function createSunColors(data) {

	var colorFunctions = []

	// determine color for the first and the last disease in each category
	var scaleColorsStart = ["#1c9099", "#cb181d", "#fd8d3c", "#e6550d", 
		"#88419d", "#f16913", "#911eb4", "#084594", "#08519c", "#6a51a3", 
		"#31a354", "#911eb4", "#e6550d", "#de2d26", "#807dba", "#911eb4", 
		"#e6194b", "#0082c8", "#005a32"]
	var scaleColorsEnd = ["#f6eff7", "#fff5f0", "#fdd0a2", "#fee6ce", 
		"#8c6bb1", "#fdae6b", "#e6beff", "#f7fbff", "#eff3ff", "#f2f0f7", 
		"#e5f5e0", "#e6beff", "#fee6ce", "#fcae91", "#dadaeb", "#e6beff", 
		"#fabebe", "#aaffc3", "#c7e9c0"]

	for(var i = 0; i < data.children.length; i ++) {

		// if current root has children, domain includes children and parent
		try {
			var domain = [0, data.children[i].children.length]
		}

		// if current root has no children, domain includes just current root
		catch(err) {
			var domain = [0, 1]
		}

		// create function based on appropriate domain 
		var color = d3.scale.linear().domain(domain)
      		.range([d3.rgb(scaleColorsStart[i]), d3.rgb(scaleColorsEnd[i])]);

      	// store function in colorFunctions under the collective name
		colorFunctions[data.children[i].collectiveName] = color
	}

	return colorFunctions
}

/*
* This function creates the zoom transition that follows clicking on one of the 
* subcategories in the sunburst and is called from the updateSunburst function 
* in the current script.
* Input arguments
*	- d: the clicked subcategory root
*/
function clickSun(d) {

	sunSvg.transition()
		.duration(750)
		.tween("scale", function() {
			var xdSun = d3.interpolate(xSun.domain(), [d.x, d.x + d.dx]),
				ydSun = d3.interpolate(ySun.domain(), [d.y, 1]),
				yrSun = d3.interpolate(ySun.range(), [d.y ? 20 : 0, radius]);
			return function(t) { 
				xSun.domain(xdSun(t));
				ySun.domain(ydSun(t)).range(yrSun(t)); 
			};
		})
		.selectAll(".sunPath")
			.attrTween("d", function(d) { 
				return function() { 
					return arc(d); 
				}; 
			});

	updateLegendaSun(d)
}

/* 
* This function updates the sunburst to display a new currentCountry or 
* currentYear and is called from the createSun function in the current script
* and the updateVisualisations script in "project.js".
* Input arguments:
*	- currentCountry: the country of which to show data
*	- currentYear: the year of which to show data
*/
function updateSunburst(currentCountry, currentYear) {

	var sunData = sunburstData[currentYear][currentCountry];

	// if data is not available, tell user via title and remove sunburst
	if(!sunData) {
		updateTitle("not available")
		sunSvg.selectAll("path").remove()
		sunSvg.selectAll(".textBox1").remove()
		sunSvg.selectAll(".textBox2").remove()
		sunSvg.selectAll(".colorBox").remove()
	}
	else {

		// show selected country and year via title
		updateTitle("available")

		var counter;
		var previousCollectiveName = "Hi"
		var thisColor;
		
		var formatNumber = d3.format(",d")

		var partition = d3.layout.partition()
			.value(function(d) { return d.size; });

		// add new data to paths
		sunPaths = sunSvg.selectAll(".sunPath")
				.data(partition.nodes(sunData))

		// remove all current paths
		sunPaths.remove();

		// add data again to paths (this is necessary due to js' asynchronity)
		sunPaths = sunSvg.selectAll(".sunPath")
			.data(partition.nodes(sunData))
	
		// append all new paths
		sunPaths.enter().append("path")
			.attr("class", "sunPath")
			.on("click", clickSun)
			.on("mouseover", function(d) {

				// only perform for sunburst subcategories
				if(d.name !== "All deaths") {

					// remember current path and color
					var self = this
					thisColor = self.style.fill

					// decrease opacity for all paths except current
					d3.selectAll(".sunPath")
						.filter(function(x) { return self != this; })
						.style("opacity", .2)

					// fill current path with first color of collective name
					d3.select(this)
						.style("fill", function(d) { 
							return sunColors[d.collectiveName](0); 
						});
				};
				sunTip.show(d)
			})
			.on("mouseout", function(d) {

				// only perform for sunburst subcategories
				if(d.name !== "All deaths") {

					// restore opacity for all paths
					d3.selectAll(".sunPath")
						.style("opacity", 1)

					// fill current path with original color
					d3.select(this).style("fill", thisColor)
				}
				sunTip.hide(d);
			})

		// taking into account js' asynchronity, add these components at the end
		sunPaths
			.attr("d", arc)
			.attr("data-name", function(d) {return d.name})
			.attr("data-value", function(d) {return d.value})
			.style("fill", function(d, i) {

				// head category will be colored black
				if(d.name == "All deaths") {
					return "#000000";
				}
				else {
					
					// at the start of each category, turn counter to 0
					if(d.collectiveName != previousCollectiveName) {
						counter = 0
					};
					counter += 1;

					// remember collective name 
					previousCollectiveName = d.collectiveName;

					// determine color based on order inside each subcategory
					return sunColors[d.collectiveName](counter - 1); 
				};
			});
		updateLegendaSun(sunData);
	};
};

/*
* This function updates the legenda for the sunburst and is called from the 
* click and the updateSunburst functions in the current script.
* Input arguments:
*	- rootSun: the head category that is currently shown in the sunburst.
*/
function updateLegendaSun(rootSun) {

	var legend = sunSvg.select(".legendG");

	var categoriesSun = [];

	if(rootSun["children"]) {
		for(var i = 0; i < rootSun["children"].length; i ++) {

			// only show the first 9 categories
			if(categoriesSun.length < 9) {
				if(rootSun["children"][i].size !== 0){
					categoriesSun.push({"name": rootSun["children"][i].name, 
						"collectiveName": rootSun["children"][i]
							.collectiveName});
				};
			};			
		};
	}
	// if category has no children, only show current category
	else {
		categoriesSun.push({"name": rootSun.name, "collectiveName": 
			rootSun.collectiveName});
	};

	var filteredPaths;

	// append categories to colorBoxes
	var colorBoxes = legend.selectAll(".colorBox")
		.data(categoriesSun);

	// remove unnecessary colorBoxes
	colorBoxes.exit().remove();

	// append new colorBoxes if needed
	colorBoxes.enter().append("rect")
		.attr("class", "colorBox")
		.attr("width", 20)
		.attr("height", 30)

		// add mouseover events
		.on("mouseover", function(d) {
			var self = this
			var allPaths = d3.selectAll(".sunPath")

			// select all paths that do not belong in current headcategory
			filteredPaths = d3.selectAll(".sunPath").filter(function(x) { 
				return x.collectiveName != self["id"];
			});

			// if all paths are selected
			if(filteredPaths[0].length == allPaths[0].length) {

				// select only paths that do not belong in current subcategory
				filteredPaths = d3.selectAll(".sunPath").filter(function(x) {
					return x.name != self["id"];
				});
			};

			// decrease opacity of all selected paths
			filteredPaths.style("opacity", .2);
		})
		.on("mouseout", function(d) {

			// restore opacity for all paths
			d3.selectAll(".sunPath")
				.style("opacity", 1);
			filteredPaths = 0;
		});

	colorBoxes.transition().duration(500)
		.delay(function(d, i) { return i * 50; })
		.attr("x", 0)
		.attr("y", function(d, i) { return 40 + 35 * i; })
		.attr("id", function(d) { return d.name; })
		.style("fill", function(d, i) {
			if(i == 0) {

				// set previousCollectiveName to All deaths at the start
				previousCollectiveName = "All deaths";
			};

			// at the start of each category, turn counter to 0
			if(d.collectiveName != previousCollectiveName) {
						counter = 0;
				};
			counter += 1;

			// remember collectiveName
			previousCollectiveName = d.collectiveName;

			// determine color based on order inside each subcategory
			return sunColors[d.collectiveName](counter - 1);
		});

	// add new data to textboxes and remove and append texboxes if nessecary
	var textBoxes1 = legend.selectAll(".textBox1")
		.data(categoriesSun);
	textBoxes1.exit().remove();
	textBoxes1.enter().append("text")
		.attr("class", "textBox1");

	// add new data to textboxes2 and remove and append texboxes if nessecary
	var textBoxes2 = legend.selectAll(".textBox2")
		.data(categoriesSun)
	textBoxes2.exit().remove();
	textBoxes2.enter().append("text")
		.attr("class", "textBox2")

	// let textboxes show new strings via stransition
	textBoxes1.transition().duration(500)
		.delay(function(d, i) { return i * 50; })
		.attr("x", 25)
		.attr("y", function(d, i) { return 53 + 35 * i; })
		.attr("dy", "0em")

		// set text to first half of wrapped text
		.text(function(d) { return wrapText(d.name, 5)[0]; });

	// let textboxes show new strings via stransition
	textBoxes2.transition().duration(500)
		.delay(function(d, i) { return i * 50; })
		.attr("x", 25)
		.attr("y", function(d, i) { return 53 + 35 * i; })

		// show text slightly below text from textboxes1
		.attr("dy", "1em")

		// set text to second half of wrapped text
		.text(function(d) { return wrapText(d.name, 5)[1]; });
};
