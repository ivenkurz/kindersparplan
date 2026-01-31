"use client";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  formatValue?: (value: number) => string;
  leftLabel?: string;
  rightLabel?: string;
  showValueRight?: boolean;
  id?: string;
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  formatValue,
  leftLabel,
  rightLabel,
  showValueRight = false,
  id,
}: SliderInputProps) {
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;

  return (
    <div className="space-y-2">
      {(label || showValueRight) && (
        <div className="flex justify-between items-center">
          {label && (
            <label className="text-sm font-semibold text-ds-neutral-100 font-saans">
              {label}
            </label>
          )}
          {showValueRight && (
            <span className="text-sm font-semibold text-ds-orange-60 font-saans">
              {displayValue}
            </span>
          )}
        </div>
      )}
      <div className="flex items-center gap-2 sm:gap-3 group/slider">
        {leftLabel && (
          <span className="text-xs text-ds-neutral-70 whitespace-nowrap shrink-0">
            {leftLabel}
          </span>
        )}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2.5 bg-ds-neutral-20 rounded-full appearance-none cursor-pointer accent-ds-orange-60
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-ds-orange-60
            [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0
            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:duration-200
            [&::-webkit-slider-thumb]:origin-center
            [&:hover::-webkit-slider-thumb]:scale-110 [&:hover::-webkit-slider-thumb]:shadow-ds-orange-glow
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-ds-orange-60 [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-200
            [&:hover::-moz-range-thumb]:scale-110 [&:hover::-moz-range-thumb]:shadow-ds-orange-glow"
        />
        {rightLabel && (
          <span className="text-xs text-ds-neutral-70 whitespace-nowrap shrink-0">
            {rightLabel}
          </span>
        )}
      </div>
      {!showValueRight && (
        <span className="text-sm font-semibold text-ds-orange-60 font-saans">
          {displayValue}
        </span>
      )}
    </div>
  );
}
