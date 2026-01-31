# Evergreen Sparplan-Rechner

Eine Next.js App mit Tailwind CSS und Recharts für die Berechnung der Vermögensentwicklung mit Sparplänen.

## Features

- **Sparplan-Rechner** (`/SparplanRechner`): Interaktive Berechnung mit:
  - Einmalige Einzahlung (Standard: 5.000 €)
  - Monatlicher Sparplan (Standard: 250 €)
  - Laufzeit (1–50 Jahre, Standard: 42)
  - Risiko-Slider (Sicher → Ausgewogen → Wachstum)
  - Compound-Interest-Simulation (4–8 % Rendite je nach Risiko)
  - Ergebnis-Karten: Gesamteinzahlungen, Ertrag, Endwert, Schwankungen
  - Line-Chart für die Wertentwicklung über die Jahre

## Voraussetzungen

- **Node.js 18.17** oder neuer (für Next.js 14)
- **npm 6.9+** (oder `yarn` / `pnpm`)

## Installation

```bash
npm install
```

**Bei Fehlern:**
- `Invalid dependency type requested: alias` → npm auf 6.9+ aktualisieren: `npm install -g npm@latest`
- Node zu alt → mit [nvm](https://github.com/nvm-sh/nvm): `nvm install 20 && nvm use 20`

## Entwicklung

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Build

```bash
npm run build
npm start
```

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Recharts
