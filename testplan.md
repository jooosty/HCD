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

---

## 5. Na de test

Verwerk de bevindingen direct na de sessie. Noteer:

- Welke taken gingen soepel, welke niet?
- Welke uitspraken van Berend waren het meest waardevol?
- Wat ga je aanpassen in het prototype voor de volgende iteratie?