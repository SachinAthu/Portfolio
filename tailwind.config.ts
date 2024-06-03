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
          DEFAULT: '2%',
          xl: '5%',
        },
      },
      colors: {
        background: '#F5F5F5',
        primary: '#E91E63',
        secondary: '#FE654F',
        text: '#212121',
        subtext: '#757575',

        d: {
          background: '#1E1E1E',
          primary: '#E91E63',
          secondary: '#FE654F',
          text: '#F5F5F5',
          subtext: '#9E9E9E',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
