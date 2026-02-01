"use client";

import { useId } from "react";
import { Icon } from "./Icon";

const InvestmentPocketIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <rect width="32" height="32" rx="8" fill="#DCE05C" />
    <path d="M24 15.4997C24 15.8812 23.6967 16.1905 23.3229 16.1907C22.949 16.1907 22.6458 15.8813 22.6458 15.4997V12.3593L16.7857 18.3404C16.5213 18.61 16.0926 18.61 15.8283 18.3404L12.6959 15.1434L7.15575 20.7978C6.89139 21.0674 6.46268 21.0674 6.19831 20.7978C5.9339 20.5279 5.9339 20.0896 6.19831 19.8197L12.2171 13.6767L12.2683 13.6299C12.5341 13.4083 12.9266 13.4238 13.1746 13.6767L16.307 16.8737L21.6875 11.3821H18.6107C18.2368 11.382 17.9336 11.0726 17.9336 10.6911C17.9336 10.3095 18.2368 10.0001 18.6107 10H23.3229C23.6967 10.0002 24 10.3095 24 10.6911V15.4997Z" fill="#022011" />
  </svg>
);

const ZinsPocketIcon = () => {
  const clipId = useId();
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <g clipPath={`url(#${clipId})`}>
        <path d="M24 0H8C3.58172 0 0 3.58172 0 8V24C0 28.4183 3.58172 32 8 32H24C28.4183 32 32 28.4183 32 24V8C32 3.58172 28.4183 0 24 0Z" fill="#FFE6A5" />
        <path d="M21.9585 11.6036C21.9585 10.7408 21.2592 10.0415 20.3964 10.0415H11.6036C10.7408 10.0415 10.0415 10.7408 10.0415 11.6036V20.3964C10.0415 21.2592 10.7408 21.9585 11.6036 21.9585H20.3964C21.2592 21.9585 21.9585 21.2592 21.9585 20.3964V11.6036ZM17.0645 12.3102C17.3521 12.3102 17.5852 12.5433 17.5852 12.8309V14.4148H19.1691C19.4567 14.4148 19.6898 14.6479 19.6898 14.9355V17.0645C19.6898 17.3521 19.4567 17.5852 19.1691 17.5852H17.5852V19.1691C17.5852 19.4567 17.3521 19.6898 17.0645 19.6898H14.9355C14.6479 19.6898 14.4148 19.4567 14.4148 19.1691V17.5852H12.8309C12.5433 17.5852 12.3102 17.3521 12.3102 17.0645V14.9355C12.3102 14.6479 12.5433 14.4148 12.8309 14.4148H14.4148V12.8309C14.4148 12.5433 14.6479 12.3102 14.9355 12.3102H17.0645ZM15.4562 14.9355C15.4562 15.2231 15.2231 15.4562 14.9355 15.4562H13.3516V16.5438H14.9355C15.2231 16.5438 15.4562 16.7769 15.4562 17.0645V18.6484H16.5438V17.0645C16.5438 16.7769 16.7769 16.5438 17.0645 16.5438H18.6484V15.4562H17.0645C16.7769 15.4562 16.5438 15.2231 16.5438 14.9355V13.3516H15.4562V14.9355ZM23 20.3964C23 21.8344 21.8344 23 20.3964 23H11.6036C10.1656 23 9.00002 21.8344 9 20.3964V11.6036C9 10.1656 10.1656 9 11.6036 9H20.3964C21.8344 9.00002 23 10.1656 23 11.6036V20.3964Z" fill="#022011" />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

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
          <ZinsPocketIcon />
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
      <InvestmentPocketIcon />
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
