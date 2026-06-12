import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            if (id.includes('zustand')) {
              return 'state';
            }
            if (id.includes('lucide-react') || id.includes('react-toastify') || id.includes('framer-motion')) {
              return 'ui';
            }
            return 'vendor';
          }
        }
      }
    }
  },
});
