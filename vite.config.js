// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { writeFileSync, copyFileSync } from "fs";

const repoName = "risk-management";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-404",
      closeBundle() {
        // Copy index.html to 404.html after build
        const indexPath = resolve(__dirname, "dist/index.html");
        const notFoundPath = resolve(__dirname, "dist/404.html");
        try {
          copyFileSync(indexPath, notFoundPath);
          console.log("✔ Copied index.html to 404.html for SPA fallback");
        } catch (e) {
          console.warn("⚠ Could not create 404.html", e);
        }
      },
    },
  ],
  base: `/${repoName}/`, // required for GH Pages
  build: {
    outDir: "dist",
  },
  server: {
    port: 5173,
    open: true,
  },
});
