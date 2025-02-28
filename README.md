# De boeken van squad 1G
Ontwerp en maak samen met je team een website met NodeJS, Express, JSON en Liquid


### Beschrijving



https://github.com/user-attachments/assets/3e68e137-a54b-46d7-9b38-ec2fb8fa736b



Onze site bestaat uit verschillende boekenplanken met boeken. Ieder persoon uit de squad heeft zijn eigen boek. Je kunt meer over de persoon weten door op het boek te klikken. Ook kun je hierdoor 'reviews' achter laten, dit zijn comments. De pop-up stelt een soort van achterkant cover van het boek voor. Het is een lopen tekstje gevuld met de informatie uit de API. Verder kun je op de site sorteren van oud naar jong of van A-Z. Ook kun je de boeken filteren op de favoriete boek genres die gekozen zijn. Dezelfde genres hebben weer dezelfde kleuren.

**Ole:** Ik heb de filter en sorteer buttons gemaakt en gezorgd dat deze werken. 

**Jules:** Ik heb ervoor gezorgd dat de boeken met hetzelfde genre dezelfde kleur krijgen. Ook heb ik de pop-up gemaakt (zonder de 'reviews' die achter gelaten kunnen worden). In de pop-up heb ik de custom-data terug laten komen. Verder heb ik de gezamenlijke stylesheet gemaakt. 

**Iris:** Ik heb de planken gemaakt, inclusief de planten en de boekjes die erop staan. Ik heb de HIFI schetsen gemaakt in FIGMA. Tot slot heb ik de 'reviews' gemaakt in de pop-up. 

### Kenmerken
Bij 'Kenmerken' staat welke technieken zijn gebruikt en hoe. Hier leg je uit hoe het NodeJS project werkt, de routes, hoe de data wordt opgehaald en/of gepost, en hoe de HTML wordt gerenderd met data. Leg hier ook uit wat NodeJS is, wat Express is en wat Liquid doet. Verwijs naar specifieke regels in jullie codebase; kopieer dus geen (screenshots van) code naar je Readme.

#### Main loop
Elke plank bestaat uit een unordered list die de boeken bevat. Aan het begin van de loop wordt deze list geopend. Daarna begint de loop: voor elke persoon wordt een list element aangemaakt, die een knop bevat die een popover opent met informatie over die persoon. Aan het einde van de loop wordt gecheckt of de index van de loop deelbaar is door 8; in dat geval wordt de list afgesloten, wordt er een boekenplank aangemaakt, en wordt een nieuwe list geopend. Als hij bij de laatste persoon is, komt er een boekenplank ongeacht of de index deelbaar is door acht, en wordt de loop gesloten.

#### Individuele reviews
Wanneer een review wordt gepost, geeft de form de id van de persoon mee waar de review wordt achtergelaten, in de action attribute. Deze komt bij de post functie terecht en wordt meegegeven in de 'for', zodat elke review zowel onze team name bevat en de id van de persoon voor wie het bericht is.
De reviews worden gerendered in een loop; voor elk bericht wordt gecheckt of de id overeenkomt met de id van de persoon die wordt weergegeven. Daardoor worden alleen berichten met overeenkomende IDs getoond.

#### Filter & sorteren
De get functie controleerd elke keer of er een filter wordt meegegeven. Indien dat zo is, wordt die toegevoegd aan de url die gefetcht wordt. 

#### Boekengenres
Wanneer een boek gerenderd wordt, wordt het favoriete boekengenre van die persoon toegevoegd als class aan het boek. 


### Installatie
Omdat je nu een server-side project hebt gemaakt, beschrijf je in de Readme ook hoe iemand anders het project kan installeren. Bij Installatie staat stap-voor-stap beschreven hoe je de development omgeving moet inrichten om aan de repository te kunnen werken. Hoe leg je aan iemand anders uit dat jullie bijvoorbeeld npm hebben gebruikt?

1. npm install
2. npm start

