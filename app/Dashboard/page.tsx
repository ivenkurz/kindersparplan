"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { PocketCard } from "@/components/PocketCard";

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(v);

export default function DashboardPage() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
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
            <span className="text-xl font-bold text-ds-neutral-0">evergreen</span>
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

        {/* Account Summary Card – Saans, Vermögens-Typografie */}
        <section className="px-4 -mt-20 pb-0 font-saans">
          <div className="rounded-ds-lg bg-ds-neutral-0 shadow-sm p-4">
            <div className="flex justify-between items-center py-3 border-b border-ds-neutral-10">
              <span className="text-base font-medium text-gray-600">Gesamtvermögen</span>
              <span className="text-2xl md:text-3xl font-bold text-evergreen-dark leading-tight tracking-tight tabular-nums">{formatCurrency(8467.98)}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-base font-medium text-gray-600">Ertrag</span>
              <span className="text-xl md:text-2xl font-bold text-ds-seagreen leading-tight tracking-tight tabular-nums">{formatCurrency(317.44)}</span>
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
