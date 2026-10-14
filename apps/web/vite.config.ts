import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Semua panggilan /api diteruskan ke backend saat development.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
