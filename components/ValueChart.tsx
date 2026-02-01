"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartDataPoint {
  jahr: number;
  wert: number;
  einzahlungen: number;
  confLow?: number;
  confRange?: number;
}

interface ValueChartProps {
  data: ChartDataPoint[];
  view?: "spanne" | "einzahlung_ertrag";
  fill?: boolean;
}

const RISK_LINK_URL = "https://www.evergreen.de/download/fonds";

function YAxisTick({
  x,
  y,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value?: number | string };
}) {
  const value = payload?.value ?? "";
  const formatted = (() => {
    // Recharts liefert hier oft rohe Zahlen ohne Formatierung → Tausenderpunkt erzwingen
    if (typeof value === "string" && value.includes(".")) return value;
    const asNum = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(asNum)) return String(value);
    return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(asNum);
  })();
  return (
    <text
      x={x}
      y={y}
      dx={10}
      dy={4}
      textAnchor="start"
      fill="#3b403d"
      fontSize={12}
      // "Halo": maskiert Grid-Linien hinter den Labels (robust)
      stroke="#fff"
      strokeWidth={6}
      paintOrder="stroke"
    >
      {formatted}
    </text>
  );
}

function RiskHinweis() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const content = (
    <div className="text-xs text-ds-neutral-90 leading-relaxed">
      <p>
        Die dargestellte Wertentwicklung bezieht sich auf die gewählte Beispielstrategie.
        Grundlage der Entwicklung sind die Evergreen Sustainable World Fonds. Vergangene
        Wertentwicklungen, einschließlich simulierten oder prognostizierten Renditen, sind
        kein verlässlicher Indikator für die Zukunft. Der Wert einer Anlage kann schwanken
        und Anlegende können Verluste bis hin zum Totalverlust erleiden. Diese Darstellung
        stellt keine Anlageberatung oder Kaufempfehlung dar. Sie dient ausschließlich der
        Information und berücksichtigt keine individuellen Anlageziele oder finanziellen
        Verhältnisse. Vor einer Investition sollten die gesetzlichen Verkaufsunterlagen auf{" "}
        <a
          href={RISK_LINK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ds-orange-60 underline underline-offset-2"
        >
          {RISK_LINK_URL}
        </a>{" "}
        sorgfältig gelesen werden. Die Evergreen GmbH ist ein von der BaFin zugelassenes
        Wertpapierinstitut gemäß § 15 WpIG.
      </p>
    </div>
  );

  const trigger = (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 text-xs text-ds-neutral-70 hover:text-ds-neutral-100 transition-colors"
      onClick={() => {
        if (isMobile) setOpen(true);
      }}
      onFocus={() => {
        if (!isMobile) setOpen(true);
      }}
      onBlur={() => {
        if (!isMobile) setOpen(false);
      }}
      aria-haspopup="dialog"
      aria-expanded={open}
    >
      <span className="underline underline-offset-2">Risikohinweis</span>
      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-ds-neutral-20 text-[10px] leading-none">
        i
      </span>
    </button>
  );

  if (isMobile) {
    return (
      <>
        {trigger}
        {open && (
          <div
            className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Risikohinweis"
          >
            <div
              className="w-full max-w-xl bg-ds-neutral-0 rounded-ds-lg border border-ds-neutral-20 shadow-sm p-4 sm:p-5 max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-sm font-semibold text-ds-neutral-100">Risikohinweis</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-ds-neutral-20 text-ds-neutral-100"
                  aria-label="Schließen"
                >
                  ×
                </button>
              </div>
              {content}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}
      {open && (
        <div className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 w-[360px] max-w-[85vw] bg-ds-neutral-0 border border-ds-neutral-20 rounded-ds-16 shadow-sm p-3">
          {content}
        </div>
      )}
    </div>
  );
}

function useIsMobile(maxWidthPx = 639) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${maxWidthPx}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    // Safari fallback
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [maxWidthPx]);

  return isMobile;
}

function getNiceYearStep(maxYear: number) {
  if (!Number.isFinite(maxYear) || maxYear <= 0) return 1;
  if (maxYear <= 10) return 1;

  // Ziel: gleichmäßige, gut lesbare Ticks (ca. 5–7 Stück)
  const desiredTicks = 6;
  const rough = maxYear / desiredTicks;

  const pow10 = Math.pow(10, Math.floor(Math.log10(rough)));
  const fraction = rough / pow10;

  let niceFraction: number;
  if (fraction <= 1) niceFraction = 1;
  else if (fraction <= 2) niceFraction = 2;
  else if (fraction <= 5) niceFraction = 5;
  else niceFraction = 10;

  const step = niceFraction * pow10;
  return Math.max(1, Math.round(step));
}

