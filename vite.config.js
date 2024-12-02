import { defineConfig } from 'vite'

export default defineConfig({
  base: '/nikomayra.github.io/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  resolve: {
    alias: {
      '@fancyapps/ui': '/node_modules/@fancyapps/ui'
    }
  },
  optimizeDeps: {
    include: ['d3']
  },
  server: {
    open: true
  }
})
