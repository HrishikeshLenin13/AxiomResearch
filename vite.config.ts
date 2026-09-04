import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "node:path";
import { createVolunteerAccessMiddleware } from "./scripts/volunteer-access-middleware.mjs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      {
        name: "volunteer-access-api",
        configureServer(server) {
          server.middlewares.use(createVolunteerAccessMiddleware(env));
        },
        configurePreviewServer(server) {
          server.middlewares.use(createVolunteerAccessMiddleware(env));
        },
      },
      TanStackRouterVite({
        target: "react",
        autoCodeSplitting: true,
        routesDirectory: "./src/routes",
        generatedRouteTree: "./src/routeTree.gen.ts",
      }),
      react(),
      tailwindcss(),
      tsconfigPaths(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      outDir: "dist",
    },
  };
});
