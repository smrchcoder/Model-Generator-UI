import { describe, expect, it } from "vitest";
import {
  getPublicHttpUrl,
  getSafeHttpUrl,
  isPublicHttpUrl,
  isSafeHttpUrl,
  parsePublicHttpUrl,
  parseSafeHttpUrl,
} from "./urlSafety";

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

  it("rejects obvious local and private targets for public inputs", () => {
    expect(parsePublicHttpUrl("http://localhost:3000/article")).toBeNull();
    expect(getPublicHttpUrl("http://127.0.0.1/article")).toBeNull();
    expect(isPublicHttpUrl("https://192.168.1.10/path")).toBe(false);
    expect(parsePublicHttpUrl("https://example.com/docs")).toBeInstanceOf(URL);
  });
});
