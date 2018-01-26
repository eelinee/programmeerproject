import csv
import json

data = {
}

diseases = ["Total","Certain infectious and parasitic diseases","Neoplasms","Diseases of blood and disorders of immune mechanism","Endocrine nutritional and metabolic diseases","Mental and behavioural disorders","Diseases of the nervous system","Diseases of the eye and adnexa","Diseases of the ear and mastoid process","Diseases of the circulatory system","Diseases of the respiratory system","Diseases of the digestive system","Diseases of the skin and subcutaneous tissue","Diseases of the musculoskeletal system and connective tissue","Diseases of the genitourinary system","Pregnancy childbirth and the puerperium","Conditions originating in the perinatal period","Congenital malformations deformations and  abnormalities","Symptoms signs and abnormal clinical and laboratory findings","External causes of morbidity and mortality","Intestinal infectious diseases","Tuberculosis","Tetanus","Diphtheria","Whooping cough","Meningococcal infection","Septicaemia","Infections with a predominantly sexual mode of transmission (excluding HIV)","Poliomyelitis","Measles","Viral hepatitis","Human immunodeficiency virus [HIV] disease","Malaria","Total of malignant neoplams","Malignant neoplasm of lip oral cavity and pharynx","Malignant neoplasm of oesophagus","Malignant neoplasm of stomach","Malignant neoplasm of colon rectosigmoid junction rectum anus and anal canal","Malignant neoplasm of liver and intrahepatic bile ducts","Malignant neoplasm of pancreas","Malignant neoplasm of trachea bronchus and lung","Melanoma and other skin cancers","Malignant neoplasm of  breast","Malignant neoplasm of cervix uteri","Malignant neoplasm of corpus uteri","Malignant neoplasm of ovary","Malignant neoplasm of prostate","Malignant neoplasm of bladder","Malignant neoplasm of lymphomas and multiple myeloma","Leukaemia","Benign neoplasms","Anaemias","Diabetes mellitus","Malnutrition","Alzheimer and other dementias","Acute rheumatic fever and chronic rheumatic heart diseases","Hypertensive diseases","Ischaemic heart diseases","Cerebrovascular diseases","Diseases of arteries arterioles and capillaries","Influenza","Pneumonia","Chronic lower respiratory diseases","Gastric and duodenal ulcer","Diseases of the liver","Disorders of kidney and ureter","Hyperplasia of prostate","Pregnancy with abortive outcome","Other direct obstetric causes","Indirect obstetric causes","Transport accidents","Falls","Accidental drowning and submersion","Exposure to smoke fire and flames","Accidental poisoning by and exposure to noxious substances","Intentional self-harm","Assault","All other external causes"]

jsonfile = open('sunBurstData50.json', 'w')

csvfiles = ["deaths2000.csv", "deaths2001.csv", "deaths2002.csv", "deaths2003.csv", "deaths2004.csv", "deaths2005.csv"]
years = ["2000", "2001", "2002", "2003", "2004", "2005"]
population = open("totalPopulation.csv", "r")
populationReader = list(csv.DictReader(population))

for j in range(len(csvfiles)):
	deaths = open(csvfiles[j], 'r')
	reader = csv.DictReader(deaths)

	data[years[j]] = {}

	for row in reader:
		if row["Total"] != "" and row["Total"] != " ":
			data[years[j]][row["Countries"]] = {"name": "All deaths", "children": []};
			#data[years[j]][row[i]] = {} #, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
			for i in range(0,19):
				data[years[j]][row["Countries"]]["children"].append({})
				data[years[j]][row["Countries"]]["children"][i]["name"] = diseases[i + 1]
				data[years[j]][row["Countries"]]["children"][i]["children"] = []
			for i in range(21,33):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":
					data[years[j]][row["Countries"]]["children"][0]["children"].append({"name": diseases[i], "size": int(row[diseases[i]])})
			for i in range(33, 51):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":
					data[years[j]][row["Countries"]]["children"][1]["children"].append({"name": diseases[i], "size": int(row[diseases[i]])})
			for i in range(51, 52):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":
					data[years[j]][row["Countries"]]["children"][2]["children"].append({"name": diseases[i], "size": int(row[diseases[i]])})
			for i in range(52, 54):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":
					data[years[j]][row["Countries"]]["children"][3]["children"].append({"name": diseases[i], "size": int(row[diseases[i]])})
			for i in range(54, 55):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":
					data[years[j]][row["Countries"]]["children"][4]["children"].append({"name": diseases[i], "size": int(row[diseases[i]])})
			for i in range(55, 60):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":
					data[years[j]][row["Countries"]]["children"][8]["children"].append({"name": diseases[i], "size": int(row[diseases[i]])})
			for i in range(60, 63):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":
					data[years[j]][row["Countries"]]["children"][9]["children"].append({"name": diseases[i], "size": int(row[diseases[i]])})
			for i in range(63, 65):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":
					data[years[j]][row["Countries"]]["children"][10]["children"].append({"name": diseases[i], "size": int(row[diseases[i]])})
			for i in range(65, 67):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":
					data[years[j]][row["Countries"]]["children"][13]["children"].append({"name": diseases[i], "size": int(row[diseases[i]])})
			for i in range(67, 70):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":
					data[years[j]][row["Countries"]]["children"][14]["children"].append({"name": diseases[i], "size": int(row[diseases[i]])})
			for i in range(70, 78):
				if row[diseases[i]] != "" and row[diseases[i]] != " ":
					data[years[j]][row["Countries"]]["children"][18]["children"].append({"name": diseases[i], "size": int(row[diseases[i]])})

	# print(populationReader)

	# print(data)

	# for rows in populationReader:
	# 	print("hallo", j)
	# 	try:
	# 		if rows[years[j]] != "":
	# 			data[years[j]][rows["Countries"]]["TotalPopulation"] = rows[years[j]].strip()
	# 	except:
	# 		NotImplemented
	
	# print("hoi", j)

