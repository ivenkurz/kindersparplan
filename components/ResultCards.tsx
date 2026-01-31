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

  const isPositive = prozentSteigerung >= 0;
  const renditeColor = isPositive ? "text-ds-seagreen" : "text-ds-crimson";
  const ertragColor = ertrag >= 0 ? "text-ds-seagreen" : "text-ds-crimson";

  const containerClass = sticky
    ? "fixed top-0 left-0 right-0 z-10 w-full bg-ds-neutral-0 shadow-md rounded-b-[24px] px-4 py-4 md:relative md:top-auto md:left-auto md:right-auto md:z-auto md:w-auto md:shadow-none md:rounded-ds-lg md:bg-transparent"
    : "";

  return (
    <div className={`space-y-4 ${containerClass}`}>
      {sticky && stufe && (
        <p className="text-xs text-ds-neutral-70 font-semibold">Stufe: {stufe}</p>
      )}
      {/* Endwert – große Fonts, ds-neutral-100, Saans SemiBold */}
      <div>
        <p className="text-xs md:text-sm text-ds-neutral-70 mb-0.5 font-medium">
          Voraussichtlicher Endwert
        </p>
        <p className="text-3xl md:text-4xl font-semibold text-ds-neutral-100">
          {formatCurrency(endwert)}
        </p>
      </div>

      {/* Gesamtrendite + p.a. nebeneinander – grün/rot für +/– */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`text-lg md:text-xl font-semibold ${renditeColor}`}
        >
          {isPositive ? "+" : ""}{prozentSteigerung.toFixed(2)}% Gesamtrendite
        </span>
        <span
          data-tooltip-id="pa-tooltip"
          className={`text-lg md:text-xl font-semibold ${renditeColor} cursor-help`}
        >
          + {twrPa.toFixed(2)}% p.a.
        </span>
        <Tooltip id="pa-tooltip" content="Erwartete jährliche Rendite" />
        <span
          data-tooltip-id="irr-tooltip"
          className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-ds-neutral-20 text-ds-neutral-70 text-xs font-medium cursor-help hover:bg-ds-orange-30 hover:text-ds-orange-80 transition-colors"
        >
          i
        </span>
        <Tooltip id="irr-tooltip" content={`Effektiv (IRR): ${irrPa >= 0 ? "+" : ""}${irrPa.toFixed(2)}% – variiert durch Sparpläne`} />
      </div>

      {/* Ertrag & Schwankungen – große Fonts, Tooltips */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <p className="text-xs md:text-sm text-ds-neutral-70 font-medium">Ertrag</p>
            <span
              data-tooltip-id="ertrag-tooltip"
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-ds-neutral-20 text-ds-neutral-70 text-[10px] font-medium cursor-help"
            >
              i
            </span>
            <Tooltip id="ertrag-tooltip" content="Ertrag = Endwert minus Einzahlungen" />
          </div>
          <p className={`text-xl md:text-2xl font-semibold ${ertragColor}`}>
            {ertrag >= 0 ? "+" : ""}{formatCurrency(ertrag)}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <p className="text-xs md:text-sm text-ds-neutral-70 font-medium">Schwankungen</p>
            <span
              data-tooltip-id="schwankungen-tooltip"
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-ds-neutral-20 text-ds-neutral-70 text-[10px] font-medium cursor-help"
            >
              i
            </span>
            <Tooltip id="schwankungen-tooltip" content="Typische jährliche Schwankungsbreite der Strategie" />
          </div>
          <p className="text-xl md:text-2xl font-semibold text-ds-neutral-100">
            ±{schwankungenFormatted}%
          </p>
        </div>
      </div>
    </div>
  );
}
