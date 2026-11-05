import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Served from https://arnav149.github.io/ak-portfolio/
  base: "/ak-portfolio/",
  build: { outDir: "build" },
  server: { port: 3000, open: false },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js"
  }
});