# deaths2001 = open('deaths2001.csv', 'r')
# reader2001 = csv.DictReader(deaths2001)

# data["2001"] = {}

# counter = 0

# for row in reader2001:
# 	counter += 1
# 	data["2001"][row["Countries"]] = {}
# 	data["2001"][row["Countries"]][diseases[0]] = row[diseases[0]] 
# 	for i in range(1, 20):
# 		data["2001"][row["Countries"]][diseases[i]] = {}
# 		data["2001"][row["Countries"]][diseases[i]]["Total"] = row[diseases[i]]
# 	for i in range(21, 33):
# 		data["2001"][row["Countries"]][diseases[1]][diseases[i]] = row[diseases[i]]
# 	for i in range(33, 51):
# 		data["2001"][row["Countries"]][diseases[2]][diseases[i]] = row[diseases[i]]
# 	for i in range(51, 52):
# 		data["2001"][row["Countries"]][diseases[3]][diseases[i]] = row[diseases[i]]
# 	for i in range(52, 54):
# 		data["2001"][row["Countries"]][diseases[4]][diseases[i]] = row[diseases[i]]
# 	for i in range(54, 55):
# 		data["2001"][row["Countries"]][diseases[5]][diseases[i]] = row[diseases[i]]
# 	for i in range(55, 60):
# 		data["2001"][row["Countries"]][diseases[9]][diseases[i]] = row[diseases[i]]
# 	for i in range(60, 63):
# 		data["2001"][row["Countries"]][diseases[10]][diseases[i]] = row[diseases[i]]
# 	for i in range(63, 65):
# 		data["2001"][row["Countries"]][diseases[11]][diseases[i]] = row[diseases[i]]
# 	for i in range(65, 67):
# 		data["2001"][row["Countries"]][diseases[14]][diseases[i]] = row[diseases[i]]
# 	for i in range(67, 70):
# 		data["2001"][row["Countries"]][diseases[15]][diseases[i]] = row[diseases[i]]
# 	for i in range(70, 78):
# 		data["2001"][row["Countries"]][diseases[19]][diseases[i]] = row[diseases[i]]

# deaths2002 = open('deaths2002.csv', 'r')
# reader2002 = csv.DictReader(deaths2002)

# data["2002"] = {}

# counter = 0

# for row in reader2002:
# 	counter += 1
# 	data["2002"][row["Countries"]] = {}
# 	data["2002"][row["Countries"]][diseases[0]] = row[diseases[0]] 
# 	for i in range(1, 20):
# 		data["2002"][row["Countries"]][diseases[i]] = {}
# 		data["2002"][row["Countries"]][diseases[i]]["Total"] = row[diseases[i]]
# 	for i in range(21, 33):
# 		data["2002"][row["Countries"]][diseases[1]][diseases[i]] = row[diseases[i]]
# 	for i in range(33, 51):
# 		data["2002"][row["Countries"]][diseases[2]][diseases[i]] = row[diseases[i]]
# 	for i in range(51, 52):
# 		data["2002"][row["Countries"]][diseases[3]][diseases[i]] = row[diseases[i]]
# 	for i in range(52, 54):
# 		data["2002"][row["Countries"]][diseases[4]][diseases[i]] = row[diseases[i]]
# 	for i in range(54, 55):
# 		data["2002"][row["Countries"]][diseases[5]][diseases[i]] = row[diseases[i]]
# 	for i in range(55, 60):
# 		data["2002"][row["Countries"]][diseases[9]][diseases[i]] = row[diseases[i]]
# 	for i in range(60, 63):
# 		data["2002"][row["Countries"]][diseases[10]][diseases[i]] = row[diseases[i]]
# 	for i in range(63, 65):
# 		data["2002"][row["Countries"]][diseases[11]][diseases[i]] = row[diseases[i]]
# 	for i in range(65, 67):
# 		data["2002"][row["Countries"]][diseases[14]][diseases[i]] = row[diseases[i]]
# 	for i in range(67, 70):
# 		data["2002"][row["Countries"]][diseases[15]][diseases[i]] = row[diseases[i]]
# 	for i in range(70, 78):
# 		data["2002"][row["Countries"]][diseases[19]][diseases[i]] = row[diseases[i]]

