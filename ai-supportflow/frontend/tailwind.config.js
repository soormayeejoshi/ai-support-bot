/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wa: {
          green: '#25D366',
          dark: '#128C7E',
          teal: '#075E54',
          light: '#DCF8C6',
          bg: '#ECE5DD',
          panel: '#F0F2F5',
          header: '#202C33',
          bubble: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'dot-bounce': {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: 0.4 },
          '40%': { transform: 'scale(1)', opacity: 1 },
        },
        'slide-in': {
          '0%': { opacity: 0, transform: 'translateX(-16px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.25s ease-out',
        'dot1': 'dot-bounce 1.2s ease-in-out infinite',
        'dot2': 'dot-bounce 1.2s ease-in-out 0.2s infinite',
        'dot3': 'dot-bounce 1.2s ease-in-out 0.4s infinite',
        'slide-in': 'slide-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
