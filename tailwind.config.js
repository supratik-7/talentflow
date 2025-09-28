/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        blackgreen: {
          primary: "#22c55e",     
          secondary: "#166534",   
          accent: "#4ade80",      
          neutral: "#0a0a0a",     
          "base-100": "#111111",  
          info: "#22d3ee",
          success: "#16a34a",
          warning: "#eab308",
          error: "#dc2626",
        },
      },
    ],
  },
}

