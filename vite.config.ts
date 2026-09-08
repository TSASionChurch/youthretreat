import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const WP_THEME_DIST =
  'C:/Users/HP/Local Sites/tsasion/app/public/wp-content/themes/tsa-sion/dist';

export default defineConfig(({mode}) => {
  const isWp = mode === 'wordpress';

  return {
    plugins: [react(), tailwindcss()],
    base: isWp ? '/wp-content/themes/tsa-sion/dist/' : '/',
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
      outDir: isWp ? WP_THEME_DIST : 'dist',
      emptyOutDir: true,
      manifest: isWp,
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
