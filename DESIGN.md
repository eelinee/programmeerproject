# Design document

## Data sources

**Tables** 

For this project, I have found different data tables. Using these tables, I will create the data lists that I need. The tables I have found contain data per country and are the following:

- Total deaths all causes (in numbers)
- Population number
- No. of deaths - Tuberculosis
- No. of deaths - Intesinal infecious diseases
- No. of deaths - Tetanus
- No. of deaths - Diphtheria
- No. of deaths - Whooping cough
- No. of deaths - Meningococcal infection
- No. of deaths - Septicaemia
- No. of deaths - Infections with a predominantly sexual mode of transmission (excluding HIV)
- No. of deaths - Poliomyelitis
- No. of deaths - Viral hepatitis
- No. of deaths - Human immunodeficiency virus (HIV) disease
- No. of deaths - Malaria
- No. of deaths - Total of malignant neopalms (including cancer)
- No. of deaths - Anaemias
- No. of deaths - Diabetus mellitus
- No. of deaths - Malnutrition
- No. of deaths - Alzheimer and other dementias
- No. of deaths - Acute rheumatic fever and chronic rheumatic heart diseases
- No. of deaths - Hypertensive diseases
- No. of deaths - Ischaemic heart diseases
- No. of deaths - Cerebrovascular diseases
- No. of deaths - Diseases of arteries, arterioles and capillaries
- No. of deaths - Influenza
- No. of deaths - Pneumonia
- No. of deaths - Chronic lower respiratory diseases
- No. of deaths - Gastric and duodenal ulcer
- No. of deaths - Diseases of the liver
- No. of deaths - Disorders of kidney and ureter
- No. of deaths - Hyperplasia of prostate
- No. of deaths - Transport accidents
- No. of deaths - Intentional self-harm

WHO Mortality Database: http://apps.who.int/healthinfo/statistics/mortality/whodpms/


**Transformations**

Using these tables, I will transform the data to create the following datasets:
- Death rates per country (Total deaths / population number)
- Death rates of certain disease per country (No. of deaths - disease / population number)

## User interface

**Visulisation 1: World Map**
Data
- Life expectancy per country 
- Life quality per country
- Death rates per country
- Death rates of certain diseases per country

D3 plugins:
- Topojson