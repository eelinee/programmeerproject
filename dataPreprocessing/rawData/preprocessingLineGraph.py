# Name: Eline Rietdijk
# Project: programmeerproject minor programmeren
# Studentnumber: 10811834
#
# "preprocessingeLineGraph.py"
# This file processes the csv files used for the line graph and saves it to one 
# big json file. 

import csv
import json

# open jsonfile to save data 
jsonfile = open("linegraphData.json", "w")

# create array to store data before saving it to jsonfile
data = {}

# create arrays with different csvfiles and variable names to store in jsonfile
csvfiles = ["drinkingwaterPopulation.csv", "sanitationPercentage.csv", 
	"openDefecationPercentage.csv", "handwashingPercentage.csv"]
names = ["With access to drinking water", "With access to sanitation services", 
	"That practices open defecation", "With handwashing facilities at home"]

# for each csvfile
for i in range(0, 4):

	# open file to read and create reader
	csvfile = open(csvfiles[i], "r")
	reader = csv.DictReader(csvfile)

	for row in reader:

		# if first time, create country variable that contains array
		if(i == 0):
			data[row["Country"]] = []
			data[row["Country"]].append({})
			data[row["Country"]].append({})
			data[row["Country"]].append({})
			data[row["Country"]].append({})

		# show % "that does not practice" instead of "that does practice"
		if(i == 2):
			data[row["Country"]][i]["Id"] = "Not practicing open defecation"
		else:
			data[row["Country"]][i]["Id"] = names[i]

		# add empty array to contain values for each year
		data[row["Country"]][i]["Values"] = []
		
		# add values for each year
		for j in range(2000, 2016):
			if row[str(j)] != "":
				data[row["Country"]][i]["Values"].append({})
				data[row["Country"]][i]["Values"][len(data[row["Country"]][i]
					["Values"]) - 1]["Year"] = j

				# calculate % "that does not practice" instead of "that does"
				if(i == 2):
					data[row["Country"]][i]["Values"][len(data[row["Country"]]
						[i]["Values"]) - 1]["Value"] = str(int(100 - float(row[str(j)])))
				
				else:
					data[row["Country"]][i]["Values"][len(data[row["Country"]]
						[i]["Values"]) - 1]["Value"] = row[str(j)]
		
		# add empty array for missing data
		for dataRow in data:
			if len(dataRow) < i + 1:
				print("Kleiner")
				dataRow.append({})
				dataRow[i]["Id"] = names[i]
				dataRow[i]["Values"] = []


# store data in a jsonfile
json.dump(data, jsonfile)