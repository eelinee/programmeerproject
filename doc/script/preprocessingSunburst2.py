import csv
import json

data = {
}

diseases = ["Total","Certain infectious and parasitic diseases","Neoplasms","Diseases of blood and disorders of immune mechanism","Endocrine nutritional and metabolic diseases","Mental and behavioural disorders","Diseases of the nervous system","Diseases of the eye and adnexa","Diseases of the ear and mastoid process","Diseases of the circulatory system","Diseases of the respiratory system","Diseases of the digestive system","Diseases of the skin and subcutaneous tissue","Diseases of the musculoskeletal system and connective tissue","Diseases of the genitourinary system","Pregnancy childbirth and the puerperium","Conditions originating in the perinatal period","Congenital malformations deformations and  abnormalities","Symptoms signs and abnormal clinical and laboratory findings","External causes of morbidity and mortality","Intestinal infectious diseases","Tuberculosis","Tetanus","Diphtheria","Whooping cough","Meningococcal infection","Septicaemia","Infections with a predominantly sexual mode of transmission (excluding HIV)","Poliomyelitis","Measles","Viral hepatitis","Human immunodeficiency virus [HIV] disease","Malaria","Total of malignant neoplams","Malignant neoplasm of lip oral cavity and pharynx","Malignant neoplasm of oesophagus","Malignant neoplasm of stomach","Malignant neoplasm of colon rectosigmoid junction rectum anus and anal canal","Malignant neoplasm of liver and intrahepatic bile ducts","Malignant neoplasm of pancreas","Malignant neoplasm of trachea bronchus and lung","Melanoma and other skin cancers","Malignant neoplasm of  breast","Malignant neoplasm of cervix uteri","Malignant neoplasm of corpus uteri","Malignant neoplasm of ovary","Malignant neoplasm of prostate","Malignant neoplasm of bladder","Malignant neoplasm of lymphomas and multiple myeloma","Leukaemia","Benign neoplasms","Anaemias","Diabetes mellitus","Malnutrition","Alzheimer and other dementias","Acute rheumatic fever and chronic rheumatic heart diseases","Hypertensive diseases","Ischaemic heart diseases","Cerebrovascular diseases","Diseases of arteries arterioles and capillaries","Influenza","Pneumonia","Chronic lower respiratory diseases","Gastric and duodenal ulcer","Diseases of the liver","Disorders of kidney and ureter","Hyperplasia of prostate","Pregnancy with abortive outcome","Other direct obstetric causes","Indirect obstetric causes","Transport accidents","Falls","Accidental drowning and submersion","Exposure to smoke fire and flames","Accidental poisoning by and exposure to noxious substances","Intentional self-harm","Assault","All other external causes"]

jsonfile = open('sunBurstDataRegion.json', 'w')

csvfiles = ["deaths2000.csv", "deaths2001.csv", "deaths2002.csv", "deaths2003.csv", "deaths2004.csv", "deaths2005.csv"]
years = ["2000", "2001", "2002", "2003", "2004", "2005"]
population = open("totalPopulationRegion.csv", "r")
populationReader = list(csv.DictReader(population))

for j in range(len(csvfiles)):
	deaths = open(csvfiles[j], 'r')
	reader = csv.DictReader(deaths)

	data[years[j]] = {}

	for row in reader:
		data[years[j]][row["Countries"]] = {}
		data[years[j]][row["Countries"]][diseases[0]] = row[diseases[0]]
		data[years[j]][row["Countries"]]["Country"] = row["Countries"]
		for i in range(1, 20):
			data[years[j]][row["Countries"]][diseases[i]] = {}
			data[years[j]][row["Countries"]][diseases[i]]["Total"] = row[diseases[i]]
		for i in range(21, 33):
			data[years[j]][row["Countries"]][diseases[1]][diseases[i]] = row[diseases[i]]
		for i in range(33, 51):
			data[years[j]][row["Countries"]][diseases[2]][diseases[i]] = row[diseases[i]]
		for i in range(51, 52):
			data[years[j]][row["Countries"]][diseases[3]][diseases[i]] = row[diseases[i]]
		for i in range(52, 54):
			data[years[j]][row["Countries"]][diseases[4]][diseases[i]] = row[diseases[i]]
		for i in range(54, 55):
			data[years[j]][row["Countries"]][diseases[5]][diseases[i]] = row[diseases[i]]
		for i in range(55, 60):
			data[years[j]][row["Countries"]][diseases[9]][diseases[i]] = row[diseases[i]]
		for i in range(60, 63):
			data[years[j]][row["Countries"]][diseases[10]][diseases[i]] = row[diseases[i]]
		for i in range(63, 65):
			data[years[j]][row["Countries"]][diseases[11]][diseases[i]] = row[diseases[i]]
		for i in range(65, 67):
			data[years[j]][row["Countries"]][diseases[14]][diseases[i]] = row[diseases[i]]
		for i in range(67, 70):
			data[years[j]][row["Countries"]][diseases[15]][diseases[i]] = row[diseases[i]]
		for i in range(70, 78):
			data[years[j]][row["Countries"]][diseases[19]][diseases[i]] = row[diseases[i]]

	# print(populationReader)

	for rows in populationReader:
		try:
			if rows[years[j]] != "":
				data[years[j]][rows["Countries"]]["TotalPopulation"] = rows[years[j]].strip()
		except:
			NotImplemented

json.dump(data, jsonfile)