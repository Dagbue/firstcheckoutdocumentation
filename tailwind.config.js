/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bank-blue': '#0E4687',
        'bank-gold': '#E4C144',
      },
      backgroundImage: {
        'landing': "url('/bg-landing.png')",
      }
    },
  },
  plugins: [],
};
