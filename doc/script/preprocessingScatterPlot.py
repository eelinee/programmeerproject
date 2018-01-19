import csv
import json

data = {}

diseases = ["Malnutrition", "Neoplasms", "Certain infectious and parasitic diseases", "Diseases of the circulatory system", "Diseases of the liver", "Human immunodeficiency virus [HIV] disease", "Tetanus", "Tuberculosis", "Intentional self-harm", "Alzheimer and other dementias"]

jsonfile = open("scatterplotData.json", "w")

diseasefile = open("sunburstData.json", "r")
generalfile = open("linegraphData.json", "r")

years = ["2000", "2001", "2002", "2003", "2004", "2005"]

for year in years:
	data[year] = {}
	for row in 

print(data)