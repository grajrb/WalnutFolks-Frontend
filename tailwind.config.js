/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f2937",
        secondary: "#111827",
        accent: "#3b82f6",
        "accent-light": "#60a5fa",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
        "gradient-accent": "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      },
    },
  },
  plugins: [],
};
