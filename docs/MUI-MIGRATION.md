# MUI-Migration – essentielle Komponenten

## Umgesetzt

Alle essentiellen UI-Komponenten nutzen jetzt **Material UI (MUI)** mit Evergreen-Farben und Saans-Schrift.

| Komponente       | MUI-Basis        | Verwendung                    |
|------------------|------------------|-------------------------------|
| **DualRangeSlider** | Slider, Box      | Kindersparplan (Alter/Zielalter) |
| **SliderInput**  | Slider, Box, Typography | SparplanRechner (Raten, Laufzeit) |
| **NumberInput**  | TextField, IconButton, Dialog, InputAdornment | Kindersparplan (Sparziel), SparplanRechner |
| **ValidationAlert** | Alert (severity="warning") | SparplanRechner (Validierung) |
| **ResultCards**  | Card, CardContent, Box, Typography | SparplanRechner (Ergebnis-Karten) |
| **PocketCard**   | Card, CardContent, Box, Typography | Dashboard (Taschen-Karten) |

## Nicht migriert

- **ValueChart** – bleibt bei **Recharts** (MUI hat keine Chart-Bibliothek).
- **Icon** – optional später auf `@mui/icons-material` oder MUI `SvgIcon` umstellbar.

## Abhängigkeiten

- `@mui/material`
- `@emotion/react`
- `@emotion/styled`

## Styling

- Evergreen-Farben (z. B. `#022011`, `#008542`, `#fd8f18`) werden in `sx` gesetzt.
- Schrift: `fontFamily: "var(--font-saans), sans-serif"` wo nötig.
- Kein globaler MUI-ThemeProvider erforderlich; Komponenten sind eigenständig stylbar.
