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
          d3: ['d3'],
          fancybox: ['@fancyapps/ui']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['d3', '@fancyapps/ui']
  },
  server: {
    open: true
  }
})
