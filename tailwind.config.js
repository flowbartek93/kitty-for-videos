const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        teamfund: {
          primary: '#5159ff', // Ten żywy fiolet/niebieski
          'primary-content': '#ffffff',
          'base-100': '#0f111a', // Najciemniejsze tło (pod spodem)
          'base-200': '#161926', // Tło Sidebaru i Topbaru
          'base-300': '#1c2033', // Tło Kart i Kafelków
          neutral: '#252a41', // Kolor borderów i linii
          accent: '#00d2ff', // Opcjonalny akcent
          success: '#10b981', // Zielony (Online)
        },
      },
    ],
  },
};
