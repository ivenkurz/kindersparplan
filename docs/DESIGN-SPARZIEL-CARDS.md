# Design-Agent: Sparziel-Cards Redesign (Kindersparplan)

## Auswahl-Zustand (Selected State) – Plan & Ideen

**Problem:** Welche Sparziel-Card ausgewählt ist, ist aktuell schwer erkennbar (nur 2px vs 1px Rand in derselben Farbe #022011).

**Evergreen-Tokens:** `--ds-orange-60: #fd8f18`, `--ds-yellow-10: #fff9eb`, `--ds-neutral-100: #022011`.

| Idee | Beschreibung | Erkennbarkeit | Aufwand |
|------|--------------|---------------|---------|
| **A – Orange Rand + heller Hintergrund** | Ausgewählt: Rand `#fd8f18` (2px), Hintergrund `#fff9eb` (ds-yellow-10). Nicht ausgewählt: 1px `#022011`, `#F9FAFB`. | Sehr gut (Farbe + Fläche) | Gering |
| **B – Nur Orange-Rand** | Ausgewählt: 2px `#fd8f18`; Rest unverändert. | Gut | Gering |
| **C – Häkchen-Icon** | Ausgewählt: kleines Check-Icon (z. B. oben rechts) + evtl. Rand/Hintergrund. | Sehr gut (explizit) | Mittel (Icon, Platz) |
| **D – Schatten („angehoben“)** | Ausgewählt: Orange-Rand + stärkerer Schatten (`shadow-md` / ds-orange-glow). | Gut | Gering |
| **E – Nur Hintergrund** | Ausgewählt: Hintergrund `#fff9eb`, Rand weiter 2px `#022011`. | Mittel | Gering |

**Empfehlung:** **A (Orange Rand + ds-yellow-10)** – zwei klare Signale, nutzt Primärfarbe und bestehendes Token, ohne zusätzliche Icons.

---

## Ausgangslage (Layout)
- **Problem:** Auf Mobile bricht der Text in den Sparziel-Cards schnell um, weil das Emoji-Icon rechts **fest ~48px (pr-12)** reserviert und der nutzbare Textbereich dadurch stark schrumpft.
- **Aktuelles Layout:** Flex mit `items-start`, Label + Betrag links, Emoji `absolute right-3 top-1/2`. Min-Höhe 92px, 2-spaltiges Grid.

## Design-Prinzipien (Evergreen / Design-Agent)
- **Mobile-first:** Auf kleinen Viewports zuerst Lesbarkeit und stabiles Layout, dann Dekoration.
- **Touch-Ziele:** Cards weiterhin min. 44px Höhe / gut tappbar.
- **Klarheit:** Label + Betrag sollen ohne Umbrüche oder Truncate lesbar sein (z. B. „Auslandsjahr“, „20.000 €“).

## Varianten (UX-Optionen)

| Variante | Beschreibung | Vorteil | Nachteil |
|----------|--------------|---------|----------|
| **A – Icon oben** | Emoji oben zentriert oder links, darunter Label, darunter Betrag; Text nutzt volle Breite. | Kein Platzverlust durch Icon rechts; einheitlich mobil/desktop. | Optisch weniger „Card mit Icon rechts“. |
| **B – Icon links, kompakt** | Icon links in kleinem Kreis (z. B. 32px), rechts daneben Label + Betrag in einer Spalte. | Weniger Umbruch als aktuell, Icon bleibt sichtbar. | Bei langen Labels (z. B. „Auslandsjahr“) evtl. trotzdem Umbruch in sehr schmalen Spalten. |
| **C – Nur Text mobil, Icon ab sm** | Auf xs nur Label + Betrag (volle Breite); ab `sm` wieder Icon rechts wie jetzt. | Maximal viel Platz für Text auf sehr kleinen Screens. | Zwei Layouts zu pflegen; Icon fehlt auf kleinsten Viewports. |

## Empfehlung (Design-Agent)
- **Variante A (Icon oben)** umsetzen: ein Layout für alle Breakpoints, volle Textbreite, klare Hierarchie (Icon → Label → Betrag). Evergreen-Farben und bestehende Border/Shadow beibehalten.

## Figma / UX-Pilot Prompt (für Design-Agent)
```
Kindersparplan Sparziel-Cards: Mobile-first Redesign. 
- Kacheln (2 Spalten Grid): Icon/Emoji oben zentriert (z. B. 32–40px), darunter Label (fett, 1 Zeile), darunter Betrag (sekundär, 1 Zeile). 
- Kein Icon rechts; Text nutzt volle Kartenbreite. 
- Stil: Hellgrauer Hintergrund (#F9FAFB), abgerundete Ecken 16px, Border bei Hover/Selected (Orange/Dunkelgrün). 
- Touch-Ziel min. 44px, ausreichend Padding. 
- Vier Ziele: Führerschein, Wohnung, Ausbildung, Auslandsjahr.
```

## Technische Umsetzung (Kurz)
- Card: `flex flex-col items-center` (oder `items-start` mit Icon oben links).
- Icon: oben, `text-2xl` oder feste Größe, `mb-2`.
- Label + Betrag: darunter, `text-center` oder `text-left`, `w-full`, ohne `pr-12`.
- Beide Stellen (Desktop-Sidebar + Mobile) auf gleiche Card-Komponente bzw. gleiche Klassen umstellen.
