// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "lib/index.ts"),
      name: "Observer Container",
      // the proper extensions will be added
      fileName: "observer-container",
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
});
