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
  const einzahlungenColor = "text-ds-neutral-100";
  const renditePrefix = isPositive ? "+" : "";
  const renditeLine = `${renditePrefix}${formatPercent(prozentSteigerung)}% (${formatPercent(
    twrPa
  )}% p.a.)`;

  const wrapperClass = sticky ? "space-y-2" : "space-y-3";

  return (
    <div className={wrapperClass}>
      <div>
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-ds-neutral-70 font-semibold">
            Nach {laufzeit} Jahren
          </p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-ds-pill bg-ds-seagreen/15 text-ds-seagreen text-xs font-semibold whitespace-nowrap">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 19V5" />
              <path d="M4 19h16" />
              <path d="M7 14l4-4 3 3 5-6" />
            </svg>
            Prognose
          </span>
        </div>

        <div className="mt-2">
          <p
            className={`font-semibold text-ds-darkgreen leading-none ${
              sticky ? "text-3xl" : "text-4xl"
            } tabular-nums whitespace-nowrap`}
          >
            {formatCurrency(endwert)}
          </p>

          <div className="mt-2 flex items-center gap-3">
            {isPositive && (
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-ds-16 bg-ds-seagreen/15 text-ds-seagreen shrink-0">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 6l8 14H4l8-14z" />
                </svg>
              </span>
            )}
            <p className={`text-lg font-semibold ${renditeColor} tabular-nums whitespace-nowrap`}>
              {renditeLine}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-ds-neutral-10 pt-3">
          <div className="grid grid-cols-3 text-left">
            <div className="pr-3">
              <p className="text-[11px] tracking-widest text-ds-neutral-70 font-semibold">
                EINZAHLUNG
              </p>
              <p className={`mt-1 text-lg font-semibold ${einzahlungenColor} tabular-nums whitespace-nowrap`}>
                {formatCurrency(gesamtEinzahlungen)}
              </p>
            </div>

            <div className="px-3 border-l border-ds-neutral-10">
              <p className="text-[11px] tracking-widest text-ds-neutral-70 font-semibold">
                ERTRAG
              </p>
              <p className={`mt-1 text-lg font-semibold ${ertragColor} tabular-nums whitespace-nowrap`}>
                {ertrag >= 0 ? "+" : ""}
                {formatCurrency(ertrag)}
              </p>
            </div>

            <div className="pl-3 border-l border-ds-neutral-10">
              <p className="text-[11px] tracking-widest text-ds-neutral-70 font-semibold">
                SCHWANKUNG
              </p>
              <p className="mt-1 text-lg font-semibold text-ds-neutral-100 tabular-nums whitespace-nowrap">
                ±{schwankungenFormatted}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {!sticky && (
        <p className="text-xs text-ds-neutral-50 italic text-center">
          Historische Werte – keine Garantie für die Zukunft.
        </p>
      )}
    </div>
  );
}
