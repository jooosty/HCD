# Testplan
**Spraakberichten prototype**
Human Centered Design — testsessie met Berend

---



## 1. Functies die we testen

Het prototype bevat op dit moment de volgende functies:

- Spraakopname via de microfoon (Web Speech API)
- Transcript plakken als alternatief voor opname
- Automatisch opsplitsen van het bericht in losse boodschappen
- Automatische leestekens: punt of vraagteken per zin
- Per boodschap een antwoordveld met spraak- en tekstinvoer
- Kopieerknop per antwoord
- Wisknop om alles te resetten

---

## 2. Testtaken

Laat Berend de volgende taken uitvoeren. Geef minimale uitleg vooraf — observeer hoe hij het prototype ontdekt.

| # | Taak | Methode | Aandachtspunt |
|---|---|---|---|
| 1 | Open het prototype in de browser en navigeer door de pagina. | Vrij verkennen met screenreader | Hoe navigeert hij? Wat hoort hij als eerste? |
| 2 | Plak transcript 1 (kort bericht) en splits het op. | Transcript plakken via textarea | Begrijpt hij de knop? Hoort hij de resultaten? |
| 3 | Luister naar de gesplitste boodschappen. | Screenreader navigatie door lijst | Zijn de aria-labels duidelijk? Klopt de volgorde? |
| 4 | Beantwoord boodschap 2 door te typen. | Tekstinvoer in antwoordveld | Vindt hij het veld? Is het label duidelijk? |
| 5 | Beantwoord boodschap 3 via de spreek-in knop. | Spraakknop per boodschap | Hoort hij dat de opname bezig is? Werkt het intuïtief? |
| 6 | Kopieer het antwoord op boodschap 2. | Kopieerknop | Hoort hij de bevestiging? Werkt de knop goed? |
| 7 | Plak transcript 6 (lang bericht) en splits het op. | Lang transcript testen | Hoe gaat hij om met veel boodschappen? |
| 8 | Neem zelf een spraakbericht op via de opnameknop. | Microfoon opname | Begrijpt hij de opnamestatus? Werkt de timer? |
| 9 | Wis alles en begin opnieuw. | Wisknop gebruiken | Is het duidelijk dat alles gewist is? |

---

## 3. Vragen tijdens de test

Stel deze vragen tijdens of direct na de testtaken. Stel ze open — laat Berend uitpraten.

| # | Vraag | Doel |
|---|---|---|
| 1 | Wat hoorde je als eerste toen je de pagina opende? | Begrijpen hoe de eerste indruk via screenreader werkt |
| 2 | Was het duidelijk wat je moest doen op de pagina? | Testen of de structuur en labels logisch zijn |
| 3 | Hoe vond je de volgorde van de knoppen? | Ontdekken of de tabvolgorde klopt voor screenreader gebruik |
| 4 | Begreep je direct wat de opnameknop deed? | Testen of de aria-label en statusmelding duidelijk zijn |
| 5 | Wat vond je van de manier waarop de boodschappen werden voorgelezen? | Kwaliteit van de aria-labels en de lijststructuur beoordelen |
| 6 | Was het verschil tussen een vraag en een gewone zin hoorbaar? | Testen of de automatische leestekens (. en ?) iets toevoegen |
| 7 | Hoe vond je het werken met de spreek-in knop per boodschap? | Bruikbaarheid van de voice reply functie beoordelen |
| 8 | Hoe navigeer jij normaal door een lange lijst? Deed je dat hier ook zo? | Leren over zijn persoonlijke navigatiestrategie |
| 9 | Wat miste je in dit prototype wat je normaal wel hebt? | Ontdekken van ontbrekende functies of sneltoetsen |
| 10 | Als je dit elke dag zou gebruiken, wat zou je dan anders willen? | Lange termijn wensen en verbeterpunten ophalen |
| 11 | Wat vond je het beste werken? | Positieve punten identificeren om te behouden |
| 12 | Wat vond je het meest verwarrend of frustrerend? | Kritieke problemen identificeren voor de volgende iteratie |

---

## 4. Observatiepunten voor de ontwerper

Let tijdens de test op het volgende:

- Op welke elementen blijft Berend hangen of terugkomen?
- Welke knoppen of labels worden verkeerd begrepen?
- Hoe lang duurt het voordat hij een taak voltooit?
- Gebruikt hij sneltoetsen? Zo ja, welke?
- Wanneer stopt hij met spreken of lijkt hij te wachten?
- Vraagt hij om bevestiging na acties zoals kopiëren of wissen?
- Navigeert hij lineair of springt hij door de pagina?



## antwoorde

- Datums uitschrijven
- op elke knop of iets wat je doet iets van feedback geven (bijv: "Je hebt op de split knop gedrukt, het bericht wordt nu opgesplitst in losse boodschappen.")
- zoveel mogelijke dingen die niet nodig zijn weghalen, zodat het zo simpel mogelijk is
- geluid niet veel verschil tussen luid en zacht
- goed letten op contrast
- doro zinnen heen "tabben" en dan enter om te die zin te openen om te beantwoorden
- dat je bij het openen van een zin meteen in het antwoordveld zit, zodat je meteen kan beginnen met typen of spreken
- nvda als screenreader



