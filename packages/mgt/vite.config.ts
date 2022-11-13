import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~@": path.resolve(__dirname, "src"),
    }
  },
  server: {
    port: 8081,
    proxy: {
      '/api': {
        'target': 'http://18.141.222.213/',
        'changeOrigin': true,
        // 'pathRewrite': { '^/api': '' },
      },
    },
  }
});
