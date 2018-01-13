window.onload = function() {

	d3.queue()
	.defer(d3.csv, "deaths2000.csv")
	.defer(d3.csv, "deaths2001.csv")
	.defer(d3.csv, "deaths2002.csv")
	.defer(d3.csv, "deaths2003.csv")
	.defer(d3.csv, "deaths2004.csv")
	.await(preprocess)
}

function preprocess(error, deaths2000, deaths2001, deaths2002, deaths2003, deaths2004) {
	
	var diseases = ["Total","Certain infectious and parasitic diseases","Neoplasms","Diseases of blood and disorders of immune mechanism","Endocrine nutritional and metabolic diseases","Mental and behavioural disorders","Diseases of the nervous system","Diseases of the eye and adnexa","Diseases of the ear and mastoid process","Diseases of the circulatory system","Diseases of the respiratory system","Diseases of the digestive system","Diseases of the skin and subcutaneous tissue","Diseases of the musculoskeletal system and connective tissue","Diseases of the genitourinary system","Pregnancy childbirth and the puerperium","Conditions originating in the perinatal period","Congenital malformations deformations and  abnormalities","Symptoms signs and abnormal clinical and laboratory findings","External causes of morbidity and mortality","Intestinal infectious diseases","Tuberculosis","Tetanus","Diphtheria","Whooping cough","Meningococcal infection","Septicaemia","Infections with a predominantly sexual mode of transmission (excluding HIV)","Poliomyelitis","Measles","Viral hepatitis","Human immunodeficiency virus [HIV] disease","Malaria","Total of malignant neoplams","Malignant neoplasm of lip oral cavity and pharynx","Malignant neoplasm of oesophagus","Malignant neoplasm of stomach","Malignant neoplasm of colon rectosigmoid junction rectum anus and anal canal","Malignant neoplasm of liver and intrahepatic bile ducts","Malignant neoplasm of pancreas","Malignant neoplasm of trachea bronchus and lung","Melanoma and other skin cancers","Malignant neoplasm of  breast","Malignant neoplasm of cervix uteri","Malignant neoplasm of corpus uteri","Malignant neoplasm of ovary","Malignant neoplasm of prostate","Malignant neoplasm of bladder","Malignant neoplasm of lymphomas and multiple myeloma","Leukaemia","Benign neoplasms","Anaemias","Diabetes mellitus","Malnutrition","Alzheimer and other dementias","Acute rheumatic fever and chronic rheumatic heart diseases","Hypertensive diseases","Ischaemic heart diseases","Cerebrovascular diseases","Diseases of arteries arterioles and capillaries","Influenza","Pneumonia","Chronic lower respiratory diseases","Gastric and duodenal ulcer","Diseases of the liver","Disorders of kidney and ureter","Hyperplasia of prostate","Pregnancy with abortive outcome","Other direct obstetric causes","Indirect obstetric causes","Transport accidents","Falls","Accidental drowning and submersion","Exposure to smoke fire and flames","Accidental poisoning by and exposure to noxious substances","Intentional self-harm","Assault","All other external causes"]

	console.log(diseases)

	data = []

	var countries = {}

	console.log(data)
	console.log("*************************")

	data.push("2000")
	data["2000"] = {}

	console.log(deaths2000[1].Countries)

	for(var i = 0; i < deaths2000.length; i ++) {
		data["2000"][deaths2000[i].Countries] = {}
		data["2000"][deaths2000[i].Countries][diseases[0]] = deaths2000[i][diseases[0]]
		for(var j = 1; j < 20; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[j]] = {}
			data["2000"][deaths2000[i].Countries][diseases[j]]["Total"] = deaths2000[i][diseases[j]]
		}
		for(var j = 21; j < 33; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[1]][diseases[j]] = deaths2000[i][diseases[j]]
		}
		for(var j = 33; j < 51; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[2]][diseases[j]] = deaths2000[i][diseases[j]]
		}
		for(var j = 51; j < 52; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[3]][diseases[j]] = deaths2000[i][diseases[j]]
		}
		for(var j = 52; j < 54; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[4]][diseases[j]] = deaths2000[i][diseases[j]]
		}
		for(var j = 54; j < 55; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[5]][diseases[j]] = deaths2000[i][diseases[j]]
		}
		for(var j = 55; j < 60; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[9]][diseases[j]] = deaths2000[i][diseases[j]]
		}
		for(var j = 60; j < 63; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[10]][diseases[j]] = deaths2000[i][diseases[j]]
		}
		for(var j = 63; j < 65; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[11]][diseases[j]] = deaths2000[i][diseases[j]]
		}
		for(var j = 65; j < 67; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[14]][diseases[j]] = deaths2000[i][diseases[j]]
		}
		for(var j = 67; j < 70; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[15]][diseases[j]] = deaths2000[i][diseases[j]]
		}
		for(var j = 70; j < 78; j ++) {
			data["2000"][deaths2000[i].Countries][diseases[19]][diseases[j]] = deaths2000[i][diseases[j]]
		}
		
	}


	data.push("2001")
	data["2001"] = {}

	for(var i = 0; i < deaths2001.length; i ++) {
		data["2001"][deaths2001[i].Countries] = {}
		data["2001"][deaths2001[i].Countries][diseases[0]] = deaths2001[i][diseases[0]]
		for(var j = 1; j < 20; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[j]] = {}
			data["2001"][deaths2001[i].Countries][diseases[j]]["Total"] = deaths2001[i][diseases[j]]
		}
		for(var j = 21; j < 33; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[1]][diseases[j]] = deaths2001[i][diseases[j]]
		}
		for(var j = 33; j < 51; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[2]][diseases[j]] = deaths2001[i][diseases[j]]
		}
		for(var j = 51; j < 52; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[3]][diseases[j]] = deaths2001[i][diseases[j]]
		}
		for(var j = 52; j < 54; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[4]][diseases[j]] = deaths2001[i][diseases[j]]
		}
		for(var j = 54; j < 55; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[5]][diseases[j]] = deaths2001[i][diseases[j]]
		}
		for(var j = 55; j < 60; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[9]][diseases[j]] = deaths2001[i][diseases[j]]
		}
		for(var j = 60; j < 63; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[10]][diseases[j]] = deaths2001[i][diseases[j]]
		}
		for(var j = 63; j < 65; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[11]][diseases[j]] = deaths2001[i][diseases[j]]
		}
		for(var j = 65; j < 67; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[14]][diseases[j]] = deaths2001[i][diseases[j]]
		}
		for(var j = 67; j < 70; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[15]][diseases[j]] = deaths2001[i][diseases[j]]
		}
		for(var j = 70; j < 78; j ++) {
			data["2001"][deaths2001[i].Countries][diseases[19]][diseases[j]] = deaths2001[i][diseases[j]]
		}
		
	}

	console.log("Hallo")
	data.push("2002")
	data["2002"] = {}

	for(var i = 0; i < deaths2002.length; i ++) {
		data["2002"][deaths2002[i].Countries] = {}
		data["2002"][deaths2002[i].Countries][diseases[0]] = deaths2002[i][diseases[0]]
		for(var j = 1; j < 20; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[j]] = {}
			data["2002"][deaths2002[i].Countries][diseases[j]]["Total"] = deaths2002[i][diseases[j]]
		}
		for(var j = 21; j < 33; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[1]][diseases[j]] = deaths2002[i][diseases[j]]
		}
		for(var j = 33; j < 51; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[2]][diseases[j]] = deaths2002[i][diseases[j]]
		}
		for(var j = 51; j < 52; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[3]][diseases[j]] = deaths2002[i][diseases[j]]
		}
		for(var j = 52; j < 54; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[4]][diseases[j]] = deaths2002[i][diseases[j]]
		}
		for(var j = 54; j < 55; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[5]][diseases[j]] = deaths2002[i][diseases[j]]
		}
		for(var j = 55; j < 60; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[9]][diseases[j]] = deaths2002[i][diseases[j]]
		}
		for(var j = 60; j < 63; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[10]][diseases[j]] = deaths2002[i][diseases[j]]
		}
		for(var j = 63; j < 65; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[11]][diseases[j]] = deaths2002[i][diseases[j]]
		}
		for(var j = 65; j < 67; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[14]][diseases[j]] = deaths2002[i][diseases[j]]
		}
		for(var j = 67; j < 70; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[15]][diseases[j]] = deaths2002[i][diseases[j]]
		}
		for(var j = 70; j < 78; j ++) {
			data["2002"][deaths2002[i].Countries][diseases[19]][diseases[j]] = deaths2002[i][diseases[j]]
		}
		
	}
	console.log(data)

}

// function WriteToFile(passForm) {
		
// 	}

