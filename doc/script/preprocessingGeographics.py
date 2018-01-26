import csv
import json

# open jsonfile to save data 
jsonfile = open("geographics.json", "w")

# create array to store data before saving it to jsonfile
data = {}

# open file to read and create reader
csvfile = open("totalPopulationRegion.csv", "r")
reader = csv.DictReader(csvfile)

empty = True

for row in reader:
	for year in range(2000, 2016):
		if row[str(year)] != "" and row[str(year)] != " ":
			empty = False
	if empty == False:
		data[row["Countries"]] = {}
		data[row["Countries"]]["Region"] = row["Region"]
		for year in range(2000, 2016):
			data[row["Countries"]][year] = row[str(year)]
	empty = True




# store data in a jsonfile
json.dump(data, jsonfile)

