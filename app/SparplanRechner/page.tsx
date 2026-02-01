"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import NumberInput from "@/components/NumberInput";
import SliderInput from "@/components/SliderInput";
import ResultCards from "@/components/ResultCards";
import ValidationAlert from "@/components/ValidationAlert";
import { strategies, sliderLegendTooltips } from "@/data/strategies";

const ValueChart = dynamic(() => import("@/components/ValueChart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[240px] sm:h-[260px] md:h-[240px] lg:h-[260px]">
      <div className="w-full h-full rounded-ds-16 bg-ds-neutral-10 animate-pulse" />
    </div>
  ),
});

const MIN_EINZAHLUNG = 0;

/** Stufe-Name für Slider-Position 0, 5, 10 */
const STUFE_NAMES: Record<number, string> = {
  0: "Niedrig",
  5: "Ausgewogen",
  10: "Hoch",
};

function StepBadge({ number }: { number: number }) {
  return (
    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-ds-yellow-60 text-ds-neutral-100 font-semibold text-2xl shrink-0 shadow-sm">
      {number}
    </div>
  );
}

export default function SparplanRechnerPage() {
  const [einmalig, setEinmalig] = useState(1000);
  const [monatlich, setMonatlich] = useState(100);
  const [laufzeit, setLaufzeit] = useState(10);
  const [strategieIndex, setStrategieIndex] = useState(5); // 0–10
  const [chartView, setChartView] = useState<"spanne" | "einzahlung_ertrag">("spanne");

  const selectedStrategy = strategies[strategieIndex];
  const rendite = selectedStrategy.return;
  const schwankungenApi = selectedStrategy.volatility * 100;
  const isInvalid = einmalig < MIN_EINZAHLUNG || monatlich < MIN_EINZAHLUNG;

  const stufeName =
    STUFE_NAMES[strategieIndex] ??
    (strategieIndex <= 2 ? "Niedrig" : strategieIndex <= 6 ? "Ausgewogen" : "Hoch");

  const { chartData, gesamtEinzahlungen, ertrag, endwert, schwankungen, twrPa } = useMemo(() => {
      if (isInvalid) {
        return {
          chartData: [] as { jahr: number; wert: number; einzahlungen: number }[],
          gesamtEinzahlungen: 0,
          ertrag: 0,
          endwert: 0,
          schwankungen: 0,
          twrPa: 0,
        };
      }

      const data: {
        jahr: number;
        wert: number;
        einzahlungen: number;
        confLow: number;
        confRange: number;
      }[] = [];
      // Einzahlung-Logik: Einmalzahlung + 1. Monatsrate am ersten Tag (Startpunkt im Chart)
      const startWert = einmalig + monatlich;
      data.push({
        jahr: 0,
        wert: Math.round(startWert),
        einzahlungen: Math.round(startWert),
        confLow: Math.round(startWert),
        confRange: 0,
      });

      let wert = startWert;
      const monatlicheRendite = Math.pow(1 + rendite, 1 / 12) - 1;
      const z95 = 1.96; // übliche Konfidenz: 95%
      const sigma = Math.max(0, selectedStrategy.volatility); // jährliche Volatilität (0..)

      for (let jahr = 1; jahr <= laufzeit; jahr++) {
        for (let monat = 0; monat < 12; monat++) {
          if (jahr === 1 && monat === 0) {
            // Erste Verzinsung nach dem Startpunkt (ohne zusätzliche Einzahlung)
            wert = wert * (1 + monatlicheRendite);
          } else {
            wert = (wert + monatlich) * (1 + monatlicheRendite);
          }
        }
        const faktor = Math.exp(z95 * sigma * Math.sqrt(jahr));
        const confLow = Math.round(wert / faktor);
        const confHigh = Math.round(wert * faktor);
        data.push({
          jahr,
          wert: Math.round(wert),
          einzahlungen: einmalig + monatlich * 12 * jahr,
          confLow,
          confRange: Math.max(0, confHigh - confLow),
        });
      }

      const gesamtEinzahlungen = einmalig + monatlich * 12 * laufzeit;
      const endwertRounded = Math.round(wert);
      const ertrag = Math.round(wert - gesamtEinzahlungen);

      // p.a.-Rendite: Zeitgewichtete Rendite (TWR) aus strategy.return, positiv clampen
      const twrPa = Math.max(0, rendite) * 100;

      return {
        chartData: data,
        gesamtEinzahlungen,
        ertrag,
        endwert: endwertRounded,
        schwankungen: Math.round(schwankungenApi * 10) / 10,
        twrPa,
      };
    }, [einmalig, monatlich, laufzeit, isInvalid, rendite, schwankungenApi]);

  return (
    <main className="min-h-screen bg-ds-neutral-0 font-saans">
      {/* Sticky Ergebnis oben – mobile-first, full-width (nur Mobile) */}
      {!isInvalid && (
        <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-ds-neutral-0 border-b border-ds-neutral-10">
          <div className="max-w-6xl mx-auto px-4 py-2.5">
            <ResultCards
              gesamtEinzahlungen={gesamtEinzahlungen}
              ertrag={ertrag}
              schwankungen={schwankungen}
              endwert={endwert}
              laufzeit={laufzeit}
              twrPa={twrPa}
              sticky
            />
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-ds-neutral-20 to-transparent" />
        </div>
      )}
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10 ${
          !isInvalid ? "pt-20 md:pt-8" : "pt-8"
        }`}
      >
        {/* Header: Zurück-Link außerhalb des Rechner-Containers */}
        <header className="mb-4 md:mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ds-neutral-100 hover:text-ds-orange-60 font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Zurück
          </Link>
        </header>

        {/* Desktop: klarer, begrenzter Gesamt-Container (Mobile unverändert) */}
        <div className="bg-ds-yellow-10 border border-ds-neutral-20 rounded-ds-lg shadow-sm p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-6 pt-8 md:pt-0">
            <div className="flex-1 min-w-0 flex flex-col gap-4 md:gap-6">
              {/* Karte 1: Dein Risiko */}
              <div className="bg-ds-neutral-0 rounded-ds-lg shadow-sm p-5 sm:p-8 border border-ds-neutral-20">
                <div className="flex items-center gap-3 mb-6">
                  <StepBadge number={1} />
                  <h2 className="text-lg font-bold text-ds-neutral-100">
                    Risiko/Ertrag wählen
                  </h2>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-ds-neutral-100 mb-2">Strategie</h3>
                    <div className="relative bg-ds-neutral-10 border border-ds-neutral-20 rounded-ds-16 p-4 sm:p-5 shadow-sm overflow-hidden min-h-[112px]">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-ds-seagreen" />
                      <p className="font-semibold text-ds-neutral-100 truncate pr-1">
                        {selectedStrategy.name}
                      </p>
                      <p className="text-sm text-ds-neutral-70 mt-1 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                        {selectedStrategy.beschreibung}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="py-4 md:py-0">
                      <SliderInput
                        label=""
                        value={strategieIndex}
                        onChange={setStrategieIndex}
                        min={0}
                        max={10}
                        step={1}
                        hideValue
                        snapTickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                      />
                    </div>
                    {/* Slider-Legende: Markierungen bei 0, 5, 10 mit Tooltips */}
                    <div className="mt-3 text-xs">
                      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center text-ds-neutral-100 font-semibold">
                        <span
                          data-tooltip-id="legend-0"
                          className="cursor-help justify-self-start inline-flex items-center justify-center min-w-[44px] min-h-[44px]"
                        >
                          Niedrig
                        </span>
                        <span className="text-ds-neutral-40 px-2">·</span>
                        <span
                          data-tooltip-id="legend-5"
                          className="cursor-help justify-self-center inline-flex items-center justify-center min-w-[44px] min-h-[44px]"
                        >
                          Ausgewogen
                        </span>
                        <span className="text-ds-neutral-40 px-2">·</span>
                        <span
                          data-tooltip-id="legend-10"
                          className="cursor-help justify-self-end inline-flex items-center justify-center min-w-[44px] min-h-[44px]"
                        >
                          Hoch
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center">
                        <span className="h-px bg-ds-neutral-20 w-full" />
                        <span />
                        <span className="h-px bg-ds-neutral-20 w-full" />
                        <span />
                        <span className="h-px bg-ds-neutral-20 w-full" />
                      </div>
                    </div>
                    {([0, 5, 10] as const).map((pos) => (
                      <Tooltip
                        key={pos}
                        id={`legend-${pos}`}
                        content={sliderLegendTooltips[pos] ?? ""}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Karte 2: Sparplan einrichten */}
              <div className="bg-ds-neutral-0 rounded-ds-lg shadow-sm p-5 sm:p-8 border border-ds-neutral-20 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <StepBadge number={2} />
                  <h2 className="text-lg font-bold text-ds-neutral-100">Sparplan konfigurieren</h2>
                </div>

                <div className="space-y-5">
                  {isInvalid && (
                    <ValidationAlert message="Einmalige Einzahlung und monatlicher Sparplan dürfen nicht negativ sein." />
                  )}

                  {/* Desktop: Einmalig + monatlich nebeneinander, Mobile: untereinander */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
                    <div className="min-w-0">
                      <NumberInput
                        label="Einmalige Einzahlung"
                        value={einmalig}
                        onChange={setEinmalig}
                        min={MIN_EINZAHLUNG}
                        max={1000000}
                        step={500}
                        unit="€"
                      />
                    </div>
                    <div className="min-w-0">
                      <NumberInput
                        label="Monatlicher Sparplan"
                        value={monatlich}
                        onChange={setMonatlich}
                        min={MIN_EINZAHLUNG}
                        max={5000}
                        step={25}
                        unit="€"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="py-4 md:py-0">
                        <SliderInput
                          label="Laufzeit"
                          value={laufzeit}
                          onChange={setLaufzeit}
                          min={1}
                          max={50}
                          unit=" Jahre"
                          leftLabel="1 Jahr"
                          rightLabel="50 Jahre"
                          showValueRight
                          valueClassName="text-lg sm:text-xl font-semibold text-ds-orange-60 font-saans tracking-tight"
                          snapTickValues={[
                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-6">
              {/* Desktop: Ergebnis + Chart in einem gemeinsamen Block */}
              <div
                className={`hidden md:flex bg-ds-neutral-0 rounded-ds-lg shadow-sm p-6 sm:p-8 border border-ds-neutral-20 transition-opacity flex-1 flex-col ${
                  isInvalid ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {isInvalid ? (
                  <p className="text-ds-neutral-70 text-sm">
                    Bitte gib gültige Werte (≥ 0 €) bei Einmalzahlung und monatlichem Sparplan ein.
                  </p>
                ) : (
                  <div className="h-full flex flex-col gap-6">
                    <ResultCards
                      gesamtEinzahlungen={gesamtEinzahlungen}
                      ertrag={ertrag}
                      schwankungen={schwankungen}
                      endwert={endwert}
                      laufzeit={laufzeit}
                      twrPa={twrPa}
                      stufe={stufeName}
                    />
                    <div className="h-px bg-ds-neutral-20" />
                    <div className="flex flex-col flex-1 min-h-0">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <h2 className="text-lg font-bold text-ds-neutral-100">Wertentwicklung</h2>
                        <div className="inline-flex rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 p-0.5 gap-2">
                          <button
                            type="button"
                            onClick={() => setChartView("spanne")}
                            className={`px-2.5 py-1.5 rounded-ds-16 text-[11px] font-semibold min-w-[44px] ${
                              chartView === "spanne"
                                ? "bg-ds-neutral-0 text-ds-neutral-100 shadow-sm"
                                : "text-ds-neutral-70 hover:text-ds-neutral-100"
                            }`}
                          >
                            Spanne
                          </button>
                          <button
                            type="button"
                            onClick={() => setChartView("einzahlung_ertrag")}
                            className={`px-2.5 py-1.5 rounded-ds-16 text-[11px] font-semibold min-w-[44px] ${
                              chartView === "einzahlung_ertrag"
                                ? "bg-ds-neutral-0 text-ds-neutral-100 shadow-sm"
                                : "text-ds-neutral-70 hover:text-ds-neutral-100"
                            }`}
                          >
                            Einzahlung + Ertrag
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 min-h-[260px]">
                        <ValueChart data={chartData} view={chartView} fill />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile: Chart bleibt unverändert als eigene Karte */}
              <div
                className={`md:hidden bg-ds-neutral-0 rounded-ds-lg shadow-sm p-6 sm:p-8 border border-ds-neutral-20 transition-opacity ${
                  isInvalid ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {isInvalid ? (
                  <p className="text-ds-neutral-70 text-sm">
                    Chart wird angezeigt, sobald die Eingaben gültig sind.
                  </p>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h2 className="text-lg font-bold text-ds-neutral-100">Wertentwicklung</h2>
                      <div className="inline-flex rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 p-0.5 gap-2">
                        <button
                          type="button"
                          onClick={() => setChartView("spanne")}
                          className={`px-2.5 py-1.5 rounded-ds-16 text-[11px] font-semibold min-w-[44px] ${
                            chartView === "spanne"
                              ? "bg-ds-neutral-0 text-ds-neutral-100 shadow-sm"
                              : "text-ds-neutral-70 hover:text-ds-neutral-100"
                          }`}
                        >
                          Spanne
                        </button>
                        <button
                          type="button"
                          onClick={() => setChartView("einzahlung_ertrag")}
                          className={`px-2.5 py-1.5 rounded-ds-16 text-[11px] font-semibold min-w-[44px] ${
                            chartView === "einzahlung_ertrag"
                              ? "bg-ds-neutral-0 text-ds-neutral-100 shadow-sm"
                              : "text-ds-neutral-70 hover:text-ds-neutral-100"
                          }`}
                        >
                          Einzahlung + Ertrag
                        </button>
                      </div>
                    </div>
                    <ValueChart data={chartData} view={chartView} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
