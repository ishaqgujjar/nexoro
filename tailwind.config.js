/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:    '#1A1613',
        body:   '#5B5347',
        gold:   '#B8893B',
        deep:   '#8A6A22',
        accent: '#D4AF37',
        cream:  '#FAF6EE',
        card:   '#FFFFFF',
        line:   '#EBE4D6',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26,22,19,.04), 0 14px 34px -20px rgba(26,22,19,.18)',
        lift: '0 30px 60px -26px rgba(120,90,25,.40)',
        gold: '0 14px 40px -10px rgba(184,137,59,.45)',
      },
    },
  },
  plugins: [],
}
