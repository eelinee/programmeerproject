# Design document

## Data sources

**Tables** 

For this project, I have found different data tables. Using these tables, I will create the data lists that I need. The tables I have found contain data per country and are the following:

- Life expectancy at birth 
- Life expectancy at age 60 (years)
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
- Percentage of population that has access to sanitation services
- Percentage of population that has access to drinking water services
- Percentage of population that has handwashing facilities at home
- Percentage of population that practices open defecation

WHO Mortality Database: http://apps.who.int/healthinfo/statistics/mortality/whodpms/


**Transformations**

Using these tables, I will transform the data to create the following datasets:
- Death rates per country (Total deaths / population number)
- Death rates of certain disease per country (No. of deaths - disease / population number)

## User interface

**Time Slider**

The time slider can be used by the user to slide through data from the years 2000 through 2015. If the user moves the slider, Visualisations 1, 2 and 3 will be updated accordingly. Also, the current year will be displayed and updated on the screen.

**Visualisation 1: World Map**

Data:
- Life expectancy at birth
- Life expectancy at age 60 (years)
- Death rates per country
- Death rates of certain diseases per country

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

