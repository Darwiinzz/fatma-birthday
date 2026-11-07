import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05030a",
          900: "#0a0614",
          800: "#120b22",
          700: "#1b1131",
        },
        lilac: {
          200: "#e4d4ff",
          300: "#c9a8ff",
          400: "#a97dff",
          500: "#8b5cf6",
          600: "#6d3fe0",
        },
        blush: {
          200: "#ffd1e8",
          300: "#ffa8d2",
          400: "#ff7ab8",
          500: "#f04f9b",
        },
        paper: {
          50: "#fffaf1",
          100: "#fbf2e2",
          200: "#f3e4c9",
          ink: "#2b2140",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "var(--font-arabic)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "var(--font-arabic)", "serif"],
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(6%, -4%, 0) scale(1.08)" },
          "66%": { transform: "translate3d(-5%, 5%, 0) scale(0.95)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 50%" },
          "100%": { backgroundPosition: "-200% 50%" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.6) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1) rotate(45deg)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        drift: "drift 22s ease-in-out infinite",
        "drift-slow": "drift 34s ease-in-out infinite reverse",
        shimmer: "shimmer 6s linear infinite",
        twinkle: "twinkle 3.2s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        caret: "caret 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
