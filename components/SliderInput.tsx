"use client";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

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
  id,
}: SliderInputProps) {
  const displayValue = formatValue ? formatValue(value) : `${value}${unit}`;
  const roundedValue = step >= 1 ? Math.round(value) : value;

  return (
    <Box className="space-y-2">
      {(label || showValueRight) && (
        <Box className="flex justify-between items-center">
          {label && (
            <Typography
              component="label"
              variant="body2"
              sx={{ fontWeight: 600, color: "#022011", fontFamily: "var(--font-saans), sans-serif" }}
            >
              {label}
            </Typography>
          )}
          {showValueRight && (
            <Typography
              component="span"
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#fd8f18",
                fontFamily: "var(--font-saans), sans-serif",
                ...(valueClassName ? {} : {}),
              }}
              className={valueClassName}
            >
              {displayValue}
            </Typography>
          )}
        </Box>
      )}
      <Box className="flex items-center gap-2 sm:gap-3" sx={{ width: "100%" }}>
        {leftLabel && (
          <Typography variant="caption" sx={{ color: "#616a65", whiteSpace: "nowrap", flexShrink: 0 }}>
            {leftLabel}
          </Typography>
        )}
        <Box sx={{ flex: 1, position: "relative", py: thumbLabel ? 2 : 0 }}>
          {thumbLabel && (
            <Box
              className={thumbLabelClassName}
              sx={{
                position: "absolute",
                top: 0,
                left: `${max === min ? 0 : Math.min(98, Math.max(2, ((value - min) / (max - min)) * 100))}%`,
                transform: "translateX(-50%)",
                px: 1,
                py: 0.5,
                borderRadius: "16px",
                bgcolor: "#fff",
                border: "1px solid #f0f1f1",
                fontSize: 12,
                fontWeight: 600,
                color: "#022011",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: 1,
              }}
            >
              {thumbLabel}
            </Box>
          )}
          <Slider
            id={id}
            value={roundedValue}
            onChange={(_e, v) => onChange(Array.isArray(v) ? v[0] : v)}
            min={min}
            max={max}
            step={step}
            valueLabelDisplay="auto"
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
              "& .MuiSlider-track": { backgroundColor: "#022011" },
              "& .MuiSlider-rail": { backgroundColor: "#d1d4d2" },
            }}
          />
        </Box>
        {rightLabel && (
          <Typography variant="caption" sx={{ color: "#616a65", whiteSpace: "nowrap", flexShrink: 0 }}>
            {rightLabel}
          </Typography>
        )}
      </Box>
      {!showValueRight && !hideValue && (
        <Typography
          component="span"
          variant="body2"
          sx={{ fontWeight: 600, color: "#fd8f18", fontFamily: "var(--font-saans), sans-serif" }}
          className={valueClassName}
        >
          {displayValue}
        </Typography>
      )}
    </Box>
  );
}
