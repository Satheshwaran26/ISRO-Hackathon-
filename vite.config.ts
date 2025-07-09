import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.nc', '**/*.h5', '**/*.csv', '**/*.jpg', '**/*.png'], // Add image formats
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const fileExtension = assetInfo.name?.split('.').pop()?.toLowerCase();
          if (fileExtension === 'nc' || fileExtension === 'h5' || fileExtension === 'csv' || 
              fileExtension === 'jpg' || fileExtension === 'png') {
            return 'assets/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    assetsDir: 'assets',
    copyPublicDir: true,
  },
});
