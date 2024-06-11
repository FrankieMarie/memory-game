/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        everforest: {
          red: '#E67E80',
          orange: '#E69875',
          yellow: '#DBBC7F',
          green: '#A7C080',
          blue: '#3A94C5',
          purple: '#D699B6',
          aqua: '#83C092',
          tan: '#D3C6AA',
          bg0: '#272E33',
          gray0: '#BAC2BC',
          light: '#D3D3D3',
          bg_blue: '#ECF5ED',
        },
      },
    },
  },
  plugins: [],
};