# # deaths2003 = open('deaths2003.csv', 'r')
# # reader2003 = csv.DictReader(deaths2003)

# # data["2003"] = {}

# # counter = 0

# # for row in reader2003:
# # 	counter += 1
# # 	data["2003"][row["Countries"]] = {}
# # 	data["2003"][row["Countries"]][diseases[0]] = row[diseases[0]] 
# # 	for i in range(1, 20):
# # 		data["2003"][row["Countries"]][diseases[i]] = {}
# # 		data["2003"][row["Countries"]][diseases[i]]["Total"] = row[diseases[i]]
# # 	for i in range(21, 33):
# # 		data["2003"][row["Countries"]][diseases[1]][diseases[i]] = row[diseases[i]]
# # 	for i in range(33, 51):
# # 		data["2003"][row["Countries"]][diseases[2]][diseases[i]] = row[diseases[i]]
# # 	for i in range(51, 52):
# # 		data["2003"][row["Countries"]][diseases[3]][diseases[i]] = row[diseases[i]]
# # 	for i in range(52, 54):
# # 		data["2003"][row["Countries"]][diseases[4]][diseases[i]] = row[diseases[i]]
# # 	for i in range(54, 55):
# # 		data["2003"][row["Countries"]][diseases[5]][diseases[i]] = row[diseases[i]]
# # 	for i in range(55, 60):
# # 		data["2003"][row["Countries"]][diseases[9]][diseases[i]] = row[diseases[i]]
# # 	for i in range(60, 63):
# # 		data["2003"][row["Countries"]][diseases[10]][diseases[i]] = row[diseases[i]]
# # 	for i in range(63, 65):
# # 		data["2003"][row["Countries"]][diseases[11]][diseases[i]] = row[diseases[i]]
# # 	for i in range(65, 67):
# # 		data["2003"][row["Countries"]][diseases[14]][diseases[i]] = row[diseases[i]]
# # 	for i in range(67, 70):
# # 		data["2003"][row["Countries"]][diseases[15]][diseases[i]] = row[diseases[i]]
# # 	for i in range(70, 78):
# # 		data["2003"][row["Countries"]][diseases[19]][diseases[i]] = row[diseases[i]]


# # deaths2004 = open('deaths2004.csv', 'r')
# # reader2004 = csv.DictReader(deaths2004)

# # data["2004"] = {}

# # counter = 0

# # for row in reader2004:
# # 	counter += 1
# # 	data["2004"][row["Countries"]] = {}
# # 	data["2004"][row["Countries"]][diseases[0]] = row[diseases[0]] 
# # 	for i in range(1, 20):
# # 		data["2004"][row["Countries"]][diseases[i]] = {}
# # 		data["2004"][row["Countries"]][diseases[i]]["Total"] = row[diseases[i]]
# # 	for i in range(21, 33):
# # 		data["2004"][row["Countries"]][diseases[1]][diseases[i]] = row[diseases[i]]
# # 	for i in range(33, 51):
# # 		data["2004"][row["Countries"]][diseases[2]][diseases[i]] = row[diseases[i]]
# # 	for i in range(51, 52):
# # 		data["2004"][row["Countries"]][diseases[3]][diseases[i]] = row[diseases[i]]
# # 	for i in range(52, 54):
# # 		data["2004"][row["Countries"]][diseases[4]][diseases[i]] = row[diseases[i]]
# # 	for i in range(54, 55):
# # 		data["2004"][row["Countries"]][diseases[5]][diseases[i]] = row[diseases[i]]
# # 	for i in range(55, 60):
# # 		data["2004"][row["Countries"]][diseases[9]][diseases[i]] = row[diseases[i]]
# # 	for i in range(60, 63):
# # 		data["2004"][row["Countries"]][diseases[10]][diseases[i]] = row[diseases[i]]
# # 	for i in range(63, 65):
# # 		data["2004"][row["Countries"]][diseases[11]][diseases[i]] = row[diseases[i]]
# # 	for i in range(65, 67):
# # 		data["2004"][row["Countries"]][diseases[14]][diseases[i]] = row[diseases[i]]
# # 	for i in range(67, 70):
# # 		data["2004"][row["Countries"]][diseases[15]][diseases[i]] = row[diseases[i]]
# # 	for i in range(70, 78):
# # 		data["2004"][row["Countries"]][diseases[19]][diseases[i]] = row[diseases[i]]


