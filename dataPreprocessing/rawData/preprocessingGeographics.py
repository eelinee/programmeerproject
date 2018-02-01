# Name: Eline Rietdijk
# Project: programmeerproject minor programmeren
# Studentnumber: 10811834
#
# "preprocessingeGeographics.py"
# This file processes the csv file used for the geographic information in the 
# scattterplot.

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

# loop through rows of reader and years
for row in reader:
	for year in range(2000, 2016):

		# check if data is available
		if row[str(year)] != "" and row[str(year)] != " ":
			empty = False

	if empty == False:

		# if available, add country row with region name
		data[row["Countries"]] = {}
		data[row["Countries"]]["Region"] = row["Region"]

		# also add population count for each year to country row
		for year in range(2000, 2016):
			data[row["Countries"]][year] = row[str(year)]
	empty = True




# store data in a jsonfile
json.dump(data, jsonfile)

