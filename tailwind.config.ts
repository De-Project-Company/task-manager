import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B0354",
        secondary: "#3a3f51",
        "main-sec": "#0D062D",
        success: "#34CAA5",
        error: "#ff1f7d",
        warning: "#f5bf3d",
        light: "#78828A",
        "soft-light": "#DADDDD",
        header: "#26282c",
        "soft-border": "#ebecf2",
        "soft-bg": "#f7f8fa",
        "trend-down": "#ed544e",
        purple: {
          50: "#ECEBFF",
          600: "#574EFA",
          900: "#33059F",
          950: "#1B0354",
        },
        sh: "rgba(16,24,40,0.05)",
        neutraly: "#6B7B8F",
        destructive: "#f81d28",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
