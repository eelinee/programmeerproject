window.onload = function() {

	d3.queue()
	.defer(d3.json, "sunburstData.json")
	// .defer(d3.csv, "totalPopulation.csv")
	// .defer(d3.json, "rawData.json")
	// .defer(d3.csv, "drinkingwaterPopulation.csv")
	// .defer(d3.csv, "sanitationPercentage.csv")
	// .defer(d3.csv, "opendefecationPercentage.csv")
	// .defer(d3.csv, "handwashingPercentage.csv")
	.await(preprocess)
}

function preprocess(error, linegraph) {
	
	console.log("HALLO")
	console.log(linegraph)


	// var data = []

	// var countries = {}

	// for(var i = 0; i < totalDeaths.length; i ++) {

	// 	data.push({"relativeDeaths" : {}})
	// 	for(var j = 2000; j < 2016; j ++) {
	// 		data[i]["country"] = totalDeaths[i].Countries
	// 		countries[totalDeaths[i].Countries] = i
	// 		if(totalDeaths[i][j].trim() == "" || totalPopulation[i][j].trim() == "") {
	// 			data[i].relativeDeaths[j] = ""
	// 		}
	// 		else {				
	// 			var newValue = totalDeaths[i][j] / totalPopulation[i][j] * 100000
				
	// 			data[i].relativeDeaths[j] = newValue
	// 		}
	// 	}
	// }

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

	// console.log(data)
	// console.log(countries)
}

