/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#faf4ff',
        'surface-container-low': '#f5eeff',
        'surface-container-high': '#e8deff',
        'surface-container-highest': '#e2d7ff',
        'surface-container-lowest': '#ffffff',
        'on-surface': '#32294f',
        'on-surface-variant': '#5f557f',
        primary: '#4a40e0',
        'primary-container': '#9795ff',
        'on-primary': '#f4f1ff',
        secondary: '#702ae1',
        'secondary-container': '#dcc9ff',
        'tertiary-container': '#fd8bca',
        'on-tertiary-container': '#ffffff',
        'outline-variant': '#b2a6d5',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'ambient': '0 8px 32px rgba(50, 41, 79, 0.06)',
      }
    },
  },
  plugins: [],
}
