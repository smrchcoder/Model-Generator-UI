import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(ROOT_DIR, "dist");
const INDEX_HTML_PATH = path.join(DIST_DIR, "index.html");
const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 4173);
const API_ROUTE_PATTERNS = [
  /^\/orchestrator\/runs(?:\/[^/]+)?$/,
  /^\/storage\/articles\/converted$/,
];

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function json(response, statusCode, payload, extraHeaders = {}) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    ...extraHeaders,
  });
  response.end(JSON.stringify(payload));
}

function getBackendConfig() {
  return {
    backendApiBaseUrl:
      process.env.BACKEND_API_BASE_URL?.trim() ||
      process.env.VITE_PUBLIC_API_BASE_URL?.trim() ||
      process.env.VITE_API_BASE_URL?.trim() ||
      "",
    corsAllowedOrigins: (process.env.CORS_ALLOW_ORIGINS || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  };
}

function buildCorsHeaders(request) {
  const origin = request.headers.origin;
  const { corsAllowedOrigins } = getBackendConfig();
  if (!origin || corsAllowedOrigins.length === 0) return {};

  if (corsAllowedOrigins.includes("*")) {
    return {
      "Access-Control-Allow-Origin": "*",
      Vary: "Origin",
    };
  }

  if (corsAllowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      Vary: "Origin",
    };
  }

  return {};
}

function isPublicApiRoute(pathname) {
  return API_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname));
}

async function readRequestBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

async function proxyPublicRequest(request, response, pathname, search) {
  const { backendApiBaseUrl } = getBackendConfig();
  const corsHeaders = buildCorsHeaders(request);

  if (!backendApiBaseUrl) {
    json(
      response,
      503,
      {
        detail:
          "BACKEND_API_BASE_URL or VITE_API_BASE_URL is required to proxy public API requests.",
      },
      corsHeaders,
    );
    return;
  }

  const body =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await readRequestBody(request);

  let backendResponse;

  try {
    backendResponse = await fetch(`${backendApiBaseUrl}${pathname}${search}`, {
      method: request.method,
      headers: {
        Accept: request.headers.accept || "application/json",
        ...(request.headers["content-type"]
          ? { "Content-Type": request.headers["content-type"] }
          : {}),
      },
      body,
    });
  } catch {
    json(
      response,
      502,
      {
        detail: "Unable to reach the backend API.",
      },
      corsHeaders,
    );
    return;
  }

  const responseBody = Buffer.from(await backendResponse.arrayBuffer());
  response.writeHead(backendResponse.status, {
    "Content-Type":
      backendResponse.headers.get("content-type") ||
      "application/json; charset=utf-8",
    ...corsHeaders,
  });
  response.end(responseBody);
}

async function serveIndexHtml(response) {
  try {
    const html = await readFile(INDEX_HTML_PATH);
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    response.end(html);
  } catch {
    json(response, 503, {
      detail: "The frontend has not been built yet. Run `npm run build` first.",
    });
  }
}

async function serveStaticAsset(response, pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const assetPath = path.join(DIST_DIR, relativePath);
  const normalizedAssetPath = path.normalize(assetPath);

  if (!normalizedAssetPath.startsWith(path.normalize(DIST_DIR))) {
    json(response, 400, { detail: "Invalid asset path." });
    return true;
  }

  try {
    const asset = await readFile(normalizedAssetPath);
    const extension = path.extname(normalizedAssetPath).toLowerCase();
    response.writeHead(200, {
      "Content-Type":
        MIME_TYPES[extension] || "application/octet-stream",
    });
    response.end(asset);
    return true;
  } catch {
    return false;
  }
}

const server = createServer(async (request, response) => {
  if (!request.url || !request.method) {
    json(response, 400, { detail: "Invalid request." });
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const { pathname, search } = url;

  if (request.method === "OPTIONS" && isPublicApiRoute(pathname)) {
    const corsHeaders = buildCorsHeaders(request);
    response.writeHead(204, {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Accept, Content-Type",
      "Access-Control-Max-Age": "600",
      ...corsHeaders,
    });
    response.end();
    return;
  }

  if (isPublicApiRoute(pathname)) {
    await proxyPublicRequest(request, response, pathname, search);
    return;
  }

  if (pathname !== "/" && (await serveStaticAsset(response, pathname))) {
    return;
  }

  await serveIndexHtml(response);
});

server.listen(PORT, HOST, () => {
  console.log(`Mental Model UI server running at http://${HOST}:${PORT}`);
});
