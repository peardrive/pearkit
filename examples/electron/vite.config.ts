import { defineConfig } from 'vite';
import { pearkit } from 'pearkit/vite';

export default defineConfig({
  base: './',
  plugins: [pearkit()],
  server: { port: 5173, strictPort: true },
});
