"use client";

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
  const einzahlungenColor = "text-ds-neutral-70"; // wie Chart-Linie für Einzahlungen
  const renditePrefix = isPositive ? "+" : "";
  const renditeLine = `${renditePrefix}${formatPercent(prozentSteigerung)}% (${formatPercent(
    twrPa
  )}% p.a.)`;

  const spacingClass = sticky ? "space-y-2" : "space-y-4";

  return (
    <div className={spacingClass}>
      <div className="min-w-0">
        <p className="text-xs md:text-sm text-ds-neutral-70 font-semibold mb-2">
          Voraussichtliches Ergebnis nach {laufzeit} Jahren
        </p>
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0 flex items-end gap-3 flex-nowrap">
            <p
              className={`font-semibold text-ds-neutral-100 leading-none ${
                sticky ? "text-xl sm:text-2xl md:text-4xl" : "text-3xl md:text-4xl"
              } tabular-nums whitespace-nowrap`}
            >
              {formatCurrency(endwert)}
            </p>
            <p
              className={`text-base md:text-lg font-semibold ${renditeColor} leading-none tabular-nums whitespace-nowrap min-w-[170px] text-right`}
            >
              {renditeLine}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-4">
        <div>
          <p className="text-xs text-ds-neutral-70 font-medium mb-1">Einzahlungen</p>
          <p className={`text-lg md:text-lg font-semibold ${einzahlungenColor} tabular-nums whitespace-nowrap`}>
            {formatCurrency(gesamtEinzahlungen)}
          </p>
        </div>
        <div>
          <p className="text-xs text-ds-neutral-70 font-medium mb-1">Gesamtertrag</p>
          <p className={`text-lg md:text-lg font-semibold ${ertragColor} tabular-nums whitespace-nowrap`}>
            {ertrag >= 0 ? "+" : ""}
            {formatCurrency(ertrag)}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <p className="text-xs text-ds-neutral-70 font-medium">Schwankungen</p>
          </div>
          <p className="text-lg md:text-lg font-semibold text-ds-neutral-100 tabular-nums whitespace-nowrap">
            ±{schwankungenFormatted}%
          </p>
        </div>
      </div>
    </div>
  );
}
