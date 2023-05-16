import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
  },
  test: {
    watch: false,
    globals: true,
    reporters: ['verbose'],
    setupFiles: ['vitest.setup.ts'],
    environment: 'happy-dom',
  },
});
