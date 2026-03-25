import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs du logo réel
        green:  { DEFAULT: "#2E7D32", dark: "#1B5E20", light: "#388E3C" },
        orange: { DEFAULT: "#E64A19", dark: "#BF360C", light: "#FF5722" },
        red:    { DEFAULT: "#C62828", dark: "#8E0000", light: "#EF5350" },
        gold:   { DEFAULT: "#C9922A", dark: "#A87520", light: "#E0A83A" },
        cream:  { DEFAULT: "#FAFAF8", dark: "#F0EDE4" },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        dm:       ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
