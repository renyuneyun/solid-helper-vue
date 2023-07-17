import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SolidHelperVue",
      fileName: "solid-helper-gh",
    },
    rollupOptions: {
      external: ["vue", "pinia", "@inrupt/solid-client-authn-browser"],
      output: {
        globals: {
          vue: "Vue",
          pinia: "Pinia",
          "@inrupt/solid-client-authn-browser": "solidClientAuthnBrowser",
        },
      },
    },
  },
});