# Testplan — Iteratie 2

## Wat is er veranderd sinds iteratie 1

Dit zijn de aanpassingen die zijn gedaan op basis van de vorige testsessie:

- Boodschappen zijn nu tabbaar: je kunt met Tab door de lijst navigeren
- Druk op Enter op een boodschap om hem te openen en te beantwoorden
- Bij het openen van een boodschap wordt de Spreek-in knop automatisch geselecteerd
- Tabvolgorde binnen een boodschap: eerst Spreek-in knop, dan tekstveld
- Als je een boodschap verlaat zonder iets in te vullen, sluit hij automatisch
- Aankondigingen via screenreader bij elke actie (openen, sluiten, opname starten/stoppen, wissen)
- Kopieerknop is verwijderd

---

## 1. Functies die we testen

- Tab-navigatie door de lijst met boodschappen
- Enter om een boodschap te openen
- Automatische focus op de Spreek-in knop bij openen
- Spreek-in knop activeren met Enter
- Tabben van Spreek-in knop naar tekstveld
- Automatisch sluiten van een boodschap als je wegtabt zonder iets in te vullen
- Screenreader aankondigingen bij alle acties
- Wisknop om alles te resetten

---

## 2. Testtaken

Laat Berend de volgende taken uitvoeren. Geef minimale uitleg vooraf — observeer hoe hij het prototype ontdekt.

| # | Taak | Methode | Aandachtspunt |
|---|---|---|---|
| 1 | Open het prototype en navigeer door de pagina. | Vrij verkennen met NVDA | Wat hoort hij als eerste? Begrijpt hij de structuur? |
| 2 | Plak transcript 1 en splits het op. | Transcript plakken, splitknop activeren | Hoort hij de aankondiging hoeveel boodschappen er zijn? |
| 3 | Tab door alle boodschappen zonder iets te openen. | Tab-toets | Worden de boodschappen correct voorgelezen met nummer en tekst? |
| 4 | Open boodschap 1 met Enter. | Enter op eerste boodschap | Hoort hij de aankondiging dat de boodschap geopend is? Staat de focus op de Spreek-in knop? |
| 5 | Activeer de Spreek-in knop met Enter en spreek een antwoord in. | Enter op Spreek-in knop | Werkt Enter op de knop? Hoort hij dat de opname gestart is? |
| 6 | Stop de opname en tab naar het tekstveld. | Tab na opname | Staat de focus correct op het tekstveld? Hoort hij de inhoud? |
| 7 | Tab weg van boodschap 1 zonder iets in te vullen (leeg tekstveld). | Tab uit boodschap | Sluit de boodschap automatisch? Hoort hij de aankondiging "gesloten"? |
| 8 | Open boodschap 2, typ een antwoord, en tab weg. | Tekst typen en wegtabben | Blijft de boodschap open omdat er tekst in staat? |
| 9 | Plak transcript 6 (lang bericht) en navigeer door alle boodschappen. | Lang transcript testen | Hoe gaat hij om met veel boodschappen? Raakt hij het overzicht kwijt? |
| 10 | Neem een spraakbericht op via de hoofdopnameknop bovenaan. | Microfoon opname | Hoort hij de aankondiging? Begrijpt hij het verschil met de Spreek-in knop per boodschap? |
| 11 | Wis alles via de wisknop. | Wisknop | Hoort hij de aankondiging "alles gewist"? Is het duidelijk dat de lijst weg is? |

---

## 3. Vragen tijdens de test

Stel deze vragen tijdens of direct na de testtaken. Stel ze open — laat Berend uitpraten.

| # | Vraag | Doel |
|---|---|---|
| 1 | Wat hoorde je als eerste toen je de pagina opende? | Eerste indruk via NVDA begrijpen |
| 2 | Was het duidelijk dat je kon tabben door de boodschappen? | Testen of de tabnavigatie ontdekbaar is |
| 3 | Wat hoorde je toen je Enter drukte op een boodschap? | Kwaliteit van de aankondiging bij openen beoordelen |
| 4 | Stond de focus waar je het verwachtte na het openen? | Controleren of autofocus op Spreek-in knop logisch voelt |
| 5 | Lukte het om de Spreek-in knop met Enter te activeren? | Testen of Enter op de knop werkt en voelt als verwacht |
| 6 | Merkte je dat een lege boodschap automatisch sloot? | Begrijpelijkheid van het automatisch sluiten beoordelen |
| 7 | Hoe vond je de volgorde: eerst Spreek-in knop, dan tekstveld? | Controleren of de tabvolgorde logisch aanvoelt |
| 8 | Miste je de kopieerknop, of was het prima zonder? | Beoordelen of het verwijderen van de kopieerknop de goede keuze was |
| 9 | Waren de aankondigingen (opname gestart, boodschap gesloten, etc.) duidelijk en op het juiste moment? | Kwaliteit van alle aria-live meldingen beoordelen |
| 10 | Was er iets wat je verwachtte te horen maar niet hoorde? | Ontbrekende feedback opsporen |
| 11 | Wat vond je het beste werken in vergelijking met de vorige versie? | Verbeteringen bevestigen |
| 12 | Wat vond je nog steeds verwarrend of frustrerend? | Resterende knelpunten identificeren voor iteratie 3 |

