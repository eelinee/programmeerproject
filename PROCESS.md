# Day 1

Mijn pagina ziet er nu zo uit:

![](images/day1.png)

**Belangrijke beslissingen**

- De verdeling van de pagina wordt als volgt:
	- Linksboven komt de lijngrafiek (lightblauw blok)
	- Linksonder komt de sunburst (lichtgrijs blok)
	- Rechts komt de scatterplot (wit blok)
	- Ik twijfel nog of de scatterplot wat smaller moet en de andere twee breder.

- Als ik nog een wereldkaart wil maken, ga ik die nog boven deze drie visualisaties 
laten zien. Als dat lukt, wil ik dan graag dat je eerst alleen de kaart ziet en als 
je dan op een land klikt, dat de pagina dan automatisch naar de drie visualisaties 
wordt gescrolld. 

**Moeilijkheden**

Ik heb nog een beetje moeite met het maken van de grafiek. Daar kom ik wel uit, maar 
het kost me nu al wel heel veel tijd. Het wordt ook nog even lastig om te bedenken 
hoe ik het ga doen met missende data. Voor bepaalde landen mist bijvoorbeeld één 
variabele helemaal en voor veel landen missen er in bepaalde jaren ook een paar 
variabelen. 

**Morgen**

Morgen ga ik als eerste mijn grafiek afmaken, daarna ga ik beginnen met het opzetten van mijn scatterplot. 

# Day 2

**Figuur 1. Mijn pagina ziet er nu zo uit:**
![](images/day2.png)

### Belangrijke beslissingen
- Ik heb een beslissing gemaakt over wat ik doe met de missende data in mijn lijngrafiek.
	- Als data voor één categorie mist voor elk jaar, dan laat ik de hele lijn weg en dan ga ik naast de grafiek met tekst aangeven dat deze variabele mist voor het desbetreffende land.
	- Als data in een categorie mist voor een paar jaren, had ik twee opties om uit te kiezen. 
		- Optie 1: Ik geef de missende values een waarde van 0. Hoe dat eruit ziet, kun je zien in figuur 2.
		- Optie 2: Ik teken de grafiek tot aan / vanaf waar ik wel waarden van heb. Hoe dat eruit ziet, kun je zien in figuur 3.
	- Ik heb gekozen voor optie 2, omdat optie 1 eigenlijk gewoon verkeerde informatie geeft. Ik weet niet wat de waarde was in deze jaren, dus ik kan het ook niet weergeven in mijn grafiek.
- Ook heb ik een beslissing gemaakt over het domein van de y-as van mijn grafiek. De opties zijn als volgt:
	- Elke keer bij het aanklikken van een nieuw land worden de lijnen geupdate en ook het domein. Want de maximale y-waarde van de variabelen is niet voor elk land hetzelfde. Zie in figuur 4 dan het verschil in grafieken tussen twee landen.
	- Elke keer bij het aanklikken van een nieuw land worden de lijnen geupdate en het domein niet. Want ook al is de maximale y-waarde van de variabelen misschien niet gelijk, zo is het juist makkelijker om in één oogopslag het verschil tussen verschillende landen te zien. Zie in figuur 5 dan het verschil in grafieken tussen twee landen.
	- Ik heb gekozen voor optie 2, omdat ik het belangrijk vind dat gebruikers zo goed het verschil kunnen zien tussen de landen wanneer ze van land wisselen.

**Figuur 2. Missende data optie 1: in deze grafiek mist data voor 'With handwashing facilities at home' in de jaren 2000 tm 2004.**

![](images/missendeDataLineGraphOptie1.png)

**Figuur 3. Missende data optie 2: in deze grafiek mist data voor 'With handwashing facilities at home' in de jaren 2000 tm 2004.**

![](images/missendeDataLineGraphOptie2.png)

**Figuur 3. Domein optie 1: data van Algerije (boven) vergeleken met Angola (onder)

![](images/domeinLineGraphOptie1.png)

**Figuur 4. Domein optie 2: data van Algerije (boven) vergeleken met Angola (onder)

![](images/domeinLineGraphOptie2.png)