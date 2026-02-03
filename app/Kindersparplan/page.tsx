"use client";

import { useState, useMemo, useCallback, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import DualRangeSlider from "@/components/DualRangeSlider";
import NumberInput from "@/components/NumberInput";

/** Tooltip: ?-Button – Inhalt per Portal in document.body, oberhalb des Buttons, damit nicht abgeschnitten */
function InfoTooltip({ label, content }: { label: string; content: string }) {
  const [open, setOpen] = useState(false);
  const [tipRect, setTipRect] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => {
    if (!open) {
      const el = buttonRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        setTipRect({ left: r.left, top: r.top - 8 });
      }
    } else {
      setTipRect(null);
    }
    setOpen((o) => !o);
  }, [open]);

  const tooltipContent =
    open &&
    tipRect != null &&
    typeof document !== "undefined" &&
    createPortal(
      <>
        <div
          className="fixed inset-0 z-[9998]"
          aria-hidden
          onClick={() => { setOpen(false); setTipRect(null); }}
        />
        <div
          role="tooltip"
          className="fixed z-[9999] min-w-[194px] max-w-[280px] p-3 rounded-ds-16 border border-ds-figma-border-light bg-white shadow-ds-figma-tooltip text-[10px] leading-[15px] text-ds-neutral-70"
          style={{
            left: tipRect.left,
            top: tipRect.top,
            transform: "translateY(-100%)",
          }}
        >
          {content}
        </div>
      </>,
      document.body
    );

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        onClick={handleToggle}
        className="ml-1.5 w-[21px] h-[21px] rounded-full border-2 border-ds-figma-info-border text-ds-figma-info-border hover:bg-ds-neutral-10 font-black text-[12px] inline-flex items-center justify-center transition-colors"
      >
        i
      </button>
      {tooltipContent}
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
const CUSTOM_ZIEL_DEFAULT = 24000;
/** Bei „kein Sparziel“: Default-Sparsumme (€/Monat); Voraussichtlicher Endwert entspricht dieser Rate. */
const DEFAULT_MONATLICH_OHNE_SPARZIEL = 50;

const RISIKOHINWEIS_TEXT =
  "Die dargestellte Wertentwicklung bezieht sich auf die gewählte Beispielstrategie. Grundlage der Entwicklung sind die Evergreen Sustainable World Fonds. Vergangene Wertentwicklungen, einschließlich simulierten oder prognostizierten Renditen, sind kein verlässlicher Indikator für die Zukunft. Der Wert einer Anlage kann schwanken und Anlegende können Verluste bis hin zum Totalverlust erleiden. Diese Darstellung stellt keine Anlageberatung oder Kaufempfehlung dar. Sie dient ausschließlich der Information und berücksichtigt keine individuellen Anlageziele oder finanziellen Verhältnisse. Vor einer Investition sollten die gesetzlichen Verkaufsunterlagen auf https://www.evergreen.de/download/fonds sorgfältig gelesen werden. Die Evergreen GmbH ist ein von der BaFin zugelassenes Wertpapierinstitut gemäß § 15 WpIG.";

/** Ungefähre Höhe des Mobile-Hero (Spacer vor erstem Paint). */
const MOBILE_HERO_SPACER_FALLBACK = 170;

