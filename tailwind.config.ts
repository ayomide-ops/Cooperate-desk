import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#4B31BD", hover: "#33217F", tint: "#EFEBFB" },
        ink: { DEFAULT: "#1A1B23", secondary: "#5B6472" },
        surface: "#F7F6FC",
        semantic: { success: "#1F9D66", warning: "#C9820A", danger: "#D64545" },
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;