import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-inter)', ...fontFamily.sans],
        body: ['var(--font-montserrat)', ...fontFamily.sans],
      },
      screens: {
        '2xs': '360px',
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px',
      },
      container: {
        center: true,
        screens: {
          xl: '1280px',
        },
        padding: {
          DEFAULT: '3%',
          xl: '0%',
        },
      },
      colors: {
        background: '#F5F5F5',
        primary: '#E91E63',
        accent: '#008080',
        text: '#212121',
        subtext: '#757575',
        nav: '#303030',

        d: {
          background: '#1E1E1E',
          text: '#F5F5F5',
          subtext: '#9E9E9E',
        },
      },
      boxShadow: {
        header: '0px 1px 5px 0px rgba(30, 30, 30, 0.075)',
      },
      keyframes: {
        logo: {
          '0%': { color: '#1E1E1E' },
          '10%': { color: '#64748b' },
          '20%': { color: '#ef4444' },
          '30%': { color: '#eab308' },
          '40%': { color: '#14b8a6' },
          '50%': { color: '#06b6d4' },
          '60%': { color: '#3b82f6' },
          '70%': { color: '#8b5cf6' },
          '80%': { color: '#c026d3' },
          '90%': { color: '#f43f5e' },
          '100%': { color: '#1E1E1E' },
        },
        'logo-d': {
          '0%': { color: '#F5F5F5' },
          '10%': { color: '#64748b' },
          '20%': { color: '#ef4444' },
          '30%': { color: '#eab308' },
          '40%': { color: '#14b8a6' },
          '50%': { color: '#06b6d4' },
          '60%': { color: '#3b82f6' },
          '70%': { color: '#8b5cf6' },
          '80%': { color: '#c026d3' },
          '90%': { color: '#f43f5e' },
          '100%': { color: '#F5F5F5' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
