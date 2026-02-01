"use client";

import { useCallback, useEffect, useState } from "react";

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
        <input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="flex-1 min-w-0 px-4 py-3 bg-transparent text-ds-neutral-100 font-semibold text-center border-0 focus:ring-0 focus:outline-none"
        />
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
    </div>
  );
}
