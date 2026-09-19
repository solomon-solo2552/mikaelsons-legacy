/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#120E0C",
          light: "#1E1713",
          soft: "#2A211B",
        },
        parchment: {
          DEFAULT: "#EDE6D6",
          dark: "#DCD0B4",
        },
        burgundy: {
          DEFAULT: "#5C1524",
          light: "#7C2334",
          dark: "#3E0E18",
        },
        gold: {
          DEFAULT: "#B8933F",
          light: "#D8BC7A",
          dark: "#8C6C2B",
        },
        slate: {
          deep: "#212D28",
        },
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["EB Garamond", "serif"],
        crest: ["UnifrakturCook", "serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
      },
      backgroundImage: {
        "stone-gradient":
          "radial-gradient(circle at 20% 20%, #241B16 0%, #120E0C 55%, #0A0807 100%)",
      },
      keyframes: {
        pageIn: {
          "0%": { opacity: "0", transform: "translateY(8px)"},
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pageIn: "pageIn 400ms ease-out",
      },
    },
  },
  plugins: [],
};