function buildYearTicks(maxYear: number) {
  const step = getNiceYearStep(maxYear);
  const ticks: number[] = [];
  for (let t = 0; t <= maxYear; t += step) ticks.push(t);
  return ticks.length ? ticks : [0];
}

function getNiceEuroStep(maxValue: number) {
  if (!Number.isFinite(maxValue) || maxValue <= 0) return 10;

  // Ziel: gleichmäßige Schritte mit klassischen Vielfachen:
  // 5, 10, 50, 100, 500, 1000, ...
  const desiredTicks = 6;
  const rough = maxValue / desiredTicks;

  // Kandidaten: 5×10^k und 10×10^k
  const candidates: number[] = [];
  for (let k = -2; k <= 10; k++) {
    const p = Math.pow(10, k);
    candidates.push(5 * p, 10 * p);
  }
  candidates.sort((a, b) => a - b);

  const step = candidates.find((c) => c >= rough) ?? candidates[candidates.length - 1]!;
  return Math.max(5, Math.round(step));
}

function buildEuroTicks(maxValue: number) {
  const step = getNiceEuroStep(maxValue);
  const niceMax = Math.ceil(maxValue / step) * step;
  const ticks: number[] = [];
  for (let t = 0; t <= niceMax; t += step) ticks.push(t);
  // "0" auf der Y-Achse weglassen (wir starten trotzdem bei 0 im Domain)
  const ticksWithoutZero = ticks.filter((t) => t !== 0);
  return { ticks: ticksWithoutZero.length ? ticksWithoutZero : [step], max: niceMax };
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {
    value: number;
    payload?: {
      wert: number;
      einzahlungen: number;
      ertrag: number;
    };
  }[];
  label?: number;
}) {
  if (!active || !payload?.length || label == null) return null;

  const point = payload[0]?.payload;
  const wert = point?.wert ?? 0;
  const einzahlungen = point?.einzahlungen ?? 0;
  const ertrag = point?.ertrag ?? 0;
  const isPositive = ertrag >= 0;

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <div className="bg-ds-neutral-0 border border-ds-neutral-10 rounded-ds-16 shadow-sm px-3 py-2">
      <p className="text-ds-neutral-100 text-sm font-semibold">Jahr {label}</p>
      <p className="text-ds-neutral-100 font-semibold text-base leading-tight">
        {formatCurrency(wert)}
      </p>
      <p className="text-ds-neutral-70 text-xs">
        Eingezahlt: {formatCurrency(einzahlungen)}
      </p>
      <p
        className={`font-medium text-xs ${
          isPositive ? "text-ds-seagreen" : "text-ds-orange-90"
        }`}
      >
        {isPositive ? "+" : ""}
        {formatCurrency(ertrag)} Ertrag
      </p>
    </div>
  );
}

