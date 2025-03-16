import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { BASE_URL } from './base';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths(), tailwindcss()],
  server: {
    host: true,
    port: 3000,
  },
  base: BASE_URL,
});
