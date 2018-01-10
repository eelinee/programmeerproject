# Design document

## Data sources

**Tables** 

For this project, I have found different data tables. Using these tables, I will create the data lists that I need. The tables I have found contain data per country and are the following:

General data:
- Life expectancy at birth 
- Life expectancy at age 60 (years)
- Total deaths all causes (in numbers)
- Population number
- Average BMI (optional)

Disease by collective name:
- No. of deaths - Certain infectious and parasitic diseases
- No. of deaths - Neoplasms
- No. of deaths - Diseases of blood and disorders of immune mechanism
- No. of deaths - Endocrine, nurtitional and metabolic diseases
- No. of deaths - Mental and behavioural disorders
- No. of deaths - Diseases of the nervous system
- No. of deaths - Diseases of the eye and adnexa
- No. of deaths - Diseases of the ear and mastoid process
- No. of deaths - Diseases of the circulatory system
- No. of deaths - Diseases of the resiratory system
- No. of deaths - Diseases of the digestive system
- No. of deaths - Diseases of the skin and subcutaneous system
- No. of deaths - Diseases of the musculoskeletal system and connective tissue
- No. of deaths - Diseases of the genitourinary system
- No. of deaths - Pregnancy, childbirth and the puerperium (only female)
- No. of deaths - Conditions originating in the perinatal period
- No. of deaths - Congenital malformations, deformations and abnormalities
- No. of deaths - Symptoms, signs and abnormal clinical and laboratory findings 
- No. of deaths - External causes of morbidity and mortality 

Disease by name:
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

Hygiene data:
- Percentage of population that has access to sanitation services
- Percentage of population that has access to drinking water services
- Percentage of population that has handwashing facilities at home
- Percentage of population that practices open defecation

WHO Mortality Database: http://apps.who.int/healthinfo/statistics/mortality/whodpms/


**Transformations**

Using these tables, I will transform the data to create the following datasets:
- Death rates per country (Total deaths / population number)
- Death rates of diseases by collective name (No. of deaths / populations number)
- Death rates of diseases by name (No. of deaths / population number)

## User interface

**Time Slider**

The time slider can be used by the user to slide through data from the years 2000 through 2015. If the user moves the slider, Visualisations 1, 2 and 3 will be updated accordingly. Also, the current year will be displayed and updated on the screen.

**Visualisation 1: scatterplot**

Data:
- General data
- Hygiene data
- Death rate data

D3 plugins:
- D3 tooltip

Visualisation:
- In this scatterplot, the user can choose which data to compare. Using clickboxes, the user can choose variables to display on x-axis and y-axis. Each dot will represent a country. The options for x-axis and y-axis are as follows:

- x-axis:
	- Death rate data per collective name
	- Death rate data per disease name
	- Death rate all causes
- y-axis:
	- General data (population, life expectancy, BMI etc.)
	- Hygiene data (open defecation, sanitary services etc.)

Colors:
- All dots have a color representing the region of their corresponding country.
- The legenda shows 

Interactivity:
- On hovering over a dot, the opacity of all the other dots will increase. Also, a d3 tooltip will apear that shows the name of the country and the x and y-axis value. 
- On clicking a dot, visualisation 2 and 3 will update, representing the data of the country that correspons with the clicked dot. 
- On choosing other variables to show in the scatterplot, the dots will move to their new place in the graph.

**Visualisation 2: Line Graph**

Data:
- Percentage of population that has access to sanitation services
- Percentage of population that has access to drinking water services
- Percentage of population that has handwashing facilities at home
- Percentage of population that practices open defecation

D3 plugins:
- D3 tooltip

Visualisation:
- This line graph shows four different lines:
	- Yellow: Percentage of population that has access to sanitation services per year
	- Blue: Percentage of population that has access to drinking water services per year
	- Red: Percentage of population that has handwashing facilities at home per year
	- Green: Percentage of population that practices open defecation per year
- A dot on each line will indicate which datapoint correspons with the current year. 

