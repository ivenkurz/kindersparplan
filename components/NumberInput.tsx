"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

const formatWithThousands = (v: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(v);

function useIsMobile(maxWidthPx = 767) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${maxWidthPx}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [maxWidthPx]);
  return isMobile;
}

export default function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 1000000,
  step = 1,
  unit = "€",
}: NumberInputProps) {
  const [display, setDisplay] = useState<string>(() => formatWithThousands(value));
  const [isFocused, setIsFocused] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const handleDecrement = () => onChange(Math.max(min, value - step));
  const handleIncrement = () => onChange(Math.min(max, value + step));

  const parseInput = useCallback(
    (s: string): number => {
      const digits = s.replace(/\D/g, "");
      if (digits === "") return min;
      const n = parseInt(digits, 10);
      if (!Number.isFinite(n)) return value;
      return Math.max(min, Math.min(max, n));
    },
    [value, min, max]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const s = e.target.value;
    setDisplay(s);
    const n = parseInput(s);
    onChange(n);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setDisplay(formatWithThousands(value));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setDisplay(String(value));
  };

  const displayValue = isFocused ? display : formatWithThousands(value);

  useEffect(() => {
    if (isFocused) {
      setDisplay(String(value));
    } else {
      setDisplay(formatWithThousands(value));
    }
  }, [value, isFocused]);

  const openMobileModal = () => {
    if (!isMobile) return;
    setDisplay(String(value));
    setMobileModalOpen(true);
    setTimeout(() => mobileInputRef.current?.focus(), 150);
  };

  const closeMobileModal = () => {
    setMobileModalOpen(false);
    setDisplay(formatWithThousands(value));
  };

  useEffect(() => {
    if (mobileModalOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileModalOpen]);

  const confirmMobileModal = () => {
    const n = parseInput(display);
    onChange(n);
    closeMobileModal();
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-ds-neutral-100 block">
        {label}
      </label>
      <div className="flex items-center rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 overflow-hidden">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-ds-neutral-100 text-ds-neutral-0 hover:bg-ds-neutral-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-ds-neutral-100"
          aria-label="Verringern"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.459 11.978L19.541 11.979" />
          </svg>
        </button>
        {isMobile ? (
          <button
            type="button"
            onClick={openMobileModal}
            className="flex-1 min-w-0 px-4 py-3 bg-transparent text-ds-neutral-100 font-semibold text-center border-0 cursor-pointer focus:ring-0 focus:outline-none"
          >
            {formatWithThousands(value)} {unit}
          </button>
        ) : (
          <input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className="flex-1 min-w-0 px-4 py-3 bg-transparent text-ds-neutral-100 font-semibold text-center border-0 focus:ring-0 focus:outline-none"
          />
        )}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-ds-neutral-100 text-ds-neutral-0 hover:bg-ds-neutral-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-ds-neutral-100"
          aria-label="Erhöhen"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* Mobile: Modal mit Zahlen-Eingabefeld (CDS-konform) */}
      {mobileModalOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden font-saans"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} eingeben`}
        >
          <div
            className="absolute inset-0 bg-ds-neutral-100/40"
            onClick={closeMobileModal}
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-ds-lg border-t border-x border-ds-neutral-20 bg-ds-neutral-0 p-6 pb-[env(safe-area-inset-bottom)] shadow-lg">
            <p className="mb-4 text-sm font-semibold text-ds-neutral-100">{label}</p>
            <input
              ref={mobileInputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={display}
              onChange={(e) => setDisplay(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmMobileModal();
              }}
              className="mb-6 w-full rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 px-6 py-4 text-2xl font-semibold text-ds-neutral-100 text-center tabular-nums placeholder:text-ds-neutral-40 focus:border-ds-seagreen focus:outline-none focus:ring-2 focus:ring-ds-seagreen/30"
              placeholder="0"
              autoComplete="off"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeMobileModal}
                className="flex-1 rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 py-3 font-semibold text-ds-neutral-100 transition-colors hover:bg-ds-neutral-20"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={confirmMobileModal}
                className="flex-1 rounded-ds-16 bg-ds-seagreen py-3 font-semibold text-ds-neutral-0 transition-colors hover:bg-ds-darkgreen"
              >
                Fertig
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
