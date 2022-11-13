import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      logger: true,
      localEnabled: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api/bk': {
        'target': 'http://127.0.0.1:3000/',
        'changeOrigin': true,
        rewrite: (path) => path.replace(/^\/api\/bk\//, '/'),
      },
      '/api': {
        target: 'http://18.141.222.213/',
        changeOrigin: true,
        // 'pathRewrite': { '^/api': '' },
      },
    },
  },
});
