import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            // 1. Shared może zależeć tylko od innego Shared (czysta logika/modele)
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            // 2. Domenowe rzeczy (campaigns) mogą zależeć od siebie i od Shared
            {
              sourceTag: 'scope:campaigns',
              onlyDependOnLibsWithTags: ['scope:campaigns', 'scope:shared'],
            },
            // 3. Data-access może zależeć od modeli (to jest Twój przypadek!)
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:models', 'type:data-access'],
            },

            // 4. Modele nie powinny zależeć od niczego (są na dnie łańcucha)
            {
              sourceTag: 'type:models',
              onlyDependOnLibsWithTags: ['type:models'],
            },
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: ['type:data-access', 'type:ui'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    // Override or add rules here
    rules: {},
  },
];
