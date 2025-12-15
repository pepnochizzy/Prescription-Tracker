import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        form: resolve(__dirname, "form/index.html"),
        tracker: resolve(__dirname, "tracker/index.html"),
      },
    },
  },
});
