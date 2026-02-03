"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import DualRangeSlider from "@/components/DualRangeSlider";

/** Tooltip: ?-Button (Figma: border #6B746F, rounded) – öffnet Hinweis */
function InfoTooltip({ label, content }: { label: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="ml-1.5 w-[21px] h-[21px] rounded-full border-2 border-ds-figma-info-border text-ds-figma-info-border hover:bg-ds-neutral-10 font-black text-[12px] inline-flex items-center justify-center transition-colors"
      >
        i
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div
            role="tooltip"
            className="absolute left-0 top-full mt-1.5 z-50 min-w-[194px] max-w-[280px] p-3 rounded-ds-16 border border-ds-figma-border-light bg-white shadow-ds-figma-tooltip text-[10px] leading-[15px] text-ds-neutral-70"
          >
            {content}
          </div>
        </>
      )}
    </div>
  );
}
import {
  berechneKindersparplan,
  berechneMonatlichFuerZiel,
  laufzeitBisZiel,
} from "@/lib/kindersparplan";
import { SPARZIELE, RENDITE_KINDERSPARPLAN, RENDITE_STRATEGIE_NAME } from "@/data/kindersparplan";

const ValueChart = dynamic(() => import("@/components/ValueChart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[220px] sm:h-[260px] rounded-ds-16 bg-ds-neutral-10 animate-pulse" />
  ),
});

/** CDS: Alter 0–30 Jahre, Default Start 0 / Ziel 18 */
const AGE_MIN = 0;
const AGE_MAX = 30;
const DEFAULT_START = 0;
const DEFAULT_ZIEL = 18;

/** Option „Eigenes Sparziel“: User gibt Zielbetrag ein, monatliche Sparsumme wird berechnet */
const EIGENE_SUMME_ID = "eigene-summe";
/** Kein Sparziel aktiv (nach Modifikation der monatlichen Sparsumme bei zuvor aktivem Eigenem Sparziel) */
const KEIN_SPARZIEL_ID = "keins";
const CUSTOM_ZIEL_STEP = 500;
const CUSTOM_ZIEL_MIN = 1000;
const CUSTOM_ZIEL_MAX = 9_000_000;
const CUSTOM_ZIEL_DEFAULT = 10000;
/** Bei „kein Sparziel“: Default-Sparsumme (€/Monat); Voraussichtlicher Endwert entspricht dieser Rate. */
const DEFAULT_MONATLICH_OHNE_SPARZIEL = 50;

