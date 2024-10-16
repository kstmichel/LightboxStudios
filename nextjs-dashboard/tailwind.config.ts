import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        primary: {
          light: "#f2f7f8",
          DEFAULT: "#0070F3",
          dark: "#282351",
        },
        secondary: {
          light: "#cfd2e5",
          DEFAULT: "#040508",
          dark: "#000000",
        },
        blue: {
          300: "#f2f7f8",
          400: "#cfd2e5",
          500: "#0070F3",
          600: "#282351",
        },
        grey: {
          600: "#040508",
        },
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
