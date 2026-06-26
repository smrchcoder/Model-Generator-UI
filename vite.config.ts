import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function resolveProxyTarget(env: Record<string, string>) {
  const candidate =
    env.BACKEND_API_BASE_URL?.trim() ||
    env.VITE_API_BASE_URL?.trim() ||
    "http://localhost:8000";

  return /^https?:\/\//.test(candidate) ? candidate : "http://localhost:8000";
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget = resolveProxyTarget(env);

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/orchestrator": {
          target: proxyTarget,
          changeOrigin: true,
        },
        "/storage": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/test/setup.ts",
    },
  };
});
