# CDS-Integration Test: Mobile-View & bg-ds-yellow-10

## Verifizierung (Build-Output)

### ✅ bg-ds-yellow-10 kompiliert korrekt

**Tailwind-CSS-Output** (`.next/static/css/45277a46fa3afe89.css`):

```css
.bg-ds-yellow-10 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 249 235 / var(--tw-bg-opacity, 1));
}
```

→ **#fff9eb** (RGB 255, 249, 235) ✓

### ✅ Body-Hintergrund (globals.css)

```css
body {
  background-color: rgb(255 249 235 / var(--tw-bg-opacity, 1));
  font-family: Saans, Helvetica, sans-serif;
}
```

### ✅ Verwendung von bg-ds-yellow-10

| Datei | Element |
|-------|---------|
| `app/globals.css` | body |
| `app/page.tsx` | main |
| `app/SparplanRechner/page.tsx` | main + alle Cards |

### ✅ Mobile Viewport

- `layout.tsx`: `<meta name="viewport" content="width=device-width, initial-scale=1"/>` ✓
- Responsive Breakpoints: sm (640px), md (768px), lg (1024px) ✓

---

## Playwright-Test ausführen

**Voraussetzung:** Dev-Server oder Production-Server muss laufen.

```bash
# 1. Build & Server starten (in separatem Terminal)
npm run build && npm run start

# 2. Test ausführen (in neuem Terminal)
npm run test:cds
```

Oder mit Dev-Server:

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run test:cds
```

---

## Ergebnis

**bg-ds-yellow-10 (#fff9eb) wird als Hintergrund korrekt geladen** – sowohl für body als auch für main und Cards auf der SparplanRechner-Seite. Die CDS-Integration ist funktionsfähig.
