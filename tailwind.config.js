/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: { inter: ['Inter', 'ui-sans-serif', 'system-ui'] },
      colors: {
        // BRANDING: tweak these tokens for your brand
        brand: {
          primary: '#0EA5E9', // sky-500
          accent: '#16A34A',  // green-600 (recycling vibe)
          muted: '#F59E0B',   // amber-500 for highlights
        }
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.06)',
      }
    },
  },
  plugins: [],
}
