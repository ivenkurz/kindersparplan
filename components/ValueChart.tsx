"use client";

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
  return { ticks: ticks.length ? ticks : [0], max: niceMax };
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

export default function ValueChart({ data, view = "spanne" }: ValueChartProps) {
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

  return (
    <div className="w-full flex flex-col h-[320px] sm:h-[336px] md:h-[320px] lg:h-[340px]">
      {/* Chart: feste Höhe, unabhängig von Legende/Hinweis */}
      <div className="flex-none h-[240px] sm:h-[260px] md:h-[240px] lg:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            // Mehr Platz links, damit große €-Ticks nicht abgeschnitten werden
            margin={{ top: 10, right: 10, left: 0, bottom: 22 }}
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
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d4d2" />
            <XAxis
              dataKey="jahr"
              ticks={yearTicks}
              interval={0}
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
              // Werte sollen im Chart beginnen (links bündig mit Jahr 0 / Plot-Start),
              // aber trotzdem nicht geclipped werden -> genügend Achsenbreite reservieren.
              mirror
              width={96}
              tickMargin={10}
              tickFormatter={(v) =>
                new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(Number(v))
              }
              // Links ausgerichtet nach innen (in den Plot hinein)
              tick={{ fill: "#3b403d", fontSize: 12, textAnchor: "start" }}
              tickLine={false}
              axisLine={false}
              label={{
                value: "Euro",
                angle: -90,
                position: "insideLeft",
                fill: "#616a65",
                fontSize: 12,
                fontWeight: 600,
              }}
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
                  activeDot={false}
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
      <div className="flex-none h-[80px] sm:h-[76px] pt-3 border-t border-ds-neutral-10 overflow-hidden">
        {view === "spanne" ? (
          <>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-ds-neutral-90">
              <div className="flex items-center gap-2">
                <span className="w-4 h-[3px] rounded-full bg-ds-seagreen" />
                Erwarteter Verlauf
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#008542]/20 border border-ds-neutral-20" />
                Spanne (95%)
              </div>
            </div>
            <p className="mt-2 text-[11px] text-ds-neutral-70 text-center max-w-md mx-auto overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              Die Spanne zeigt den Bereich, in dem der Ertrag mit hoher Wahrscheinlichkeit liegen wird.
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-ds-neutral-90">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#616a65]/25 border border-ds-neutral-20" />
                Eingezahlt
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#008542]/20 border border-ds-neutral-20" />
                Ertrag
              </div>
            </div>
            {/* Platzhalter, damit die Card-Höhe gleich bleibt */}
            <p className="mt-2 text-[11px] text-ds-neutral-70 text-center max-w-md mx-auto opacity-0">
              Platzhalter
            </p>
          </>
        )}
      </div>
    </div>
  );
}
