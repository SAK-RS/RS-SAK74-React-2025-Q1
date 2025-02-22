import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

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
        exclude: [
          'src/App.tsx',
          'src/main.tsx',
          'src/utils/**',
          'src/routes.tsx',
          '**/Error*',
          '**/Example*',
          '**/Footer.tsx',
        ],
        clean: true,
      },
    },
  })
);
