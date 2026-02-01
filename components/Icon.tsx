"use client";

import type { SVGProps } from "react";

type IconName = "plus" | "chart-up" | "building" | "lock";

const iconPaths: Record<IconName, { path: string; viewBox?: string; stroke?: boolean }> = {
  plus: {
    path: "M12 4v16m8-8H4",
    viewBox: "0 0 24 24",
    stroke: true,
  },
  "chart-up": {
    path: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 011.414-1.418L21 3.75",
    viewBox: "0 0 24 24",
    stroke: true,
  },
  building: {
    path: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    viewBox: "0 0 24 24",
    stroke: true,
  },
  lock: {
    path: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    viewBox: "0 0 24 24",
    stroke: true,
  },
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  name: IconName;
  size?: "sm" | "md" | "lg";
  className?: string;
  strokeWidth?: number;
}

const sizeMap = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };

export function Icon({ name, size = "md", className = "", strokeWidth = 2, ...props }: IconProps) {
  const def = iconPaths[name];
  const sizeClass = sizeMap[size];

  if (def.stroke) {
    return (
      <svg
        className={`${sizeClass} ${className}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox={def.viewBox ?? "0 0 24 24"}
        aria-hidden
        {...props}
      >
        <path d={def.path} />
      </svg>
    );
  }

  return (
    <svg
      className={`${sizeClass} ${className}`}
      fill="currentColor"
      viewBox={def.viewBox ?? "0 0 24 24"}
      aria-hidden
      {...props}
    >
      <path d={def.path} />
    </svg>
  );
}
