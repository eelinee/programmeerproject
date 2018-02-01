import csv
import json

data = {}

jsonfile = open("bmiMean.json", "w")

csvfile = open("bmiMean.csv", "r")
reader = csv.DictReader(csvfile)

for row in reader:
	data[row["Country"]] = {}
	for j in range(2000, 2016):
		data[row["Country"]][str(j)] = row[str(j)]

json.dump(data, jsonfile)