export default function ValueChart({ data, view = "spanne", fill = false }: ValueChartProps) {
  const isMobile = useIsMobile();
  const chartData = data.map((d) => {
    const eingezahlt = d.einzahlungen ?? 0;
    const ertrag = (d.wert ?? 0) - eingezahlt;
    return {
      ...d,
      eingezahlt,
      ertrag,
      confLow: typeof d.confLow === "number" ? d.confLow : undefined,
      confRange: typeof d.confRange === "number" ? d.confRange : undefined,
    };
  });
  const maxYear = Math.max(0, ...chartData.map((d) => d.jahr));
  const yearTicks = buildYearTicks(maxYear);
  const maxY = Math.max(
    0,
    ...chartData.map((d) =>
      Math.max(
        d.wert ?? 0,
        typeof d.confLow === "number" && typeof d.confRange === "number"
          ? d.confLow + d.confRange
          : 0
      )
    )
  );
  const { ticks: euroTicks, max: euroMax } = buildEuroTicks(maxY);

  const formatNumber = useMemo(
    () => new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }),
    []
  );
  const yTickFormatter = (v: number) => formatNumber.format(Number(v));
  const yAxisWidth = isMobile ? 72 : 88;

  const outerClass = fill
    ? "w-full flex flex-col h-full"
    : "w-full flex flex-col h-[300px] sm:h-[312px] md:h-[300px] lg:h-[320px]";

  return (
    <div className={outerClass}>
      {/* Chart: feste Höhe, unabhängig von Legende/Hinweis */}
      <div
        className={
          fill
            ? "flex-1 min-h-[220px]"
            : "flex-none h-[240px] sm:h-[260px] md:h-[240px] lg:h-[260px]"
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            // Mobile: Achse kompakter, mehr Breite für den Plot
            margin={{
              top: 10,
              right: isMobile ? 8 : 10,
              left: isMobile ? 8 : 8,
              bottom: isMobile ? 18 : 22,
            }}
          >
            <defs>
              {/* Spanne (95%) */}
              <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#008542" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#008542" stopOpacity={0.08} />
              </linearGradient>
              {/* Einzahlung + Ertrag */}
              <linearGradient id="colorEingezahlt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#616a65" stopOpacity={0.30} />
                <stop offset="100%" stopColor="#616a65" stopOpacity={0.08} />
              </linearGradient>
              <linearGradient id="colorErtrag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#008542" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#008542" stopOpacity={0.12} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d4d2" vertical={false} />
            <XAxis
              dataKey="jahr"
              ticks={yearTicks}
              interval={0}
              padding={{ left: isMobile ? 10 : 0, right: isMobile ? 4 : 0 }}
              tick={{ fill: "#022011", fontSize: 14, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: "#d1d4d2" }}
              label={{
                value: "Jahre",
                position: "insideBottomRight",
                offset: -4,
                fill: "#616a65",
                fontSize: 12,
                fontWeight: 600,
              }}
            />
            <YAxis
              domain={[0, euroMax]}
              ticks={euroTicks}
              interval={0}
              // Chart soll "unter" die Werte gehen: Labels innenliegend (über dem Plot)
              mirror
              width={12}
              tickMargin={0}
              tickFormatter={yTickFormatter}
              tick={<YAxisTick />}
              tickLine={false}
              axisLine={false}
              label={undefined}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#fd8f18", strokeWidth: 1, strokeDasharray: "4 4" }}
              wrapperStyle={{ outline: "none" }}
            />

            {view === "spanne" ? (
              <>
                {/* Konfidenzband (95%) um den erwarteten Gesamtwert */}
                <Area
                  type="monotone"
                  dataKey="confLow"
                  stackId="conf"
                  stroke="none"
                  fill="transparent"
                  isAnimationActive={false}
                  legendType="none"
                  activeDot={false}
                />
                <Area
                  type="monotone"
                  dataKey="confRange"
                  stackId="conf"
                  stroke="none"
                  fill="url(#colorConf)"
                  fillOpacity={0.9}
                  isAnimationActive={false}
                  legendType="none"
                  activeDot={false}
                />

                {/* Mittlerer Verlauf (prominent) */}
                <Area
                  type="monotone"
                  dataKey="wert"
                  stroke="#008542"
                  strokeWidth={3}
                  fill="transparent"
                  isAnimationActive={false}
                  animationDuration={0}
                  activeDot={{ r: 6, stroke: "#008542", strokeWidth: 2, fill: "#fff" }}
                />
              </>
            ) : (
              <>
                {/* Einzahlung + Ertrag (gestapelt) */}
                <Area
                  type="monotone"
                  dataKey="eingezahlt"
                  stackId="a"
                  stroke="#616a65"
                  strokeWidth={2}
                  fill="url(#colorEingezahlt)"
                  isAnimationActive={false}
                  activeDot={{ r: 5, stroke: "#616a65", strokeWidth: 2, fill: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="ertrag"
                  stackId="a"
                  stroke="#008542"
                  strokeWidth={3}
                  fill="url(#colorErtrag)"
                  isAnimationActive={false}
                  activeDot={{ r: 6, stroke: "#008542", strokeWidth: 2, fill: "#fff" }}
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legende + Erklärung: fester Block, damit Card-Höhe konstant bleibt */}
      <div
        className={
          fill
            ? "flex-none pt-2 overflow-visible"
            : "flex-none h-[76px] sm:h-[68px] pt-2 overflow-visible"
        }
      >
        {view === "spanne" ? (
          <>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-ds-neutral-90">
              <div className="flex items-center gap-2">
                <span className="w-4 h-[3px] rounded-full bg-ds-seagreen" />
                Erwarteter Gesamtwert
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#008542]/20 border border-ds-neutral-20" />
                Spanne (95%)
              </div>
            </div>
            <p className="mt-1 text-[10px] text-ds-neutral-70 text-center max-w-md mx-auto overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              Die Spanne zeigt den Bereich, in dem der Ertrag mit hoher Wahrscheinlichkeit liegen wird.
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-ds-neutral-90">
              <div className="flex items-center gap-2">
                <span className="w-4 h-[3px] rounded-full bg-[#008542]" />
                Erwarteter Gesamtwert
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-[3px] rounded-full bg-[#616a65]" />
                Einzahlungen
              </div>
            </div>
            {/* Platzhalter, damit die Card-Höhe gleich bleibt */}
            <p className="mt-1 text-[10px] text-ds-neutral-70 text-center max-w-md mx-auto opacity-0">
              Platzhalter
            </p>
          </>
        )}
        <div className="mt-1 flex items-center justify-center">
          <RiskHinweis />
        </div>
      </div>
    </div>
  );
}
