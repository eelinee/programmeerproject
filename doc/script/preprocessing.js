window.onload = function() {

	d3.queue()
	.defer(d3.csv, "totalDeaths.csv")
	.defer(d3.csv, "totalPopulation.csv")
	.defer(d3.json, "rawData.json")
	.defer(d3.csv, "drinkingwaterPopulation.csv")
	.defer(d3.csv, "sanitationPercentage.csv")
	.defer(d3.csv, "opendefecationPercentage.csv")
	.await(preprocess)
}

function preprocess(error, totalDeaths, totalPopulation, rawData, drinkingWater, sanitation, openDefecation) {
	
	var data = [{"relativeDeaths": {}}]

	var countries = {}

	for(var i = 0; i < totalDeaths.length; i ++) {

		data.push({"relativeDeaths" : {}})
		for(var j = 2000; j < 2016; j ++) {
			data[i]["country"] = totalDeaths[i].Countries
			countries[totalDeaths[i].Countries] = i
			if(totalDeaths[i][j].trim() == "" || totalPopulation[i][j].trim() == "") {
				data[i].relativeDeaths[j] = ""
			}
			else {				
				var newValue = totalDeaths[i][j] / totalPopulation[i][j] * 100000
				
				data[i].relativeDeaths[j] = newValue
			}
		}
	}

	var countriesCount = 1

	for(var i = 2; i < drinkingWater.length; i ++) {
		for(var j = 2000; j < 2016; j++) {
			if(j == 2000) {
				index = countries[drinkingWater[i].Country]
				console.log(drinkingWater[i].Country)
				console.log(countries[drinkingWater[i].Country])
				console.log(countries["Antigua and Barbuda"])
				if(!index) {
					index = totalDeaths.length + countriesCount
					countries[drinkingWater[i].Country] = index
					data.push({"country": drinkingWater[i].Country, "drinkingWater": {}})
					}
				else {
					data[index].drinkingWater = {}
					console.log("Hoi")
					console.log(drinkingWater[i].Country)
					}
			}
			data[index].drinkingWater[j] = drinkingWater[i][j]
		}
	}

	console.log(data)
	console.log(countries)

	for(var i = 2; i < sanitation.length; i ++) {
		for(var j = 2000; j < 2016; j++) {
			if(j == 2000) {
				index = countries[sanitation[i].Country]
				if(!index) {
					index = totalDeaths.length + countriesCount
					countries[sanitation[i].Country] = index
					data.push({"country": sanitation[i].Country, "sanitationServices": {}})
					}
				else {
					data[index].sanitationServices = {}
					}
			}
			data[index].sanitationServices[j] = sanitation[i][j]
		}
	}

	console.log(data)
	console.log(countries)

	for(var i = 2; i < openDefecation.length; i ++) {
		for(var j = 2000; j < 2016; j++) {
			if(j == 2000) {
				index = countries[openDefecation[i].Country]
				if(!index) {
					index = totalDeaths.length + countriesCount
					countries[openDefecation[i].Country] = index
					data.push({"country": openDefecation[i].Country, "openDefecation": {}})
					}
				else {
					data[index].openDefecation = {}
					}
			}
			data[index].openDefecation[j] = openDefecation[i][j]
		}
	}

	console.log(data)
	console.log(countries)
}

