/**
 * StrategieDaten.xlsx – exakt aus Excel
 * Slider-Position 0–10 mappt auf index = position → strategy = strategies[position]
 */
export const strategies = [
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
  { id: 82, name: "Evergreen Wachstum 100", beschreibung: "Mit 100% Aktien sehr stark wachstumsorientiert.", return: 0.09, volatility: 0.15 }
];
