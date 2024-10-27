import { grey, pink, purple } from "@mui/material/colors";
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
        active: {
          light: pink[600],
          DEFAULT: pink[800],
          dark: pink[900],
        },
        primary: {
          light: purple[600],
          DEFAULT: purple[800],
          dark: purple[900],
        },
        secondary: {
          light: grey[400],
          DEFAULT: grey[700],
          dark: grey[900],
        },
        default: {
          light: grey[300],
          DEFAULT: grey[800],
          dark: grey[900],
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
