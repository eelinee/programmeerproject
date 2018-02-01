# Name: Eline Rietdijk
# Project: programmeerproject minor programmeren
# Studentnumber: 10811834
#
# "preprocessingeLineGraph.py"
# This file processes the csv files used for the sunburst and saves it to one 
# big json file. 

import csv
import json

# initialize array to store data
data = {}

# remember all diseases to store values of in data
diseases = ["Total","Certain infectious and parasitic diseases","Neoplasms",
	"Diseases of blood and disorders of immune mechanism",
	"Endocrine nutritional and metabolic diseases",
	"Mental and behavioural disorders","Diseases of the nervous system",
	"Diseases of the eye and adnexa","Diseases of the ear and mastoid process",
	"Diseases of the circulatory system","Diseases of the respiratory system",
	"Diseases of the digestive system",
	"Diseases of the skin and subcutaneous tissue",
	"Diseases of the musculoskeletal system and connective tissue",
	"Diseases of the genitourinary system",
	"Pregnancy childbirth and the puerperium",
	"Conditions originating in the perinatal period",
	"Congenital malformations deformations and  abnormalities",
	"Symptoms signs and abnormal clinical and laboratory findings",
	"External causes of morbidity and mortality",
	"Intestinal infectious diseases","Tuberculosis","Tetanus","Diphtheria",
	"Whooping cough","Meningococcal infection","Septicaemia",
	"Infections with a predominantly sexual mode of transmission (excluding HIV)",
	"Poliomyelitis","Measles","Viral hepatitis",
	"Human immunodeficiency virus [HIV] disease","Malaria",
	"Total of malignant neoplams",
	"Malignant neoplasm of lip oral cavity and pharynx",
	"Malignant neoplasm of oesophagus","Malignant neoplasm of stomach",
	"Malignant neoplasm of colon rectosigmoid junction rectum anus and anal canal",
	"Malignant neoplasm of liver and intrahepatic bile ducts",
	"Malignant neoplasm of pancreas","Malignant neoplasm of trachea bronchus and lung",
	"Melanoma and other skin cancers","Malignant neoplasm of  breast",
	"Malignant neoplasm of cervix uteri","Malignant neoplasm of corpus uteri",
	"Malignant neoplasm of ovary","Malignant neoplasm of prostate",
	"Malignant neoplasm of bladder",
	"Malignant neoplasm of lymphomas and multiple myeloma","Leukaemia",
	"Benign neoplasms","Anaemias","Diabetes mellitus","Malnutrition",
	"Alzheimer and other dementias",
	"Acute rheumatic fever and chronic rheumatic heart diseases",
	"Hypertensive diseases","Ischaemic heart diseases",
	"Cerebrovascular diseases","Diseases of arteries arterioles and capillaries",
	"Influenza","Pneumonia","Chronic lower respiratory diseases",
	"Gastric and duodenal ulcer","Diseases of the liver",
	"Disorders of kidney and ureter","Hyperplasia of prostate",
	"Pregnancy with abortive outcome","Other direct obstetric causes",
	"Indirect obstetric causes","Transport accidents","Falls",
	"Accidental drowning and submersion","Exposure to smoke fire and flames",
	"Accidental poisoning by and exposure to noxious substances",
	"Intentional self-harm","Assault","All other external causes"]

jsonfile = open('sunBurstData50.json', 'w')

# remember all csvfiles and corresponding years to get data from
csvfiles = ["deaths2000.csv", "deaths2001.csv", "deaths2002.csv", 
	"deaths2003.csv", "deaths2004.csv", "deaths2005.csv", "deaths2006.csv", 
	"deaths2007.csv", "deaths2008.csv", "deaths2009.csv", "deaths2010.csv", 
	"deaths2011.csv", "deaths2012.csv", "deaths2013.csv", "deaths2014.csv", 
	"deaths2015.csv"]
years = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", 
	"2009", "2010", "2011", "2012", "2013", "2014", "2015"]

# open file containing total population for each country each year
population = open("totalPopulation.csv", "r")
populationReader = list(csv.DictReader(population))