---

## 4. Observatiepunten voor de ontwerper

Let tijdens de test op het volgende:

- Gebruikt Berend Tab lineair of springt hij met NVDA-sneltoetsen door de pagina?
- Hoe lang duurt het voordat hij een boodschap opent na het splitsen?
- Merkt hij vanzelf dat de Spreek-in knop automatisch focus heeft, of zoekt hij nog?
- Reageert hij op de aankondigingen, of lijkt hij ze te missen of negeren?
- Wat doet hij als hij per ongeluk een boodschap sluit die hij wilde beantwoorden?
- Begrijpt hij het verschil tussen de hoofdopnameknop bovenaan en de Spreek-in knop per boodschap?
- Vraagt hij om bevestiging na het wissen, of vertrouwt hij de aankondiging?
- Navigeert hij terug naar al beantwoorde boodschappen, of gaat hij altijd vooruit?

---

## Notities tijdens de sessie
in gesplitte versie ook kunnen luisterne
een kluster toevoegen dus alles in een keer kunnen versturen
sneltoets voor alles ingevulden dingen kunnen versturen
zinnen kunnen samenvoegen
geluidje bij verzenden
geen cursief of dikgedrutkt, normale lettertype maakt niet heel veel uit







# Testplan — Iteratie 3

## Wat is er veranderd sinds iteratie 2

- Zinnen worden voorgelezen bij tabben door de lijst
- Versturen-knop stuurt alle ingevulde antwoorden tegelijk
- Sneltoets Ctrl+Enter verstuurt alle antwoorden vanuit elke positie
- Geluidje bij het versturen als extra auditieve bevestiging

---

## 1. Functies die we testen

- Zinnen voorlezen bij tabben door de lijst
- Alle antwoorden tegelijk versturen via knop of Ctrl+Enter
- Geluidje en bevestigingsmelding bij versturen

---

## 2. Testtaken

Laat Berend de volgende taken uitvoeren. Geef minimale uitleg vooraf — observeer hoe hij het prototype ontdekt.

| # | Taak | Methode | Aandachtspunt |
|---|---|---|---|
| 1 | Plak transcript 1 en splits het op. Tab daarna door alle boodschappen. | Tab-toets door de lijst | Hoort hij de tekst van elke zin voorgelezen? Is de aankondiging duidelijk en volledig? |
| 2 | Beantwoord een paar boodschappen en verstuur alles via de Versturen-knop. | Versturen-knop activeren | Hoort hij de bevestigingsmelding? Hoort hij het geluidje? Zijn beide feedbacks duidelijk? |
| 3 | Verstuur opnieuw via de sneltoets Ctrl+Enter. | Toetsenbordsneltoets | Weet hij de sneltoets te vinden? Werkt het vanuit het tekstveld? |

---

## 3. Vragen tijdens de test

Stel deze vragen tijdens of direct na de testtaken. Stel ze open — laat Berend uitpraten.

| # | Vraag | Doel |
|---|---|---|
| 1 | Wat hoorde je toen je door de boodschappen tabde? Was dat genoeg informatie? | Kwaliteit van de zinsaankondiging beoordelen |
| 2 | Hoorde je de bevestiging bij het versturen? Was die duidelijk? | Kwaliteit van de aria-live melding beoordelen |
| 3 | Hoorde je het geluidje bij het versturen? Wat vond je ervan? | Bruikbaarheid van het geluidje als feedback beoordelen |
| 4 | Kende je de sneltoets Ctrl+Enter al, of ontdekte je hem via de knop? | Vindbaarheid van de sneltoets beoordelen |
| 5 | Wat vond je beter dan de vorige versie? | Verbeteringen bevestigen |
| 6 | Wat vond je nog steeds verwarrend of frustrerend? | Resterende knelpunten identificeren voor iteratie 4 |

---

## 4. Observatiepunten voor de ontwerper

- Hoort Berend de zinsaankondiging bij tabben, of lijkt hij hem te missen?
- Is de aankondiging snel genoeg, of is er een merkbare vertraging?
- Reageert hij op het geluidje bij versturen, of valt het hem niet op?
- Gebruikt hij Ctrl+Enter spontaan, of alleen nadat hij de knop heeft gezien?
- Weet hij na het versturen of zijn actie gelukt is?

---

## Notities tijdens de sessie
tijdens opname word er elke seconden de tijd voorgelezen, zodat je weet hoe lang je al aan het opnemen bent
bij antwoord invul veld word eerst het bericht gehoord, alleen laten horen als je in dat veld zit alleen laten horen dan dat je "antword op bericht 1" hoort, zodat je weet dat je in het juiste veld zit
bij de button beantwoorden laat hij 2 keer horen het bericht horen.voor de zelfde knop moet het aria label "antwoorden op...." zijn