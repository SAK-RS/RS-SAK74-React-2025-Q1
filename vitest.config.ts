import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export const a = defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.tsx'],
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
});

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      include: ['src/**/*.test.tsx'],
      environment: 'jsdom',
      setupFiles: './src/tests/setup.ts',
      coverage: {
        include: ['src/**/*.tsx'],
        exclude: ['**/*.test.tsx', 'App.tsx', 'main.tsx', '/utils/**'],
      },
    },
  })
);
