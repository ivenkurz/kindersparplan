"use client";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

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
  hideLegend?: boolean;
}

/**
 * Dual-Range-Slider mit MUI Slider: zwei Thumbs, valueLabelDisplay, disableSwap.
 * Evergreen-Farben (Track gefüllt: #022011, Thumb: #022011).
 */
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
  formatValue = (v) => String(Math.round(v)),
  hideLegend = false,
}: DualRangeSliderProps) {
  const value: number[] =
    step >= 1 ? [Math.round(valueLow), Math.round(valueHigh)] : [valueLow, valueHigh];

  const handleChange = (_event: Event, newValue: number | number[]) => {
    const [low, high] = (newValue as number[]).map((v) => (step >= 1 ? Math.round(v) : v));
    onChangeLow(low);
    onChangeHigh(high);
  };

  return (
    <Box className="w-full">
      {label && (
        <p className="text-sm font-semibold text-ds-neutral-100 mb-1">{label}</p>
      )}
      <Slider
        getAriaLabel={() => `${lowLabel} – ${highLabel}`}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `${formatValue(v)} Jahre`}
        min={min}
        max={max}
        step={step}
        disableSwap
        sx={{
          color: "#022011",
          height: 8,
          "& .MuiSlider-thumb": {
            width: 20,
            height: 20,
            border: "2px solid #fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            "&:hover, &.Mui-focusVisible": {
              boxShadow: "0 0 0 8px rgba(2, 32, 17, 0.16)",
            },
          },
          "& .MuiSlider-track": {
            backgroundColor: "#022011",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#E5E7EB",
          },
        }}
      />
      {!hideLegend && (
        <div className="flex justify-between text-xs text-[#9CA3AF] mt-1">
          <span>{lowLabel} {formatValue(valueLow)} Jahre</span>
          <span>{highLabel} {formatValue(valueHigh)} Jahre</span>
        </div>
      )}
    </Box>
  );
}
