"use client";

import { useRef, useCallback, useEffect } from "react";

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
  thumbSize?: "sm" | "md";
}

function percentToValue(percent: number, min: number, max: number, step: number): number {
  const range = max - min;
  const raw = min + (percent / 100) * range;
  const steps = Math.round((raw - min) / step);
  return Math.max(min, Math.min(max, min + steps * step));
}

/**
 * Dual-Range-Slider mit eigenem Track und zwei Thumb-Divs.
 * Keine nativen Range-Inputs für die Anzeige – dadurch kein Zittern und der andere Thumb bleibt stabil.
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
  formatValue = (v) => String(v),
}: DualRangeSliderProps) {
  const range = max - min;
  const lowPercent = range === 0 ? 0 : ((valueLow - min) / range) * 100;
  const highPercent = range === 0 ? 100 : ((valueHigh - min) / range) * 100;
  const trackRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<"low" | "high" | null>(null);

  const getPercentFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 50;
    const rect = el.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      let hitLow: boolean;
      if (target.dataset.thumb === "low") hitLow = true;
      else if (target.dataset.thumb === "high") hitLow = false;
      else {
        const percent = getPercentFromClientX(e.clientX);
        const mid = (lowPercent + highPercent) / 2;
        hitLow = percent < mid;
      }
      activeThumbRef.current = hitLow ? "low" : "high";
      trackRef.current?.setPointerCapture(e.pointerId);
      const percent = getPercentFromClientX(e.clientX);
      const value = percentToValue(percent, min, max, step);
      if (hitLow) {
        onChangeLow(Math.min(value, valueHigh - step));
      } else {
        onChangeHigh(Math.max(value, valueLow + step));
      }
    },
    [getPercentFromClientX, lowPercent, highPercent, min, max, step, valueLow, valueHigh, onChangeLow, onChangeHigh]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (activeThumbRef.current === null) return;
      const percent = getPercentFromClientX(e.clientX);
      const value = percentToValue(percent, min, max, step);
      if (activeThumbRef.current === "low") {
        onChangeLow(Math.min(value, valueHigh - step));
      } else {
        onChangeHigh(Math.max(value, valueLow + step));
      }
    },
    [getPercentFromClientX, min, max, step, valueLow, valueHigh, onChangeLow, onChangeHigh]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    activeThumbRef.current = null;
    trackRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  const handleKeyDownLow = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        onChangeLow(Math.max(min, valueLow - step));
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        onChangeLow(Math.min(valueHigh - step, valueLow + step));
      }
    },
    [min, step, valueLow, valueHigh, onChangeLow]
  );

  const handleKeyDownHigh = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        onChangeHigh(Math.max(valueLow + step, valueHigh - step));
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        onChangeHigh(Math.min(max, valueHigh + step));
      }
    },
    [max, step, valueLow, valueHigh, onChangeHigh]
  );

  useEffect(() => {
    const up = () => {
      activeThumbRef.current = null;
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div className="space-y-3">
      {label && (
        <p className="text-sm font-semibold text-ds-neutral-100">{label}</p>
      )}
      <div
        ref={trackRef}
        className="relative pt-2 pb-2 select-none touch-none"
        style={{ touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Track (Hintergrund) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 md:h-1.5 rounded-full bg-ds-neutral-20 pointer-events-none z-0" />
        {/* Füllung zwischen den Thumbs */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 md:h-1.5 rounded-full bg-ds-seagreen/40 pointer-events-none z-0"
          style={{
            left: `${lowPercent}%`,
            width: `${highPercent - lowPercent}%`,
          }}
        />
        {/* Thumb Low – nur div, Position aus valueLow; data-thumb für Klick-Erkennung */}
        <div
          data-thumb="low"
          role="slider"
          aria-label={`${lowLabel} ${formatValue(valueLow)} Jahre`}
          aria-valuemin={min}
          aria-valuemax={valueHigh - step}
          aria-valuenow={valueLow}
          tabIndex={0}
          onKeyDown={handleKeyDownLow}
          className="absolute top-1/2 z-10 w-11 h-11 md:w-6 md:h-6 -translate-y-1/2 -translate-x-1/2 rounded-full bg-ds-neutral-100 shadow-md cursor-grab active:cursor-grabbing border-0 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ds-orange-60 focus:ring-offset-2 pointer-events-auto"
          style={{ left: `${lowPercent}%` }}
        />
        {/* Thumb High – nur div, Position aus valueHigh */}
        <div
          data-thumb="high"
          role="slider"
          aria-label={`${highLabel} ${formatValue(valueHigh)} Jahre`}
          aria-valuemin={valueLow + step}
          aria-valuemax={max}
          aria-valuenow={valueHigh}
          tabIndex={0}
          onKeyDown={handleKeyDownHigh}
          className="absolute top-1/2 z-10 w-11 h-11 md:w-6 md:h-6 -translate-y-1/2 -translate-x-1/2 rounded-full bg-ds-neutral-100 shadow-md cursor-grab active:cursor-grabbing border-0 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ds-orange-60 focus:ring-offset-2 pointer-events-auto"
          style={{ left: `${highPercent}%` }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-ds-seagreen">
          {lowLabel} {formatValue(valueLow)} Jahre
        </span>
        <span className="font-semibold text-ds-seagreen">
          {highLabel} {formatValue(valueHigh)} Jahre
        </span>
      </div>
    </div>
  );
}
