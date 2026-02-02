"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import DualRangeSlider from "@/components/DualRangeSlider";

/** Tooltip: ?-Button öffnet Hinweis (z. B. Zinseszins) – Design-Agent / Tests */
function InfoTooltip({ label, content }: { label: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="ml-1.5 w-6 h-6 rounded-full border border-ds-neutral-30 bg-ds-neutral-10 text-ds-neutral-70 hover:bg-ds-orange-60/20 hover:border-ds-orange-60/50 hover:text-ds-orange-60 font-semibold text-sm inline-flex items-center justify-center transition-colors"
      >
        ?
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div
            role="tooltip"
            className="absolute left-0 top-full mt-1.5 z-50 min-w-[200px] max-w-[280px] p-3 rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-0 shadow-lg text-xs text-ds-neutral-100"
          >
            {content}
          </div>
        </>
      )}
    </div>
  );
}
import {
  berechneKindersparplan,
  berechneMonatlichFuerZiel,
  laufzeitBisZiel,
} from "@/lib/kindersparplan";
import {
  SPARZIELE,
  RENDITE_KINDERSPARPLAN,
  BADGE_STUFE,
} from "@/data/kindersparplan";

const ValueChart = dynamic(() => import("@/components/ValueChart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[220px] sm:h-[260px] rounded-ds-16 bg-ds-neutral-10 animate-pulse" />
  ),
});

/** CDS: Alter 0–30 Jahre, Default Start 0 / Ziel 18 */
const AGE_MIN = 0;
const AGE_MAX = 30;
const DEFAULT_START = 0;
const DEFAULT_ZIEL = 18;

/** Progress-Bar – CDS Grün (Ertrag/Positiv), für Hero zentriert */
function ProgressBar({
  prozent,
  label,
  centered = false,
}: {
  prozent: number;
  label: string;
  centered?: boolean;
}) {
  const capped = Math.min(100, Math.max(0, prozent));
  return (
    <div className={`space-y-1.5 ${centered ? "text-center" : ""}`}>
      <div className={`flex justify-between text-xs font-semibold text-ds-neutral-100 ${centered ? "justify-center gap-2" : ""}`}>
        <span>{label}</span>
        <span className="text-ds-seagreen">{Math.round(capped)}%</span>
      </div>
      <div className="h-2 rounded-full bg-ds-neutral-20 overflow-hidden">
        <div
          className="h-full rounded-full bg-ds-seagreen transition-all duration-300"
          style={{ width: `${capped}%` }}
        />
      </div>
    </div>
  );
}

const EIGENE_SUMME_ID = "eigene-summe";
const CUSTOM_MONATLICH_STEP = 25;
const CUSTOM_MONATLICH_MIN = 25;
const CUSTOM_MONATLICH_MAX = 2000;
const CUSTOM_MONATLICH_DEFAULT = 25;