export default function KindersparplanPage() {
  const [kindesalter, setKindesalter] = useState(DEFAULT_START);
  const [zielalter, setZielalter] = useState(DEFAULT_ZIEL);
  const [sparzielId, setSparzielId] = useState<string>(KEIN_SPARZIEL_ID);
  /** Bei „Eigenes Sparziel“: Zielbetrag in €; monatliche Sparsumme wird daraus berechnet. */
  const [gewuenschterZielertrag, setGewuenschterZielertrag] = useState(CUSTOM_ZIEL_DEFAULT);

  const [lastState, setLastState] = useState<{
    kindesalter: number;
    zielalter: number;
    sparzielId: string;
    gewuenschterZielertrag: number;
  } | null>(null);

  const handleUndo = useCallback(() => {
    if (lastState) {
      setKindesalter(lastState.kindesalter);
      setZielalter(lastState.zielalter);
      setSparzielId(lastState.sparzielId);
      setGewuenschterZielertrag(lastState.gewuenschterZielertrag);
      setLastState(null);
    }
  }, [lastState]);

  const saveForUndo = useCallback(() => {
    setLastState({ kindesalter, zielalter, sparzielId, gewuenschterZielertrag });
  }, [kindesalter, zielalter, sparzielId, gewuenschterZielertrag]);

  const laufzeit = laufzeitBisZiel(kindesalter, zielalter);
  const sparziel = SPARZIELE.find((z) => z.id === sparzielId);
  /** Zielbetrag: bei festem Sparziel aus Daten, bei „Eigenes Sparziel“ der eingegebene Betrag, bei „keins“ 0. */
  const zielBetrag =
    sparzielId === EIGENE_SUMME_ID ? gewuenschterZielertrag : sparzielId === KEIN_SPARZIEL_ID ? 0 : (sparziel?.betrag ?? 0);
  const sparzielLabel = sparzielId === EIGENE_SUMME_ID ? "Eigenes Sparziel" : sparzielId === KEIN_SPARZIEL_ID ? "" : (sparziel?.label ?? "");

  const computedMonatlichSparziel = useMemo(() => {
    if (laufzeit <= 0 || zielBetrag <= 0) return 0;
    return berechneMonatlichFuerZiel(zielBetrag, laufzeit, RENDITE_KINDERSPARPLAN);
  }, [laufzeit, zielBetrag]);

  /** Monatliche Sparsumme: aus gewähltem Sparziel; bei „keins“ = 50 € (Voraussichtlicher Endwert entspricht dieser Default-Sparsumme). */
  const monatlich = useMemo(() => {
    if (sparzielId === KEIN_SPARZIEL_ID) return laufzeit <= 0 ? 0 : DEFAULT_MONATLICH_OHNE_SPARZIEL;
    return computedMonatlichSparziel;
  }, [sparzielId, laufzeit, computedMonatlichSparziel]);

  const isInvalid =
    laufzeit <= 0 ||
    (sparzielId === EIGENE_SUMME_ID ? gewuenschterZielertrag <= 0 : sparzielId === KEIN_SPARZIEL_ID ? false : !sparziel);

  const result = useMemo(() => {
    if (isInvalid || monatlich <= 0)
      return {
        chartData: [] as { jahr: number; wert: number; einzahlungen: number }[],
        laufzeit: 0,
        gesamtEinzahlungen: 0,
        ertrag: 0,
        endwert: 0,
      };
    return berechneKindersparplan({
      kindesalter,
      zielalter,
      einmalig: 0,
      monatlich,
      rendite: RENDITE_KINDERSPARPLAN,
    });
  }, [kindesalter, zielalter, monatlich, isInvalid]);

  const formatEuro = (v: number) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(v);

  /** Zahl mit 1000er-Trennpunkt (de-DE: Punkt) für direkte Eingabe Zielertrag */
  const formatZielertrag = (v: number) =>
    new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(v);

  /** Hero-Block (Screenshot: Icon #10201B links, grüner Blur, 57px Betrag, 21px Endwert) */
  const heroBlock = !isInvalid && monatlich > 0 && (
    <div className="relative overflow-hidden rounded-ds-lg border border-ds-neutral-20 bg-white p-6 shadow-ds-figma-input lg:h-[200px] lg:flex lg:flex-col lg:justify-center">
      {/* Dekoration: grüner Blur (Screenshot) */}
      <div
        className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-ds-figma-blur-green opacity-50 blur-[32px]"
        aria-hidden
      />
      <div className="relative flex items-center gap-4 text-left">
        {/* Chart-Icon (Screenshot: #10201B, rounded ~17px) */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[17px] bg-ds-hero-icon-bg text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 3v18h18" />
            <path d="M18 9l-5 5-4-4-3 3" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-base text-ds-neutral-70">
            Deine monatliche Sparsumme
          </p>
          <p className="text-4xl font-semibold leading-[48px] text-ds-neutral-90 font-saans tracking-tight sm:text-5xl md:text-[57px]">
            {formatEuro(monatlich)}
          </p>
          <p className="text-[21px] font-semibold leading-6 text-ds-neutral-100 mt-1 whitespace-nowrap">
            Voraussichtlicher Endwert: {formatEuro(result.endwert)}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-ds-figma-page font-saans pb-24 lg:pb-8 flex flex-col">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col min-h-0 w-full">
        <header className="pt-4 lg:pt-6 lg:pb-1 shrink-0">
          <h1 className="font-saans font-bold text-ds-neutral-100 text-xl lg:text-2xl">Kindersparplan</h1>
        </header>
        {/* Innenbereich mit 48px Rundung + Schatten (Screenshot) */}
        <div className="flex-1 min-h-0 flex flex-col rounded-[48px] shadow-ds-figma-card overflow-hidden mt-2 lg:mt-4 bg-ds-figma-page">
        {/* Mobile: Sticky Hero */}
        {!isInvalid && monatlich > 0 && (
          <div className="lg:hidden sticky top-0 z-30 isolate -mx-4 px-4 pt-4 pb-4 border-b border-ds-neutral-20 bg-ds-figma-page">
            <div className="max-w-6xl mx-auto">{heroBlock}</div>
          </div>
        )}

        <div
          className={`relative z-20 flex-1 min-h-0 ${!isInvalid && monatlich > 0 ? "pt-6" : "pt-2"} lg:pt-4 lg:grid lg:grid-cols-12 lg:gap-6 lg:items-stretch`}
        >
          {/* Desktop: Linke Spalte = Step 1 + Step 2 + CTA (wie Screenshot) */}
          {!isInvalid && monatlich > 0 && (
            <aside className="hidden lg:flex lg:col-span-4 lg:flex-col lg:h-full lg:gap-4">
              {/* Step 1: Alter des Kindes & Zielalter – nur Desktop in Sidebar */}
              <section className="shrink-0">
                <div className="bg-white border border-ds-neutral-20 rounded-ds-lg shadow-ds-figma-input p-4 lg:p-5">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center" aria-hidden>
                      <svg width="46" height="48" viewBox="0 0 46 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
                        <path d="M0 15.8478C0 7.09528 6.86497 0 15.3333 0H30.6667C39.135 0 46 7.09528 46 15.8478V31.6955C46 40.448 39.135 47.5433 30.6667 47.5433H15.3333C6.86497 47.5433 0 40.448 0 31.6955V15.8478Z" fill="#FFDB7C" />
                        <path d="M23.7069 30.4896V21.1719H21V19.3084C23 19.2897 23.9655 18.6934 24.2241 17.0535H26V30.4896H23.7069Z" fill="black" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <h2 className="text-xl font-semibold text-ds-figma-gray-800 leading-7">
                        Alter des Kindes & Zielalter
                      </h2>
                      <InfoTooltip
                        label="Hinweis zu Zinseszins"
                        content="Zinseszins: Dein Guthaben wächst, weil Zinsen auf das angelegte Kapital und auf bereits gutgeschriebene Zinsen berechnet werden. So wirkt der Zinseszinseffekt über die Laufzeit."
                      />
                    </div>
                  </div>
                  <p className="text-[15px] leading-6 text-ds-neutral-70 mb-3">
                    Von 0 bis 30 Jahre. Beide Werte unabhängig einstellbar, um die Laufzeit optimal zu planen.
                  </p>
                  <div className="py-2">
                    <DualRangeSlider
                      min={AGE_MIN}
                      max={AGE_MAX}
                      valueLow={kindesalter}
                      valueHigh={zielalter}
                      onChangeLow={(v) => { saveForUndo(); setKindesalter(v); }}
                      onChangeHigh={(v) => { saveForUndo(); setZielalter(v); }}
                      step={1}
                      lowLabel="Startalter"
                      highLabel="Zielalter"
                    />
                  </div>
                  <div className="mt-3 pt-3 border-t border-ds-figma-divider flex items-center justify-between">
                    <span className="text-sm font-semibold text-ds-neutral-90 leading-5">Laufzeit</span>
                    <span className="text-base font-bold text-ds-figma-teal">{laufzeit} Jahre</span>
                  </div>
                </div>
              </section>
              {/* Step 2: Sparziel wählen + Info-Box (Screenshot) */}
              <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                <div className="flex flex-wrap items-start gap-3 mb-2 shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center" aria-hidden>
                      <svg width="46" height="48" viewBox="0 0 46 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
                        <path d="M0 15.8478C0 7.09528 6.86497 0 15.3333 0H30.6667C39.135 0 46 7.09528 46 15.8478V31.6955C46 40.448 39.135 47.5433 30.6667 47.5433H15.3333C6.86497 47.5433 0 40.448 0 31.6955V15.8478Z" fill="#FFDB7C" />
                        <path d="M18.1634 30V28.2869L22.7081 23.8317C23.1428 23.3928 23.505 23.0028 23.7947 22.6619C24.0845 22.321 24.3018 21.9908 24.4467 21.6712C24.5916 21.3516 24.6641 21.0107 24.6641 20.6484C24.6641 20.2351 24.5703 19.8814 24.3828 19.5874C24.1953 19.2891 23.9375 19.0589 23.6094 18.897C23.2812 18.7351 22.9084 18.6541 22.4908 18.6541C22.0604 18.6541 21.6832 18.7436 21.3594 18.9226C21.0355 19.0973 20.7841 19.3466 20.6051 19.6705C20.4304 19.9943 20.343 20.38 20.343 20.8274H18.0866C18.0866 19.9964 18.2763 19.2741 18.6555 18.6605C19.0348 18.0469 19.5568 17.5717 20.2216 17.2351C20.8906 16.8984 21.6577 16.7301 22.5227 16.7301C23.4006 16.7301 24.1719 16.8942 24.8366 17.2223C25.5014 17.5504 26.017 18 26.3835 18.571C26.7543 19.142 26.9396 19.794 26.9396 20.527C26.9396 21.017 26.8459 21.4986 26.6584 21.9716C26.4709 22.4446 26.1406 22.9687 25.6676 23.544C25.1989 24.1193 24.5405 24.8161 23.6925 25.6342L21.4361 27.929V28.0185H27.1378V30H18.1634Z" fill="black" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-ds-figma-gray-800 leading-7">Sparziel wählen</h2>
                  </div>
                  <div className="rounded-ds-16 border border-ds-figma-border-light bg-white px-3 py-2.5 shadow-ds-figma-tooltip text-[10px] leading-[15px] text-ds-neutral-70 max-w-[200px]">
                    Wähle ein Sparziel für dein Kind oder die Sparsumme, die du erreichen möchtest, manuell ein.
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 overflow-y-auto min-h-0">
                  {SPARZIELE.map((ziel) => {
                    const isSelected = sparzielId === ziel.id;
                    return (
                      <button
                        key={ziel.id}
                        type="button"
                        onClick={() => {
                          saveForUndo();
                          setSparzielId(ziel.id);
                        }}
                        className={`relative text-left p-3 rounded-ds-16 border transition-all bg-ds-figma-input-bg shadow-ds-figma-input ${
                          isSelected
                            ? "border-ds-neutral-100 border-2 shadow-sm"
                            : "border-ds-neutral-20 hover:border-ds-orange-60/40"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-semibold text-ds-figma-gray-800 text-[13px] leading-7 block">{ziel.label}</span>
                            <span className="text-ds-neutral-70 text-[13px] leading-6 block">{formatEuro(ziel.betrag)}</span>
                          </div>
                          <span className="text-xl leading-7" aria-hidden>{ziel.emoji}</span>
                        </div>
                      </button>
                    );
                  })}
                  {/* Eigenes Sparziel */}
                  <div
                    className={`relative rounded-ds-16 border transition-all bg-ds-figma-input-bg p-3 col-span-2 shadow-ds-figma-input ${
                      sparzielId === EIGENE_SUMME_ID
                        ? "border-ds-neutral-100 border-2"
                        : "border-ds-neutral-20"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        saveForUndo();
                        setSparzielId(EIGENE_SUMME_ID);
                      }}
                      className="w-full text-left"
                    >
                      <span className="text-xl block mb-1.5 text-center">✏️</span>
                      <span className="font-semibold text-ds-figma-gray-800 text-[13px] block">Eigenes Sparziel</span>
                    </button>
                    <div className="mt-2 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        aria-label="500 Euro weniger"
                        onClick={() => {
                          saveForUndo();
                          setGewuenschterZielertrag((v) => Math.max(CUSTOM_ZIEL_MIN, v - CUSTOM_ZIEL_STEP));
                          if (sparzielId !== EIGENE_SUMME_ID) setSparzielId(EIGENE_SUMME_ID);
                        }}
                        className="w-12 h-12 shrink-0 rounded-xl border border-ds-neutral-20 bg-transparent flex items-center justify-center text-ds-figma-label text-2xl font-bold hover:bg-ds-neutral-10 transition-colors"
                      >
                        −
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        aria-label="Zielertrag in Euro"
                        value={formatZielertrag(gewuenschterZielertrag)}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "");
                          const v = digits === "" ? CUSTOM_ZIEL_MIN : Math.min(CUSTOM_ZIEL_MAX, Math.max(CUSTOM_ZIEL_MIN, Number(digits)));
                          saveForUndo();
                          setGewuenschterZielertrag(v);
                          setSparzielId(EIGENE_SUMME_ID);
                        }}
                        className="flex-1 min-w-0 h-14 rounded-ds-16 border border-ds-figma-track bg-ds-figma-input-bg shadow-ds-figma-input text-lg font-semibold text-ds-figma-gray-800 text-center [appearance:textfield] placeholder:text-ds-figma-label"
                      />
                      <button
                        type="button"
                        aria-label="500 Euro mehr"
                        onClick={() => {
                          saveForUndo();
                          setGewuenschterZielertrag((v) => Math.min(CUSTOM_ZIEL_MAX, v + CUSTOM_ZIEL_STEP));
                          if (sparzielId !== EIGENE_SUMME_ID) setSparzielId(EIGENE_SUMME_ID);
                        }}
                        className="w-12 h-12 shrink-0 rounded-xl border border-ds-neutral-20 bg-transparent flex items-center justify-center text-ds-figma-label text-2xl font-bold hover:bg-ds-neutral-10 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto shrink-0 pt-4 pb-6 lg:pt-6 lg:pb-6">
                <Link
                  href="/SparplanRechner"
                  className="block rounded-ds-16 bg-ds-orange-60 text-ds-neutral-0 font-bold text-center py-3.5 px-4 hover:bg-ds-orange-70 transition-colors shadow-sm"
                >
                  Sparplan starten →
                </Link>
              </div>
            </aside>
          )}

          {/* Rechte Spalte: Desktop = Hero + Chart (wie Screenshot); Mobile = Step 1 + Step 2 + Chart */}
          <div className={`space-y-6 ${!isInvalid && monatlich > 0 ? "lg:col-span-8" : "lg:col-span-12"} lg:flex lg:flex-col lg:h-full lg:min-h-0 lg:space-y-0`}>
          {/* Desktop: Hero-Card oben (Screenshot) */}
          {!isInvalid && monatlich > 0 && (
            <div className="hidden lg:block shrink-0">{heroBlock}</div>
          )}
          {/* Step 1: nur auf Mobile sichtbar (Desktop steht in Sidebar) */}
          <section className="mb-6 md:mb-8 lg:mb-4 lg:shrink-0 lg:hidden">
            <div className="bg-white border border-ds-neutral-20 rounded-ds-lg shadow-ds-figma-input p-4 sm:p-6 lg:p-4 lg:h-[200px] lg:flex lg:flex-col lg:justify-center">
              <div className="flex items-center gap-4 mb-2 lg:mb-1.5 shrink-0">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center" aria-hidden>
                  <svg width="46" height="48" viewBox="0 0 46 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
                    <path d="M0 15.8478C0 7.09528 6.86497 0 15.3333 0H30.6667C39.135 0 46 7.09528 46 15.8478V31.6955C46 40.448 39.135 47.5433 30.6667 47.5433H15.3333C6.86497 47.5433 0 40.448 0 31.6955V15.8478Z" fill="#FFDB7C" />
                    <path d="M23.7069 30.4896V21.1719H21V19.3084C23 19.2897 23.9655 18.6934 24.2241 17.0535H26V30.4896H23.7069Z" fill="black" />
                  </svg>
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <h2 className="text-xl font-semibold text-ds-figma-gray-800 leading-7">
                    Alter des Kindes & Zielalter
                  </h2>
                  <InfoTooltip
                    label="Hinweis zu Zinseszins"
                    content="Zinseszins: Dein Guthaben wächst, weil Zinsen auf das angelegte Kapital und auf bereits gutgeschriebene Zinsen berechnet werden. So wirkt der Zinseszinseffekt über die Laufzeit."
                  />
                </div>
              </div>
              <p className="text-[15px] leading-6 text-ds-neutral-70 mb-2 lg:mb-1.5 shrink-0">
                Von 0 bis 30 Jahre. Beide Werte unabhängig einstellbar, um die Laufzeit optimal zu planen.
              </p>
              <div className="py-2 lg:py-1 shrink-0">
                <DualRangeSlider
                  min={AGE_MIN}
                  max={AGE_MAX}
                  valueLow={kindesalter}
                  valueHigh={zielalter}
                  onChangeLow={(v) => {
                    saveForUndo();
                    setKindesalter(v);
                  }}
                  onChangeHigh={(v) => {
                    saveForUndo();
                    setZielalter(v);
                  }}
                  step={1}
                  lowLabel="Startalter"
                  highLabel="Zielalter"
                />
              </div>
              {/* Laufzeit (Figma: Label 14px 570 #3B403D, Wert 16px 700 #004D40) */}
              <div className="mt-3 pt-3 lg:mt-2 lg:pt-2 border-t border-ds-figma-divider flex items-center justify-between shrink-0">
                <span className="text-sm font-semibold text-ds-neutral-90 leading-5">Laufzeit</span>
                <span className="text-base font-bold text-ds-figma-teal">{laufzeit} Jahre</span>
              </div>
            </div>
          </section>

          {/* Step 2: Sparziel wählen (Mobile) – mit Info-Box wie Screenshot */}
          <section className="lg:hidden mb-6 md:mb-8">
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center" aria-hidden>
                  <svg width="46" height="48" viewBox="0 0 46 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
                    <path d="M0 15.8478C0 7.09528 6.86497 0 15.3333 0H30.6667C39.135 0 46 7.09528 46 15.8478V31.6955C46 40.448 39.135 47.5433 30.6667 47.5433H15.3333C6.86497 47.5433 0 40.448 0 31.6955V15.8478Z" fill="#FFDB7C" />
                    <path d="M18.1634 30V28.2869L22.7081 23.8317C23.1428 23.3928 23.505 23.0028 23.7947 22.6619C24.0845 22.321 24.3018 21.9908 24.4467 21.6712C24.5916 21.3516 24.6641 21.0107 24.6641 20.6484C24.6641 20.2351 24.5703 19.8814 24.3828 19.5874C24.1953 19.2891 23.9375 19.0589 23.6094 18.897C23.2812 18.7351 22.9084 18.6541 22.4908 18.6541C22.0604 18.6541 21.6832 18.7436 21.3594 18.9226C21.0355 19.0973 20.7841 19.3466 20.6051 19.6705C20.4304 19.9943 20.343 20.38 20.343 20.8274H18.0866C18.0866 19.9964 18.2763 19.2741 18.6555 18.6605C19.0348 18.0469 19.5568 17.5717 20.2216 17.2351C20.8906 16.8984 21.6577 16.7301 22.5227 16.7301C23.4006 16.7301 24.1719 16.8942 24.8366 17.2223C25.5014 17.5504 26.017 18 26.3835 18.571C26.7543 19.142 26.9396 19.794 26.9396 20.527C26.9396 21.017 26.8459 21.4986 26.6584 21.9716C26.4709 22.4446 26.1406 22.9687 25.6676 23.544C25.1989 24.1193 24.5405 24.8161 23.6925 25.6342L21.4361 27.929V28.0185H27.1378V30H18.1634Z" fill="black" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-ds-figma-gray-800 leading-7">Sparziel wählen</h2>
              </div>
              <div className="rounded-ds-16 border border-ds-figma-border-light bg-white px-3 py-2.5 shadow-ds-figma-tooltip text-[10px] leading-[15px] text-ds-neutral-70 max-w-[220px]">
                Wähle ein Sparziel für dein Kind oder die Sparsumme, die du erreichen möchtest, manuell ein.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SPARZIELE.map((ziel) => {
                const isSelected = sparzielId === ziel.id;
                return (
                  <button
                    key={ziel.id}
                    type="button"
                    onClick={() => {
                      saveForUndo();
                      setSparzielId(ziel.id);
                    }}
                    className={`relative text-left p-3 rounded-ds-16 border transition-all bg-ds-figma-input-bg shadow-ds-figma-input ${
                      isSelected
                        ? "border-ds-neutral-100 border-2 shadow-sm"
                        : "border-ds-neutral-20 hover:border-ds-orange-60/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-semibold text-ds-figma-gray-800 text-[13px] leading-7 block">{ziel.label}</span>
                        <span className="text-ds-neutral-70 text-[13px] leading-6 block">{formatEuro(ziel.betrag)}</span>
                      </div>
                      <span className="text-xl leading-7" aria-hidden>{ziel.emoji}</span>
                    </div>
                  </button>
                );
              })}
              {/* Eigenes Sparziel */}
              <div
                className={`relative rounded-ds-16 border transition-all bg-ds-figma-input-bg p-3 col-span-2 shadow-ds-figma-input ${
                  sparzielId === EIGENE_SUMME_ID
                    ? "border-ds-neutral-100 border-2"
                    : "border-ds-neutral-20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    saveForUndo();
                    setSparzielId(EIGENE_SUMME_ID);
                  }}
                  className="w-full text-left"
                >
                  <span className="text-xl block mb-1.5 text-center">✏️</span>
                  <span className="font-semibold text-ds-figma-gray-800 text-[13px] block">Eigenes Sparziel</span>
                </button>
                <div className="mt-2 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    aria-label="500 Euro weniger"
                    onClick={() => {
                      saveForUndo();
                      setGewuenschterZielertrag((v) => Math.max(CUSTOM_ZIEL_MIN, v - CUSTOM_ZIEL_STEP));
                      if (sparzielId !== EIGENE_SUMME_ID) setSparzielId(EIGENE_SUMME_ID);
                    }}
                    className="w-12 h-12 shrink-0 rounded-xl border border-ds-neutral-20 bg-transparent flex items-center justify-center text-ds-figma-label text-2xl font-bold hover:bg-ds-neutral-10 transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    aria-label="Zielertrag in Euro"
                    value={formatZielertrag(gewuenschterZielertrag)}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      const v = digits === "" ? CUSTOM_ZIEL_MIN : Math.min(CUSTOM_ZIEL_MAX, Math.max(CUSTOM_ZIEL_MIN, Number(digits)));
                      saveForUndo();
                      setGewuenschterZielertrag(v);
                      setSparzielId(EIGENE_SUMME_ID);
                    }}
                    className="flex-1 min-w-0 h-14 rounded-ds-16 border border-ds-figma-track bg-ds-figma-input-bg shadow-ds-figma-input text-lg font-semibold text-ds-figma-gray-800 text-center [appearance:textfield] placeholder:text-ds-figma-label"
                  />
                  <button
                    type="button"
                    aria-label="500 Euro mehr"
                    onClick={() => {
                      saveForUndo();
                      setGewuenschterZielertrag((v) => Math.min(CUSTOM_ZIEL_MAX, v + CUSTOM_ZIEL_STEP));
                      if (sparzielId !== EIGENE_SUMME_ID) setSparzielId(EIGENE_SUMME_ID);
                    }}
                    className="w-12 h-12 shrink-0 rounded-xl border border-ds-neutral-20 bg-transparent flex items-center justify-center text-ds-figma-label text-2xl font-bold hover:bg-ds-neutral-10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </section>

          {isInvalid && (
            <div className="rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 p-4 text-center text-sm text-ds-neutral-70">
              Wähle ein Sparziel und einen Zeitraum (Zielalter &gt; Startalter).
            </div>
          )}

          {/* Chart (Figma: Wertentwicklung 16px 570 #3B403D, Labels 14px #6B7280, Werte 20px 600) */}
          {!isInvalid && monatlich > 0 && (
            <section className="bg-white border border-ds-neutral-20 rounded-ds-lg shadow-ds-figma-input p-4 sm:p-6 lg:p-6 lg:flex lg:flex-col lg:min-h-0 lg:flex-1">
              <h2 className="text-base font-semibold text-ds-neutral-90 leading-6 mb-4 shrink-0">Wertentwicklung</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 shrink-0">
                <div>
                  <p className="text-sm text-ds-figma-label leading-5">Endwert ({laufzeit} Jahre)</p>
                  <p className="text-xl font-semibold text-black leading-7">{formatEuro(result.endwert)}</p>
                </div>
                <div>
                  <p className="text-sm text-ds-figma-label leading-5">Ertrag</p>
                  <p className="text-xl font-semibold text-ds-seagreen leading-7">+{formatEuro(result.ertrag)}</p>
                </div>
                <div>
                  <p className="text-sm text-ds-figma-label leading-5">Einzahlung</p>
                  <p className="text-xl font-semibold text-black leading-7">{formatEuro(result.gesamtEinzahlungen)}</p>
                </div>
                <div>
                  <div className="text-sm text-ds-figma-label inline-flex items-center gap-0.5 leading-5">
                    Ø Rendite p.a.
                    <InfoTooltip
                      label="Renditeannahme und Hinweis"
                      content={`Berechnung basiert auf der Renditeannahme der Strategie „${RENDITE_STRATEGIE_NAME}“. Die tatsächliche Wertentwicklung kann abweichen; sie unterliegt Schwankungen und ist nicht garantiert.`}
                    />
                  </div>
                  <p className="text-xl font-semibold text-black leading-7">
                    ~{(RENDITE_KINDERSPARPLAN * 100).toFixed(1).replace(".", ",")}%
                  </p>
                </div>
              </div>
              <div className="h-[220px] sm:h-[260px] lg:flex-1 lg:min-h-[200px] lg:h-full border-t border-ds-figma-divider pt-4">
                <ValueChart
                  data={result.chartData}
                  view="einzahlung_ertrag"
                  fill
                  spanVariant="hellgruen"
                />
              </div>
              {/* Risikohinweis (Screenshot: border-top #F3F4F6, 12px #9CA3AF) */}
              <div className="mt-4 pt-4 border-t border-ds-figma-divider shrink-0">
                <p className="text-xs text-[#9CA3AF] leading-4">Risikohinweis</p>
              </div>
            </section>
          )}

          {lastState && (
            <button
              type="button"
              onClick={handleUndo}
              className="mt-6 text-sm text-ds-neutral-70 hover:text-ds-orange-60 underline"
            >
              ← Zurücksetzen
            </button>
          )}
          </div>
        </div>

        {/* Sticky Footer: nur auf Mobile; Desktop hat CTA in der Sidebar */}
        {!isInvalid && (
          <footer className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-ds-neutral-0 border-t border-ds-neutral-20 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs sm:text-sm text-ds-neutral-70">
                  Voraussichtlicher Endwert
                </span>
                <span className="text-lg sm:text-xl font-semibold text-ds-neutral-90 font-saans">
                  {formatEuro(result.endwert)}
                </span>
              </div>
              <Link
                href="/SparplanRechner"
                className="block w-full py-3.5 rounded-ds-16 bg-ds-orange-60 text-ds-neutral-0 font-bold text-center hover:bg-ds-orange-70 transition-colors"
              >
                Sparplan starten →
              </Link>
            </div>
          </footer>
        )}
        </div>
      </div>
    </main>
  );
}
