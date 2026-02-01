import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",  // Erweitert für CDS-Komponenten (z. B. aus Locofy)
  ],
  theme: {
    extend: {
      fontFamily: {
        saans: ["var(--font-saans)", "sans-serif"],
      },
      colors: {
        // Marketing Design System – behalte Locofy-Extraktion
        "ds-app-bg": "#F8F9FC",
        "ds-menu-bg": "#374151",
        "ds-neutral": {
          0: "#fff",
          10: "#f0f1f1",
          20: "#d1d4d2",
          40: "#9ca29f",
          50: "#89908c",
          70: "#616a65",
          90: "#3b403d",
          100: "#022011",
        },
        "ds-orange": {
          30: "#fdd1a2",
          60: "#fd8f18",
          70: "#e48d2f",
          80: "#b26e25",
          90: "#8a551d",
        },
        "ds-yellow": {
          10: "#fff9eb",
          60: "#ffc93b",
        },
        "ds-steuer-banner": "#FFE6A5",
        "ds-darkgreen": "#054726",
        "ds-seagreen": "#008542",
        "ds-sage": "#a2bcaf",
        "ds-pocket-dark": "#1E3A24",
        "ds-pocket-yellow": "#FBE9AE",
        "ds-investment-icon": "#9ACD32",
        // Pocket-Cards – exakte Figma-Hex-Werte (extend only)
        "pocket-yellow": "#FCD34D",
        "pocket-green": "#10B981",
        "pocket-accent": "#F97316",
        "pocket-dark": "#1E3A24",
        "pocket-gray": "#6B7280",
        "pocket-investment": "#9ACD32",
        "evergreen-dark": "#0f3d2e",
        "ds-crimson": "#c20024",
        // Legacy evergreen (alias) – behalte für Kompatibilität
        evergreen: {
          DEFAULT: "#10b981",
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
      borderRadius: {
        "ds-lg": "24px",
        "ds-2xl": "48px",
        "ds-pill": "60px",
        "ds-16": "16px",
      },
      boxShadow: {
        "ds-orange-glow": "0 0 12px 4px rgba(253, 143, 24, 0.4)",
      },
      backgroundImage: {
        "pocket-gradient": "linear-gradient(to right, #10b981, #059669)",
      },
    },
  },
  plugins: [],
};

export default config;