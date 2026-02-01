"use client";

import { Icon } from "./Icon";

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

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
      <div className="box-border flex flex-col justify-between items-start p-4 gap-[10.5px] min-h-[120px] rounded-xl border border-zins-pocket-border bg-ds-neutral-0 shadow-md hover:shadow-lg transition-shadow font-saans">
        {/* Top section: Icon + Betrag/Label, gap 7px */}
        <div className="flex flex-row items-start gap-[7px] w-full">
          {/* Icon: 32x32, #FFE6A5, radius 8px, padding 7px */}
          <div className="w-8 h-8 rounded-lg bg-zins-pocket-icon flex flex-row items-center justify-center p-[7px] shrink-0">
            <div className="w-[18px] h-[18px] flex items-center justify-center p-0.5">
              <Icon name="plus" size="sm" className="text-ds-neutral-100 w-[14px] h-[14px]" strokeWidth={1.5} />
            </div>
          </div>
          <div className="flex-1 min-w-0 flex flex-col items-end text-right">
            <p className="text-[18px] font-semibold text-black leading-[38px] tabular-nums">{formatCurrency(amount)}</p>
            <p className="text-xs font-normal text-ds-neutral-70 leading-4">{sublabel}</p>
          </div>
        </div>
        {/* Bottom section: Reisen – 23px, bold */}
        <p className="text-[23px] font-bold text-black leading-[38px] font-serif">{title}</p>
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
