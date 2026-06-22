import { describe, expect, it } from "vitest";
import { getSafeHttpUrl, isSafeHttpUrl, parseSafeHttpUrl } from "./urlSafety";

describe("urlSafety", () => {
  it("accepts absolute http urls", () => {
    expect(parseSafeHttpUrl("https://example.com/docs")).toBeInstanceOf(URL);
    expect(getSafeHttpUrl("https://example.com/docs")).toBe(
      "https://example.com/docs",
    );
    expect(isSafeHttpUrl("http://example.com/article")).toBe(true);
  });

  it("rejects non-web and invalid urls", () => {
    expect(parseSafeHttpUrl("javascript:alert('xss')")).toBeNull();
    expect(getSafeHttpUrl("data:text/html;base64,abc123")).toBeNull();
    expect(isSafeHttpUrl("file:///tmp/secret.txt")).toBe(false);
    expect(parseSafeHttpUrl("not a url")).toBeNull();
  });
});
