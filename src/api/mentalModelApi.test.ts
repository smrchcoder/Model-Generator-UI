import { describe, expect, it, vi } from "vitest";
import {
  ApiError,
  formatApiError,
  getConvertedArticleByRunId,
  requestJson,
  resolveApiBaseUrl,
} from "./mentalModelApi";

describe("resolveApiBaseUrl", () => {
  it("uses same-origin routes when no base url is set", () => {
    expect(resolveApiBaseUrl(undefined)).toBe("");
  });

  it("accepts only absolute http urls", () => {
    expect(resolveApiBaseUrl("https://api.example.com/v1/")).toBe(
      "https://api.example.com/v1",
    );
    expect(() => resolveApiBaseUrl("ftp://api.example.com")).toThrow(
      "VITE_API_BASE_URL must be an absolute http(s) URL.",
    );
  });
});

describe("formatApiError", () => {
  it("prefers backend detail strings and arrays", () => {
    expect(formatApiError(400, { detail: "Bad request" })).toBe("Bad request");
    expect(
      formatApiError(422, {
        detail: [{ msg: "URL is invalid" }, { msg: "Body is required" }],
      }),
    ).toBe("URL is invalid Body is required");
  });

  it("falls back to status-specific messages", () => {
    expect(formatApiError(404, {})).toBe(
      "The requested backend resource was not found.",
    );
    expect(formatApiError(500, {})).toBe("The backend hit an internal error.");
  });
});

describe("requestJson", () => {
  it("times out stalled requests", async () => {
    vi.useFakeTimers();
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn((_input: RequestInfo | URL, init?: RequestInit) => {
        return new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("The operation was aborted.", "AbortError"));
          });
        });
      }),
    );

    const requestPromise = expect(
      requestJson("/slow", undefined, { timeoutMs: 5 }),
    ).rejects.toMatchObject({
      name: "ApiError",
      message: "Request to /slow timed out after 5ms.",
    });

    await vi.advanceTimersByTimeAsync(5);
    await requestPromise;

    vi.useRealTimers();
  });

  it("preserves abort errors from caller cancellation", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn((_input: RequestInfo | URL, init?: RequestInit) => {
        return new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("The operation was aborted.", "AbortError"));
          });
        });
      }),
    );

    const abortController = new AbortController();
    const requestPromise = requestJson(
      "/abort",
      { signal: abortController.signal },
      { timeoutMs: 1000 },
    );

    abortController.abort();

    await expect(requestPromise).rejects.toMatchObject({ name: "AbortError" });
  });
});

describe("getConvertedArticleByRunId", () => {
  it("returns null when the backend reports the run was not found", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ detail: "Not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(getConvertedArticleByRunId("missing-run")).resolves.toBeNull();
  });

  it("rethrows non-404 api errors", async () => {
    vi.stubEnv("VITE_API_BASE_URL", "https://api.example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ detail: "Backend failed" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(getConvertedArticleByRunId("broken-run")).rejects.toMatchObject<ApiError>({
      name: "ApiError",
      status: 500,
      message: "Backend failed",
    });
  });
});
