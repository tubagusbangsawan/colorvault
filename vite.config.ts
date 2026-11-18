import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site: https://tubagusbangsawan.github.io/colorvault/
export default defineConfig({
  base: '/colorvault/',
  plugins: [react()],
});
