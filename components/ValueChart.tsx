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

  return (
    <div className="w-full flex flex-col h-[320px] sm:h-[336px] md:h-[320px] lg:h-[340px]">
      {/* Chart: feste Höhe, unabhängig von Legende/Hinweis */}
      <div className="flex-none h-[240px] sm:h-[260px] md:h-[240px] lg:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
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
              tickFormatter={(v) =>
                new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(Number(v))
              }
              tick={{ fill: "#3b403d", fontSize: 12 }}
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
