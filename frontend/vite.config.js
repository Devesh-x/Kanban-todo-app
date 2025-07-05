import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
    open: true,
    port: 5173,
    // 👇 This ensures refreshing doesn't break in dev
    fs: {
      strict: false,
    }
  },
  // 👇 IMPORTANT: for Vercel & static hosts
  preview: {
    port: 4173,
    strictPort: true,
  }
});
