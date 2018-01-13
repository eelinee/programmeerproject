import csv
import json

jsonfile = open("linegraphData.json", "w")
data = {}


drinkingWater = open("drinkingwaterPopulation.csv", "r")
drinkingWaterReader = csv.DictReader(drinkingWater)

for row in drinkingWaterReader:
	data[row["Country"]] = {"With access to drinking water": {}}

	for i in range(2000, 2016):
		data[row["Country"]]["With access to drinking water"][str(i)] = row[str(i)]

json.dump(data, jsonfile)