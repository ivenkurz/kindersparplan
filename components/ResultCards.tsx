"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export interface ResultCardsProps {
  gesamtEinzahlungen: number;
  ertrag: number;
  schwankungen: number;
  endwert: number;
  laufzeit: number;
  twrPa: number;
  stufe?: string;
  sticky?: boolean;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export default function ResultCards(props: ResultCardsProps) {
  const {
    gesamtEinzahlungen,
    ertrag,
    schwankungen,
    endwert,
    laufzeit,
    twrPa,
    sticky = false,
  } = props;

  const prozentSteigerung =
    gesamtEinzahlungen > 0
      ? ((endwert - gesamtEinzahlungen) / gesamtEinzahlungen) * 100
      : 0;

  const schwankungenFormatted = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(schwankungen);

  const isPositive = prozentSteigerung >= 0;
  const renditeColor = isPositive ? "#008542" : "#8a551d";
  const ertragColor = ertrag >= 0 ? "#008542" : "#8a551d";
  const renditePrefix = isPositive ? "+" : "";
  const renditeLine = `${renditePrefix}${formatPercent(prozentSteigerung)}% (${formatPercent(twrPa)}% p.a.)`;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: sticky ? 1 : 1.5 }}>
      <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: "none", borderColor: "#d1d4d2" }}>
        <CardContent sx={{ "&:last-child": { pb: 2 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#616a65", fontFamily: "var(--font-saans), sans-serif" }}>
              Nach {laufzeit} Jahren
            </Typography>
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.5,
                py: 0.5,
                borderRadius: "60px",
                bgcolor: "rgba(0, 133, 66, 0.15)",
                color: "#008542",
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 19V5" />
                <path d="M4 19h16" />
                <path d="M7 14l4-4 3 3 5-6" />
              </svg>
              Prognose
            </Box>
          </Box>

          <Box sx={{ mt: 1.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#054726", fontFamily: "var(--font-saans), sans-serif", fontVariantNumeric: "tabular-nums", ...(sticky ? { fontSize: "1.875rem" } : {}) }}>
              {formatCurrency(endwert)}
            </Typography>

            <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}>
              {isPositive && (
                <Box sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "16px", bgcolor: "rgba(0, 133, 66, 0.15)", color: "#008542", flexShrink: 0 }}>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 6l8 14H4l8-14z" />
                  </svg>
                </Box>
              )}
              <Typography variant="body1" sx={{ fontWeight: 600, color: renditeColor, fontFamily: "var(--font-saans), sans-serif", fontVariantNumeric: "tabular-nums" }}>
                {renditeLine}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 2, pt: 1.5, borderTop: "1px solid #f0f1f1" }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", textAlign: "left" }}>
              <Box sx={{ pr: 1.5 }}>
                <Typography variant="caption" sx={{ letterSpacing: "0.05em", color: "#616a65", fontWeight: 600, fontFamily: "var(--font-saans), sans-serif", fontSize: 11 }}>
                  EINZAHLUNG
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 600, color: "#022011", fontFamily: "var(--font-saans), sans-serif", fontVariantNumeric: "tabular-nums" }}>
                  {formatCurrency(gesamtEinzahlungen)}
                </Typography>
              </Box>
              <Box sx={{ px: 1.5, borderLeft: "1px solid #f0f1f1" }}>
                <Typography variant="caption" sx={{ letterSpacing: "0.05em", color: "#616a65", fontWeight: 600, fontFamily: "var(--font-saans), sans-serif", fontSize: 11 }}>
                  ERTRAG
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 600, color: ertragColor, fontFamily: "var(--font-saans), sans-serif", fontVariantNumeric: "tabular-nums" }}>
                  {ertrag >= 0 ? "+" : ""}{formatCurrency(ertrag)}
                </Typography>
              </Box>
              <Box sx={{ pl: 1.5, borderLeft: "1px solid #f0f1f1" }}>
                <Typography variant="caption" sx={{ letterSpacing: "0.05em", color: "#616a65", fontWeight: 600, fontFamily: "var(--font-saans), sans-serif", fontSize: 11 }}>
                  SCHWANKUNG
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.5, fontWeight: 600, color: "#022011", fontFamily: "var(--font-saans), sans-serif", fontVariantNumeric: "tabular-nums" }}>
                  ±{schwankungenFormatted}%
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {!sticky && (
        <Typography variant="caption" sx={{ color: "#89908c", fontStyle: "italic", textAlign: "center", display: "block", fontFamily: "var(--font-saans), sans-serif" }}>
          Historische Werte – keine Garantie für die Zukunft.
        </Typography>
      )}
    </Box>
  );
}
