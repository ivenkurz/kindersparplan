"use client";

import { Icon } from "./Icon";

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

export type PocketVariant = "zins" | "investment";

export type InvestmentIcon = "chart-up" | "building";

export interface PocketCardProps {
  variant: PocketVariant;
  amount: number;
  sublabel: string;
  title: string;
  locked?: boolean;
  investmentIcon?: InvestmentIcon;
}

export function PocketCard({
  variant,
  amount,
  sublabel,
  title,
  locked = false,
  investmentIcon = "chart-up",
}: PocketCardProps) {
  if (variant === "zins") {
    return (
      <div className="rounded-xl border border-ds-neutral-20 bg-ds-neutral-0 p-5 shadow-md hover:shadow-lg transition-shadow font-saans">
        {/* Top section: Icon links, Betrag + ZinsPocket rechts, horizontal */}
        <div className="flex items-start gap-2">
          {/* ZinsPocket-Icon: cream Squircle, dunkles umrandetes Quadrat, dunkles Plus */}
          <div className="w-9 h-9 rounded-xl bg-zins-pocket-cream flex items-center justify-center shrink-0">
            <div className="w-5 h-5 rounded border-2 border-pocket-dark flex items-center justify-center">
              <Icon name="plus" size="sm" className="text-pocket-dark w-2.5 h-2.5" strokeWidth={1.5} />
            </div>
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-lg md:text-xl font-bold text-black leading-tight tracking-tight tabular-nums">{formatCurrency(amount)}</p>
            <p className="text-xs text-ds-neutral-70 mt-0.5 font-normal">{sublabel}</p>
          </div>
        </div>
        {/* Bottom section: Reisen – serif, reduzierter Abstand */}
        <p className="text-xl md:text-2xl font-bold text-black font-serif mt-4">{title}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-ds-neutral-20 bg-ds-neutral-0 p-5 shadow-md hover:shadow-lg transition-shadow flex items-start gap-2 font-saans">
      <div className="w-8 h-8 rounded-full bg-pocket-green flex items-center justify-center shrink-0">
        <Icon
          name={investmentIcon}
          size="sm"
          className="text-ds-neutral-0 w-4 h-4"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-lg md:text-xl font-bold text-black leading-tight tracking-tight tabular-nums">{formatCurrency(amount)}</p>
        <p className="text-xs font-medium text-gray-500 mt-0.5">{sublabel}</p>
        <p className="text-sm font-medium text-black mt-1">{title}</p>
      </div>
      {locked && (
        <Icon name="lock" size="sm" className="text-pocket-gray w-4 h-4 shrink-0" aria-label="Gesperrt" />
      )}
    </div>
  );
}
