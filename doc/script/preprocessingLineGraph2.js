window.onload = function() {

	d3.queue()
	.defer(d3.csv, "totalDeaths.csv")
	.defer(d3.csv, "totalPopulation.csv")
	.defer(d3.json, "rawData.json")
	.defer(d3.csv, "drinkingwaterPopulation.csv")
	.defer(d3.csv, "sanitationPercentage.csv")
	.defer(d3.csv, "opendefecationPercentage.csv")
	.defer(d3.csv, "handwashingPercentage.csv")
	.await(preprocess)
}

function preprocess(error, totalDeaths, totalPopulation, rawData, drinkingWater, sanitation, openDefecation, handWashing) {
	
	var data = []

	var countries = {}

	for(var i = 0; i < drinkingWater.length; i ++) {
		data[drinkingWater[i].Country] = {"With access to drinking water": {}}

		for(var j = 2000; j < 2016; j ++) {
			data[drinkingWater[i].Country]["With access to drinking water"][j] = drinkingWater[i][j]
		}
	}

	for(var i = 0; i < sanitation.length; i ++) {
		data[sanitation[i].Country]["With access to sanitation services"] = {}

		for(var j = 2000; j < 2016; j ++) {
			data[sanitation[i].Country]["With access to sanitation services"][j] = sanitation[i][j]
		}
	}

	for(var i = 0; i < openDefecation.length; i ++) {
		data[openDefecation[i].Country]["That practices open defecation"] = {}

		for(var j = 2000; j < 2016; j ++) {
			data[openDefecation[i].Country]["That practices open defecation"][j] = openDefecation[i][j]
		}
	}

	for(var i = 0; i < handWashing.length; i ++) {
		data[handWashing[i].Country]["With handwashing facilities at home"] = {}

		for(var j = 2000; j < 2016; j ++) {
			data[handWashing[i].Country]["With handwashing facilities at home"][j] = handWashing[i][j]
		}
	}

	// var countriesCount = 0

	// for(var i = 0; i < drinkingWater.length; i ++) {
	// 	for(var j = 2000; j < 2016; j++) {
	// 		if(j == 2000) {
	// 			index = countries[drinkingWater[i].Country]
	// 			if(!index) {
	// 				index = totalDeaths.length + countriesCount
	// 				countriesCount += 1
	// 				countries[drinkingWater[i].Country] = index
	// 				data.push({"country": drinkingWater[i].Country, "drinkingWater": {}})
	// 				}
	// 			else {
	// 				data[index].drinkingWater = {}
	// 				}
	// 		}
	// 		data[index].drinkingWater[j] = drinkingWater[i][j]
	// 	}
	// }

	// for(var i = 0; i < sanitation.length; i ++) {
	// 	for(var j = 2000; j < 2016; j++) {
	// 		if(j == 2000) {
	// 			index = countries[sanitation[i].Country]
	// 			if(!index) {
	// 				index = totalDeaths.length + countriesCount
	// 				countriesCount += 1
	// 				countries[sanitation[i].Country] = index
	// 				data.push({"country": sanitation[i].Country, "sanitationServices": {}})
	// 				}
	// 			else {
	// 				data[index].sanitationServices = {}
	// 				}
	// 		}
	// 		data[index].sanitationServices[j] = sanitation[i][j]
	// 	}
	// }

	// for(var i = 0; i < openDefecation.length; i ++) {
	// 	for(var j = 2000; j < 2016; j++) {
	// 		if(j == 2000) {
	// 			index = countries[openDefecation[i].Country]
	// 			if(!index) {
	// 				index = totalDeaths.length + countriesCount
	// 				countriesCount += 1
	// 				countries[openDefecation[i].Country] = index
	// 				data.push({"country": openDefecation[i].Country, "openDefecation": {}})
	// 				}
	// 			else {
	// 				data[index].openDefecation = {}
	// 				}
	// 		}
	// 		data[index].openDefecation[j] = openDefecation[i][j]
	// 	}
	// }

	// for(var i = 0; i < handWashing.length; i ++) {
	// 	for(var j = 2000; j < 2016; j++) {
	// 		if(j == 2000) {
	// 			index = countries[handWashing[i].Country]
	// 			if(!index) {
	// 				index = totalDeaths.length + countriesCount
	// 				countriesCount += 1
	// 				countries[handWashing[i].Country] = index
	// 				data.push({"country": handWashing[i].Country, "handWashing": {}})
	// 				}
	// 			else {
	// 				data[index].handWashing = {}
	// 				}
	// 		}
	// 		data[index].handWashing[j] = handWashing[i][j]
	// 	}
	// }

	console.log(data)
	console.log(countries)
}

