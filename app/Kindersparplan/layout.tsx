/**
 * Layout für Kindersparplan: Full-Bleed-Wrapper, damit Mobile-Ansicht
 * (Sticky-/Fixed-Hero) bündig zum Viewport ist. Kein zusätzliches Padding/Margin.
 */
export default function KindersparplanLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="kindersparplan-root" data-route="kindersparplan">
      {children}
    </div>
  );
}
