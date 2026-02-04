/**
 * Zentrale Konstanten für Input-Grenzen und Defaults (Code-Review: Grenzen zentral halten).
 * Verwendung: Kindersparplan, Slider, NumberInput – einheitliche Min/Max/Step.
 */

/** Kindersparplan: Alter 0–30 Jahre */
export const AGE_MIN = 0;
export const AGE_MAX = 30;
export const DEFAULT_AGE_START = 6;
export const DEFAULT_AGE_ZIEL = 18;

/** Eigenes Sparziel: Zielbetrag in € */
export const CUSTOM_ZIEL_STEP = 500;
export const CUSTOM_ZIEL_MIN = 1000;
export const CUSTOM_ZIEL_MAX = 9_000_000;
export const CUSTOM_ZIEL_DEFAULT = 24000;

/** Sparziel-IDs (Kindersparplan) */
export const EIGENE_SUMME_ID = "eigene-summe";
export const KEIN_SPARZIEL_ID = "keins";

/** Bei „kein Sparziel“: Default-Sparsumme €/Monat */
export const DEFAULT_MONATLICH_OHNE_SPARZIEL = 50;
