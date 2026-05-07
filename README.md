# Spraakberichten - Een Exclusive Design Project

## Het Probleem

Berend is blind en gebruikt dagelijks spraakberichten om te communiceren. Meestal neemt hij lange gesproken berichten op of ontvangt hij ze van anderen. Het probleem: die lange berichten bevatten *meerdere onderwerpen tegelijk*. Berend kan er niet snel op reageren, want hij moet het hele bericht horen, alles onthouden, en dan één monolithisch antwoord geven.

De vraag werd: **Hoe kunnen we het voor Berend mogelijk maken om op elk onderwerp in een spraakbericht afzonderlijk te reageren?**

## De Oplossing: Spraakberichten-splitter

Dit prototype stelt Berend in staat om:

1. **Een lang spraakbericht op te nemen** of een transcript in te plakken
2. **Het bericht automatisch te splitsen** in afzonderlijke zinnen (elk met eigen onderwerp)
3. **Op elke zin afzonderlijk te reageren** via tekst of spraak
4. **Alles tegelijk in te dienen** als hij klaar is

Het doel: meer controle, beter overzicht, en minder cognitieve belasting.

---

## Exclusive Design Principles in dit Project

Dit project is gebouwd volgens de **vier principes van Exclusive Design**: Study Situation, Ignore Conventions, Prioritise Identity, Add Nonsense.

### 1. **Study Situation** - Het Reële Probleem Begrijpen

We begonnen niet met aannames, maar met **vijf directe testsessies met Berend**. Dit zijn geen standaard usability tests - dit is co-design met iemand die het product elke dag zou gebruiken.

Wat we ontdekten:
- Berend gebruikt **NVDA screenreader** en navigeert vooral met Tab en Enter
- Lang tekst voorlezen slaat veel informatie kwijt - hij wil **korte, duidelijke aankondigingen**
- Focus en tabvolgorde zijn **kritiek** - automatische focus besparen navigatietijd
- Auditieve feedback (geluidjes, aankondigingen) is essentieel - tekst alleen werkt niet

### 2. **Ignore Conventions** - Breek Verwachtingen af

Een normaal webformulier zou verwachten dat je alles invult en dan één knop indient. Wij negeren dat:

- **Geen traditioneel formulier**: Geen labels, geen "submit" buttons per item - in plaats daarvan **directe antwoordvelden per boodschap**
- **Tab-navigatie is primair**: Berend navigeert niet met muis, dus we maakten Tab het centrale interactiemodel
- **Enter = Handelingen**: Enter opent een boodschap, Enter activeert de Spreek-in knop. Dit is anders dan een standaard knop die Enter vereist
- **Automatisch sluiten**: Als je een boodschap opent en wegtabt zonder iets in te vullen, sluit hij automatisch - geen "annuleer" knop nodig
- **Alle antwoorden tegelijk versturen**: Niet elk antwoord apart, maar één grote "Versturen" knop aan het einde (met sneltoets **Ctrl+Enter**)
- **Antwoordenpagina als aparte pagina**: De antwoordenoverzicht is een volledig losse HTML-pagina (`antwoorden.html`), zodat de navigatiecontext duidelijk en gefocust blijft

### 3. **Prioritise Identity** - Berend Staat Centraal

Dit prototype is *voor Berend*, niet voor iedereen. Alles is geoptimaliseerd naar zijn manier van werken:

- **Spraak is standaard**: De Spreek-in knop is de eerste optie, niet de tekstinvoer
- **Geen overbodige visuele elementen**: Visuele feedback (kleurveranderingen, iconen) is minimaal - auditieve feedback doet het werk
- **Sneltoetsen voor ervaren gebruikers**: Ctrl+Enter is snel, maar verborgen tot je het nodig hebt
- **Korte aankondigingen**: "Antwoord op bericht 2" in plaats van de hele berichttekst herhalen
- **Timer-feedback is visueel, niet auditief**: Berend vond dat afleidend, dus we maakten het alleen zichtbaar voor visuele gebruikers

### 4. **Add Nonsense** - Onverwachte Delights

