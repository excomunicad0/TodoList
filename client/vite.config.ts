import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // слушаю путь на сервер
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
      },
    },
  },
});
