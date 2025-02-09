import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.tsx'],
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
});
