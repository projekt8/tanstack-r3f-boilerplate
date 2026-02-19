import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
  ],
  test: {
    pool: 'forks',
    teardownTimeout: 1000,
  },
});
