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
        emerald: {
          DEFAULT: "#1A6B47",
          dark: "#14533A",
          light: "#228B5C",
        },
        gold: {
          DEFAULT: "#C9922A",
          dark: "#A87520",
          light: "#E0A83A",
        },
        cream: {
          DEFAULT: "#FAF8F3",
          dark: "#F0EDE4",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
