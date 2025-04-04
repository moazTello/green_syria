/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary: "#464EF2",
        primary: "#532DF8",
        secondary: "#FDFEFE",
        brandGreen: "#51B279",
        brandViolet: "#3E2BF1",
        brandRed: "#D0352A",
        brandAzure: "#63C0B7",
        brandOrange: "#F4B85C",
        brandText: "#1C1C1E",
      },
      boxShadow: {
        '3xl': '10px 35px 100px -20px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
};