export default function KindersparplanPage() {
  const [kindesalter, setKindesalter] = useState(DEFAULT_START);
  const [zielalter, setZielalter] = useState(DEFAULT_ZIEL);
  const [sparzielId, setSparzielId] = useState<string>(() => SPARZIELE[0]?.id ?? "studium");
  /** Bei „Eigene Summe“: monatliche Sparsumme in € (Default 25). */
  const [customMonatlich, setCustomMonatlich] = useState(CUSTOM_MONATLICH_DEFAULT);
  /** Bei Sparziel (5 Ziele): manueller Übersteuerungswert; null = berechneter Betrag. Für +/- neben dem Monatsbetrag. */
  const [sparzielMonatlichOverride, setSparzielMonatlichOverride] = useState<number | null>(null);

  const [lastState, setLastState] = useState<{
    kindesalter: number;
    zielalter: number;
    sparzielId: string;
    customMonatlich: number;
  } | null>(null);

  const handleUndo = useCallback(() => {
    if (lastState) {
      setKindesalter(lastState.kindesalter);
      setZielalter(lastState.zielalter);
      setSparzielId(lastState.sparzielId);
      setCustomMonatlich(lastState.customMonatlich);
      setLastState(null);
    }
  }, [lastState]);

  const saveForUndo = useCallback(() => {
    setLastState({ kindesalter, zielalter, sparzielId, customMonatlich });
  }, [kindesalter, zielalter, sparzielId, customMonatlich]);

  const laufzeit = laufzeitBisZiel(kindesalter, zielalter);
  const sparziel = SPARZIELE.find((z) => z.id === sparzielId);
  const zielBetrag = sparziel?.betrag ?? 0;
  const sparzielLabel = sparzielId === EIGENE_SUMME_ID ? "Eigene Summe" : (sparziel?.label ?? "");

  const computedMonatlichSparziel = useMemo(() => {
    if (laufzeit <= 0 || zielBetrag <= 0) return 0;
    return berechneMonatlichFuerZiel(zielBetrag, laufzeit, RENDITE_KINDERSPARPLAN);
  }, [laufzeit, zielBetrag]);

  /** Bei Sparziel: Override oder berechnet; bei Eigene Summe: Wert aus der Karte (€/Monat). */
  const monatlich = useMemo(() => {
    if (sparzielId === EIGENE_SUMME_ID) return customMonatlich;
    if (sparzielId !== EIGENE_SUMME_ID && sparzielMonatlichOverride !== null) return sparzielMonatlichOverride;
    return computedMonatlichSparziel;
  }, [sparzielId, customMonatlich, sparzielMonatlichOverride, computedMonatlichSparziel]);

  const isInvalid = laufzeit <= 0 || (sparzielId === EIGENE_SUMME_ID ? customMonatlich <= 0 : !sparziel);

  const result = useMemo(() => {
    if (isInvalid || monatlich <= 0)
      return {
        chartData: [] as { jahr: number; wert: number; einzahlungen: number }[],
        laufzeit: 0,
        gesamtEinzahlungen: 0,
        ertrag: 0,
        endwert: 0,
      };
    return berechneKindersparplan({
      kindesalter,
      zielalter,
      einmalig: 0,
      monatlich,
      rendite: RENDITE_KINDERSPARPLAN,
    });
  }, [kindesalter, zielalter, monatlich, isInvalid]);

  const progressProzent =
    zielBetrag > 0 && result.endwert > 0
      ? Math.min(100, (result.endwert / zielBetrag) * 100)
      : 100;

  const currentBadge = BADGE_STUFE.filter((b) => progressProzent >= b.minProzent).pop();

  const formatEuro = (v: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(v);

  const badgeText =
    currentBadge?.minProzent === 100
      ? "Ziel erreicht! 🎉 Du bist auf dem Weg!"
      : currentBadge
        ? `${currentBadge.emoji} ${currentBadge.label}`
        : null;

  const hasSparziel = sparzielId !== EIGENE_SUMME_ID;

  return (
    <main className="min-h-screen bg-ds-app-bg font-saans pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-4">
          <h1 className="sr-only">Kindersparplan</h1>
        </div>

        {/* Hero: Deine monatliche Sparsumme + bei Sparziel Progress, bei Eigene Summe Endsumme prominent */}
        {!isInvalid && monatlich > 0 && (
          <div className="sticky top-0 z-30 isolate -mx-4 px-4 pt-4 pb-4 bg-ds-app-bg border-b border-ds-neutral-20 shadow-sm">
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-sm font-semibold text-ds-neutral-70 mb-1">
                Deine monatliche Sparsumme
              </p>
              <div className="grid grid-cols-3 items-center justify-items-center gap-2 max-w-xs mx-auto">
                {hasSparziel ? (
                  <button
                    type="button"
                    aria-label="Sparbetrag um 1 Euro verringern"
                    onClick={() => {
                      const base = sparzielMonatlichOverride ?? computedMonatlichSparziel;
                      setSparzielMonatlichOverride(Math.max(1, base - 1));
                    }}
                    className="justify-self-end w-8 h-8 flex items-center justify-center text-ds-seagreen text-3xl font-bold hover:opacity-80 transition-opacity"
                  >
                    −
                  </button>
                ) : (
                  <div className="w-8" />
                )}
                <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-ds-seagreen font-saans tracking-tight leading-none text-center col-start-2">
                  {formatEuro(monatlich)}
                </p>
                {hasSparziel ? (
                  <button
                    type="button"
                    aria-label="Sparbetrag um 1 Euro erhöhen"
                    onClick={() => {
                      const base = sparzielMonatlichOverride ?? computedMonatlichSparziel;
                      setSparzielMonatlichOverride(Math.min(2000, base + 1));
                    }}
                    className={`justify-self-start w-8 h-8 flex items-center justify-center text-ds-seagreen text-3xl font-bold transition-opacity ${
                      progressProzent >= 100 ? "invisible pointer-events-none" : "hover:opacity-80"
                    }`}
                  >
                    +
                  </button>
                ) : (
                  <div className="w-8" />
                )}
              </div>
              {hasSparziel ? (
                <div className="mt-4 max-w-xs mx-auto">
                  <ProgressBar prozent={progressProzent} label="Fortschritt zum Ziel" centered />
                  {badgeText && (
                    <p className="text-xs text-ds-neutral-70 mt-2">{badgeText}</p>
                  )}
                </div>
              ) : (
                <p className="text-xl sm:text-2xl font-bold text-ds-neutral-100 mt-3">
                  Voraussichtlicher Endwert: {formatEuro(result.endwert)}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content: z-20 damit Slider/Thumbs unter dem Sticky-Hero scrollen (kein Überlappen) */}
        <div
          className={`relative z-20 ${!isInvalid && monatlich > 0 ? "pt-6" : "pt-2"}`}
        >
          {/* Slider: Kindesalter / Zielalter (Content z-20 → scrollt unter Sticky-Hero) */}
          <section className="mb-6 md:mb-8">
            <div className="bg-ds-neutral-0 border border-ds-neutral-20 rounded-ds-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center gap-1 mb-3 md:mb-4">
                <h2 className="text-base font-bold text-ds-neutral-100">
                  Alter des Kindes und Zielalter
                </h2>
                <InfoTooltip
                  label="Hinweis zu Zinseszins"
                  content="Zinseszins: Dein Guthaben wächst, weil Zinsen auf das angelegte Kapital und auf bereits gutgeschriebene Zinsen berechnet werden. So wirkt der Zinseszinseffekt über die Laufzeit."
                />
              </div>
              <p className="text-xs text-ds-neutral-70 mb-3">
                Von 0 bis 30 Jahre. Beide Werte unabhängig einstellbar, um die Laufzeit optimal zu planen.
              </p>
              <DualRangeSlider
                min={AGE_MIN}
                max={AGE_MAX}
                valueLow={kindesalter}
                valueHigh={zielalter}
                onChangeLow={(v) => {
                  saveForUndo();
                  setKindesalter(v);
                }}
                onChangeHigh={(v) => {
                  saveForUndo();
                  setZielalter(v);
                }}
                step={1}
                lowLabel="Startalter"
                highLabel="Zielalter"
              />
              {/* Laufzeit: CDS-konform – kompakte Zeile mit Label + Wert, gleiche Optik wie Slider-Labels */}
              <div className="mt-3 pt-3 border-t border-ds-neutral-20 flex items-center justify-between">
                <span className="text-xs font-semibold text-ds-neutral-70 uppercase tracking-wide">Laufzeit</span>
                <span className="text-sm font-bold text-ds-neutral-100">{laufzeit} Jahre</span>
              </div>
            </div>
          </section>

          {/* Sparziel wählen: 5 vorgegebene + 6. Option Eigene Summe (Zahl + +/- in 25er Schritten) */}
          <section className="mb-6 md:mb-8">
            <h2 className="text-base font-bold text-ds-neutral-100 mb-3">Sparziel wählen</h2>
            <div className="grid grid-cols-2 gap-3">
              {SPARZIELE.map((ziel) => {
                const isSelected = sparzielId === ziel.id;
                return (
                  <button
                    key={ziel.id}
                    type="button"
                    onClick={() => {
                      saveForUndo();
                      setSparzielMonatlichOverride(null);
                      setSparzielId(ziel.id);
                    }}
                    className={`relative text-left p-3 rounded-ds-16 border-2 transition-all bg-ds-neutral-0 ${
                      isSelected
                        ? "border-ds-seagreen bg-ds-seagreen/10 shadow-sm"
                        : "border-ds-neutral-20 hover:border-ds-orange-60/40"
                    }`}
                  >
                    {isSelected && (
                      <span
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-ds-seagreen flex items-center justify-center text-ds-neutral-0 text-xs font-bold"
                        aria-hidden
                      >
                        ✓
                      </span>
                    )}
                    <span className="text-xl block mb-1.5 text-center">{ziel.emoji}</span>
                    <span className="font-bold text-ds-neutral-100 text-sm block">{ziel.label}</span>
                    <span className="text-ds-neutral-70 text-xs block">{formatEuro(ziel.betrag)}</span>
                  </button>
                );
              })}
              {/* 6. Option: Eigene Summe – Zahleneingabe mit +/- in 25er Schritten */}
              <div
                className={`relative rounded-ds-16 border-2 transition-all bg-ds-neutral-0 p-3 ${
                  sparzielId === EIGENE_SUMME_ID
                    ? "border-ds-seagreen bg-ds-seagreen/10 shadow-sm"
                    : "border-ds-neutral-20"
                }`}
              >
                {sparzielId === EIGENE_SUMME_ID && (
                  <span
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-ds-seagreen flex items-center justify-center text-ds-neutral-0 text-xs font-bold"
                    aria-hidden
                  >
                    ✓
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    saveForUndo();
                    setSparzielId(EIGENE_SUMME_ID);
                  }}
                  className="w-full text-left"
                >
                  <span className="text-xl block mb-1.5 text-center">✏️</span>
                  <span className="font-bold text-ds-neutral-100 text-sm block">Eigene Summe</span>
                </button>
                <div className="mt-2 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    aria-label="25 Euro weniger"
                    onClick={() => {
                      saveForUndo();
                      setCustomMonatlich((v) => Math.max(CUSTOM_MONATLICH_MIN, v - CUSTOM_MONATLICH_STEP));
                      if (sparzielId !== EIGENE_SUMME_ID) setSparzielId(EIGENE_SUMME_ID);
                    }}
                    className="w-8 h-8 rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 text-ds-neutral-100 font-black text-xl leading-none hover:bg-ds-orange-60/20 hover:border-ds-orange-60/50"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={CUSTOM_MONATLICH_MIN}
                    max={CUSTOM_MONATLICH_MAX}
                    step={CUSTOM_MONATLICH_STEP}
                    value={customMonatlich}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (!Number.isNaN(v)) {
                        saveForUndo();
                        setCustomMonatlich(Math.max(CUSTOM_MONATLICH_MIN, Math.min(CUSTOM_MONATLICH_MAX, v)));
                        setSparzielId(EIGENE_SUMME_ID);
                      }
                    }}
                    className="flex-1 min-w-0 px-2 py-1 rounded-ds-16 border border-ds-neutral-20 text-sm font-semibold text-ds-neutral-100 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    aria-label="25 Euro mehr"
                    onClick={() => {
                      saveForUndo();
                      setCustomMonatlich((v) => Math.min(CUSTOM_MONATLICH_MAX, v + CUSTOM_MONATLICH_STEP));
                      if (sparzielId !== EIGENE_SUMME_ID) setSparzielId(EIGENE_SUMME_ID);
                    }}
                    className="w-8 h-8 rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 text-ds-neutral-100 font-black text-xl leading-none hover:bg-ds-orange-60/20 hover:border-ds-orange-60/50"
                  >
                    +
                  </button>
                </div>
                {sparzielId === EIGENE_SUMME_ID && (
                  <p className="text-ds-neutral-70 text-xs mt-1">€ / Monat (25er-Schritte)</p>
                )}
              </div>
            </div>
          </section>

          {isInvalid && (
            <div className="rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 p-4 text-center text-sm text-ds-neutral-70">
              Wähle ein Sparziel und einen Zeitraum (Zielalter &gt; Startalter).
            </div>
          )}

          {/* Projektion & Wachstum: Chart mit Werten (CDS wie SparplanRechner) */}
          {!isInvalid && monatlich > 0 && (
            <section className="bg-ds-neutral-0 border border-ds-neutral-20 rounded-ds-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-base font-bold text-ds-neutral-100 mb-4">Projektion & Wachstum</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
                <div>
                  <p className="text-[10px] sm:text-xs text-ds-neutral-70">Endwert ({laufzeit} Jahre)</p>
                  <p className="text-lg font-bold text-ds-seagreen">{formatEuro(result.endwert)}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-ds-neutral-70">Ertrag</p>
                  <p className="text-lg font-bold text-ds-seagreen">+{formatEuro(result.ertrag)}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-ds-neutral-70">Einzahlung</p>
                  <p className="text-sm font-semibold text-ds-neutral-100">{formatEuro(result.gesamtEinzahlungen)}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-ds-neutral-70">Rendite p.a.</p>
                  <p className="text-sm font-semibold text-ds-neutral-100">~6,9%</p>
                </div>
              </div>
              <div className="h-[220px] sm:h-[260px]">
                <ValueChart
                  data={result.chartData}
                  view="einzahlung_ertrag"
                  fill
                  spanVariant="hellgruen"
                />
              </div>
            </section>
          )}

          {lastState && (
            <button
              type="button"
              onClick={handleUndo}
              className="mt-6 text-sm text-ds-neutral-70 hover:text-ds-orange-60 underline"
            >
              ← Zurücksetzen
            </button>
          )}
        </div>

        {/* Sticky Footer: Gesamtes Sparziel + CTA (Designvorschlag) */}
        {!isInvalid && (
          <footer className="fixed bottom-0 left-0 right-0 z-30 bg-ds-neutral-0 border-t border-ds-neutral-20 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-ds-neutral-70">
                  {hasSparziel ? "Gesamtes Sparziel" : "Voraussichtlicher Endwert"}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-ds-neutral-100 font-saans">
                  {hasSparziel ? `Ziel: ${formatEuro(zielBetrag)}` : formatEuro(result.endwert)}
                </span>
              </div>
              <Link
                href="/SparplanRechner"
                className="block w-full py-3.5 rounded-ds-16 bg-ds-orange-60 text-ds-neutral-0 font-bold text-center hover:bg-ds-orange-70 transition-colors"
              >
                Sparplan starten →
              </Link>
            </div>
          </footer>
        )}
      </div>
    </main>
  );
}
