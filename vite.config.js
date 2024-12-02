import { defineConfig } from "vite";

export default defineConfig({
  base: "/nikomayra.github.io/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  optimizeDeps: {
    resolve: {
      alias: {
        "@fancyapps/ui": "node_modules/@fancyapps/ui",
      },
    },
    include: ["d3", "@fancyapps/ui"],
  },
  server: {
    open: true,
  },
});
