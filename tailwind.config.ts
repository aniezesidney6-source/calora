import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F6F2",
        ink: "#1C1917",
        surface: "#FFFFFF",
        hairline: "#E7E5E4",
        body: "#44403C",
        mute: "#78716C",
        "mute-2": "#A8A29A",
        btn: "#121212",
        "btn-hover": "#0C0A09",
        "sky-sub": "#E0F0FC",
        "chip-blue": "#17A1FA",
        "chip-grey": "#E9EAEC",
        available: "#34C759",
        "well-grey": "#F8F8F8",
        "faq-card": "#E8E6E1",
        sand: "#C4A574",
        footer: "#1C1917",
      },
      fontFamily: {
        sans: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        btn: "12px",
        widget: "24px",
        "widget-inner": "8px",
        card: "16px",
        close: "20px",
      },
      boxShadow: {
        "gold-inset": "inset 0px 0px 15px rgba(196, 165, 116, 0.3)",
        tile: "inset -1px -1px 10px rgba(255,255,255,0.5), inset 1px 1px 10px rgba(255,255,255,0.3)",
      },
      maxWidth: {
        page: "1440px",
        content: "1280px",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
