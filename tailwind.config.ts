import type { Config } from "tailwindcss";

// Design tokens — teal primary / orange accent, consistent with prior builds
// (SafeAid, TrustLine, Truvend). Citations & trust indicators render in teal;
// flagged gaps & action items render in orange — never implying a decision was made.
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          950: "#0A2422",
          900: "#0C332F",
          700: "#0F6B62",
          600: "#12857A",
          500: "#17A398",
          200: "#BFE3DD",
          100: "#E4F3F1",
          50: "#F2F9F7",
        },
        orange: {
          600: "#D9601A",
          500: "#EC7A2E",
          100: "#FBE7D8",
        },
        ink: {
          DEFAULT: "#12211F",
          soft: "#3C4A47",
        },
        paper: {
          DEFAULT: "#FBFAF6",
          2: "#F3F1EA",
        },
        line: "#DDE4E1",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
