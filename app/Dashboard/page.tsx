"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { PocketCard } from "@/components/PocketCard";

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

export default function DashboardPage() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [einAuszahlungExpanded, setEinAuszahlungExpanded] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const last = lastScrollYRef.current;
      setNavVisible(current <= last || current < 50);
      lastScrollYRef.current = current;
    };
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-ds-app-bg font-saans pb-[calc(5rem+env(safe-area-inset-bottom))]">
      {/* Sticky Header + Account Card */}
      <div className="sticky top-0 z-50">
        {/* Header – #022011 (ds-neutral-100) */}
        <header className="bg-ds-neutral-100 px-4 pt-4 pb-24 rounded-b-ds-lg">
          <div className="flex items-center justify-between h-16">
            <svg
              width="127"
              height="22"
              viewBox="0 0 127 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-auto"
              aria-label="evergreen"
            >
              <path d="M12.9119 12.6504C12.1372 14.2983 9.69865 16.3173 6.13917 16.3173C2.32425 16.3173 0 14.2134 0 10.5481C0 6.25528 3.67376 2.10729 9.097 2.10729C11.4784 2.10729 13.5455 3.21586 13.5455 5.37475C13.5455 9.29636 8.32225 10.8311 4.82159 11.2588C5.39467 12.5089 6.60133 13.2762 8.03487 13.2762C9.72722 13.2762 10.991 12.6221 12.0817 11.8264C12.7993 11.2588 13.3438 11.7415 12.9136 12.6504H12.9119ZM4.2754 8.67217C4.2754 9.18317 4.50564 9.38292 4.99301 9.32632C6.34084 9.12658 9.92889 8.35923 9.92889 5.88742C9.92889 4.86374 9.21128 3.9832 7.97773 3.9832C5.62491 3.9832 4.2754 6.39843 4.2754 8.67217ZM28.1498 2.39026C29.0388 2.39026 29.5278 2.59 29.5278 3.1859C29.5278 4.43595 28.2943 3.89665 27.375 6.25528L24.2475 14.5546C23.9601 15.3219 23.7601 15.6632 22.1249 16.0327C20.3451 16.4588 19.8863 16.1459 19.5704 15.3219L15.9555 6.25528C15.0379 3.89665 13.7741 4.43595 13.7741 3.1859C13.7741 2.53174 14.29 2.39026 15.0933 2.39026H20.0292C20.9182 2.39026 21.4358 2.59 21.4358 3.1859C21.4358 4.43595 19.8292 3.89665 20.7468 6.25528L23.0996 12.2243L25.3096 6.28357C26.17 3.89665 24.6205 4.43595 24.6205 3.1859C24.6205 2.53174 25.1079 2.39026 25.9398 2.39026H28.1498ZM41.8364 12.1677C41.2919 13.8438 38.8232 16.3173 34.8923 16.3173C30.9614 16.3173 28.0052 13.5609 28.0052 9.60929C28.0052 5.20496 31.6202 2.10562 35.4939 2.10562C39.1089 2.10562 41.0314 4.29447 41.376 6.70969C41.4331 7.13581 41.2045 7.56193 40.7155 7.78997C37.8753 9.15488 35.8939 9.97881 33.0823 11.0591C33.6856 12.1677 34.862 13.1614 36.8703 13.1614C38.5341 13.1614 39.855 12.3091 40.8886 11.3421C41.5205 10.7445 42.1221 11.2855 41.8348 12.166L41.8364 12.1677ZM32.1664 7.39215C32.1664 7.98971 32.2806 8.75706 32.4252 9.21147C33.7444 8.75706 35.0939 8.27434 36.3561 7.67678C36.8434 7.44874 37.3325 7.27896 37.0737 6.42672C36.6149 4.83544 35.3528 3.89665 34.0604 4.23788C32.8554 4.52251 32.1664 5.71597 32.1664 7.39215ZM54.1753 4.80714C54.1753 6.11379 53.5148 6.90944 52.6544 6.90944C51.1334 6.90944 51.2191 5.31815 49.7856 5.31815C48.868 5.31815 48.063 6.22698 48.063 8.0746V11.9962C48.063 14.5829 49.4696 13.8721 49.4696 15.237C49.4696 15.8912 48.9823 16.0327 48.1504 16.0327H43.5019C42.6414 16.0327 42.1238 15.8329 42.1238 15.2087C42.1238 13.8738 43.559 14.5829 43.559 11.9979V6.73965C43.559 6.0289 43.1288 5.60278 42.67 5.20496C42.4112 5.00522 42.1255 4.77885 42.1255 4.32443C42.1255 3.81342 42.3843 3.58538 43.0717 3.27245C44.1909 2.76144 46.3723 2.13558 46.8597 2.10729C47.3756 2.10729 47.5773 2.44851 47.5773 3.07271V4.46592C48.7252 2.75978 50.2175 2.10729 51.4796 2.10729C53.172 2.10729 54.177 3.21586 54.177 4.80714H54.1753ZM69.3543 16.8566C69.3543 20.0109 65.7965 22 60.8892 22C57.8759 22 54.3181 21.0629 54.3181 18.646C54.3181 17.7655 54.9786 16.8833 56.0693 16.4571C54.9786 15.9461 54.2896 15.0922 54.2896 13.9554C54.2896 12.8185 54.9786 11.9097 56.4995 11.1706C55.266 10.4316 54.5198 9.2381 54.5198 7.70341C54.5198 4.77552 57.4188 2.21881 61.3211 2.10396H62.2387C62.7832 2.13225 63.0992 2.18885 63.5882 2.18885C64.2201 2.18885 65.1949 1.9891 66.3713 0.710751C66.7158 0.284633 67.1175 0 67.6905 0C68.3796 0 68.9527 0.539305 68.9527 1.27835C68.9527 2.67156 67.4032 3.29576 66.0251 3.4672C66.9998 4.29114 67.5746 5.45631 67.5746 6.87781C67.5746 9.8906 64.8772 12.0794 61.0035 12.1926C59.9414 12.2209 58.9666 12.1077 58.0759 11.8514C57.7885 12.0794 57.6171 12.3907 57.6171 12.7036C57.6171 13.4993 58.4776 13.7273 59.7397 13.7273C61.3749 13.7273 63.958 13.4144 65.3058 13.4144C67.9174 13.4144 69.3526 14.8359 69.3526 16.8533L69.3543 16.8566ZM65.4234 18.2781C65.4234 17.6806 65.0218 17.2261 63.9882 17.2544C62.237 17.2544 61.0035 17.4525 59.2826 17.3959C58.565 17.3676 57.8474 17.624 57.8474 18.4479C57.8474 19.5565 59.3397 20.0958 61.6925 20.0958C64.4184 20.0958 65.4234 19.3284 65.4234 18.2765V18.2781ZM58.8221 6.37013C58.8221 8.47242 59.6254 10.5198 61.4623 10.5198C62.5244 10.5198 63.2706 9.58266 63.2706 7.93312C63.2706 6.14209 62.4673 3.84005 60.6875 3.84005C59.5683 3.84005 58.8221 4.92033 58.8221 6.37013ZM81.7217 4.80714C81.7217 6.11379 81.0613 6.90944 80.2008 6.90944C78.6799 6.90944 78.7656 5.31815 77.332 5.31815C76.4144 5.31815 75.6094 6.22698 75.6094 8.0746V11.9962C75.6094 14.5829 77.0161 13.8721 77.0161 15.237C77.0161 15.8912 76.5287 16.0327 75.6968 16.0327H71.0483C70.1879 16.0327 69.6703 15.8329 69.6703 15.2087C69.6703 13.8738 71.1055 14.5829 71.1055 11.9979V6.73965C71.1055 6.0289 70.6753 5.60278 70.2165 5.20496C69.9576 5.00522 69.6719 4.77885 69.6719 4.32443C69.6719 3.81342 69.9308 3.58538 70.6181 3.27245C71.7374 2.76144 73.9188 2.13558 74.4061 2.10729C74.9221 2.10729 75.1238 2.44851 75.1238 3.07271V4.46592C76.2716 2.75978 77.764 2.10729 79.0261 2.10729C80.7184 2.10729 81.7234 3.21586 81.7234 4.80714H81.7217ZM95.0067 12.1677C94.4622 13.8438 91.9935 16.3173 88.0626 16.3173C84.1317 16.3173 81.1755 13.5609 81.1755 9.60929C81.1755 5.20496 84.7905 2.10562 88.6642 2.10562C92.2792 2.10562 94.2017 4.29447 94.5463 6.70969C94.6034 7.13581 94.3748 7.56193 93.8858 7.78997C91.0456 9.15488 89.0642 9.97881 86.2526 11.0591C86.8542 12.1677 88.0323 13.1614 90.0406 13.1614C91.7044 13.1614 93.0253 12.3091 94.0572 11.3421C94.6891 10.7445 95.2908 11.2855 95.0034 12.166L95.0067 12.1677ZM85.3367 7.39215C85.3367 7.98971 85.4509 8.75706 85.5955 9.21147C86.9147 8.75706 88.2642 8.27434 89.5264 7.67678C90.0137 7.44874 90.5011 7.27896 90.244 6.42672C89.7852 4.83544 88.5214 3.89665 87.2307 4.23788C86.0257 4.52251 85.3367 5.71597 85.3367 7.39215ZM109.354 12.1677C108.809 13.8438 106.341 16.3173 102.41 16.3173C98.4788 16.3173 95.5227 13.5609 95.5227 9.60929C95.5227 5.20496 99.1376 2.10562 103.011 2.10562C106.626 2.10562 108.549 4.29447 108.893 6.70969C108.951 7.13581 108.722 7.56193 108.233 7.78997C105.393 9.15488 103.411 9.97881 100.6 11.0591C101.203 12.1677 102.379 13.1614 104.388 13.1614C106.052 13.1614 107.372 12.3091 108.406 11.3421C109.038 10.7445 109.64 11.2855 109.352 12.166L109.354 12.1677ZM99.6838 7.39215C99.6838 7.98971 99.7981 8.75706 99.9426 9.21147C101.262 8.75706 102.611 8.27434 103.873 7.67678C104.361 7.44874 104.85 7.27896 104.591 6.42672C104.132 4.83544 102.87 3.89665 101.578 4.23788C100.373 4.52251 99.6838 5.71597 99.6838 7.39215ZM125.508 12.6787C125.881 14.4131 127 14.1568 127 15.237C127 15.8912 126.484 16.0327 125.681 16.0327H121.175C120.315 16.0327 119.797 15.8329 119.797 15.2087C119.797 14.2134 121.318 14.2433 120.916 12.3957L119.999 8.01967C119.654 6.45668 119.081 4.92199 117.532 4.95029C116.184 4.95029 115.122 6.17205 115.122 8.16116V11.9979C115.122 14.5845 116.528 13.8738 116.528 15.2387C116.528 15.8929 116.041 16.0343 115.209 16.0343H110.561C109.7 16.0343 109.182 15.8346 109.182 15.2104C109.182 13.8755 110.618 14.5846 110.618 11.9995V6.74132C110.618 6.03057 110.187 5.60445 109.729 5.20663C109.47 5.00689 109.184 4.78051 109.184 4.3261C109.184 3.81509 109.443 3.58705 110.13 3.27412C111.25 2.76311 113.431 2.13725 113.918 2.10895C114.434 2.10895 114.636 2.45018 114.636 3.07437V4.46758C115.698 2.90459 117.333 2.10895 119.17 2.10895C122.642 2.10895 123.733 4.46758 124.479 7.90648L125.513 12.682L125.508 12.6787Z" fill="white" />
            </svg>
            <div className="flex items-center gap-4">
              <button type="button" className="relative p-2 text-ds-neutral-0" aria-label="Benachrichtigungen">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-ds-orange-60" />
              </button>
              <button type="button" className="p-2 text-ds-neutral-0" aria-label="Hilfe">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button
                type="button"
                className="p-2 text-ds-neutral-0"
                aria-label="Menü"
                onClick={() => setMenuOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Account Summary Card – mittig, gleiche Abstände links/rechts */}
        <section className="px-4 -mt-20 pb-0 font-saans flex justify-center">
          <div className="flex flex-row items-start p-5 min-h-[141px] w-full max-w-[335px] bg-ds-neutral-0 rounded-2xl shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
            {/* Labels | Values – gap 74px */}
            <div className="flex flex-row items-start gap-8 md:gap-[74px] flex-1 min-w-0">
              {/* Labels – 12px, weight 380, #6B7280 */}
              <div className="flex flex-col items-start gap-4 shrink-0">
                <span className="text-xs font-normal text-pocket-gray leading-4">Gesamtvermögen</span>
                <span className="text-xs font-normal text-pocket-gray leading-4">Ein- & Auszahlungen</span>
                {einAuszahlungExpanded && (
                  <>
                    <span className="text-xs font-normal text-pocket-gray leading-4 pl-6">Einzahlung</span>
                    <span className="text-xs font-normal text-pocket-gray leading-4 pl-6">Auszahlung</span>
                  </>
                )}
                <span className="text-xs font-normal text-pocket-gray leading-4">Ertrag</span>
              </div>
              {/* Values – rechts am Card-Rand, gleicher Abstand, Pfeil rechts vom Wert */}
              <div className="flex flex-col items-end gap-4 flex-1 min-w-0 pr-0">
                <span className="text-[21px] font-[670] text-ds-neutral-100 leading-4 tabular-nums text-right">{formatCurrency(8467.98)}</span>
                <button
                  type="button"
                  onClick={() => setEinAuszahlungExpanded((e) => !e)}
                  className="flex items-center justify-end gap-1.5 text-base font-normal text-ds-neutral-70 leading-4 tabular-nums hover:text-ds-neutral-100 transition-colors"
                  aria-expanded={einAuszahlungExpanded}
                  aria-label={einAuszahlungExpanded ? "Ein- und Auszahlungen einklappen" : "Ein- und Auszahlungen aufklappen"}
                >
                  <span className="tabular-nums text-right">{formatCurrency(8289.76)}</span>
                  <svg
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`shrink-0 transition-transform ${einAuszahlungExpanded ? "rotate-180" : ""}`}
                  >
                    <path d="M7.29365 9.70615C7.68428 10.0968 8.31865 10.0968 8.70928 9.70615L14.7093 3.70615C15.0999 3.31553 15.0999 2.68115 14.7093 2.29053C14.3187 1.8999 13.6843 1.8999 13.2937 2.29053L7.9999 7.58428L2.70615 2.29365C2.31553 1.90303 1.68115 1.90303 1.29053 2.29365C0.899902 2.68428 0.899902 3.31865 1.29053 3.70928L7.29053 9.70928L7.29365 9.70615" fill="#BBBFBD" />
                  </svg>
                </button>
                {einAuszahlungExpanded && (
                  <>
                    <span className="text-base font-normal text-ds-neutral-70 leading-4 tabular-nums text-right">{formatCurrency(10000)}</span>
                    <span className="text-base font-normal text-ds-neutral-70 leading-4 tabular-nums text-right">{formatCurrency(1710.24)}</span>
                  </>
                )}
                <span className="text-base font-normal text-ds-seagreen leading-4 tabular-nums text-right">{formatCurrency(317.44)}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Steuer-Banner – hellgelb */}
      {!bannerDismissed && (
        <section className="px-4 mt-4">
          <div className="rounded-ds-lg bg-ds-steuer-banner border border-ds-neutral-20 p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-ds-neutral-70 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm text-ds-neutral-100 flex-1">
              Aktiviere die Steuerautomatik und spare voraussichtlich 450 € im Jahr
            </p>
            <button
              type="button"
              onClick={() => setBannerDismissed(true)}
              className="p-1 text-ds-neutral-70 hover:text-ds-neutral-100"
              aria-label="Schließen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </section>
      )}

      {/* Meine Pockets */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-ds-neutral-100">Meine Pockets</h2>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-ds-16 bg-ds-neutral-100 px-4 py-2 text-sm font-semibold text-ds-neutral-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Neu
          </button>
        </div>

        {/* ZinsPockets – exakte Figma-Farben: pocket-yellow, pocket-dark */}
        <p className="text-sm text-ds-neutral-70 mb-2">ZinsPockets</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <PocketCard
            variant="zins"
            amount={3211.34}
            sublabel="ZinsPocket"
            title="Reisen"
          />
          <PocketCard
            variant="zins"
            amount={1178.11}
            sublabel="ZinsPocket Plus"
            title="Notgroschen"
          />
        </div>

        {/* InvestmentPockets – exakte Figma-Farben: pocket-investment, pocket-gray (Lock) */}
        <p className="text-sm text-ds-neutral-70 mb-2">InvestmentPockets</p>
        <div className="space-y-3">
          <PocketCard
            variant="investment"
            amount={18547.24}
            sublabel="Evergreen Wachstum 90"
            title="Altersvorsorge"
            locked
            investmentIcon="chart-up"
          />
          <PocketCard
            variant="investment"
            amount={34487.49}
            sublabel="Evergreen Wachstum 70"
            title="Immobilie"
            investmentIcon="building"
          />
        </div>
      </section>

      {/* Spacer für Floating Buttons */}
      <div className="h-24" />

      {/* Floating Action Buttons – unten wenn Nav hide, oben wenn Nav sichtbar */}
      <section
        className={`fixed left-4 right-4 z-30 flex gap-3 pb-[env(safe-area-inset-bottom)] transition-all duration-300 ${
          navVisible ? "bottom-20" : "bottom-4"
        }`}
      >
        <button
          type="button"
          className="flex-1 rounded-ds-16 bg-ds-orange-60 py-3 font-semibold text-ds-neutral-0 shadow-lg hover:bg-ds-orange-70 transition-colors"
        >
          Einzahlen
        </button>
        <Link
          href="/SparplanRechner"
          className="flex-1 rounded-ds-16 bg-ds-neutral-100 py-3 font-semibold text-ds-neutral-0 text-center shadow-lg hover:bg-ds-neutral-90 transition-colors"
        >
          Sparpläne
        </Link>
      </section>

      {/* Burger-Menü – Slide-in Panel */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/40"
            aria-hidden
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className="fixed top-0 right-0 bottom-0 z-[70] w-72 max-w-[85vw] bg-ds-menu-bg shadow-xl flex flex-col pt-16 px-4 pb-6"
            role="dialog"
            aria-label="Menü"
          >
            <button
              type="button"
              className="absolute top-4 right-4 p-2 text-ds-neutral-0 hover:bg-white/10 rounded-lg"
              aria-label="Menü schließen"
              onClick={() => setMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col gap-1">
              <Link
                href="/Dashboard"
                className="flex items-center gap-3 px-4 py-3 text-ds-neutral-0 font-medium rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profil
              </Link>
              <Link
                href="/Dashboard"
                className="flex items-center gap-3 px-4 py-3 text-ds-neutral-0 font-medium rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Entdecken
              </Link>
              <Link
                href="/Dashboard"
                className="flex items-center gap-3 px-4 py-3 text-ds-neutral-0 font-medium rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Service
              </Link>
              <a
                href="https://evergreen.de"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-ds-neutral-0 font-medium rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Zur Webseite
              </a>
              <button
                type="button"
                className="flex items-center gap-3 px-4 py-3 text-ds-neutral-0 font-medium rounded-lg hover:bg-white/10 transition-colors text-left w-full"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Ausloggen
              </button>
            </nav>
          </aside>
        </>
      )}

      {/* Bottom Navigation – hide-on-scroll */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 bg-ds-neutral-0 border-t border-ds-neutral-10 flex justify-around py-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ${
          navVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Link href="/Dashboard" className="flex flex-col items-center gap-1 text-ds-neutral-100 font-semibold">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 00.707-1.707l-9-9a.999.999 0 00-1.414 0l-9 9A1 1 0 003 13z" />
          </svg>
          <span className="text-xs">Übersicht</span>
        </Link>
        <Link href="/Dashboard" className="flex flex-col items-center gap-1 text-ds-neutral-70">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs">Altersvorsorge</span>
        </Link>
        <Link href="/Dashboard" className="flex flex-col items-center gap-1 text-ds-neutral-70">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-xs">Postbox</span>
        </Link>
      </nav>
    </main>
  );
}