# loop over files
for j in range(len(csvfiles)):

	# open current file
	deaths = open(csvfiles[j], 'r')
	reader = csv.DictReader(deaths)

	data[years[j]] = {}

	# loop through rows of current file
	for row in reader:

		# do not add row if data is missing (total value is empty)
		if row["Total"] != "" and row["Total"] != " ":

			# create array to contain name and all children
			data[years[j]][row["Countries"]] = {"name": "All deaths", "children": []};

			# add head categories to children
			for i in range(0,19):
				data[years[j]][row["Countries"]]["children"].append({})
				data[years[j]][row["Countries"]]["children"][i]["name"] = diseases[i + 1]

				# these are all head categories without children
				if i == 5 or i == 6 or i == 7 or i == 11 or i == 12 or i == 15 
					or i == 16 or i == 17:

					# add size if value is not empty
					if row[diseases[i + 1]] != "" and row[diseases[i + 1]] != " ":
						data[years[j]][row["Countries"]]["children"][i]["size"] 
							= int(row[diseases[i + 1]])

					# else, add a size of 0
					else:
						data[years[j]][row["Countries"]]["children"][i]["size"] 
							= 0

				# for all head categories that have children
				else:

					# add children array to contain children
					data[years[j]][row["Countries"]]["children"][i]["children"] 
						= []

				# add collectivename to head category
				data[years[j]][row["Countries"]]["children"][i]["collectiveName"] 
					= diseases[i + 1]

			# for all children of the 0th headcategory:
			for i in range(21,33):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":

					# append name, size and collectivename
					data[years[j]][row["Countries"]]["children"][0]["children"]
						.append({"name": diseases[i], "size": int(row[diseases[i]]), 
							"collectiveName" : diseases[1]})

			# for all children of the 1st headcategory:
			for i in range(33, 51):

				# do not add total, only interested in subcategories
				if row[diseases[i]] != "" and row[diseases[i]] != " " 
					and diseases[i] != "Total of malignant neoplams":

					# append name, size and collectivename
					data[years[j]][row["Countries"]]["children"][1]["children"]
						.append({"name": diseases[i], "size": int(row[diseases[i]]), 
							"collectiveName" : diseases[2]})
			
			# for all children of the 2nd headcategory:
			for i in range(51, 52):
				if row[diseases[i]] != "" and row[diseases[i]] != " " :

					# append name, size and collectivename
					data[years[j]][row["Countries"]]["children"][2]["children"]
						.append({"name": diseases[i], "size": int(row[diseases[i]]), 
							"collectiveName" : diseases[3]})
			
			# for all children of the 3rd headcategory:
			for i in range(52, 54):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":

					# append name, size and collectivename
					data[years[j]][row["Countries"]]["children"][3]["children"]
						.append({"name": diseases[i], "size": int(row[diseases[i]]), 
							"collectiveName" : diseases[4]})
			
			# for all children of the 5th headcategory:
			for i in range(54, 55):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":

					# append name, size and collectivename
					data[years[j]][row["Countries"]]["children"][4]["children"]
						.append({"name": diseases[i], "size": int(row[diseases[i]]), 
							"collectiveName" : diseases[5]})
			
			# for all children of the 8th headcategory:
			for i in range(55, 60):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":

					# append name, size and collectivename
					data[years[j]][row["Countries"]]["children"][8]["children"]
						.append({"name": diseases[i], "size": int(row[diseases[i]]), 
							"collectiveName" : diseases[9]})
			
			# for all children of the 9th headcategory:
			for i in range(60, 63):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":

					# append name, size and collectivename
					data[years[j]][row["Countries"]]["children"][9]["children"]
					.append({"name": diseases[i], "size": int(row[diseases[i]]), 
						"collectiveName" : diseases[10]})

			# for all children of the 10th headcategory:
			for i in range(63, 65):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":

					# append name, size and collectivename
					data[years[j]][row["Countries"]]["children"][10]["children"]
					.append({"name": diseases[i], "size": int(row[diseases[i]]), 
						"collectiveName" : diseases[11]})
			
			# for all children of the 13th headcategory:
			for i in range(65, 67):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":

					# append name, size and collectivename
					data[years[j]][row["Countries"]]["children"][13]["children"]
					.append({"name": diseases[i], "size": int(row[diseases[i]]), 
						"collectiveName" : diseases[14]})
			
			# for all children of the 14th headcategory:
			for i in range(67, 70):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":

					# append name, size and collectivename
					data[years[j]][row["Countries"]]["children"][14]["children"]
					.append({"name": diseases[i], "size": int(row[diseases[i]]), 
						"collectiveName" : diseases[15]})
			
			# for all children of the 18th headcategory:
			for i in range(70, 78):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":

					# append name, size and collectivename
					data[years[j]][row["Countries"]]["children"][18]["children"]
					.append({"name": diseases[i], "size": int(row[diseases[i]]), 
						"collectiveName" : diseases[19]})
	
# write data to jsonfile
json.dump(data, jsonfile)
