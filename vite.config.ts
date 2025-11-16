import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "client",
  build: {
    outDir: "../dist/public",
    emptyOutDir: true,
  },
  server: {
    port: 5000
  }
});
