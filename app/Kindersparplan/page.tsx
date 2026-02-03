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
import { SPARZIELE, RENDITE_KINDERSPARPLAN, RENDITE_STRATEGIE_NAME } from "@/data/kindersparplan";

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

/** Option „Eigenes Sparziel“: User gibt Zielbetrag ein, monatliche Sparsumme wird berechnet */
const EIGENE_SUMME_ID = "eigene-summe";
/** Kein Sparziel aktiv (nach Modifikation der monatlichen Sparsumme bei zuvor aktivem Eigenem Sparziel) */
const KEIN_SPARZIEL_ID = "keins";
const CUSTOM_ZIEL_STEP = 500;
const CUSTOM_ZIEL_MIN = 1000;
const CUSTOM_ZIEL_MAX = 9_000_000;
const CUSTOM_ZIEL_DEFAULT = 23500;
/** Bei „kein Sparziel“: Default-Sparsumme (€/Monat); Voraussichtlicher Endwert entspricht dieser Rate. */
const DEFAULT_MONATLICH_OHNE_SPARZIEL = 50;

export default function KindersparplanPage() {
  const [kindesalter, setKindesalter] = useState(DEFAULT_START);
  const [zielalter, setZielalter] = useState(DEFAULT_ZIEL);
  const [sparzielId, setSparzielId] = useState<string>(KEIN_SPARZIEL_ID);
  /** Bei „Eigenes Sparziel“: Zielbetrag in €; monatliche Sparsumme wird daraus berechnet. */
  const [gewuenschterZielertrag, setGewuenschterZielertrag] = useState(CUSTOM_ZIEL_DEFAULT);

  const [lastState, setLastState] = useState<{
    kindesalter: number;
    zielalter: number;
    sparzielId: string;
    gewuenschterZielertrag: number;
  } | null>(null);

  const handleUndo = useCallback(() => {
    if (lastState) {
      setKindesalter(lastState.kindesalter);
      setZielalter(lastState.zielalter);
      setSparzielId(lastState.sparzielId);
      setGewuenschterZielertrag(lastState.gewuenschterZielertrag);
      setLastState(null);
    }
  }, [lastState]);

  const saveForUndo = useCallback(() => {
    setLastState({ kindesalter, zielalter, sparzielId, gewuenschterZielertrag });
  }, [kindesalter, zielalter, sparzielId, gewuenschterZielertrag]);

  const laufzeit = laufzeitBisZiel(kindesalter, zielalter);
  const sparziel = SPARZIELE.find((z) => z.id === sparzielId);
  /** Zielbetrag: bei festem Sparziel aus Daten, bei „Eigenes Sparziel“ der eingegebene Betrag, bei „keins“ 0. */
  const zielBetrag =
    sparzielId === EIGENE_SUMME_ID ? gewuenschterZielertrag : sparzielId === KEIN_SPARZIEL_ID ? 0 : (sparziel?.betrag ?? 0);
  const sparzielLabel = sparzielId === EIGENE_SUMME_ID ? "Eigenes Sparziel" : sparzielId === KEIN_SPARZIEL_ID ? "" : (sparziel?.label ?? "");

  const computedMonatlichSparziel = useMemo(() => {
    if (laufzeit <= 0 || zielBetrag <= 0) return 0;
    return berechneMonatlichFuerZiel(zielBetrag, laufzeit, RENDITE_KINDERSPARPLAN);
  }, [laufzeit, zielBetrag]);

  /** Monatliche Sparsumme: aus gewähltem Sparziel; bei „keins“ = 50 € (Voraussichtlicher Endwert entspricht dieser Default-Sparsumme). */
  const monatlich = useMemo(() => {
    if (sparzielId === KEIN_SPARZIEL_ID) return laufzeit <= 0 ? 0 : DEFAULT_MONATLICH_OHNE_SPARZIEL;
    return computedMonatlichSparziel;
  }, [sparzielId, laufzeit, computedMonatlichSparziel]);

  const isInvalid =
    laufzeit <= 0 ||
    (sparzielId === EIGENE_SUMME_ID ? gewuenschterZielertrag <= 0 : sparzielId === KEIN_SPARZIEL_ID ? false : !sparziel);

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

  const formatEuro = (v: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(v);

  /** Zahl mit 1000er-Trennpunkt (de-DE: Punkt) für direkte Eingabe Zielertrag */
  const formatZielertrag = (v: number) =>
    new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(v);

  /** Hero-Block: Monatsbetrag + Endwert (zweitrangig) – wiederverwendet für Mobile (sticky) und Desktop (Sidebar) */
  const heroBlock = !isInvalid && monatlich > 0 && (
    <>
      <p className="text-sm font-semibold text-ds-neutral-70 mb-1">
        Deine monatliche Sparsumme
      </p>
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-ds-seagreen font-saans tracking-tight leading-none text-center min-w-0 px-2">
        {formatEuro(monatlich)}
      </p>
      <p className="text-base font-semibold text-ds-neutral-90 mt-2 whitespace-nowrap">
        Voraussichtlicher Endwert: {formatEuro(result.endwert)}
      </p>
    </>
  );

  return (
    <main className="min-h-screen bg-ds-app-bg font-saans pb-24 lg:pb-8 flex flex-col">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col min-h-0 w-full">
        <header className="pt-4 lg:pt-6 lg:pb-1 shrink-0">
          <h1 className="font-saans font-bold text-ds-neutral-100 text-xl lg:text-2xl">Kindersparplan</h1>
        </header>

        {/* Mobile: Sticky Hero – Card mit weißem Hintergrund */}
        {!isInvalid && monatlich > 0 && (
          <div className="lg:hidden sticky top-0 z-30 isolate -mx-4 px-4 pt-4 pb-4 bg-ds-neutral-0 border-b border-ds-neutral-20 shadow-sm">
            <div className="max-w-6xl mx-auto text-center">{heroBlock}</div>
          </div>
        )}

        <div
          className={`relative z-20 flex-1 min-h-0 ${!isInvalid && monatlich > 0 ? "pt-6" : "pt-2"} lg:pt-4 lg:grid lg:grid-cols-12 lg:gap-6 lg:items-stretch`}
        >
          {/* Desktop: Linke Sidebar – bündig mit Chart, CTA unten */}
          {!isInvalid && monatlich > 0 && (
            <aside className="hidden lg:flex lg:col-span-4 lg:flex-col lg:h-full lg:gap-4">
              <div className="bg-ds-neutral-0 border border-ds-neutral-20 rounded-ds-lg shadow-sm p-4 text-center shrink-0 lg:h-[200px] lg:flex lg:flex-col lg:justify-center">
                {heroBlock}
              </div>
              {/* Sparziele: 2 nebeneinander, füllen Platz bis CTA */}
              <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                <h2 className="text-base font-bold text-ds-neutral-100 mb-2 shrink-0">Sparziel wählen</h2>
                <div className="grid grid-cols-2 gap-2 overflow-y-auto min-h-0">
                  {SPARZIELE.map((ziel) => {
                    const isSelected = sparzielId === ziel.id;
                    return (
                      <button
                        key={ziel.id}
                        type="button"
                        onClick={() => {
                          saveForUndo();
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
                  {/* Eigene Summe: Breite über 2 Kacheln */}
                  <div
                    className={`relative rounded-ds-16 border-2 transition-all bg-ds-neutral-0 p-3 col-span-2 ${
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
                      <span className="font-bold text-ds-neutral-100 text-sm block">Eigenes Sparziel</span>
                    </button>
                    <div className="mt-2 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        aria-label="500 Euro weniger"
                        onClick={() => {
                          saveForUndo();
                          setGewuenschterZielertrag((v) => Math.max(CUSTOM_ZIEL_MIN, v - CUSTOM_ZIEL_STEP));
                          if (sparzielId !== EIGENE_SUMME_ID) setSparzielId(EIGENE_SUMME_ID);
                        }}
                        className="w-9 h-9 shrink-0 rounded-full border border-ds-neutral-20 bg-ds-neutral-10/60 flex items-center justify-center text-ds-seagreen text-3xl font-bold hover:opacity-80 hover:border-ds-seagreen/30 transition-opacity"
                      >
                        −
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        aria-label="Zielertrag in Euro"
                        value={formatZielertrag(gewuenschterZielertrag)}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "");
                          const v = digits === "" ? CUSTOM_ZIEL_MIN : Math.min(CUSTOM_ZIEL_MAX, Math.max(CUSTOM_ZIEL_MIN, Number(digits)));
                          saveForUndo();
                          setGewuenschterZielertrag(v);
                          setSparzielId(EIGENE_SUMME_ID);
                        }}
                        className="flex-1 min-w-0 h-9 rounded-ds-16 border border-ds-neutral-20 text-sm font-semibold text-ds-neutral-100 text-center [appearance:textfield]"
                      />
                      <button
                        type="button"
                        aria-label="500 Euro mehr"
                        onClick={() => {
                          saveForUndo();
                          setGewuenschterZielertrag((v) => Math.min(CUSTOM_ZIEL_MAX, v + CUSTOM_ZIEL_STEP));
                          if (sparzielId !== EIGENE_SUMME_ID) setSparzielId(EIGENE_SUMME_ID);
                        }}
                        className="w-9 h-9 shrink-0 rounded-full border border-ds-neutral-20 bg-ds-neutral-10/60 flex items-center justify-center text-ds-seagreen text-3xl font-bold hover:opacity-80 hover:border-ds-seagreen/30 transition-opacity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto shrink-0 pt-4 pb-6 lg:pt-6 lg:pb-6">
                <Link
                  href="/SparplanRechner"
                  className="block rounded-ds-16 bg-ds-orange-60 text-ds-neutral-0 font-bold text-center py-3.5 px-4 hover:bg-ds-orange-70 transition-colors shadow-sm"
                >
                  Sparplan starten →
                </Link>
              </div>
            </aside>
          )}

          {/* Rechte Spalte: auf Desktop gleiche Höhe wie Sidebar, Chart füllt Rest */}
          <div className={`space-y-6 ${!isInvalid && monatlich > 0 ? "lg:col-span-8" : "lg:col-span-12"} lg:flex lg:flex-col lg:h-full lg:min-h-0 lg:space-y-0`}>
          {/* Slider: Kindesalter / Zielalter – gleiche Höhe wie Hero-Card, Inhalt bleibt in der Card */}
          <section className="mb-6 md:mb-8 lg:mb-4 lg:shrink-0">
            <div className="bg-ds-neutral-0 border border-ds-neutral-20 rounded-ds-lg shadow-sm p-4 sm:p-6 lg:p-4 lg:h-[200px] lg:flex lg:flex-col lg:justify-center">
              <div className="flex items-center gap-1 mb-2 lg:mb-1.5 shrink-0">
                <h2 className="text-base font-bold text-ds-neutral-100">
                  Alter des Kindes und Zielalter
                </h2>
                <InfoTooltip
                  label="Hinweis zu Zinseszins"
                  content="Zinseszins: Dein Guthaben wächst, weil Zinsen auf das angelegte Kapital und auf bereits gutgeschriebene Zinsen berechnet werden. So wirkt der Zinseszinseffekt über die Laufzeit."
                />
              </div>
              <p className="text-xs text-ds-neutral-70 mb-2 lg:mb-1.5 shrink-0">
                Von 0 bis 30 Jahre. Beide Werte unabhängig einstellbar, um die Laufzeit optimal zu planen.
              </p>
              <div className="py-2 lg:py-1 shrink-0">
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
              </div>
              {/* Laufzeit: CDS-konform – kompakte Zeile mit Label + Wert, gleiche Optik wie Slider-Labels */}
              <div className="mt-3 pt-3 lg:mt-2 lg:pt-2 border-t border-ds-neutral-20 flex items-center justify-between shrink-0">
                <span className="text-xs font-semibold text-ds-neutral-70 uppercase tracking-wide">Laufzeit</span>
                <span className="text-sm font-bold text-ds-neutral-100">{laufzeit} Jahre</span>
              </div>
            </div>
          </section>

          {/* Sparziel wählen: auf Mobile hier, auf Desktop in der linken Sidebar */}
          <section className="lg:hidden mb-6 md:mb-8">
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
              {/* Eigene Summe: Breite über 2 Kacheln */}
              <div
                className={`relative rounded-ds-16 border-2 transition-all bg-ds-neutral-0 p-3 col-span-2 ${
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
                  <span className="font-bold text-ds-neutral-100 text-sm block">Eigenes Sparziel</span>
                </button>
                <div className="mt-2 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    aria-label="500 Euro weniger"
                    onClick={() => {
                      saveForUndo();
                      setGewuenschterZielertrag((v) => Math.max(CUSTOM_ZIEL_MIN, v - CUSTOM_ZIEL_STEP));
                      if (sparzielId !== EIGENE_SUMME_ID) setSparzielId(EIGENE_SUMME_ID);
                    }}
                    className="w-9 h-9 shrink-0 rounded-full border border-ds-neutral-20 bg-ds-neutral-10/60 flex items-center justify-center text-ds-seagreen text-3xl font-bold hover:opacity-80 hover:border-ds-seagreen/30 transition-opacity"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    aria-label="Zielertrag in Euro"
                    value={formatZielertrag(gewuenschterZielertrag)}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      const v = digits === "" ? CUSTOM_ZIEL_MIN : Math.min(CUSTOM_ZIEL_MAX, Math.max(CUSTOM_ZIEL_MIN, Number(digits)));
                      saveForUndo();
                      setGewuenschterZielertrag(v);
                      setSparzielId(EIGENE_SUMME_ID);
                    }}
                    className="flex-1 min-w-0 h-9 rounded-ds-16 border border-ds-neutral-20 text-sm font-semibold text-ds-neutral-100 text-center [appearance:textfield]"
                  />
                  <button
                    type="button"
                    aria-label="500 Euro mehr"
                    onClick={() => {
                      saveForUndo();
                      setGewuenschterZielertrag((v) => Math.min(CUSTOM_ZIEL_MAX, v + CUSTOM_ZIEL_STEP));
                      if (sparzielId !== EIGENE_SUMME_ID) setSparzielId(EIGENE_SUMME_ID);
                    }}
                    className="w-9 h-9 shrink-0 rounded-full border border-ds-neutral-20 bg-ds-neutral-10/60 flex items-center justify-center text-ds-seagreen text-3xl font-bold hover:opacity-80 hover:border-ds-seagreen/30 transition-opacity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </section>

          {isInvalid && (
            <div className="rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 p-4 text-center text-sm text-ds-neutral-70">
              Wähle ein Sparziel und einen Zeitraum (Zielalter &gt; Startalter).
            </div>
          )}

          {/* Projektion & Wachstum: Chart füllt auf Desktop den Rest, bündig mit CTA */}
          {!isInvalid && monatlich > 0 && (
            <section className="bg-ds-neutral-0 border border-ds-neutral-20 rounded-ds-lg shadow-sm p-4 sm:p-6 lg:flex lg:flex-col lg:min-h-0 lg:flex-1">
              <h2 className="text-base font-bold text-ds-neutral-100 mb-4 shrink-0">Projektion & Wachstum</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 shrink-0">
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
                  <div className="text-[10px] sm:text-xs text-ds-neutral-70 inline-flex items-center gap-0.5">
                    Rendite p.a.
                    <InfoTooltip
                      label="Renditeannahme und Hinweis"
                      content={`Berechnung basiert auf der Renditeannahme der Strategie „${RENDITE_STRATEGIE_NAME}“. Die tatsächliche Wertentwicklung kann abweichen; sie unterliegt Schwankungen und ist nicht garantiert.`}
                    />
                  </div>
                  <p className="text-sm font-semibold text-ds-neutral-100">
                    ~{(RENDITE_KINDERSPARPLAN * 100).toFixed(1).replace(".", ",")}%
                  </p>
                </div>
              </div>
              <div className="h-[220px] sm:h-[260px] lg:flex-1 lg:min-h-[200px] lg:h-full">
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
        </div>

        {/* Sticky Footer: nur auf Mobile; Desktop hat CTA in der Sidebar */}
        {!isInvalid && (
          <footer className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-ds-neutral-0 border-t border-ds-neutral-20 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm text-ds-neutral-70">
                  Voraussichtlicher Endwert
                </span>
                <span className="text-lg sm:text-xl font-semibold text-ds-neutral-90 font-saans">
                  {formatEuro(result.endwert)}
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