Interactivity:
- Upon changing the year (using the Time Slider, see above), the indicator dot will move over each line to the datapoint corresponding with the new year.
- When a user hovers over the graph, the indicator dots will move to the corresponding datapoints (on the 4 different lines) that match the x-coordinate of the mouse. Also, a 3d tooltip will appear above each indicator point showing the year and the percentage.

**Visualisation 3: Sunburst**

Data:
- Death rates of disease by collectiive name
- Death rates of disease by name 

D3 plugins:
- D3 tooltip

Visualisation: In the different layers of the sunburst, data will be distinguished in the following way (each new tab means a new layer starting with layer 1):

- Death rate - Certain infectious and parasitic diseases
	- Death rate - All diseases under this group name

- Death rate - Other diseases
	- Death rate - Neoplasms
		- Death rate - All diseases under this group name
	- Death rate - Diseases of blood and disorders of immune mechanism
		- Death rate - All diseases under this group name
	- Death rate - Endocrine, nurtitional and metabolic diseases
		- Death rate - All diseases under this group name
	- Death rate - Mental and behavioural disorders
		- Death rate - All diseases under this group name
	- Death rate - Diseases of the nervous system
		- Death rate - All diseases under this group name
	- Death rate - Diseases of the eye and adnexa
		- Death rate - All diseases under this group name
	- Death rate - Diseases of the ear and mastoid process
		- Death rate - All diseases under this group name
	- Death rate - Diseases of the circulatory system
		- Death rate - All diseases under this group name
	- Death rate - Diseases of the resiratory system
		- Death rate - All diseases under this group name
	- Death rate - Diseases of the digestive system
		- Death rate - All diseases under this group name
	- Death rate - Diseases of the skin and subcutaneous system
		- Death rate - All diseases under this group name
	- Death rate - Diseases of the musculoskeletal system and connective tissue
		- Death rate - All diseases under this group name
	- Death rate - Diseases of the genitourinary system
		- Death rate - All diseases under this group name
	- Death rate - Pregnancy, childbirth and the puerperium (only female)
		- Death rate - All diseases under this group name
	- Death rate - Conditions originating in the perinatal period
		- Death rate - All diseases under this group name
	- Death rate - Congenital malformations, deformations and abnormalities
		- Death rate - All diseases under this group name
	- Death rate - Symptoms, signs and abnormal clinical and laboratory findings 
		- Death rate - All diseases under this group name
	- Death rate - External causes of morbidity and mortality 
		- Death rate - All diseases under this group name

Interactivity:

- If a user hovers over one of the parts of the sunburst, the opacity of other parts will increase and a d3 tooltip will appear, showing the disease (group)name and the value (death rate). 


**OPTIONAL Visualisation 4: World Map**

Data:
- Life expectancy at birth
- Life expectancy at age 60 (years)
- Death rates per country
- Death rates disease by name

D3 plugins:
- Topojson
- D3 tooltip

Visualisation:
- This map shows the data value of each country of the current year by displaying the country in a color that correspons with the data value. One value is shown at a time per country, users can switch between data types.

Interactivity:
- Upon changing the year (using the Time Slider, see above), the map colors will update so that they represent the value for each country in the new current year.
- To switch between data types, a dropdown menu is available for users to choose which data type the map should show. When a user chooses another data type, the colors of the map will be updated. 
- When a user hovers over a country, it will turn black and a 3d tooltip will appear showing the value of the corresponding country
- When a user clicks a country, the two other visualisations (2 and 3) will be updated so that they represent the clicked country. Also, the name of the current country will update.

## Data structure

**Loading data**

window.onload = function() {
	d3.queue()
	.defer(d3.csv, *allData*)
	.await(createVisualisation)
}

**Creating visualisations**

function createVisualisation(allData) {
	createMap(mapData)
	createLineGraph(lineData)
	createSunBurst(sunData)
	createScatterPlot(scatterData)
}

Each visualisation has it's own script and it's own create function.

**Updating**

- When a new country is selected, one update function will update the line graph and the sunburst.
- When the timeslider moved to another year, another update function will update the line graph, sunburst and scatterplot (and optionally the map)
- When a user chooses new variables for the scatterplot, another update function will update the scatterplot. 