/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'hd': '1366px',  // HD
        'fhd': '1920px', // FHD
      },
      fontSize: {
        'hd': '14px',  // Tamanho de fonte para HD
        'fhd': '18px', // Tamanho de fonte para FHD
      },
    },
  },
  plugins: [],
};
