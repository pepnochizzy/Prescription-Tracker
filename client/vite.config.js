import { dir } from "console";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";

const __dirname = dirname("client");

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        form: resolve(__dirname, "src/form/index.html"),
        tracker: resolve(__dirname, "src/tracker/index.html"),
      },
    },
  },
});
