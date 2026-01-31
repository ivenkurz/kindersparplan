"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

interface ChartDataPoint {
  jahr: number;
  wert: number;
  einzahlungen: number;
}

interface ValueChartProps {
  data: ChartDataPoint[];
  selectedYear?: number;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; payload?: { wert: number; einzahlungen: number; ertrag: number } }[];
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
    <div className="px-1 py-0.5">
      <p className="text-ds-neutral-100 text-sm">Jahr {label}</p>
      <p className="text-ds-neutral-100 font-semibold text-base">
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

export default function ValueChart({ data, selectedYear }: ValueChartProps) {
  const stackedData = data.map((d) => {
    const eingezahlt = d.einzahlungen ?? 0;
    const ertrag = (d.wert ?? 0) - eingezahlt;
    return {
      ...d,
      eingezahlt,
      ertrag,
    };
  });

  const selectedPoint =
    selectedYear != null ? stackedData.find((d) => d.jahr === selectedYear) : undefined;

  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={stackedData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorEinzahlung" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#616a65" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#616a65" stopOpacity={0.08} />
            </linearGradient>
            <linearGradient id="colorErtrag" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#008542" stopOpacity={0.55} />
              <stop offset="100%" stopColor="#008542" stopOpacity={0.12} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1d4d2" />
          <XAxis
            dataKey="jahr"
            tick={{ fill: "#616a65", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#d1d4d2" }}
          />
          <YAxis
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            tick={{ fill: "#616a65", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#fd8f18", strokeWidth: 1, strokeDasharray: "4 4" }}
            wrapperStyle={{ outline: "none" }}
          />
          <Area
            type="monotone"
            dataKey="eingezahlt"
            stackId="a"
            stroke="#616a65"
            strokeWidth={2}
            fill="url(#colorEinzahlung)"
            activeDot={{ r: 5, stroke: "#fd8f18", strokeWidth: 2, fill: "#fff" }}
          />
          <Area
            type="monotone"
            dataKey="ertrag"
            stackId="a"
            stroke="#008542"
            strokeWidth={3}
            fill="url(#colorErtrag)"
            activeDot={{ r: 6, stroke: "#fd8f18", strokeWidth: 2, fill: "#fff" }}
          />

          {selectedPoint && (
            <ReferenceDot
              x={selectedPoint.jahr}
              y={selectedPoint.wert}
              r={7}
              fill="#fd8f18"
              stroke="#022011"
              strokeWidth={2}
              label={{
                value: `${selectedPoint.jahr} Jahre`,
                position: "top",
                fill: "#022011",
                fontSize: 12,
                fontWeight: 700,
              }}
              isFront
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-ds-neutral-50 text-xs mt-4">
        Risikohinweis: Der Verlauf kann zwischendurch deutlich fallen oder steigen. Je höher das
        gewählte Risiko, desto stärker sind diese Schwankungen typischerweise.
      </p>
    </div>
  );
}
