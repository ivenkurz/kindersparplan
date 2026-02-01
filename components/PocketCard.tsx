"use client";

import { Icon } from "./Icon";

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(v);

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
      <div className="rounded-ds-lg border border-ds-neutral-20 bg-ds-neutral-0 p-4 shadow-md hover:shadow-lg transition-shadow font-saans">
        {/* Top section: Icon links, Betrag + ZinsPocket rechts, horizontal */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg bg-zins-pocket-bg flex items-center justify-center shrink-0 border border-white/80">
            <div className="w-7 h-7 rounded bg-pocket-dark flex items-center justify-center">
              <Icon name="plus" size="sm" className="text-ds-neutral-0" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-2xl md:text-3xl font-bold text-black leading-tight tracking-tight tabular-nums">{formatCurrency(amount)}</p>
            <p className="text-sm text-ds-neutral-70 mt-0.5 font-normal">{sublabel}</p>
          </div>
        </div>
        {/* Bottom section: Reisen – sehr groß, serif, deutlicher Abstand */}
        <p className="text-3xl md:text-4xl font-bold text-black font-serif mt-6">{title}</p>
      </div>
    );
  }

  return (
    <div className="rounded-ds-lg border border-ds-neutral-20 bg-ds-neutral-0 p-4 shadow-md hover:shadow-lg transition-shadow flex items-start gap-3 font-saans">
      <div className="w-10 h-10 rounded-full bg-pocket-green flex items-center justify-center shrink-0">
        <Icon
          name={investmentIcon}
          size="md"
          className="text-ds-neutral-0"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl md:text-3xl font-bold text-black leading-tight tracking-tight tabular-nums">{formatCurrency(amount)}</p>
        <p className="text-sm font-medium text-gray-500 mt-0.5">{sublabel}</p>
        <p className="text-base font-medium text-black mt-1">{title}</p>
      </div>
      {locked && (
        <Icon name="lock" size="md" className="text-pocket-gray shrink-0" aria-label="Gesperrt" />
      )}
    </div>
  );
}
