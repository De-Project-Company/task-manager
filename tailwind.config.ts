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
          25: "#F9F8FB",
          50: "#ECEBFF",
          600: "#574EFA",
          900: "#33059F",
          950: "#1B0354",
        },
        grey: {
          700: "#272D37",
        },
        sh: "rgba(16,24,40,0.05)",
        neutraly: "#6B7B8F",
        destructive: "#f81d28",
      },
    },
    keyframes: {
      pulsing: {
        "50%": {
          opacity: "0.2",
        },
      },
      loadspin: {
        "100%": {
          transform: "rotate(360deg)",
        },
      },
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
      slideUp: {
        "70%": {
          opacity: "0.7",
          transform: "translateY(50px)",
        },
        "100%": {
          transform: "translateY(0)",
          opacity: "1",
        },
      },
      slideDown: {
        "100%": {
          transform: "translateY(0)",
          opacity: "1",
        },
      },
      slideNavUp: {
        "100%": {
          transform: "translateY(-112px)",
          opacity: "0",
        },
      },
      fadeOut: {
        "50%": {
          opacity: "0.7",
        },
        "100%": {
          opacity: "1",
        },
      },
      rotate3d: {
        "0%": {
          transform: "rotateY(0)",
        },
        "50%": { opacity: "0.5" },

        "100%": {
          transform: "rotateY(360deg)",
        },
      },
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      shimmer: "shimmer 1.5s infinite",
      slideUp: "slideUp 1s 0.2s ease forwards",
      loadspin: "loadspin 1.2s linear infinite",
      pulsing: "pulsing 1.5s ease infinite",
      rotate3d:
        "rotate3d 2s 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite",
      slideDown: "slideDown 1s 0.2s ease forwards",
      slideNavUp: "slideDown 1s 0.2s ease forwards",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      tommy: ["MADE TOMMY Outline", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