- **Geluidje bij versturen**: Een korte, vriendelijke "ding" als alle antwoorden worden opgeslagen - geen streng "fout" of "succes", gewoon een prettige bevestiging
- **Bericht-nummers**: "Bericht 1, Bericht 2" in plaats van generieke termen - kleine persoonlijkheid
- **Automatische focus management**: Geen "scroll ernaartoe", geen verwarring - de cursor gaat waar het hoort
- **Chat-stijl antwoordenpagina**: De antwoorden worden getoond als een echte chatconversatie (imBee-stijl), met geciteerde berichten en groene antwoordbubbles - een vertrouwde, herkenbare interface

---

## De Vijf Testsessies: Hoe We Leerden en Verbeterden

### **Iteratie 1: 30-31 maart 2026 - Het Begin**

**Wat we bouwden:**
- Spraakopname en transcript plakken
- Automatische zinssplitsing
- Antwoordvelden per zin
- Kopieerknop

**Wat Berend ons leerde:**
- De kopieerknop was nutteloos - hij wilde antwoorden versturen, niet kopiëren
- Tabbing door boodschappen werkte niet logisch - hij had moeite om de lijst te navigeren
- Automatische focus helpt enorm - plaats focus op het antwoordveld, niet ergens anders
- **Feedback is alles**: Hij wilde weten wat er gebeurde na elke actie

**Belangrijkste inzicht**: "Je moet me vertellen wat je aan het doen bent. Ik kan het niet zien."

---

### **Iteratie 2: 6-7 april 2026 - Tab-navigatie Centraal**

**Wat we veranderden:**
- Kopieerknop verwijderd ✓
- Boodschappen **tabbaar** gemaakt - Tab gaat door alle boodschappen
- **Enter opent** een boodschap en zet focus op de Spreek-in knop
- Bij tabben voorlezing van de berichttekst (aria-labels)
- Automatische aankondiging wanneer een boodschap opent of sluit
- Boodschappen sluiten automatisch als je wegtabt zonder iets in te vullen

**Wat Berend ons leerde:**
- Tab-navigatie voelde veel natuurlijker dan vorig keer
- Focus-management was perfect - hij wist direct waar hij was
- **Maar**: Lege boodschappen die automatisch sluiten verwarrend? Nee, dat was intuïtief
- Sneltoetsen waren gewenst - niet alle gebruikers willen dit langzaam doen

**Belangrijkste inzicht**: "Tabbing voelt als thuiskomen."

---

### **Iteratie 3: 20-21 april 2026 - Bulk-actie en Feedback**

**Wat we veranderden:**
- **Versturen-knop** die *alles tegelijk indient*
- **Sneltoets Ctrl+Enter** om overal ter plekke in te dienen
- **Geluidje** + screenreader-aankondiging bij versturen
- Alle boodschappen **zichtbaar voorlezen** bij tabben

**Wat Berend ons leerde:**
- Geluidje gaf bevestiging die woorden niet gaven
- Ctrl+Enter werd meteen begrepen - intuïtief voor iemand met screenreader-ervaring
- **Timer was nog steeds afleidend** - zelfs met verbeteringen

**Belangrijkste inzicht**: "Auditieve bevestiging werkt beter dan woorden alleen."

---

### **Iteratie 4: Finale Tuning - Voorkomen van Dubbele Aankondigingen**

**Wat we veranderden:**
- Timer maakt geen geluid meer - hij is puur visueel
- Antwoordveld zegt alleen "Antwoord op bericht 2" (niet de volledige berichttekst)
- Beantwoorden-knop aria-label "Beantwoorden op bericht [nummer]" - geen herhaling

**Wat Berend ons leerde:**
- "Ik kan me veel beter concentreren zonder dat timer-geluid."
- Korte aankondigingen waren genoeg - "Antwoord op bericht 2" gaf voldoende context
- Geen dubbele aankondigingen meer = rustiger ervaring

**Berend's Verdict**: "Ik zou dit zo gebruiken als het live zou gaan. Het voelt klaar."

---

### **Iteratie 5: 6 mei 2026 - Antwoordenpagina als Losse Chatpagina**

