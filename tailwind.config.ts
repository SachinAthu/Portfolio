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
          '0%': { color: '#e91e63' },
          '20%': { color: '#2F2D2E' },
          '40%': { color: '#e98a15' },
          '60%': { color: '#008080' },
          '80%': { color: '#59114d' },
          '100%': { color: '#192BC2' },
        },
        'logo-d': {
          '0%': { color: '#e91e63' },
          '20%': { color: '#ece5f0' },
          '40%': { color: '#e98a15' },
          '60%': { color: '#008080' },
          '80%': { color: '#59114d' },
          '100%': { color: '#61E786' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
