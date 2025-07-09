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
  assetsInclude: ['**/*.nc', '**/*.h5', '**/*.csv'], // Add all data file types
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const fileExtension = assetInfo.name?.split('.').pop()?.toLowerCase();
          if (fileExtension === 'nc' || fileExtension === 'h5' || fileExtension === 'csv') {
            return 'assets/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
