import csv
import json

# open jsonfile to save data 
jsonfile = open("linegraphData2.json", "w")

# create array to store data before saving it to jsonfile
data = {}

# create arrays with different csvfiles and variable names to store in jsonfile
csvfiles = ["drinkingwaterPopulation.csv", "sanitationPercentage.csv", "handwashingPercentage.csv", "openDefecationPercentage.csv"]
names = ["With access to drinking water", "With access to sanitation services", "With handwashing facilities at home", "That practices open defecation"]

# for each csvfile
for i in range(0, 4):

	# open file to read and create reader
	csvfile = open(csvfiles[i], "r")
	reader = csv.DictReader(csvfile)

	for row in reader:
		

		# # else, just add new variable (that contains an array) to the array
		# else:
		# 	data[row["Country"]][names[i]] = {}

		# fill the created arrays with the corresponding value
		for j in range(2000, 2016):

			# if first time, create country variable that contains array
			if(i == 0 and j == 2000):
				data[row["Country"]] = {}
			if(i == 0):
				data[row["Country"]][str(j)] = {}
			data[row["Country"]][str(j)]["Year"] = str(j)
			data[row["Country"]][str(j)][names[i]] = row[str(j)]


# print(data)

# store data in a jsonfile
json.dump(data, jsonfile)