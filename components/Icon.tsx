"use client";

import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export type IconName = "plus" | "chart-up" | "building" | "lock";

// Figma-Pfade aus Marketing Design System (UI-plus, Commerce-Finance-chart-growth-positive, UI-lock)
const iconPaths: Record<
  IconName,
  { path: string; viewBox: string; stroke?: boolean; strokeWidth?: number }
> = {
  plus: {
    path: "M11.999 4.43701L12 11.9785M12 11.9785L12.001 19.519M12 11.9785L4.459 11.978M12 11.9785L19.541 11.979",
    viewBox: "0 0 24 24",
    stroke: true,
    strokeWidth: 1.5,
  },
  "chart-up": {
    path: "M27.9524 16.6107V9.31788M27.9524 9.31788H20.6582M27.9524 9.31788L18.675 18.5954L13.0844 13.0048L5.81954 20.2683M5.59033 5.5918V24.3564C5.59033 26.341 7.19901 27.9497 9.18364 27.9497H27.9524",
    viewBox: "0 0 34 34",
    stroke: true,
    strokeWidth: 2.1,
  },
  building: {
    path: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    viewBox: "0 0 24 24",
    stroke: true,
  },
  lock: {
    path: "M52 25.9999V21.6709C52 14.4916 46.1793 8.6709 39 8.6709C31.8207 8.6709 26 14.4916 26 21.6709V25.9999M39 47.6676V56.3289M55.25 69.3289H22.75C17.3648 69.3289 13 64.9641 13 59.5789V44.4209C13 39.0356 17.3648 34.6709 22.75 34.6709H55.25C60.6352 34.6709 65 39.0356 65 44.4209V59.5789C65 64.9641 60.6352 69.3289 55.25 69.3289Z",
    viewBox: "0 0 78 78",
    stroke: true,
    strokeWidth: 4.875,
  },
};

const sizeToFontSize = { sm: "small", md: "medium", lg: "large" } as const;

export interface IconProps extends Omit<SvgIconProps, "children"> {
  name: IconName;
  size?: "sm" | "md" | "lg";
  strokeWidth?: number;
}

/**
 * Icon mit MUI SvgIcon (Code-Review: Standard-Komponenten). Gleiche API wie zuvor.
 */
export function Icon({
  name,
  size = "md",
  className = "",
  strokeWidth: strokeWidthProp,
  sx,
  ...props
}: IconProps) {
  const def = iconPaths[name];
  const fontSize = sizeToFontSize[size];
  const strokeWidth = def.stroke ? (def.strokeWidth ?? strokeWidthProp ?? 2) : undefined;

  return (
    <SvgIcon
      className={className}
      viewBox={def.viewBox}
      fontSize={fontSize}
      aria-hidden
      sx={{
        fill: def.stroke ? "none" : "currentColor",
        stroke: def.stroke ? "currentColor" : undefined,
        strokeWidth,
        strokeLinecap: def.stroke ? "round" : undefined,
        strokeLinejoin: def.stroke ? "round" : undefined,
        ...sx,
      }}
      {...props}
    >
      <path d={def.path} />
    </SvgIcon>
  );
}
