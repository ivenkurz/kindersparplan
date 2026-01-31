"use client";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface ResultCardsProps {
  gesamtEinzahlungen: number;
  ertrag: number;
  schwankungen: number;
  endwert: number;
  laufzeit: number;
  twrPa: number;
  irrPa: number;
  stufe?: string;
  sticky?: boolean;
}

export default function ResultCards({
  gesamtEinzahlungen,
  ertrag,
  schwankungen,
  endwert,
  laufzeit,
  twrPa,
  irrPa,
  stufe,
  sticky = false,
}: ResultCardsProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  const prozentSteigerung =
    gesamtEinzahlungen > 0
      ? ((endwert - gesamtEinzahlungen) / gesamtEinzahlungen) * 100
      : 0;

  const schwankungenFormatted = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(schwankungen);

  const containerClass = sticky
    ? "fixed top-0 left-0 right-0 z-10 bg-ds-neutral-0 shadow-md rounded-b-[24px] px-4 py-3 md:relative md:top-auto md:left-auto md:right-auto md:z-auto md:shadow-none md:rounded-ds-lg md:bg-transparent"
    : "";

  return (
    <div className={`space-y-4 ${containerClass}`}>
      {sticky && stufe && (
        <p className="text-xs text-ds-neutral-70 font-medium">Stufe: {stufe}</p>
      )}
      {/* Hauptbetrag mit Gesamtrendite */}
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <span className="text-2xl md:text-3xl font-bold text-ds-neutral-100">
          {formatCurrency(endwert)}
        </span>
        <div className="flex items-center gap-2">
          <span
            className={
              prozentSteigerung >= 0
                ? "inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-ds-16 bg-[#008542]/20 text-ds-seagreen"
                : "inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-ds-16 bg-[#8a551d]/20 text-ds-orange-90"
            }
          >
            <svg
              className={`w-4 h-4 md:w-5 md:h-5 ${prozentSteigerung < 0 ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </span>
          <span
            className={`font-semibold text-sm md:text-base ${prozentSteigerung >= 0 ? "text-ds-seagreen" : "text-ds-orange-90"}`}
          >
            {prozentSteigerung >= 0 ? "+" : ""}{prozentSteigerung.toFixed(2)}% Gesamtrendite
          </span>
        </div>
      </div>

      {/* Erwartete jährliche Rendite (TWR) – Haupt-Info; IRR im Tooltip */}
      <div className="flex items-center gap-2 flex-wrap">
        <p
          data-tooltip-id="twr-tooltip"
          className="font-semibold text-ds-neutral-100 text-base md:text-lg cursor-help"
        >
          Erwartete jährliche Rendite: {twrPa >= 0 ? "+" : ""}{twrPa.toFixed(2)}%
        </p>
        <Tooltip id="twr-tooltip" content="Zeitgewichtete Rendite – konsistent zur Strategie" />
        <span
          data-tooltip-id="irr-tooltip"
          className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-ds-neutral-20 text-ds-neutral-70 text-xs font-medium cursor-help hover:bg-ds-orange-30 hover:text-ds-orange-80 transition-colors"
        >
          i
        </span>
        <Tooltip id="irr-tooltip" content={`Effektiv (IRR): ${irrPa >= 0 ? "+" : ""}${irrPa.toFixed(2)}% – variiert durch Sparpläne`} />
      </div>

      {/* Drei Kennzahlen – Ertrag mit Info-Icon & Tooltip */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div>
          <p className="text-xs md:text-sm text-ds-neutral-70 mb-0.5 md:mb-1">
            Gesamteinzahlungen
          </p>
          <p className="text-base md:text-lg font-bold text-ds-neutral-100">
            {formatCurrency(gesamtEinzahlungen)}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-0.5 md:mb-1">
            <p className="text-xs md:text-sm text-ds-neutral-70">Ertrag</p>
            <span
              data-tooltip-id="ertrag-tooltip"
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-ds-neutral-20 text-ds-neutral-70 text-[10px] font-medium cursor-help"
            >
              i
            </span>
            <Tooltip id="ertrag-tooltip" content="Ertrag basierend auf TWR und Sparplan" />
          </div>
          <p className={`text-base md:text-lg font-bold ${ertrag >= 0 ? "text-ds-seagreen" : "text-ds-orange-90"}`}>
            {ertrag >= 0 ? "+" : ""}{formatCurrency(ertrag)}
          </p>
        </div>
        <div>
          <p className="text-xs md:text-sm text-ds-neutral-70 mb-0.5 md:mb-1">
            Schwankungen
          </p>
          <p className="text-base md:text-lg font-bold text-ds-neutral-100">
            ±{schwankungenFormatted}%
          </p>
        </div>
      </div>
    </div>
  );
}
