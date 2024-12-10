import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: '/index.html',
      },
    },
  },
  optimizeDeps: {
    include: ['d3', '@fancyapps/ui'],
  },
  server: {
    open: true,
  },
});
