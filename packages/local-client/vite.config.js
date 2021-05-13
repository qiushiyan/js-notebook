import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    {
      name: 'dynamic-import-polyfill',
      renderDynamicImport() {
        return {
          left: '__import__(',
          right: ', import.meta.url)'
        }
      }
    }
  ],
  define: {
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "./src"),
        },
      ],
    },
  },
  server: {
    fsServe: {
      strict: false
    },
    hmr: {
      overlay: false
    }
  },
})
