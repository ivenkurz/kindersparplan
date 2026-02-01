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
      <div className="rounded-ds-lg border border-ds-neutral-20 bg-ds-neutral-0 p-4 shadow-md hover:shadow-lg transition-shadow">
        <div className="w-10 h-10 rounded-full bg-pocket-yellow flex items-center justify-center mb-3">
          <div className="w-6 h-6 rounded bg-pocket-dark flex items-center justify-center">
            <Icon name="plus" size="sm" className="text-ds-neutral-0" strokeWidth={2.5} />
          </div>
        </div>
        <p className="text-lg font-bold text-ds-neutral-100">{formatCurrency(amount)}</p>
        <p className="text-xs text-ds-neutral-70">{sublabel}</p>
        <p className="text-base font-bold text-ds-neutral-100 mt-1">{title}</p>
      </div>
    );
  }

  return (
    <div className="rounded-ds-lg border border-ds-neutral-20 bg-ds-neutral-0 p-4 shadow-md hover:shadow-lg transition-shadow flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-ds-neutral-0 border border-ds-neutral-20 flex items-center justify-center shrink-0">
        <Icon
          name={investmentIcon}
          size="md"
          className="text-pocket-investment"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-lg font-bold text-ds-neutral-100">{formatCurrency(amount)}</p>
        <p className="text-xs text-ds-neutral-70">{sublabel}</p>
        <p className="text-base font-bold text-ds-neutral-100 mt-1">{title}</p>
      </div>
      {locked && (
        <Icon name="lock" size="md" className="text-pocket-gray shrink-0" aria-label="Gesperrt" />
      )}
    </div>
  );
}
