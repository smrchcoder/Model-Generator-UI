import { describe, expect, it } from "vitest";
import {
  RAW_TEXT_MAX_LENGTH,
  RAW_TEXT_MIN_LENGTH,
  SOURCE_DOMAIN_MAX_LENGTH,
  SOURCE_TITLE_MAX_LENGTH,
  validateGenerationForm,
} from "./generationFormValidation";

describe("validateGenerationForm", () => {
  it("builds a URL payload when the source URL is public", () => {
    const result = validateGenerationForm({
      mode: "url",
      sourceUrl: "https://example.com/article",
      rawText: "",
      sourceTitle: "Kafka internals",
      sourceDomain: "example.com",
    });

    expect(result.errors).toEqual({});
    expect(result.payload).toEqual({
      source_url: "https://example.com/article",
      raw_text: undefined,
      source_title: "Kafka internals",
      source_domain: "example.com",
    });
  });

  it("rejects local and private URLs", () => {
    const result = validateGenerationForm({
      mode: "url",
      sourceUrl: "http://127.0.0.1:8000/private",
      rawText: "",
      sourceTitle: "",
      sourceDomain: "",
    });

    expect(result.payload).toBeNull();
    expect(result.errors.sourceUrl).toContain("public http(s) URL");
  });

  it("enforces raw text, title, and domain limits", () => {
    const result = validateGenerationForm({
      mode: "text",
      sourceUrl: "",
      rawText: "x".repeat(RAW_TEXT_MAX_LENGTH + 1),
      sourceTitle: "t".repeat(SOURCE_TITLE_MAX_LENGTH + 1),
      sourceDomain: "d".repeat(SOURCE_DOMAIN_MAX_LENGTH + 1),
    });

    expect(result.payload).toBeNull();
    expect(result.errors.rawText).toContain(String(RAW_TEXT_MAX_LENGTH));
    expect(result.errors.sourceTitle).toContain(String(SOURCE_TITLE_MAX_LENGTH));
    expect(result.errors.sourceDomain).toContain(String(SOURCE_DOMAIN_MAX_LENGTH));
  });

  it("requires enough raw text when text mode is selected", () => {
    const result = validateGenerationForm({
      mode: "text",
      sourceUrl: "",
      rawText: "x".repeat(RAW_TEXT_MIN_LENGTH - 1),
      sourceTitle: "",
      sourceDomain: "",
    });

    expect(result.payload).toBeNull();
    expect(result.errors.rawText).toContain(String(RAW_TEXT_MIN_LENGTH));
  });
});
