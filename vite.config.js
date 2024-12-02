import { defineConfig } from 'vite'

export default defineConfig({
  base: '/nikomayra.github.io/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        manualChunks: {
          d3: ['d3']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['d3', '@fancyapps/ui/dist/fancybox/fancybox.esm.js']
  },
  server: {
    open: true
  }
})
