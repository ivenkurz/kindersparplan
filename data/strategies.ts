/**
 * StrategieDaten – 3 Stufen: Niedrig (72–75), Ausgewogen (76–79), Hoch (80–82)
 * Slider-Position 0/5/10 → Stufe Niedrig/Ausgewogen/Hoch
 */

export interface Strategy {
  id: number;
  name: string;
  beschreibung: string;
  return: number;
  volatility: number;
}

export interface StageGroup {
  position: 0 | 5 | 10;
  name: string;
  beschreibung: string;
  return: number;
  volatility: number;
  ids: number[];
}

const rawStrategies: Strategy[] = [
  { id: 72, name: "Evergreen Komfort", beschreibung: "Sicherheitsorientiert. Variable Aktienquote bis zu 15%.", return: 0.045, volatility: 0.03 },
  { id: 73, name: "Evergreen Balance 10", beschreibung: "Zinsorientiert mit bis zu 10% Aktien.", return: 0.05, volatility: 0.0387 },
  { id: 74, name: "Evergreen Balance 20", beschreibung: "Zinsorientiert mit bis zu 30% Aktien.", return: 0.055, volatility: 0.0493 },
  { id: 75, name: "Evergreen Balance 30", beschreibung: "Zinsorientiert mit bis zu 35% Aktien.", return: 0.059, volatility: 0.0608 },
  { id: 76, name: "Evergreen Balance 40", beschreibung: "Zinsorientiert mit bis zu 45% Aktien.", return: 0.064, volatility: 0.0728 },
  { id: 77, name: "Evergreen Balance 50", beschreibung: "Ausgewogenes Verhältnis zwischen Aktien und Anleihen", return: 0.069, volatility: 0.085 },
  { id: 78, name: "Evergreen Balance 60", beschreibung: "Ausgewogenes Verhältnis zwischen Aktien und Anleihen.", return: 0.074, volatility: 0.0974 },
  { id: 79, name: "Evergreen Wachstum 70", beschreibung: "Wachstumsorientiert mit 70% Aktien.", return: 0.078, volatility: 0.1098 },
  { id: 80, name: "Evergreen Wachstum 80", beschreibung: "Mit 80% Aktien stark wachstumsorientiert.", return: 0.082, volatility: 0.1227 },
  { id: 81, name: "Evergreen Wachstum 90", beschreibung: "Mit 90% Aktien sehr stark wachstumsorientiert.", return: 0.086, volatility: 0.1361 },
  { id: 82, name: "Evergreen Wachstum 100", beschreibung: "Mit 100% Aktien sehr stark wachstumsorientiert.", return: 0.09, volatility: 0.15 },
];

/** 3 Stufen: Position 0 = Niedrig, 5 = Ausgewogen, 10 = Hoch */
export const stageGroups: StageGroup[] = [
  {
    position: 0,
    name: "Niedrig",
    beschreibung: "Niedrig: Sichere Rendite, niedrige Schwankungen.",
    return: (0.045 + 0.05 + 0.055 + 0.059) / 4,
    volatility: (0.03 + 0.0387 + 0.0493 + 0.0608) / 4,
    ids: [72, 73, 74, 75],
  },
  {
    position: 5,
    name: "Ausgewogen",
    beschreibung: "Ausgewogen: Balance zwischen Sicherheit und Wachstum.",
    return: (0.064 + 0.069 + 0.074 + 0.078) / 4,
    volatility: (0.0728 + 0.085 + 0.0974 + 0.1098) / 4,
    ids: [76, 77, 78, 79],
  },
  {
    position: 10,
    name: "Hoch",
    beschreibung: "Hoch: Höhere Renditechance, höhere Schwankungen.",
    return: (0.082 + 0.086 + 0.09) / 3,
    volatility: (0.1227 + 0.1361 + 0.15) / 3,
    ids: [80, 81, 82],
  },
];

/** Alle Strategien (Slider 0–10) */
export const strategies = rawStrategies;

/** Slider-Legende: Tooltips für Markierungen bei 0, 5, 10 */
export const sliderLegendTooltips: Record<number, string> = {
  0: "Niedrig: Sichere Rendite, niedrige Schwankungen.",
  5: "Ausgewogen: Balance zwischen Sicherheit und Wachstum.",
  10: "Hoch: Höhere Renditechance, höhere Schwankungen.",
};
