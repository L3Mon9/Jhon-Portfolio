/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Orbitron"', 'monospace'],
        body: ['"Share Tech Mono"', 'monospace'],
        sans: ['"Exo 2"', 'sans-serif'],
      },
      colors: {
        neon: {
          blue: '#00d4ff',
          cyan: '#00ffee',
          purple: '#7b2fff',
          pink: '#ff2d78',
        },
        dark: {
          900: '#020408',
          800: '#050d14',
          700: '#081422',
          600: '#0a1f33',
          500: '#0d2a44',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { textShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff' },
          to: { textShadow: '0 0 20px #00ffee, 0 0 40px #00ffee, 0 0 80px #00ffee' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-lg': '0 0 40px rgba(0, 212, 255, 0.4)',
        'neon-purple': '0 0 20px rgba(123, 47, 255, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
