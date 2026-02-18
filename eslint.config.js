//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';

export default [
  ...tanstackConfig,
  {
    ignores: ['.output/', '.tanstack/', 'dist/', 'build/', 'node_modules/', 'routeTree.gen.ts'],
  },
  {
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
    },
  },
];
