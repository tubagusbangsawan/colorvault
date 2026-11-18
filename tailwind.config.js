/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#EEEEEE',
        ink: {
          DEFAULT: '#080808',
          light: '#222222',
          muted: '#555555',
          subtle: '#888888',
        },
        surface: {
          DEFAULT: '#E5E5E5',
          light: '#FFFFFF',
          dark: '#080808',
          panel: '#EFEFEF',
        },
        border: {
          DEFAULT: '#080808',
          subtle: '#CCCCCC',
        },
        brutal: {
          blue: '#2020FF',
          red: '#FF321C',
          green: '#39FF14',
          yellow: '#FFDE00',
          black: '#080808',
          white: '#FFFFFF',
          paper: '#EEEEEE',
        },
      },
      fontFamily: {
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        grotesk: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'Courier New', 'monospace'],
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0px #080808',
        'brutal-lg': '8px 8px 0px #080808',
        'brutal-sm': '2px 2px 0px #080808',
        'brutal-blue': '4px 4px 0px #2020FF',
        'brutal-red': '4px 4px 0px #FF321C',
      },
    },
  },
  plugins: [],
}
