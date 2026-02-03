# Kindersparplan – Test-Report & Summary

## Vercel-Deployment

```bash
git add .
git commit -m "feat: Kindersparplan für Eltern – Kindesalter, Zielalter, Gamification"
git push origin main
```

Vercel deployt automatisch bei Push zu `main`. Preview-URLs für Branches.

## Implementierte Features

| Feature | Status |
|---------|--------|
| Kindesalter / Zielalter Slider | ✓ |
| Einmalige + monatliche Einzahlung | ✓ |
| Kostenschätzung (Studium, Ausbildung, Führerschein) | ✓ |
| Compound Interest Berechnung (6,9% p.a.) | ✓ |
| Wachstums-Chart (Recharts) | ✓ |
| Progress-Bar (Gamification) | ✓ |
| Badges (Starter → Ziel erreicht) | ✓ |
| Tooltips (pädagogisch) | ✓ |
| Undo (Zurücksetzen) | ✓ |
| Mobile-first, Evergreen-Farben | ✓ |

## Test-Szenarien

1. **Kind 5 Jahre, Ziel 18, Monatlich 50€, Einmalig 1000€** → Ertrag prüfen (Laufzeit 13 Jahre)
2. **Kind 0 Jahre, Ziel 18** → 18 Jahre Laufzeit
3. **Edge-Case: 0€ monatlich** → Validierung sichtbar
4. **Zielalter 30 Jahre** → lange Laufzeit (25 Jahre bei Kind 5)
5. **Kostenschätzung Studium** → Progress-Bar sichtbar
6. **Responsivität** → Mobile Viewport (375×667)
7. **Tooltip** → Klick auf ? öffnet Zinseszins-Hinweis
8. **Undo** → Nach Änderung erscheint „Zurücksetzen“

## Manuelle Prüfung

```bash
npm run dev
# http://localhost:3000/Kindersparplan
```

## Playwright-Tests

```bash
npx playwright test tests/kindersparplan.spec.ts
```
