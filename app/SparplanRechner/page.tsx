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
import { calculateIRR } from "@/lib/irr";

const ValueChart = dynamic(() => import("@/components/ValueChart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] flex items-center justify-center text-ds-neutral-70">
      Chart wird geladen…
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

function CardBadge({ number }: { number: number }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-ds-orange-60 text-white font-bold text-sm shrink-0">
      {number}
    </span>
  );
}

export default function SparplanRechnerPage() {
  const [einmalig, setEinmalig] = useState(1000);
  const [monatlich, setMonatlich] = useState(100);
  const [laufzeit, setLaufzeit] = useState(42);
  const [strategieIndex, setStrategieIndex] = useState(5); // 0–10

  const selectedStrategy = strategies[strategieIndex];
  const rendite = selectedStrategy.return;
  const schwankungenApi = selectedStrategy.volatility * 100;
  const isInvalid = einmalig < MIN_EINZAHLUNG || monatlich < MIN_EINZAHLUNG;

  const stufeName =
    STUFE_NAMES[strategieIndex] ??
    (strategieIndex <= 2 ? "Niedrig" : strategieIndex <= 6 ? "Ausgewogen" : "Hoch");

  const { chartData, gesamtEinzahlungen, ertrag, endwert, schwankungen, twrPa, irrPa } =
    useMemo(() => {
      if (isInvalid) {
        return {
          chartData: [] as { jahr: number; wert: number; einzahlungen: number }[],
          gesamtEinzahlungen: 0,
          ertrag: 0,
          endwert: 0,
          schwankungen: 0,
          twrPa: 0,
          irrPa: 0,
        };
      }

      const data: { jahr: number; wert: number; einzahlungen: number }[] = [];
      let wert = einmalig;
      const monatlicheRendite = Math.pow(1 + rendite, 1 / 12) - 1;

      for (let jahr = 1; jahr <= laufzeit; jahr++) {
        for (let monat = 0; monat < 12; monat++) {
          wert = (wert + monatlich) * (1 + monatlicheRendite);
        }
        data.push({
          jahr,
          wert: Math.round(wert),
          einzahlungen: einmalig + monatlich * 12 * jahr,
        });
      }

      const gesamtEinzahlungen = einmalig + monatlich * 12 * laufzeit;
      const endwertRounded = Math.round(wert);
      const ertrag = Math.round(wert - gesamtEinzahlungen);

      const twrPa =
        laufzeit > 0
          ? Math.max(0, Math.pow(1 + rendite, 1 / laufzeit) - 1) * 100
          : Math.max(0, rendite) * 100;

      const irrPa = calculateIRR(einmalig, monatlich, laufzeit, endwertRounded) * 100;

      return {
        chartData: data,
        gesamtEinzahlungen,
        ertrag,
        endwert: endwertRounded,
        schwankungen: Math.round(schwankungenApi * 10) / 10,
        twrPa,
        irrPa,
      };
    }, [einmalig, monatlich, laufzeit, isInvalid, rendite, schwankungenApi]);

  return (
    <main className="min-h-screen bg-ds-neutral-0 font-saans">
      {/* Sticky Ergebnis oben – mobile-first, full-width (nur Mobile) */}
      {!isInvalid && (
        <div className="md:hidden w-full">
          <ResultCards
            gesamtEinzahlungen={gesamtEinzahlungen}
            ertrag={ertrag}
            schwankungen={schwankungen}
            endwert={endwert}
            laufzeit={laufzeit}
            twrPa={twrPa}
            irrPa={irrPa}
            stufe={stufeName}
            sticky
          />
        </div>
      )}
      <div
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10 ${
          !isInvalid ? "pt-40 md:pt-8" : "pt-8"
        }`}
      >
        <header className="mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ds-neutral-100 hover:text-ds-orange-60 font-semibold mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </Link>
        </header>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 min-w-0 space-y-6">
            {/* Karte 1: Dein Risiko */}
            <div className="bg-ds-yellow-10 rounded-ds-lg shadow-lg p-6 sm:p-8 border border-ds-neutral-10">
              <div className="flex items-center gap-3 mb-6">
                <CardBadge number={1} />
                <h2 className="text-lg font-bold text-ds-neutral-100">
                  Strategie & Risiko wählen
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-ds-neutral-100 mb-2">Strategie</h3>
                  <div className="flex items-start gap-2">
                    <span
                      data-tooltip-id="stufe-tooltip"
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-ds-neutral-20 text-ds-neutral-70 text-xs font-medium shrink-0 mt-0.5 cursor-help hover:bg-ds-orange-30 hover:text-ds-orange-80 transition-colors"
                    >
                      i
                    </span>
                    <Tooltip id="stufe-tooltip" content={selectedStrategy.beschreibung} />
                    <div>
                      <p className="font-semibold text-ds-neutral-100">{selectedStrategy.name}</p>
                      <p className="text-sm text-ds-neutral-70">{selectedStrategy.beschreibung}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-sm font-medium text-ds-neutral-100">Dein Risiko</h3>
                    <span
                      data-tooltip-id="risiko-tooltip"
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-ds-orange-30 text-ds-orange-80 text-xs font-semibold shrink-0 cursor-help hover:bg-ds-orange-60 hover:text-white transition-colors"
                    >
                      i
                    </span>
                    <Tooltip id="risiko-tooltip" content={selectedStrategy.beschreibung} />
                  </div>
                  <SliderInput
                    label=""
                    value={strategieIndex}
                    onChange={setStrategieIndex}
                    min={0}
                    max={10}
                    step={1}
                    formatValue={() => selectedStrategy.name}
                    leftLabel="Niedrig"
                    rightLabel="Hoch"
                  />
                  {/* Slider-Legende: Markierungen bei 0, 5, 10 mit Tooltips */}
                  <div className="flex justify-between mt-2 text-xs">
                    {([0, 5, 10] as const).map((pos) => (
                      <span
                        key={pos}
                        data-tooltip-id={`legend-${pos}`}
                        className={`cursor-help font-medium ${
                          strategieIndex === pos ? "text-ds-orange-60" : "text-ds-neutral-70"
                        }`}
                      >
                        {STUFE_NAMES[pos]}
                      </span>
                    ))}
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
            <div className="bg-ds-yellow-10 rounded-ds-lg shadow-lg p-6 sm:p-8 border border-ds-neutral-10">
              <div className="flex items-center gap-3 mb-6">
                <CardBadge number={2} />
                <h2 className="text-lg font-bold text-ds-neutral-100">Sparplan einrichten</h2>
              </div>

              <div className="space-y-5">
                {isInvalid && (
                  <ValidationAlert message="Einmalige Einzahlung und monatlicher Sparplan dürfen nicht negativ sein." />
                )}
                <NumberInput
                  label="Einmalige Einzahlung"
                  value={einmalig}
                  onChange={setEinmalig}
                  min={MIN_EINZAHLUNG}
                  max={1000000}
                  step={500}
                  unit="€"
                />
                <NumberInput
                  label="Monatlicher Sparplan"
                  value={monatlich}
                  onChange={setMonatlich}
                  min={MIN_EINZAHLUNG}
                  max={5000}
                  step={25}
                  unit="€"
                />
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
                />
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-6">
            {/* Desktop: Ergebnis-Karte (Mobile: sticky oben) */}
            <div
              className={`hidden md:block bg-ds-yellow-10 rounded-ds-lg shadow-lg p-6 sm:p-8 border border-ds-neutral-10 transition-opacity ${
                isInvalid ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <h2 className="text-lg font-bold text-ds-neutral-100 mb-6">
                Nach {laufzeit} Jahren hast du voraussichtlich
              </h2>
              {isInvalid ? (
                <p className="text-ds-neutral-70 text-sm">
                  Bitte gib gültige Werte (≥ 0 €) bei Einmalzahlung und monatlichem Sparplan ein.
                </p>
              ) : (
                <ResultCards
                  gesamtEinzahlungen={gesamtEinzahlungen}
                  ertrag={ertrag}
                  schwankungen={schwankungen}
                  endwert={endwert}
                  laufzeit={laufzeit}
                  twrPa={twrPa}
                  irrPa={irrPa}
                  stufe={stufeName}
                />
              )}
            </div>

            {/* Wertentwicklung – Chart zoombar (overflow-x auf Mobile) */}
            <div
              className={`bg-ds-yellow-10 rounded-ds-lg shadow-lg p-6 sm:p-8 border border-ds-neutral-10 transition-opacity ${
                isInvalid ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <h2 className="text-lg font-bold text-ds-neutral-100 mb-6">Wertentwicklung</h2>
              {isInvalid ? (
                <p className="text-ds-neutral-70 text-sm">
                  Chart wird angezeigt, sobald die Eingaben gültig sind.
                </p>
              ) : (
                <div className="overflow-x-auto -mx-2 px-2 md:mx-0 md:px-0">
                  <div className="min-w-[400px] md:min-w-0">
                    <ValueChart data={chartData} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
