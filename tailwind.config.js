/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        saffron: {
          50: '#fff8f7',
          100: '#f8e8e6',
          200: '#efcfcb',
          300: '#dca19a',
          400: '#c66c64',
          500: '#981915',
          600: '#821511',
          700: '#68110e',
          800: '#4e0d0b',
          900: '#380908',
        },
        terracotta: {
          50: '#fffaf9',
          100: '#f4e3e0',
          200: '#e8c6c1',
          300: '#d6a09a',
          400: '#bc6f68',
          500: '#981915',
          600: '#821511',
          700: '#68110e',
          800: '#4e0d0b',
          900: '#380908',
        },
        wine: {
          50: '#fff8f7',
          100: '#f4e1df',
          200: '#e4beb9',
          300: '#cb8c84',
          400: '#b35d55',
          500: '#981915',
          600: '#821511',
          700: '#68110e',
          800: '#4e0d0b',
          900: '#380908',
        },
        cream: {
          50: '#fffdfc',
          100: '#eee6e4',
          200: '#e6d8d5',
          300: '#d8c3bf',
          400: '#c6a9a4',
          500: '#b38d86',
        },
        charcoal: {
          700: '#4b2624',
          800: '#2c1110',
          900: '#1c0808',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
