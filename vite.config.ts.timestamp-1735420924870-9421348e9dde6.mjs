// vite.config.ts
import path from "path";
import { defineConfig } from "file:///c:/Users/DELL/Documents/projetos_OFC/anatai/node_modules/vite/dist/node/index.js";
import react from "file:///c:/Users/DELL/Documents/projetos_OFC/anatai/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { tempo } from "file:///c:/Users/DELL/Documents/projetos_OFC/anatai/node_modules/tempo-devtools/dist/vite/index.js";
var __vite_injected_original_dirname = "c:\\Users\\DELL\\Documents\\projetos_OFC\\anatai";
var conditionalPlugins = [];
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}
var vite_config_default = defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"]
  },
  plugins: [
    react({
      plugins: conditionalPlugins
    }),
    tempo()
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJjOlxcXFxVc2Vyc1xcXFxERUxMXFxcXERvY3VtZW50c1xcXFxwcm9qZXRvc19PRkNcXFxcYW5hdGFpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJjOlxcXFxVc2Vyc1xcXFxERUxMXFxcXERvY3VtZW50c1xcXFxwcm9qZXRvc19PRkNcXFxcYW5hdGFpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9jOi9Vc2Vycy9ERUxML0RvY3VtZW50cy9wcm9qZXRvc19PRkMvYW5hdGFpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHsgdGVtcG8gfSBmcm9tIFwidGVtcG8tZGV2dG9vbHMvZGlzdC92aXRlXCI7XG5cbmNvbnN0IGNvbmRpdGlvbmFsUGx1Z2luczogW3N0cmluZywgUmVjb3JkPHN0cmluZywgYW55Pl1bXSA9IFtdO1xuXG4vLyBAdHMtaWdub3JlXG5pZiAocHJvY2Vzcy5lbnYuVEVNUE8gPT09IFwidHJ1ZVwiKSB7XG4gIGNvbmRpdGlvbmFsUGx1Z2lucy5wdXNoKFtcInRlbXBvLWRldnRvb2xzL3N3Y1wiLCB7fV0pO1xufVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogcHJvY2Vzcy5lbnYuVklURV9CQVNFX1BBVEggfHwgXCIvXCIsXG4gIG9wdGltaXplRGVwczoge1xuICAgIGVudHJpZXM6IFtcInNyYy9tYWluLnRzeFwiLCBcInNyYy90ZW1wb2Jvb2svKiovKlwiXSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KHtcbiAgICAgIHBsdWdpbnM6IGNvbmRpdGlvbmFsUGx1Z2lucyxcbiAgICB9KSxcbiAgICB0ZW1wbygpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgcHJlc2VydmVTeW1saW5rczogdHJ1ZSxcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVCxPQUFPLFVBQVU7QUFDaFYsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsYUFBYTtBQUh0QixJQUFNLG1DQUFtQztBQUt6QyxJQUFNLHFCQUFzRCxDQUFDO0FBRzdELElBQUksUUFBUSxJQUFJLFVBQVUsUUFBUTtBQUNoQyxxQkFBbUIsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztBQUNwRDtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU0sUUFBUSxJQUFJLGtCQUFrQjtBQUFBLEVBQ3BDLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxnQkFBZ0Isb0JBQW9CO0FBQUEsRUFDaEQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxJQUNsQixPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
