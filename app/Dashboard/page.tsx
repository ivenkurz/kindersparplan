"use client";

import Link from "next/link";
import { useState } from "react";

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(v);

export default function DashboardPage() {
  const [bannerDismissed, setBannerDismissed] = useState(false);

  return (
    <main className="min-h-screen bg-ds-neutral-0 font-saans pb-20">
      {/* Sticky: Header + Account Card – exakt wie Vorlage */}
      <div className="sticky top-0 z-20 shadow-md">
        {/* Header – dunkelgrün, unten links/rechts rund, geht bis ca. Hälfte der Card */}
        <header className="bg-ds-neutral-100 px-4 pt-4 pb-24 rounded-b-ds-lg">
          <div className="flex items-center justify-between">
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
              <button type="button" className="p-2 text-ds-neutral-0" aria-label="Menü">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Account Summary Card – weiß, weiter oben, kein Divider */}
        <section className="px-4 -mt-20 pb-0">
          <div className="rounded-ds-lg bg-ds-neutral-0 shadow-sm p-5">
          <div className="flex justify-between items-center py-3 border-b border-ds-neutral-10">
            <span className="text-sm text-ds-neutral-70">Gesamtvermögen</span>
            <span className="text-lg font-bold text-ds-neutral-100">{formatCurrency(8467.98)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-ds-neutral-10">
            <span className="text-sm text-ds-neutral-70">Ein- & Auszahlungen</span>
            <div className="flex items-center gap-1">
              <span className="text-lg font-semibold text-ds-neutral-100">{formatCurrency(8289.76)}</span>
              <svg className="w-5 h-5 text-ds-neutral-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm text-ds-neutral-70">Ertrag</span>
            <span className="text-lg font-semibold text-ds-seagreen">{formatCurrency(317.44)}</span>
          </div>
          </div>
        </section>
      </div>

      {/* Steuer-Banner – hellgelb */}
      {!bannerDismissed && (
        <section className="px-4 mt-4">
          <div className="rounded-ds-lg bg-ds-yellow-10 border border-ds-neutral-20 p-4 flex items-start gap-3">
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
            className="inline-flex items-center gap-1.5 rounded-ds-16 bg-ds-darkgreen px-4 py-2 text-sm font-semibold text-ds-neutral-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Neu
          </button>
        </div>

        {/* ZinsPockets – Vorlage: weißes Plus in dunkelgrünem Quadrat, in gelbem Kreis */}
        <p className="text-sm text-ds-neutral-70 mb-2">ZinsPockets</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-ds-lg border border-ds-neutral-20 bg-ds-neutral-0 p-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-ds-pocket-yellow flex items-center justify-center mb-3">
              <div className="w-6 h-6 rounded bg-ds-pocket-dark flex items-center justify-center">
                <svg className="w-[14px] h-[14px] text-ds-neutral-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <p className="text-lg font-bold text-ds-neutral-100">{formatCurrency(3211.34)}</p>
            <p className="text-xs text-ds-neutral-70">ZinsPocket</p>
            <p className="text-base font-bold text-ds-neutral-100 mt-1">Reisen</p>
          </div>
          <div className="rounded-ds-lg border border-ds-neutral-20 bg-ds-neutral-0 p-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-ds-pocket-yellow flex items-center justify-center mb-3">
              <div className="w-6 h-6 rounded bg-ds-pocket-dark flex items-center justify-center">
                <svg className="w-[14px] h-[14px] text-ds-neutral-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            <p className="text-lg font-bold text-ds-neutral-100">{formatCurrency(1178.11)}</p>
            <p className="text-xs text-ds-neutral-70">ZinsPocket Plus</p>
            <p className="text-base font-bold text-ds-neutral-100 mt-1">Notgroschen</p>
          </div>
        </div>

        {/* InvestmentPockets – Vorlage: gelbgrünes Icon in weißem Kreis */}
        <p className="text-sm text-ds-neutral-70 mb-2">InvestmentPockets</p>
        <div className="space-y-3">
          <div className="rounded-ds-lg border border-ds-neutral-20 bg-ds-neutral-0 p-4 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-ds-neutral-0 border border-ds-neutral-20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-ds-investment-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 011.414-1.418L21 3.75" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-ds-neutral-100">{formatCurrency(18547.24)}</p>
              <p className="text-xs text-ds-neutral-70">Evergreen Wachstum 90</p>
              <p className="text-base font-bold text-ds-neutral-100 mt-1">Altersvorsorge</p>
            </div>
            <svg className="w-5 h-5 text-ds-neutral-70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Gesperrt">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="rounded-ds-lg border border-ds-neutral-20 bg-ds-neutral-0 p-4 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-ds-neutral-0 border border-ds-neutral-20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-ds-investment-icon" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-ds-neutral-100">{formatCurrency(34487.49)}</p>
              <p className="text-xs text-ds-neutral-70">Evergreen Wachstum 70</p>
              <p className="text-base font-bold text-ds-neutral-100 mt-1">Immobilie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer für Floating Buttons */}
      <div className="h-24" />

      {/* Floating Action Buttons */}
      <section className="fixed bottom-20 left-4 right-4 z-30 flex gap-3 pb-[env(safe-area-inset-bottom)]">
        <button
          type="button"
          className="flex-1 rounded-ds-16 bg-ds-orange-60 py-3 font-semibold text-ds-neutral-0 shadow-lg hover:bg-ds-orange-70 transition-colors"
        >
          Einzahlen
        </button>
        <Link
          href="/SparplanRechner"
          className="flex-1 rounded-ds-16 bg-ds-darkgreen py-3 font-semibold text-ds-neutral-0 text-center shadow-lg hover:bg-ds-neutral-90 transition-colors"
        >
          Sparpläne
        </Link>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-ds-neutral-0 border-t border-ds-neutral-10 flex justify-around py-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
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
