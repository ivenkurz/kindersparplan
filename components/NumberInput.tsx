"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface NumberInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

const formatWithThousands = (v: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(v);

function useIsMobile(maxWidthPx = 767) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${maxWidthPx}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [maxWidthPx]);
  return isMobile;
}

export default function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 1000000,
  step = 1,
  unit = "€",
}: NumberInputProps) {
  const [display, setDisplay] = useState<string>(() => formatWithThousands(value));
  const [isFocused, setIsFocused] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const handleDecrement = () => onChange(Math.max(min, value - step));
  const handleIncrement = () => onChange(Math.min(max, value + step));

  const parseInput = useCallback(
    (s: string): number => {
      const digits = s.replace(/\D/g, "");
      if (digits === "") return min;
      const n = parseInt(digits, 10);
      if (!Number.isFinite(n)) return value;
      return Math.max(min, Math.min(max, n));
    },
    [value, min, max]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const s = e.target.value;
    setDisplay(s);
    onChange(parseInput(s));
  };

  const handleBlur = () => {
    setIsFocused(false);
    setDisplay(formatWithThousands(value));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setDisplay(String(value));
  };

  const displayValue = isFocused ? display : formatWithThousands(value);

  useEffect(() => {
    if (isFocused) {
      setDisplay(String(value));
    } else {
      setDisplay(formatWithThousands(value));
    }
  }, [value, isFocused]);

  const openMobileModal = () => {
    if (!isMobile) return;
    setDisplay(String(value));
    setMobileModalOpen(true);
    setTimeout(() => mobileInputRef.current?.focus(), 150);
  };

  const closeMobileModal = () => {
    setMobileModalOpen(false);
    setDisplay(formatWithThousands(value));
  };

  const confirmMobileModal = () => {
    onChange(parseInput(display));
    closeMobileModal();
  };

  const everGreenSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: "#f0f1f1",
      borderColor: "#d1d4d2",
      fontFamily: "var(--font-saans), sans-serif",
      fontWeight: 600,
      "&.Mui-focused fieldset": { borderColor: "#008542", borderWidth: 2 },
    },
  };

  return (
    <Box className="space-y-2" sx={{ my: { xs: 0, md: 2 } }}>
      {label ? (
        <Typography component="label" variant="body2" sx={{ fontWeight: 600, color: "#022011", display: "block", fontFamily: "var(--font-saans), sans-serif" }}>
          {label}
        </Typography>
      ) : null}
      <Box sx={{ display: "flex", alignItems: "stretch", borderRadius: "16px", border: "1px solid #d1d4d2", backgroundColor: "#f0f1f1", overflow: "hidden" }}>
        <IconButton
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label="Verringern"
          sx={{
            borderRadius: 0,
            minWidth: { xs: 56, md: 52 },
            minHeight: { xs: 56, md: 52 },
            bgcolor: "#022011",
            color: "#fff",
            "&:hover": { bgcolor: "#3b403d" },
            "&.Mui-disabled": { bgcolor: "#022011", color: "rgba(255,255,255,0.5)" },
          }}
        >
          <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>−</span>
        </IconButton>
        {isMobile ? (
          <Button
            fullWidth
            onClick={openMobileModal}
            sx={{
              py: 1.5,
              color: "#022011",
              fontWeight: 600,
              fontFamily: "var(--font-saans), sans-serif",
              textTransform: "none",
            }}
          >
            {formatWithThousands(value)} {unit}
          </Button>
        ) : (
          <TextField
            variant="outlined"
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            inputProps={{
              inputMode: "numeric",
              style: { textAlign: "center", fontWeight: 600 },
            }}
            InputProps={{
              endAdornment: unit ? (
                <InputAdornment position="end" sx={{ pr: 1.5, color: "#022011", fontWeight: 600 }}>
                  {unit}
                </InputAdornment>
              ) : null,
            }}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "transparent",
                fontFamily: "var(--font-saans), sans-serif",
                fontWeight: 600,
                "& fieldset": { border: "none" },
                "&.Mui-focused fieldset": { borderColor: "#008542", borderWidth: 2 },
              },
            }}
          />
        )}
        <IconButton
          onClick={handleIncrement}
          disabled={value >= max}
          aria-label="Erhöhen"
          sx={{
            borderRadius: 0,
            minWidth: { xs: 56, md: 52 },
            minHeight: { xs: 56, md: 52 },
            bgcolor: "#022011",
            color: "#fff",
            "&:hover": { bgcolor: "#3b403d" },
            "&.Mui-disabled": { bgcolor: "#022011", color: "rgba(255,255,255,0.5)" },
          }}
        >
          <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>+</span>
        </IconButton>
      </Box>

      <Dialog open={mobileModalOpen} onClose={closeMobileModal} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: "16px", m: 2 } }}>
        <DialogTitle sx={{ fontFamily: "var(--font-saans), sans-serif", fontWeight: 600, color: "#022011" }}>
          {label ?? "Betrag"}
        </DialogTitle>
        <DialogContent>
          <TextField
            inputRef={mobileInputRef}
            fullWidth
            value={display}
            onChange={(e) => setDisplay(e.target.value)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*", style: { textAlign: "center", fontSize: "1.5rem", fontWeight: 600 } }}
            onKeyDown={(e) => { if (e.key === "Enter") confirmMobileModal(); }}
            placeholder="0"
            autoComplete="off"
            sx={{ mt: 1, ...everGreenSx }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={closeMobileModal} variant="outlined" sx={{ borderRadius: "16px", fontFamily: "var(--font-saans), sans-serif" }}>
            Abbrechen
          </Button>
          <Button onClick={confirmMobileModal} variant="contained" sx={{ borderRadius: "16px", bgcolor: "#008542", "&:hover": { bgcolor: "#054726" }, fontFamily: "var(--font-saans), sans-serif" }}>
            Fertig
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
