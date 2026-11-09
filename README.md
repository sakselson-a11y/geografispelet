# Blindkarta

Geografispel för mobilen med blindkartor över alla världsdelar och Sverige. Fungerar utan nätverk efter första besöket.

Spela: https://sakselson-a11y.github.io/geografispelet/

Lägg till på iPhone: öppna länken i Safari → Dela → Lägg till på hemskärmen.

## Spellägen

- **Länder** – ett land visas överst, tryck på var det ligger.
- **Huvudstäder** – en huvudstad visas, till exempel "Var ligger Berlin?", tryck på landet.
- **Välj namn** – ett land lyses upp, välj rätt namn bland fyra alternativ.
- **Flaggor** – en flagga visas, välj rätt land bland fyra alternativ.

För Sverige finns i stället **Landskap**, **Välj landskap**, **Städer** (tryck på rätt prick) och **Välj stad**.

Varje kombination av karta, spelläge och antal sparar ett rekord med upp till tre stjärnor. Klarar man allt rätt blir det konfetti.

Välj 5, 10, 15 eller alla länder. Efter omgången kan du se facit och öva på de länder du missade. Slå på "Visa rätt svar direkt" för att se det rätta landet när du svarar fel.

## Bygga om

`index.html` byggs från `src/` med kartdata från Natural Earth (via world-atlas, public domain) flaggor från flag-icons (MIT-licens) och Sveriges landskap från [svenska-landskap](https://github.com/perliedman/svenska-landskap) (CC0, bygger på Lantmäteriets data):

```bash
npm install
npm run build
```

Länder, svenska namn och huvudstäder finns i `src/build.js`. Utseende och spellogik finns i `src/template.html`.
