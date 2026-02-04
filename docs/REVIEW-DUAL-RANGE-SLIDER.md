# Review-Agent: DualRangeSlider – Linker Thumb wählt rechten

## Befund
- **Symptom:** Klick auf linken Thumb → rechter Thumb wird bewegt (High-Input reagiert). Zusätzlich: Färbung des Slider-Balkens inkonsistent.
- **Ursache (ältere Variante):** Beide Inputs volle Breite und übereinander → High-Input fängt alle Pointer-Events.
- **Ursache (Hälften-Variante):** Linke/rechte Hälfte mit `min`/`max` abhängig vom anderen Thumb → beim Bewegen eines Thumbs ändert sich die Range des anderen Inputs, der andere Thumb verschiebt sich visuell.

## Umgesetzte Lösung: Dynamic Width (muffinman.io)
- **Quelle:** [muffinman.io – Native dual-range input](https://muffinman.io/blog/native-dual-range-input/)
- **Idee:** Zwei native `<input type="range">` **nebeneinander** (nicht überlappend). Ein **Midpoint** zwischen den Werten: `midpoint = (valueLow + valueHigh) / 2`.
- **Linker Input:** `min=min`, `max=midpoint`, `value=valueLow`. Container-Breite = `(midpoint - min) / (max - min) * 100%` → Thumb bleibt an `lowPercent`.
- **Rechter Input:** `min=midpoint`, `max=max`, `value=valueHigh`. Container startet am Midpoint, Breite = Rest → Thumb bleibt an `highPercent`.
- **Ergebnis:** Kein Überlapp; Klick/Drag trifft immer den richtigen Slider (auch iOS). Thumbs verschieben sich visuell nicht mehr. Track-Füllung = eine gemeinsame `div` zwischen `lowPercent` und `highPercent` (konsistente Färbung).

## Technik (aktuell)
- Kein Overlay, keine synthetischen Events. Nur dynamische Breiten und Midpoint-basierte `min`/`max` pro Frame.
- Optional später: Thumb-Breiten-Korrektur (CSS `--dri-thumb-width` + Padding am Wrapper) für pixelgenaue Track-Anschlüsse, falls nötig.
