import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-ds-neutral-0">
      <div className="text-center max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-ds-neutral-100 mb-4">
          Evergreen Sparplan-Rechner
        </h1>
        <p className="text-ds-neutral-70 mb-8">
          Berechne deine Vermögensentwicklung mit dem interaktiven
          Sparplan-Rechner.
        </p>
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
        </div>
      </div>
    </main>
  );
}
