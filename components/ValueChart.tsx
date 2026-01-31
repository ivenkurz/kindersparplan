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
}

interface ValueChartProps {
  data: ChartDataPoint[];
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; payload?: { wert: number; einzahlungen: number } }[];
  label?: number;
}) {
  if (!active || !payload?.length || label == null) return null;

  const point = payload[0]?.payload;
  const wert = point?.wert ?? payload[0]?.value ?? 0;
  const einzahlungen = point?.einzahlungen ?? 0;
  const ertrag = wert - einzahlungen;
  const isPositive = ertrag >= 0;

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <div className="bg-ds-neutral-0 rounded-ds-pill shadow-lg border border-ds-neutral-10 px-4 py-3 min-w-[180px]">
      <p className="text-ds-neutral-100 text-sm mb-1">Jahr {label}</p>
      <p className="text-ds-neutral-100 font-bold text-lg mb-1">
        {formatCurrency(wert)}
      </p>
      <p
        className={`font-medium text-sm ${
          isPositive ? "text-ds-seagreen" : "text-ds-orange-90"
        }`}
      >
        {isPositive ? "+" : ""}
        {formatCurrency(ertrag)} Ertrag
      </p>
    </div>
  );
}

export default function ValueChart({ data }: ValueChartProps) {
  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorWertPositive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#008542" />
              <stop offset="100%" stopColor="#008542" stopOpacity={0.1} />
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
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="wert"
            stroke="#008542"
            strokeWidth={3}
            fill="url(#colorWertPositive)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-ds-neutral-50 text-xs mt-4">Risikohinweis</p>
    </div>
  );
}
