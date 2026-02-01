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
  hideValue?: boolean;
  valueClassName?: string;
  thumbLabel?: string;
  thumbLabelClassName?: string;
  snapTickValues?: number[];
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
  hideValue = false,
  valueClassName,
  thumbLabel,
  thumbLabelClassName,
  snapTickValues,
  id,
}: SliderInputProps) {
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;
  const thumbPercent =
    max === min ? 0 : ((value - min) / (max - min)) * 100;
  const thumbLeft = Math.min(98, Math.max(2, thumbPercent));
  const hasSnapTicks = Array.isArray(snapTickValues) && snapTickValues.length > 1;
  const snapTicksForRender = snapTickValues;

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
            <span
              className={
                valueClassName ?? "text-sm font-semibold text-ds-orange-60 font-saans"
              }
            >
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
        <div className="relative flex-1 h-11">
          {!!thumbLabel && (
            <div
              className={
                thumbLabelClassName ??
                "absolute -top-7 px-2 py-0.5 rounded-ds-16 bg-ds-neutral-0 border border-ds-neutral-10 text-xs font-semibold text-ds-neutral-100 shadow-sm whitespace-nowrap pointer-events-none"
              }
              style={{ left: `${thumbLeft}%`, transform: "translateX(-50%)" }}
            >
              {thumbLabel}
            </div>
          )}
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 w-full h-4 md:h-2.5 bg-transparent appearance-none cursor-pointer
              [&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-runnable-track]:bg-ds-neutral-20 [&::-webkit-slider-runnable-track]:rounded-full
              [&::-moz-range-track]:h-full [&::-moz-range-track]:bg-ds-neutral-20 [&::-moz-range-track]:rounded-full
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 md:[&::-webkit-slider-thumb]:w-5 md:[&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:mt-[-6px] md:[&::-webkit-slider-thumb]:mt-[-5px]
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-ds-orange-60
              [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0
              [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:duration-150
              active:[&::-webkit-slider-thumb]:shadow-ds-orange-glow [&:hover::-webkit-slider-thumb]:shadow-ds-orange-glow
              [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 md:[&::-moz-range-thumb]:w-5 md:[&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-ds-orange-60 [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150
              active:[&::-moz-range-thumb]:shadow-ds-orange-glow"
          />
          {hasSnapTicks && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 px-3 flex justify-between pointer-events-none">
              {snapTicksForRender!.map((v) => (
                <span key={v} className="w-px h-2 bg-white/90" aria-hidden="true" />
              ))}
            </div>
          )}
        </div>
        {rightLabel && (
          <span className="text-xs text-ds-neutral-70 whitespace-nowrap shrink-0">
            {rightLabel}
          </span>
        )}
      </div>
      {!showValueRight && !hideValue && (
        <span className={valueClassName ?? "text-sm font-semibold text-ds-orange-60 font-saans"}>
          {displayValue}
        </span>
      )}
    </div>
  );
}
