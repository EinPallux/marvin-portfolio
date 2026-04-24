/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans:    ["'Geist'", "system-ui", "sans-serif"],
        mono:    ["'Geist Mono'", "monospace"],
      },
      colors: {
        canvas: {
          light: "#f5f5f7",
          DEFAULT: "#ffffff",
          dark:  "#1d1d1f",
          ink:   "#0a0a0b",
        },
        zinc: {
          50:  "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          950: "#09090b",
        },
        accent: {
          DEFAULT: "#5b45f5",
          hover:   "#4836e0",
          muted:   "rgba(91,69,245,0.1)",
          glow:    "rgba(91,69,245,0.2)",
        },
      },
      animation: {
        grain:   "grain 8s steps(10) infinite",
        marquee: "marquee 35s linear infinite",
        "marquee-r": "marquee-r 35s linear infinite",
        float:   "float 6s ease-in-out infinite",
      },
      keyframes: {
        grain: {
          "0%,100%": { transform:"translate(0,0)" },
          "10%": { transform:"translate(-2%,-3%)" },
          "30%": { transform:"translate(-1%,4%)" },
          "50%": { transform:"translate(-3%,3%)" },
          "70%": { transform:"translate(-2%,2%)" },
          "90%": { transform:"translate(-1%,1%)" },
        },
        marquee:   { from:{transform:"translateX(0)"}, to:{transform:"translateX(-50%)"} },
        "marquee-r": { from:{transform:"translateX(-50%)"}, to:{transform:"translateX(0)"} },
        float: {
          "0%,100%": { transform:"translateY(0px)" },
          "50%":     { transform:"translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
