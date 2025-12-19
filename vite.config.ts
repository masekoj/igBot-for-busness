import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/igBot-for-busness/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
