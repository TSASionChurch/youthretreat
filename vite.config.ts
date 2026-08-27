import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      // Raise the warning threshold so large page chunks don't generate noise
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Split vendor libraries into separate, long-cached chunks.
          // Mobile browsers can cache these indefinitely between page visits.
          manualChunks: {
            // React core — rarely changes, maximises cache hits
            'vendor-react': ['react', 'react-dom'],
            // Router
            'vendor-router': ['react-router-dom'],
            // Animation library
            'vendor-motion': ['motion'],
            // Icon library
            'vendor-icons': ['lucide-react'],
          },
        },
      },
    },
  };
});
