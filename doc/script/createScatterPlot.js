/* Name: Eline Rietdijk
Studentnumber: 10811834

'createScatterPlot.js'
This script......*/

function createScatter(diseaseData, hygieneData, year) {
	
	xVariable = "External causes of morbidity and mortality"
	yVariable = "With access to sanitation services"

	console.log(diseaseData)

	var xVariableOptions = ["External causes of morbidity and mortality", "Certain infectious and parasitic diseases"]
	var yVariableOptions = ["With access to drinking water", "With access to sanitation services"]

	scatterData = combineData(diseaseData, hygieneData, xVariable, yVariable, year)
	console.log(scatterData)

	var legendaMarginScatter = 200
	var bottomMarginScatter = 100

	scatterWidth = width * 0.56 - margin.left - margin.right - legendaMarginScatter;
	scatterHeight = height - margin.top - margin.bottom - bottomMarginScatter;

	x = d3.scale.linear()
		.range([0, scatterWidth])
		.domain([0, 6000]) // DIT NOG SPECIFIEKER OF UPDATEN MAKEN

	y = d3.scale.linear()
		.range([0, scatterHeight])
		.domain([100, 80])

	var scatterSvg = d3.select(".scatterDiv")
		.append("svg")
		.attr("id", "scatterSvg")
		.attr("width", scatterWidth + margin.left + margin.right + legendaMarginScatter)
		.attr("height", scatterHeight + margin.bottom + margin.top + bottomMarginScatter)

		// append g element with predefined margins
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var lableText = [xVariable + " per 100 000 population", "Percentage of population " + yVariable.toLowerCase()]

	var domainScatter = findDomain(newData, xVariable, yVariable)
	var xDomainScatter = domainScatter[0]
	var yDomainScatter = domainScatter[1]

	xValue = tickInt
	yValue = tickPercentage

	createAxes(scatterSvg, scatterData, x, y, scatterHeight, scatterWidth, lableText, xDomainScatter, yDomainScatter, xValue, yValue)
	createDots(newData, scatterSvg, x, y, xVariable, yVariable)
	createCheckBoxes(xVariableOptions, yVariableOptions)

};

function combineData(diseaseData, hygieneData, xVariable, yVariable, year) {
	
	newData = []

	useData = Object.values(diseaseData[year])

	missingDataTotal = []
	missingDataHygiene = []
	
	counter = 0
	

	for(var i = 0; i < useData.length; i ++) {
		// newData.push(useData[i].Country)
		if(useData[i]["TotalPopulation"] != "" && useData[i]["TotalPopulation"]) {
			if(useData[i][xVariable]["Total"] != "") {
				newData[counter] = {}
				newData[counter]["Country"] = useData[i].Country
				variable = useData[i][xVariable]["Total"] / useData[i]["TotalPopulation"] * 100000
				newData[counter][xVariable] = variable
				counter += 1
				// catch(err) {
				// 	if(useData[i][xVariable] != "") {
				// 		newData[i] = {}
				// 		newData[i]["Country"] = useData[i].Country
				// 		variable = (useData[i][xVariable] / useData[i]["TotalPopulation"]) * 100000
				// 		console.log(useData[i][xVariable])
				// 		console.log(useData[i]["TotalPopulation"])
				// 		console.log(variable)
				// 		console.log("AHUIERKDJHGEUWG")
				// 		newData[i][xVariable] = variable
				// 	}
				// }
				console.log("TOTAL POPULATION")
				console.log(useData[i]["TotalPopulation"])
			}
		}
		else {
			missingDataTotal.push(useData[i].Country)
		}
	};

	for(var i = 0; i < newData.length; i ++) {
		try {
			if(hygieneData[newData[i]["Country"]][year][yVariable] == "") {
				missingDataTotal.push(newData[i]["Country"])
				missingDataHygiene.push(i)
			}
			else {
				newData[i][yVariable] = +hygieneData[newData[i]["Country"]][year][yVariable]
			}
		}
		catch(err) {
			missingDataTotal.push(newData[i]["Country"])
			missingDataHygiene.push(i)
		}
		
	}

	// console.log(newData)

	for(var i = 0; i < missingDataHygiene.length; i ++) {
		newData.splice(missingDataHygiene[i] - i, 1)
	}

	console.log(newData)


	return newData

}

function createDots(newData, scatterSvg, x, y, xVariable, yVariable) {

	scatterColors = d3.scale.category20()

	var scatterTip = d3.tip()
		.attr("class", "tip")
		.offset([0,0])
		.html(function(d, i) {
			return "<p><strong>" + d.Country + "</strong></p><p><text>("
				+ Math.round(d[xVariable] * 100) / 100 + "," + Math.round(d[yVariable] * 100) / 100
				+ ") </text></p>"
		});

	scatterSvg.call(scatterTip)

	scatterSvg.selectAll(".dot")
		.data(newData)
		.enter().append("circle")
		.attr("id", function(d) {return d.Country})
		.attr("class", "dot")
		.style("stroke-width", "2px")
		.attr("r", 6)
		.attr("cx", function(d) {return x(d[xVariable])})
		.attr("cy", function(d) {return y(d[yVariable])})
		.style("fill", function(d) {return scatterColors(d.Country)})
		.on("mouseover", function(d, i) {

			// on mouseover, show scatterTip containing corresponding values
			scatterTip.show(d);

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

	console.log(xVariable)
	console.log(x(newData[3][xVariable]))
}

function findDomain(domainData, xVariable, yVariable) {

	var xMax; 
	var yMin;
	var yMax;

	console.log(domainData.length)

	for (var i = 0; i < domainData.length; i ++) {
		if (!xMax || domainData[i][xVariable] > xMax) {
			xMax = domainData[i][xVariable]
		}
		if (!yMin || domainData[i][yVariable] < yMin) {
			yMin = domainData[i][yVariable]
		}
		if (!yMax || domainData[i][yVariable] > yMax) {
			yMax = domainData[i][yVariable]
		}
	}

	yMin = yMin - 2
	console.log(xMax)

	return [[0, xMax],[yMax, yMin]]
}

function createCheckBoxes(xVariables, yVariables) {
	console.log("xVariables")
	// for(var i = 0; i < xVariables.length; i++) {
	// 	// scatterSvg.selectAll()
	// }
}