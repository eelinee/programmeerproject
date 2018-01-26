import csv
import json

# open jsonfile to save data 
jsonfile = open("linegraphDataNew.json", "w")

# create array to store data before saving it to jsonfile
data = {}

# create arrays with different csvfiles and variable names to store in jsonfile
csvfiles = ["drinkingwaterPopulation.csv", "sanitationPercentage.csv", "openDefecationPercentage.csv", "handwashingPercentage.csv"]
names = ["With access to drinking water", "With access to sanitation services", "That practices open defecation", "With handwashing facilities at home"]

# for each csvfile
for i in range(0, 4):

	# open file to read and create reader
	csvfile = open(csvfiles[i], "r")
	reader = csv.DictReader(csvfile)

	for row in reader:
		

		# # else, just add new variable (that contains an array) to the array
		# else:
		# 	data[row["Country"]][names[i]] = {}

		# # fill the created arrays with the corresponding value
		# for j in range(2000, 2016):

		# if first time, create country variable that contains array
		if(i == 0):
			data[row["Country"]] = []
		# print(data)
			data[row["Country"]].append({})
			data[row["Country"]].append({})
			data[row["Country"]].append({})
			data[row["Country"]].append({})
		if(i == 2):
			data[row["Country"]][i]["Id"] = "That does not practice open defecation"
		else:
			data[row["Country"]][i]["Id"] = names[i]
		data[row["Country"]][i]["Values"] = []
		
		for j in range(2000, 2016):
			if row[str(j)] != "":
				data[row["Country"]][i]["Values"].append({})
				data[row["Country"]][i]["Values"][len(data[row["Country"]][i]["Values"]) - 1]["Year"] = j
				if(i == 2):
					data[row["Country"]][i]["Values"][len(data[row["Country"]][i]["Values"]) - 1]["Value"] = str(100 - float(row[str(j)]))
				
				else:
					data[row["Country"]][i]["Values"][len(data[row["Country"]][i]["Values"]) - 1]["Value"] = row[str(j)]
				
				
		

		for dataRow in data:
			if len(dataRow) < i + 1:
				print("Kleiner")
				dataRow.append({})
				dataRow[i]["Id"] = names[i]
				dataRow[i]["Values"] = []

		# if(j == 2000):
		# 	data[row["Country"]][i] = {"Variable" : names[i], "Values" : }

		# 	data[row["Country"]][i]["Values"]
		# 	data[row["Country"]][names[i]]["Year"] = str(j)
		# 	data[row["Country"]][names[i]]["Value"] = row[str(j)]

# MISSCHIEN IS HET NU GOED ZOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
# print(data)

# store data in a jsonfile
json.dump(data, jsonfile)