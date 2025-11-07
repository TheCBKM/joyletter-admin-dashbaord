import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f1ff",
          100: "#e7ddff",
          200: "#d1bcff",
          300: "#b492ff",
          400: "#9c6cff",
          500: "#864cff",
          600: "#6d2af4",
          700: "#581ed1",
          800: "#4417a6",
          900: "#34107d",
          950: "#1f084d",
        },
        accent: {
          100: "#f6f8ff",
          200: "#edefff",
          300: "#d8dcff",
        },
      },
      boxShadow: {
        glass: "0 20px 45px rgba(86, 47, 196, 0.25)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at top left, rgba(134, 76, 255, 0.35), transparent 60%)",
        "gradient-card": "linear-gradient(135deg, rgba(134, 76, 255, 0.2), rgba(68, 23, 166, 0.15))",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

export default config;