**Wat we bouwden:**
- De antwoordenoverzicht verplaatst naar een **volledig aparte HTML-pagina** (`antwoorden.html`) met eigen JavaScript (`antwoorden.js`)
- Gegevens worden via `sessionStorage` doorgegeven van de hoofdpagina naar de antwoordenpagina - geen koppeling tussen de twee bestanden op runtimeniveau
- **Chat-stijl interface** geïnspireerd op imBee: lichtgroene achtergrond, witte inkomende bubbles (originele berichten), groene uitgaande bubbles (antwoorden van Berend)
- Elke antwoordbubble bevat een **geciteerd blok** met het originele bericht erboven, zodat de context altijd zichtbaar is
- Alle originele berichten verschijnen eerst bovenaan; alle antwoorden zijn gegroepeerd **onderaan** - overzichtelijk en rustig om doorheen te tabben
- Berichten zonder antwoord worden simpelweg overgeslagen - geen "geen antwoord gegeven" melding die overbodige ruis geeft
- **Terug-knop** brengt de gebruiker terug naar `index.html` en herstelt de focus op de verstuur-knop

**Waarom twee losse pagina's?**
Een aparte pagina geeft Berend een duidelijke mentale grens: eerst reageer je, dan zie je het overzicht. De screenreader start op de nieuwe pagina opnieuw, zonder de ruis van alle vorige elementen. De focus begint direct bij de terug-knop, wat navigatie meteen duidelijk maakt.

**Wat we leerden:**
- Een losse pagina geeft meer rust dan een overlay of scroll-naar-beneden constructie
- Het weglaten van "geen antwoord gegeven" meldingen maakt het overzicht strakker en minder verwarrend
- Antwoorden onderaan groeperen past bij de verwachting: eerst lezen, dan reageren, dan overzien

**Belangrijkste inzicht**: "Minder pagina-elementen op één scherm = minder cognitieve belasting voor de screenreader-gebruiker."

---

**Dit is de kracht van co-design:** Vijf iteraties, elk gericht op één specifieke persoon. Geen abstracte "best practices", maar concrete oplossingen.

---

## Design Choices Verklaard

| Keuze | Waarom? | Exclusive Design Principe |
|-------|---------|--------------------------|
| Tab-navigatie primair | Berend navigeert exclusief met toetsenbord | Study Situation + Ignore Conventions |
| Enter = Actie | Voelt natuurlijker dan standaard "activeren" | Ignore Conventions |
| Spraak vóór tekst | Berend communiceert liever gesproken | Prioritise Identity |
| Korte labels | "Antwoord op 2" i.p.v. volledige tekst | Study Situation |
| Geluidje bij versturen | Auditieve bevestiging voelt zekerder dan tekst | Prioritise Identity + Add Nonsense |
| Automatisch sluiten | Minder navigatie, intuïtief | Ignore Conventions |
| Ctrl+Enter sneltoets | Voor ervarenen, verborgen voor beginners | Ignore Conventions + Add Nonsense |
| Aparte antwoordenpagina | Duidelijke mentale grens, minder ruis voor screenreader | Study Situation + Ignore Conventions |
| Chat-stijl antwoordoverzicht | Vertrouwde interface, geciteerde context per antwoord | Prioritise Identity + Add Nonsense |
| Antwoorden onderaan gegroepeerd | Eerst lezen, dan overzien - logische flow | Study Situation |
| Geen "geen antwoord" melding | Overbodige ruis weghalen = rustiger ervaring | Study Situation + Prioritise Identity |

---

## Wat is Geleerd

1. **Co-design met één persoon werkt**: Je leert diepere dingen dan bij tien generieke testers
2. **Auditieve feedback is niet optioneel**: Voor screenreader-gebruikers is het cruciaal
3. **Minder is meer**: Verwijder de kopieerknop, sluit boodschappen automatisch, zeg geen dubbele dingen
4. **Context doet ertoe**: "Antwoord op bericht 2" is genoeg context - je hoeft niet alles te herhalen
5. **Tab is je vriend**: Als je Tab snapt, bouw je voor screenreader-gebruikers die Tab *voorkomen*
6. **Paginagrenzen helpen**: Een aparte pagina voor het antwoordoverzicht geeft de screenreader een schone start en de gebruiker een helder mentaal model