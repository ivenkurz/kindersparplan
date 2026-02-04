"use client";

interface DualRangeSliderProps {
  min: number;
  max: number;
  valueLow: number;
  valueHigh: number;
  onChangeLow: (v: number) => void;
  onChangeHigh: (v: number) => void;
  step?: number;
  label?: string;
  lowLabel?: string;
  highLabel?: string;
  formatValue?: (v: number) => string;
  /** Legende unter dem Slider ausblenden (z. B. Kindersparplan) */
  hideLegend?: boolean;
}

/**
 * Dual-Range-Slider mit zwei nativen <input type="range">.
 * Wie SliderInput (SparplanRechner): zuverlässiges Touch/Drag auf iOS, gleiche Thumb-Größe auf Mobile.
 */
const RANGE_INPUT_CLASS =
  "absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 w-full h-4 md:h-2.5 bg-transparent appearance-none cursor-pointer touch-manipulation " +
  "[&::-webkit-slider-runnable-track]:h-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:rounded-full " +
  "[&::-moz-range-track]:h-full [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:rounded-full " +
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-11 [&::-webkit-slider-thumb]:h-11 md:[&::-webkit-slider-thumb]:w-5 md:[&::-webkit-slider-thumb]:h-5 " +
  "[&::-webkit-slider-thumb]:mt-[-14px] md:[&::-webkit-slider-thumb]:mt-[-5px] " +
  "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#022011] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white " +
  "[&::-webkit-slider-thumb]:shadow-[0_2px_4px_rgba(0,0,0,0.2)] [&::-webkit-slider-thumb]:cursor-pointer " +
  "[&::-moz-range-thumb]:w-11 [&::-moz-range-thumb]:h-11 md:[&::-moz-range-thumb]:w-5 md:[&::-moz-range-thumb]:h-5 " +
  "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#022011] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-[0_2px_4px_rgba(0,0,0,0.2)] [&::-moz-range-thumb]:cursor-pointer " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ds-orange-60 focus-visible:ring-offset-2";

export default function DualRangeSlider({
  min,
  max,
  valueLow,
  valueHigh,
  onChangeLow,
  onChangeHigh,
  step = 1,
  label,
  lowLabel = "Von",
  highLabel = "Bis",
  formatValue = (v) => String(v),
  hideLegend = false,
}: DualRangeSliderProps) {
  const range = max - min;
  const lowPercent = range === 0 ? 0 : ((valueLow - min) / range) * 100;
  const highPercent = range === 0 ? 100 : ((valueHigh - min) / range) * 100;

  const handleLowChange = (v: number) => {
    const clamped = Math.min(valueHigh - step, Math.max(min, v));
    onChangeLow(clamped);
  };

  const handleHighChange = (v: number) => {
    const clamped = Math.max(valueLow + step, Math.min(max, v));
    onChangeHigh(clamped);
  };

  return (
    <div className="space-y-3">
      {label && (
        <p className="text-sm font-semibold text-ds-neutral-100">{label}</p>
      )}
      {/* Wie SliderInput: h-14 md:h-11, zwei native Range-Inputs für zuverlässiges iOS-Touch */}
      <div className="relative h-14 md:h-11">
        {/* Track (Hintergrund) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded bg-[#E5E7EB] pointer-events-none z-0" />
        {/* Füllung zwischen den Thumbs */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[9px] rounded bg-[#022011] pointer-events-none z-0"
          style={{
            left: `${lowPercent}%`,
            width: `${highPercent - lowPercent}%`,
          }}
        />
        {/* Low: natives Range-Input, z-10 */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueLow}
          onChange={(e) => handleLowChange(Number(e.target.value))}
          aria-label={`${lowLabel} ${formatValue(valueLow)} Jahre`}
          aria-valuemin={min}
          aria-valuemax={valueHigh - step}
          aria-valuenow={valueLow}
          className={RANGE_INPUT_CLASS}
        />
        {/* High: natives Range-Input, z-20 damit Thumb bei Überlappung greifbar */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueHigh}
          onChange={(e) => handleHighChange(Number(e.target.value))}
          aria-label={`${highLabel} ${formatValue(valueHigh)} Jahre`}
          aria-valuemin={valueLow + step}
          aria-valuemax={max}
          aria-valuenow={valueHigh}
          className={RANGE_INPUT_CLASS + " z-20"}
        />
      </div>
      {!hideLegend && (
        <div className="flex justify-between text-xs text-[#9CA3AF]">
          <span>{lowLabel} {formatValue(valueLow)} Jahre</span>
          <span>{highLabel} {formatValue(valueHigh)} Jahre</span>
        </div>
      )}
    </div>
  );
}
