/**
 * Kindersparplan – Compound Interest für Zielalter (z.B. 18. Geburtstag)
 * Berechnung analog SparplanRechner, angepasst für Eltern/Kinder-Kontext
 */

export interface KindersparplanInput {
  kindesalter: number; // Jahre
  zielalter: number; // z.B. 18
  einmalig: number; // € (0 wenn nur monatlich)
  monatlich: number; // €
  rendite: number; // 0..1 (z.B. 0.069)
}

export interface KindersparplanResult {
  chartData: { jahr: number; wert: number; einzahlungen: number }[];
  laufzeit: number;
  gesamtEinzahlungen: number;
  ertrag: number;
  endwert: number;
  zielErreicht: boolean;
  zielKosten?: number; // z.B. Studium-Schätzung
}

/** Laufzeit in Jahren bis zum Zielalter */
export function laufzeitBisZiel(kindesalter: number, zielalter: number): number {
  return Math.max(0, zielalter - kindesalter);
}

/**
 * Compound Interest: Startwert + monatliche Einzahlungen, monatlich verzinst
 */
export function berechneKindersparplan(input: KindersparplanInput): KindersparplanResult {
  const { kindesalter, zielalter, einmalig, monatlich, rendite } = input;
  const laufzeit = laufzeitBisZiel(kindesalter, zielalter);

  const data: { jahr: number; wert: number; einzahlungen: number }[] = [];
  const startWert = einmalig + monatlich;
  data.push({
    jahr: 0,
    wert: Math.round(startWert),
    einzahlungen: Math.round(startWert),
  });

  let wert = startWert;
  const monatlicheRendite = Math.pow(1 + rendite, 1 / 12) - 1;

  for (let jahr = 1; jahr <= laufzeit; jahr++) {
    for (let monat = 0; monat < 12; monat++) {
      if (jahr === 1 && monat === 0) {
        wert = wert * (1 + monatlicheRendite);
      } else {
        wert = (wert + monatlich) * (1 + monatlicheRendite);
      }
    }
    data.push({
      jahr,
      wert: Math.round(wert),
      einzahlungen: einmalig + monatlich * 12 * jahr,
    });
  }

  const gesamtEinzahlungen = einmalig + monatlich * 12 * laufzeit;
  const endwert = Math.round(wert);
  const ertrag = Math.round(wert - gesamtEinzahlungen);

  return {
    chartData: data,
    laufzeit,
    gesamtEinzahlungen,
    ertrag,
    endwert,
    zielErreicht: laufzeit > 0,
  };
}

/**
 * Berechnet den monatlich erforderlichen Sparbeitrag, um zielBetrag zu erreichen.
 * Bei einmalig = 0: FV = monatlich * (1+r) * ((1+r)^N - 1) / r  → monatlich = FV / ...
 * Immer auf nächsten vollen Euro aufrunden (Minimum 1 €), damit der Betrag von Jahr zu Jahr stetig steigt oder fällt – keine Sprünge durch 5‑€-Stufen.
 */
export function berechneMonatlichFuerZiel(
  zielBetrag: number,
  laufzeitJahre: number,
  rendite: number
): number {
  if (laufzeitJahre <= 0 || zielBetrag <= 0) return 0;
  const nMonths = laufzeitJahre * 12;
  const r = Math.pow(1 + rendite, 1 / 12) - 1;
  if (r <= 0) return Math.max(1, Math.ceil(zielBetrag / nMonths));
  const faktor = (1 + r) * (Math.pow(1 + r, nMonths) - 1) / r;
  const raw = zielBetrag / faktor;
  return Math.max(1, Math.ceil(raw));
}
