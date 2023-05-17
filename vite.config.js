import { fileURLToPath, URL } from "node:url";
import { cwd } from "node:process";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import VitePluginHtmlEnv from "vite-plugin-html-env";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), "");
  return {
    base: env.VITE_PUBLIC_BASE_PATH,
    plugins: [vue(), VitePluginHtmlEnv()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/rwd.scss" as *;
          `,
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: "6789",
      proxy: {
        "/api": {
          target: "",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