export default function KindersparplanPage() {
  const [kindesalter, setKindesalter] = useState(DEFAULT_START);
  const [zielalter, setZielalter] = useState(DEFAULT_ZIEL);
  const [sparzielId, setSparzielId] = useState<string>(KEIN_SPARZIEL_ID);
  /** Bei „Eigenes Sparziel“: Zielbetrag in €; monatliche Sparsumme wird daraus berechnet. */
  const [gewuenschterZielertrag, setGewuenschterZielertrag] = useState(CUSTOM_ZIEL_DEFAULT);
  /** Gemessene Höhe des fixed Hero (Mobile), für Spacer. */
  const [mobileHeroHeight, setMobileHeroHeight] = useState(MOBILE_HERO_SPACER_FALLBACK);
  const mobileHeroRef = useRef<HTMLDivElement>(null);

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

  const renditePct = "~".concat((RENDITE_KINDERSPARPLAN * 100).toFixed(1).replace(".", ","), "%");

  /** Hero-Inhalt: weiß wie andere Cards, keine Hintergrund-Textur */
  const heroContent = !isInvalid && monatlich > 0 && (
    <>
      <div className="relative flex flex-col items-start gap-2 p-0">
        <div className="flex w-full flex-none flex-row items-start justify-between gap-4">
          <p className="flex items-center font-saans text-base leading-6 text-[#616A65]" style={{ fontWeight: 380 }}>
            Deine monatliche Sparsumme
          </p>
          <div className="h-6 w-[84px] flex-none" aria-hidden />
        </div>
        <div className="relative w-full flex-none">
          <div className="absolute left-0 top-0 flex h-[52px] w-[52px] items-center justify-center rounded-[17.33px] bg-[#10201B]" aria-hidden>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2">
              <path d="M35.3288 25.86V19.7723M35.3288 19.7723H29.2399M35.3288 19.7723L27.5844 27.5167L22.9178 22.85L16.8534 28.9132M16.6621 16.662V32.3257C16.6621 33.9823 18.0049 35.3252 19.6616 35.3252H35.3288" stroke="white" strokeWidth="1.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="pl-[78px] font-saans text-[57px] font-semibold leading-[48px] tracking-[-1.2px] text-[#3B403D]">{formatEuro(monatlich)}</p>
        </div>
        <p className="pl-0 font-saans flex items-baseline gap-2">
          <span className="text-sm font-semibold text-ds-neutral-90 leading-5">Voraussichtlicher Endwert</span>
          <span className="text-lg font-bold text-ds-figma-teal leading-7">{formatEuro(result.endwert)}</span>
        </p>
      </div>
    </>
  );
  const heroBlock = heroContent && (
    <div className="relative overflow-hidden rounded-ds-lg border border-ds-neutral-20 bg-white p-6 shadow-ds-figma-input lg:h-[200px] lg:flex lg:flex-col lg:justify-center">
      {heroContent}
    </div>
  );

  const showMobileHero = Boolean(!isInvalid && monatlich > 0);
  /** Mobile: Höhe des fixed Hero messen für Spacer. */
  useLayoutEffect(() => {
    if (!showMobileHero || !mobileHeroRef.current) return;
    const el = mobileHeroRef.current;
    const onResize = () => setMobileHeroHeight(el.offsetHeight);
    onResize();
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [showMobileHero, monatlich]);

  return (
    <main className="h-[850px] overflow-x-hidden overflow-y-hidden bg-[#FDFBF7] lg:bg-[#FFF9EB] font-saans flex flex-col shrink-0 p-0 w-full">
      {/* Mobil: Wrapper = volle Breite (100%), kein Padding. Desktop: max-w + Padding. */}
      <div className="w-full min-w-0 lg:max-w-[90rem] lg:mx-auto pl-0 pr-0 pt-0 lg:px-8 lg:pt-0 h-full min-h-0 flex flex-col overflow-x-hidden">
        <div className={`flex-1 min-h-[300px] flex flex-col overflow-y-auto overflow-x-hidden bg-[#FDFBF7] p-4 sm:p-5 lg:mt-4 lg:rounded-[48px] lg:shadow-ds-figma-card lg:border-0 lg:border-b-0 lg:p-8 lg:pt-8 ${heroContent ? "mt-0 lg:mt-4 rounded-none shadow-none border-0" : "mt-2 lg:mt-4"}`}>
          {/* Mobile: Fixed Hero viewport-bündig (oben/rechts/links), Spacer hält Scroll-Inhalt darunter */}
          {heroContent && (
            <>
              <div
                ref={mobileHeroRef}
                className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-ds-neutral-20 pt-[max(1rem,env(safe-area-inset-top))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-4 px-4 sm:px-5 sm:pt-[max(1.25rem,env(safe-area-inset-top))]"
              >
                <div className="max-w-[90rem] mx-auto relative">{heroContent}</div>
              </div>
              <div
                className="lg:hidden shrink-0 w-full"
                style={{ minHeight: mobileHeroHeight }}
                aria-hidden
              />
            </>
          )}
        <div
          className="relative z-20 flex-1 min-h-0 pt-4 lg:pt-2 lg:grid lg:grid-cols-2 lg:gap-6 lg:items-stretch"
        >
          {/* Desktop: Linke Spalte = Step 1 + Step 2 + CTA (wie Screenshot) */}
          {!isInvalid && monatlich > 0 && (
            <aside className="hidden lg:flex lg:flex-col lg:h-full lg:gap-6">
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
                        Alter des Kindes eingeben
                      </h2>
                      <InfoTooltip
                        label="Hinweis zu Zinseszins"
                        content="Zinseszins: Dein Guthaben wächst, weil Zinsen auf das angelegte Kapital und auf bereits gutgeschriebene Zinsen berechnet werden. So wirkt der Zinseszinseffekt über die Laufzeit."
                      />
                    </div>
                  </div>
                  <p className="text-[15px] leading-6 text-ds-neutral-70 mb-4">
                    Wie alt ist dein Kind und bis zu welchem Alter möchtest du sparen?
                  </p>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-ds-neutral-90 leading-5">Aktuelles Alter</span>
                      <span className="text-lg font-bold text-ds-figma-teal leading-7">{kindesalter} Jahre</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-ds-neutral-90 leading-5">Zielalter</span>
                      <span className="text-lg font-bold text-ds-figma-teal leading-7">{zielalter} Jahre</span>
                    </div>
                  </div>
                  <div className="py-2">
                    <DualRangeSlider
                      min={AGE_MIN}
                      max={AGE_MAX}
                      valueLow={kindesalter}
                      valueHigh={zielalter}
                      onChangeLow={(v) => { saveForUndo(); setKindesalter(v); }}
                      onChangeHigh={(v) => { saveForUndo(); setZielalter(v); }}
                      step={1}
                      lowLabel="Aktuelles Alter"
                      highLabel="Zielalter"
                      hideLegend
                    />
                    <p className="mt-1 grid grid-cols-3 text-[11px] text-ds-neutral-70 leading-4">
                      <span className="text-left">0</span>
                      <span className="text-center">15</span>
                      <span className="text-right">30 Jahre</span>
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-ds-neutral-20 flex items-center justify-between">
                    <span className="text-sm font-semibold text-ds-neutral-90 leading-5">Laufzeit</span>
                    <span className="text-lg font-bold text-ds-figma-teal leading-7">{laufzeit} Jahre</span>
                  </div>
                </div>
              </section>
              {/* Step 2: Sparziel wählen – Eigenes Sparziel mittig zwischen Überschrift und 4 Cards, Rand um Card */}
              <section className="flex-1 min-h-0 flex flex-col">
                <div className="bg-white border border-ds-neutral-20 rounded-ds-lg shadow-ds-figma-input p-5 lg:p-6 h-full flex flex-col min-h-0 overflow-hidden">
                  <div className="flex items-center gap-3 shrink-0 mb-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 shrink-0 flex items-center justify-center" aria-hidden>
                        <svg width="46" height="48" viewBox="0 0 46 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
                          <path d="M0 15.8478C0 7.09528 6.86497 0 15.3333 0H30.6667C39.135 0 46 7.09528 46 15.8478V31.6955C46 40.448 39.135 47.5433 30.6667 47.5433H15.3333C6.86497 47.5433 0 40.448 0 31.6955V15.8478Z" fill="#FFDB7C" />
                          <path d="M18.1634 30V28.2869L22.7081 23.8317C23.1428 23.3928 23.505 23.0028 23.7947 22.6619C24.0845 22.321 24.3018 21.9908 24.4467 21.6712C24.5916 21.3516 24.6641 21.0107 24.6641 20.6484C24.6641 20.2351 24.5703 19.8814 24.3828 19.5874C24.1953 19.2891 23.9375 19.0589 23.6094 18.897C23.2812 18.7351 22.9084 18.6541 22.4908 18.6541C22.0604 18.6541 21.6832 18.7436 21.3594 18.9226C21.0355 19.0973 20.7841 19.3466 20.6051 19.6705C20.4304 19.9943 20.343 20.38 20.343 20.8274H18.0866C18.0866 19.9964 18.2763 19.2741 18.6555 18.6605C19.0348 18.0469 19.5568 17.5717 20.2216 17.2351C20.8906 16.8984 21.6577 16.7301 22.5227 16.7301C23.4006 16.7301 24.1719 16.8942 24.8366 17.2223C25.5014 17.5504 26.017 18 26.3835 18.571C26.7543 19.142 26.9396 19.794 26.9396 20.527C26.9396 21.017 26.8459 21.4986 26.6584 21.9716C26.4709 22.4446 26.1406 22.9687 25.6676 23.544C25.1989 24.1193 24.5405 24.8161 23.6925 25.6342L21.4361 27.929V28.0185H27.1378V30H18.1634Z" fill="black" />
                        </svg>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h2 className="text-xl font-semibold text-ds-figma-gray-800 leading-7">Sparziel wählen</h2>
                        <InfoTooltip
                          label="Sparziel"
                          content="Wähle ein Sparziel für dein Kind oder die Sparsumme, die du erreichen möchtest, manuell ein."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                    <div className="flex-1 min-h-0 shrink-0" aria-hidden />
                    <div className="flex shrink-0 flex-col items-center justify-center py-2">
                      <div className="w-full space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            saveForUndo();
                            setSparzielId(EIGENE_SUMME_ID);
                          }}
                          className="w-full text-left"
                        >
                          <span className="font-semibold text-ds-figma-gray-800 text-[13px] block">Eigenes Sparziel</span>
                        </button>
                        <div onClick={(e) => e.stopPropagation()}>
                          <NumberInput
                            value={gewuenschterZielertrag}
                            onChange={(v) => {
                              saveForUndo();
                              setGewuenschterZielertrag(v);
                              setSparzielId(EIGENE_SUMME_ID);
                            }}
                            min={CUSTOM_ZIEL_MIN}
                            max={CUSTOM_ZIEL_MAX}
                            step={CUSTOM_ZIEL_STEP}
                            unit="€"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-h-0 shrink-0" aria-hidden />
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4 shrink-0">
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
                        className={`relative box-border flex min-h-[92px] w-full min-w-0 flex-col items-start justify-center gap-1 rounded-[16px] border bg-[#F9FAFB] pt-4 pr-12 pb-4 pl-6 text-left shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-all ${
                          isSelected
                            ? "border-2 border-[#022011]"
                            : "border border-[#022011] hover:border-ds-orange-60/40"
                        }`}
                      >
                        <span className="font-saans text-[13px] font-semibold leading-7 text-[#1F2937]">{ziel.label}</span>
                        <span className="font-saans text-[13px] font-normal leading-6 text-[#616A65]">{formatEuro(ziel.betrag)}</span>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl leading-7 text-[#1F2937]" aria-hidden>{ziel.emoji}</span>
                      </button>
                    );
                  })}
                </div>
                  </div>
                </div>
              </section>
            </aside>
          )}

          {/* Rechte Spalte: Desktop = Hero + Chart (wie Screenshot); Mobile = Step 1 + Step 2 + Chart */}
          <div className={`space-y-5 lg:flex lg:flex-col lg:gap-5 lg:h-full lg:min-h-0 lg:space-y-0`}>
          {/* Desktop: Hero-Card oben (Screenshot) */}
          {!isInvalid && monatlich > 0 && (
            <div className="hidden lg:block shrink-0">{heroBlock}</div>
          )}
          {/* Step 1: nur auf Mobile sichtbar (Desktop steht in Sidebar) */}
          <section className="mb-5 lg:shrink-0 lg:hidden">
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
                    Alter des Kindes eingeben
                  </h2>
                  <InfoTooltip
                    label="Hinweis zu Zinseszins"
                    content="Zinseszins: Dein Guthaben wächst, weil Zinsen auf das angelegte Kapital und auf bereits gutgeschriebene Zinsen berechnet werden. So wirkt der Zinseszinseffekt über die Laufzeit."
                  />
                </div>
              </div>
              <p className="text-[15px] leading-6 text-ds-neutral-70 mb-4 shrink-0">
                Wie alt ist dein Kind und bis zu welchem Alter möchtest du sparen?
              </p>
              <div className="mb-2 flex items-center justify-between shrink-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-ds-neutral-90 leading-5">Aktuelles Alter</span>
                  <span className="text-lg font-bold text-ds-figma-teal leading-7">{kindesalter} Jahre</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-ds-neutral-90 leading-5">Zielalter</span>
                  <span className="text-lg font-bold text-ds-figma-teal leading-7">{zielalter} Jahre</span>
                </div>
              </div>
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
                  lowLabel="Aktuelles Alter"
                  highLabel="Zielalter"
                  hideLegend
                />
                <p className="mt-1 grid grid-cols-3 text-[11px] text-ds-neutral-70 leading-4">
                      <span className="text-left">0</span>
                      <span className="text-center">15</span>
                      <span className="text-right">30 Jahre</span>
                    </p>
              </div>
              <div className="mt-3 pt-3 border-t border-ds-neutral-20 flex items-center justify-between shrink-0">
                <span className="text-sm font-semibold text-ds-neutral-90 leading-5">Laufzeit</span>
                <span className="text-lg font-bold text-ds-figma-teal leading-7">{laufzeit} Jahre</span>
              </div>
            </div>
          </section>

          {/* Step 2: Sparziel wählen (Mobile) – Card wie Desktop */}
          <section className="lg:hidden mb-5">
            <div className="bg-white border border-ds-neutral-20 rounded-ds-lg shadow-ds-figma-input p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center" aria-hidden>
                    <svg width="46" height="48" viewBox="0 0 46 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
                      <path d="M0 15.8478C0 7.09528 6.86497 0 15.3333 0H30.6667C39.135 0 46 7.09528 46 15.8478V31.6955C46 40.448 39.135 47.5433 30.6667 47.5433H15.3333C6.86497 47.5433 0 40.448 0 31.6955V15.8478Z" fill="#FFDB7C" />
                      <path d="M18.1634 30V28.2869L22.7081 23.8317C23.1428 23.3928 23.505 23.0028 23.7947 22.6619C24.0845 22.321 24.3018 21.9908 24.4467 21.6712C24.5916 21.3516 24.6641 21.0107 24.6641 20.6484C24.6641 20.2351 24.5703 19.8814 24.3828 19.5874C24.1953 19.2891 23.9375 19.0589 23.6094 18.897C23.2812 18.7351 22.9084 18.6541 22.4908 18.6541C22.0604 18.6541 21.6832 18.7436 21.3594 18.9226C21.0355 19.0973 20.7841 19.3466 20.6051 19.6705C20.4304 19.9943 20.343 20.38 20.343 20.8274H18.0866C18.0866 19.9964 18.2763 19.2741 18.6555 18.6605C19.0348 18.0469 19.5568 17.5717 20.2216 17.2351C20.8906 16.8984 21.6577 16.7301 22.5227 16.7301C23.4006 16.7301 24.1719 16.8942 24.8366 17.2223C25.5014 17.5504 26.017 18 26.3835 18.571C26.7543 19.142 26.9396 19.794 26.9396 20.527C26.9396 21.017 26.8459 21.4986 26.6584 21.9716C26.4709 22.4446 26.1406 22.9687 25.6676 23.544C25.1989 24.1193 24.5405 24.8161 23.6925 25.6342L21.4361 27.929V28.0185H27.1378V30H18.1634Z" fill="black" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <h2 className="text-xl font-semibold text-ds-figma-gray-800 leading-7">Sparziel wählen</h2>
                    <InfoTooltip
                      label="Sparziel"
                      content="Wähle ein Sparziel für dein Kind oder die Sparsumme, die du erreichen möchtest, manuell ein."
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              {/* Eigenes Sparziel: mehr Abstand auf Mobil um die Eingabe */}
              <div className="col-span-2 space-y-3 py-4">
                <button
                  type="button"
                  onClick={() => {
                    saveForUndo();
                    setSparzielId(EIGENE_SUMME_ID);
                  }}
                  className="w-full text-left"
                >
                  <span className="font-semibold text-ds-figma-gray-800 text-[13px] block">Eigenes Sparziel</span>
                </button>
                <div onClick={(e) => e.stopPropagation()}>
                  <NumberInput
                    value={gewuenschterZielertrag}
                    onChange={(v) => {
                      saveForUndo();
                      setGewuenschterZielertrag(v);
                      setSparzielId(EIGENE_SUMME_ID);
                    }}
                    min={CUSTOM_ZIEL_MIN}
                    max={CUSTOM_ZIEL_MAX}
                    step={CUSTOM_ZIEL_STEP}
                    unit="€"
                  />
                </div>
              </div>
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
                    className={`relative box-border flex min-h-[92px] w-full min-w-0 flex-col items-start justify-center gap-1 rounded-[16px] border bg-[#F9FAFB] pt-4 pr-12 pb-4 pl-6 text-left shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-all ${
                      isSelected
                        ? "border-2 border-[#022011]"
                        : "border border-[#022011] hover:border-ds-orange-60/40"
                    }`}
                  >
                    <span className="font-saans text-[13px] font-semibold leading-7 text-[#1F2937] min-w-0 truncate block w-full">{ziel.label}</span>
                    <span className="font-saans text-[13px] font-normal leading-6 text-[#616A65] min-w-0 truncate block w-full">{formatEuro(ziel.betrag)}</span>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl leading-7 text-[#1F2937]" aria-hidden>{ziel.emoji}</span>
                  </button>
                );
              })}
              </div>
            </div>
          </section>

          {isInvalid && (
            <div className="rounded-ds-16 border border-ds-neutral-20 bg-ds-neutral-10 p-4 text-center text-sm text-ds-neutral-70">
              Wähle ein Sparziel und einen Zeitraum (Zielalter &gt; Startalter).
            </div>
          )}

          {/* Chart: KPI kompakt, Legende + Risikohinweis in einer Zeile */}
          {!isInvalid && monatlich > 0 && (
            <section className="bg-white border border-ds-neutral-20 rounded-ds-lg shadow-ds-figma-input p-4 sm:p-6 lg:p-6 lg:flex lg:flex-col lg:min-h-0 lg:flex-1">
              <h2 className="text-base font-semibold text-ds-neutral-90 leading-6 mb-2 shrink-0">Wertentwicklung</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 shrink-0">
                <div>
                  <p className="text-xs sm:text-sm text-ds-figma-label leading-5">Endwert ({laufzeit} Jahre)</p>
                  <p className="text-lg sm:text-xl font-semibold text-black leading-7">{formatEuro(result.endwert)}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-ds-figma-label leading-5">Ertrag</p>
                  <p className="text-lg sm:text-xl font-semibold text-ds-seagreen leading-7">+{formatEuro(result.ertrag)}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-ds-figma-label leading-5">Einzahlung</p>
                  <p className="text-lg sm:text-xl font-semibold text-black leading-7">{formatEuro(result.gesamtEinzahlungen)}</p>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-ds-figma-label inline-flex items-center gap-0.5 leading-5">
                    Ø Rendite p.a.
                    <InfoTooltip
                      label="Renditeannahme und Hinweis"
                      content={"Berechnung basiert auf der Renditeannahme der Strategie \u201E".concat(RENDITE_STRATEGIE_NAME, "\u201C. Die tatsächliche Wertentwicklung kann abweichen; sie unterliegt Schwankungen und ist nicht garantiert.")}
                    />
                  </div>
                  <p className="text-lg sm:text-xl font-semibold text-black leading-7">{renditePct}</p>
                </div>
              </div>
              <div className="h-[240px] sm:h-[280px] lg:flex-1 lg:min-h-[220px] lg:h-full border-t border-ds-figma-divider pt-2">
                <ValueChart
                  data={result.chartData}
                  view="gesamtwert"
                  fill
                  spanVariant="hellgruen"
                  useFigmaColors
                  hideLegend
                />
              </div>
              {/* Legende + Risikohinweis */}
              <div className="mt-2 pt-2 border-t border-ds-figma-divider shrink-0 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-ds-neutral-90">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 shrink-0 rounded-full bg-[#ACB100]" style={{ height: 3 }} />
                    <span>Entwicklung Gesamtwert</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-[#9CA3AF] leading-4">Risikohinweis</span>
                  <InfoTooltip label="Risikohinweis" content={RISIKOHINWEIS_TEXT} />
                </div>
              </div>
            </section>
          )}

        </div>
        </div>
        </div>
      </div>
    </main>
  );
}
