import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        saisoBlue: '#2B6CFF',
        saisoRed: '#E73B3B',
        saisoDark: '#121826'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(16, 24, 40, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
