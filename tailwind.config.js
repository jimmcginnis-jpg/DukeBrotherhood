/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        duke: {
          navy: '#00009C',
          navyDark: '#000066',
          gold: '#CBB677',
          goldLight: '#E5D9B5',
          cream: '#FAF8F3',
          slate: '#1a1a2e',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['EB Garamond', 'Georgia', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
