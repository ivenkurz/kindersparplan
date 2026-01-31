"use client";

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
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
  const handleDecrement = () => onChange(Math.max(min, value - step));
  const handleIncrement = () => onChange(Math.min(max, value + step));

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-ds-neutral-100 block">
        {label}
      </label>
      <div className="flex items-center rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 overflow-hidden">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="flex items-center justify-center w-12 h-12 bg-ds-neutral-100 text-ds-neutral-0 hover:bg-ds-neutral-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-ds-neutral-100"
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
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="flex-1 min-w-0 px-4 py-3 bg-transparent text-ds-neutral-100 font-semibold text-center border-0 focus:ring-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="flex items-center justify-center w-12 h-12 bg-ds-neutral-100 text-ds-neutral-0 hover:bg-ds-neutral-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-ds-neutral-100"
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
