const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // To mówi Tailwindowi: "Skanuj moją apkę i wszystkie liby, od których ona zależy"
    join(__dirname, 'apps/team-fundraiser/src/**/*.{html,ts}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      // Tu będziemy dodawać customowe kolory, żeby UI wyglądał "drogo"
    },
  },

  daisyui: {
    themes: ['light', 'dark'],
  },
};
