import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-ds-app-bg">
      <div className="text-center max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-ds-neutral-100 mb-4">
          Evergreen Sparplan-Rechner
        </h1>
        <p className="text-ds-neutral-70 mb-6">
          Berechne deine Vermögensentwicklung mit dem interaktiven
          Sparplan-Rechner.
        </p>

        {/* Varianten A/B nebeneinander testen – öffnet in neuem Tab */}
        <div className="mb-8 p-4 rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-0 shadow-sm">
          <p className="text-sm font-semibold text-ds-neutral-100 mb-3">
            Varianten vergleichen (A/B-Test)
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/SparplanRechner?variante=a"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-ds-pill bg-ds-seagreen text-ds-neutral-0 font-semibold shadow-sm hover:bg-ds-darkgreen transition-colors"
            >
              Variante A
              <span className="text-xs opacity-90">(mit Rendite-Slider)</span>
            </a>
            <a
              href="/SparplanRechner?variante=b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-ds-pill bg-ds-neutral-20 text-ds-neutral-100 font-semibold hover:bg-ds-neutral-40 transition-colors"
            >
              Variante B
              <span className="text-xs opacity-90">(ohne Rendite-Slider)</span>
            </a>
          </div>
          <p className="text-xs text-ds-neutral-70 mt-2">
            Öffnet in neuem Tab – beide nebeneinander vergleichen
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/Dashboard"
            className="inline-flex items-center justify-center px-8 py-4 rounded-ds-pill bg-ds-darkgreen text-ds-neutral-0 font-semibold shadow-lg hover:bg-ds-neutral-90 transition-colors"
          >
            Zum Dashboard
          </Link>
          <Link
            href="/SparplanRechner"
            className="inline-flex items-center justify-center px-8 py-4 rounded-ds-pill bg-ds-orange-60 text-ds-neutral-100 font-semibold shadow-lg hover:bg-ds-orange-70 transition-colors"
          >
            Zum Sparplan-Rechner
          </Link>
          <Link
            href="/Kindersparplan"
            className="inline-flex items-center justify-center px-8 py-4 rounded-ds-pill bg-ds-seagreen text-ds-neutral-0 font-semibold shadow-lg hover:bg-ds-darkgreen transition-colors"
          >
            Kindersparplan
          </Link>
        </div>
      </div>
    </main>
  );
}
