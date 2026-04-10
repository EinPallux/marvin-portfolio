/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Clash Display'", "'Cabinet Grotesk'", "sans-serif"],
        sans:    ["'Cabinet Grotesk'", "'DM Sans'", "sans-serif"],
        mono:    ["'DM Mono'", "monospace"],
      },
      colors: {
        parchment: {
          50:  "#fdfaf5",
          100: "#f9f3e8",
          200: "#f1e6d0",
          300: "#e4d0b0",
          400: "#c9a87c",
          500: "#a07850",
        },
        ink: {
          950: "#100e0b",
          900: "#18160f",
          800: "#221f17",
          700: "#2e2a1f",
          600: "#3d3828",
          500: "#5a5240",
          400: "#7a7060",
          300: "#a89e8e",
        },
        rust: {
          DEFAULT: "#b5451b",
          light:   "#d4612e",
          muted:   "rgba(181,69,27,0.10)",
        },
      },
      animation: {
        grain:   "grain 8s steps(10) infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "30%": { transform: "translate(-1%,4%)" },
          "50%": { transform: "translate(-3%,3%)" },
          "70%": { transform: "translate(-2%,2%)" },
          "90%": { transform: "translate(-1%,1%)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