# # deaths2004 = open('deaths2004.csv', 'r')
# # reader2004 = csv.DictReader(deaths2004)

# # data["2004"] = {}

# # counter = 0

# # for row in reader2004:
# # 	counter += 1
# # 	data["2004"][row["Countries"]] = {}
# # 	data["2004"][row["Countries"]][diseases[0]] = row[diseases[0]] 
# # 	for i in range(1, 20):
# # 		data["2004"][row["Countries"]][diseases[i]] = {}
# # 		data["2004"][row["Countries"]][diseases[i]]["Total"] = row[diseases[i]]
# # 	for i in range(21, 33):
# # 		data["2004"][row["Countries"]][diseases[1]][diseases[i]] = row[diseases[i]]
# # 	for i in range(33, 51):
# # 		data["2004"][row["Countries"]][diseases[2]][diseases[i]] = row[diseases[i]]
# # 	for i in range(51, 52):
# # 		data["2004"][row["Countries"]][diseases[3]][diseases[i]] = row[diseases[i]]
# # 	for i in range(52, 54):
# # 		data["2004"][row["Countries"]][diseases[4]][diseases[i]] = row[diseases[i]]
# # 	for i in range(54, 55):
# # 		data["2004"][row["Countries"]][diseases[5]][diseases[i]] = row[diseases[i]]
# # 	for i in range(55, 60):
# # 		data["2004"][row["Countries"]][diseases[9]][diseases[i]] = row[diseases[i]]
# # 	for i in range(60, 63):
# # 		data["2004"][row["Countries"]][diseases[10]][diseases[i]] = row[diseases[i]]
# # 	for i in range(63, 65):
# # 		data["2004"][row["Countries"]][diseases[11]][diseases[i]] = row[diseases[i]]
# # 	for i in range(65, 67):
# # 		data["2004"][row["Countries"]][diseases[14]][diseases[i]] = row[diseases[i]]
# # 	for i in range(67, 70):
# # 		data["2004"][row["Countries"]][diseases[15]][diseases[i]] = row[diseases[i]]
# # 	for i in range(70, 78):
# # 		data["2004"][row["Countries"]][diseases[19]][diseases[i]] = row[diseases[i]]


# # deaths2005 = open('deaths2005.csv', 'r')
# # reader2005 = csv.DictReader(deaths2005)

# # data["2005"] = {}

# # counter = 0

# # for row in reader2005:
# # 	counter += 1
# # 	data["2005"][row["Countries"]] = {}
# # 	data["2005"][row["Countries"]][diseases[0]] = row[diseases[0]] 
# # 	for i in range(1, 20):
# # 		data["2005"][row["Countries"]][diseases[i]] = {}
# # 		data["2005"][row["Countries"]][diseases[i]]["Total"] = row[diseases[i]]
# # 	for i in range(21, 33):
# # 		data["2005"][row["Countries"]][diseases[1]][diseases[i]] = row[diseases[i]]
# # 	for i in range(33, 51):
# # 		data["2005"][row["Countries"]][diseases[2]][diseases[i]] = row[diseases[i]]
# # 	for i in range(51, 52):
# # 		data["2005"][row["Countries"]][diseases[3]][diseases[i]] = row[diseases[i]]
# # 	for i in range(52, 54):
# # 		data["2005"][row["Countries"]][diseases[4]][diseases[i]] = row[diseases[i]]
# # 	for i in range(54, 55):
# # 		data["2005"][row["Countries"]][diseases[5]][diseases[i]] = row[diseases[i]]
# # 	for i in range(55, 60):
# # 		data["2005"][row["Countries"]][diseases[9]][diseases[i]] = row[diseases[i]]
# # 	for i in range(60, 63):
# # 		data["2005"][row["Countries"]][diseases[10]][diseases[i]] = row[diseases[i]]
# # 	for i in range(63, 65):
# # 		data["2005"][row["Countries"]][diseases[11]][diseases[i]] = row[diseases[i]]
# # 	for i in range(65, 67):
# # 		data["2005"][row["Countries"]][diseases[14]][diseases[i]] = row[diseases[i]]
# # 	for i in range(67, 70):
# # 		data["2005"][row["Countries"]][diseases[15]][diseases[i]] = row[diseases[i]]
# # 	for i in range(70, 78):
# # 		data["2005"][row["Countries"]][diseases[19]][diseases[i]] = row[diseases[i]]





json.dump(data, jsonfile)

# print data
# print(counter)