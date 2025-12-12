import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      tailwindcss(),
    ],
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
  };
});
