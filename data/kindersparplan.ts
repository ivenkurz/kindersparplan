/**
 * Kindersparplan – Sparziele mit emotionaler Motivation
 */

export interface Sparziel {
  id: string;
  label: string;
  betrag: number;
  emoji: string;
  motivierend: string;
}

export const SPARZIELE: Sparziel[] = [
  {
    id: "studium",
    label: "Studium",
    betrag: 30000,
    emoji: "🎓",
    motivierend: "Für den Traum vom Abschluss – Ausbildung oder Uni",
  },
  {
    id: "ausbildung",
    label: "Ausbildung",
    betrag: 15000,
    emoji: "🛠️",
    motivierend: "Startkapital für die Lehre – Werkzeug, Umzug, erste Schritte",
  },
  {
    id: "fuehrerschein",
    label: "Führerschein",
    betrag: 2500,
    emoji: "🚗",
    motivierend: "Freiheit auf vier Rädern – ein Meilenstein fürs Leben",
  },
  {
    id: "erstes-auto",
    label: "Erstes Auto",
    betrag: 5000,
    emoji: "🚙",
    motivierend: "Mobilität von Anfang an – für Ausbildung oder Studium",
  },
  {
    id: "reise",
    label: "Auslandsjahr / Reise",
    betrag: 10000,
    emoji: "✈️",
    motivierend: "Die Welt entdecken – Erfahrungen, die prägen",
  },
  {
    id: "wohnung",
    label: "Erste Wohnung",
    betrag: 20000,
    emoji: "🏠",
    motivierend: "Kaution, Möbel, Start in die Selbstständigkeit",
  },
];

export const RENDITE_KINDERSPARPLAN = 0.069; // ~6,9% p.a. (ausgewogen)

export const BADGE_STUFE = [
  { minProzent: 0, label: "Starter", emoji: "🌱", farbe: "ds-seagreen" },
  { minProzent: 25, label: "Wachstum", emoji: "🌿", farbe: "ds-seagreen" },
  { minProzent: 50, label: "Halber Weg", emoji: "🌳", farbe: "ds-darkgreen" },
  { minProzent: 75, label: "Fast da", emoji: "🎯", farbe: "ds-orange-60" },
  { minProzent: 100, label: "Ziel erreicht!", emoji: "🎉", farbe: "ds-orange-60" },
] as const;
