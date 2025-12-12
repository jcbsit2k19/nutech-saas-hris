import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores, loadEnv } from "eslint/config";
import path from "path";

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);
const env = loadEnv(mode, process.cwd(), "");
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
    build: {
      chunkSizeWarningLimit: 1500,
    },
    resolve: {
      alias: {
        "@components": resolvePath("src/components"),
        "@custom-components": resolvePath("src/custom-components"),
        "@assets": resolvePath("src/assets"),
        "@pages": resolvePath("src/pages"),
        "@utils": resolvePath("src/utils"),
        "@layouts": resolvePath("src/layouts"),
        "@helpers": resolvePath("src/helpers"),
        "@features": resolvePath("src/features"),
        "@hooks": resolvePath("src/hooks"),
        "@contexts": resolvePath("src/contexts"),
      },
    },
  },
]);
