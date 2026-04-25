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
            // 1. Shared nie zależy od niczego domenowego
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            // 2. Domenowe rzeczy (campaigns) mogą zależeć od siebie i od Shared
            {
              sourceTag: 'scope:campaigns',
              onlyDependOnLibsWithTags: ['scope:campaigns', 'scope:shared'],
            },
            // 3. Data-access może zależeć od shared (modele + util) i od innego data-access
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:data-access'],
            },
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: ['type:data-access', 'type:ui', 'scope:campaigns', 'scope:shared'],
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
