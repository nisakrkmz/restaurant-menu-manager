/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"
],

  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#d4a373", // Soft altın
          accent: "#faedcd",
        },
      },
      fontFamily: {
        elegant: ["'Playfair Display'", "serif"],
      },
  },
  plugins: [],
}
}
