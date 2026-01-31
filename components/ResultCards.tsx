"use client";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export interface ResultCardsProps {
  gesamtEinzahlungen: number;
  ertrag: number;
  schwankungen: number;
  endwert: number;
  laufzeit: number;
  // interner Name bleibt "twrPa", Anzeige ist laienfreundlich ("pro Jahr")
  twrPa: number;
  stufe?: string;
  sticky?: boolean;
}

export default function ResultCards(props: ResultCardsProps) {
  const {
    gesamtEinzahlungen,
    ertrag,
    schwankungen,
    endwert,
    laufzeit,
    twrPa,
    sticky = false,
  } = props;
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  const formatPercent = (value: number) =>
    new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
  const renditeColor = isPositive ? "text-ds-seagreen" : "text-ds-orange-90";
  const ertragColor = ertrag >= 0 ? "text-ds-seagreen" : "text-ds-orange-90";
  const renditePrefix = isPositive ? "+" : "";
  const renditeLine = `${renditePrefix}${formatPercent(prozentSteigerung)}% (${formatPercent(
    twrPa
  )}% p.a.)`;

  const spacingClass = sticky ? "space-y-3" : "space-y-4";

  return (
    <div className={spacingClass}>
      <div className="min-w-0">
        <p className="text-xs md:text-sm text-ds-neutral-70 font-semibold mb-2">
          Voraussichtliches Ergebnis nach {laufzeit} Jahren
        </p>
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0 flex items-end gap-3 flex-wrap">
            <p
              className={`font-semibold text-ds-neutral-100 leading-none ${
                sticky ? "text-xl sm:text-2xl md:text-4xl" : "text-3xl md:text-4xl"
              }`}
            >
              {formatCurrency(endwert)}
            </p>
            <p className={`text-base md:text-lg font-semibold ${renditeColor} leading-none`}>
              {renditeLine}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div>
          <p className="text-xs text-ds-neutral-70 font-medium mb-1">Eingezahlt</p>
          <p className="text-base md:text-lg font-semibold text-ds-neutral-100">
            {formatCurrency(gesamtEinzahlungen)}
          </p>
        </div>
        <div>
          <p className="text-xs text-ds-neutral-70 font-medium mb-1">Ertrag</p>
          <p className={`text-base md:text-lg font-semibold ${ertragColor}`}>
            {ertrag >= 0 ? "+" : ""}
            {formatCurrency(ertrag)}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <p className="text-xs text-ds-neutral-70 font-medium">Schwankungen</p>
            <span
              data-tooltip-id="vola-tooltip"
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-ds-neutral-20 text-ds-neutral-70 text-[10px] font-medium cursor-help"
            >
              i
            </span>
            <Tooltip
              id="vola-tooltip"
              content="Volatilität (Schwankungen): So stark kann der Wert typischerweise in einem Jahr hoch und runter gehen. Mehr Risiko = meist mehr Schwankung."
            />
          </div>
          <p className="text-base md:text-lg font-semibold text-ds-neutral-100">
            ±{schwankungenFormatted}%
          </p>
        </div>
      </div>
    </div>
  );
}
