import { describe, expect, it } from "vitest";
import { getLibraryCardData } from "./normalizeMentalModel";
import type { ConvertedArticleRead } from "./mentalModelApi";

const sampleArticle: ConvertedArticleRead = {
  article_id: "article-1",
  source_title: "Unsafe Source",
  source_domain: "example.com",
  source_url: "javascript:alert('xss')",
  word_count: 440,
  created_at: "2026-06-22T00:00:00Z",
  run_id: "run-1",
  status: "completed",
  updated_at: "2026-06-22T00:00:00Z",
  sections: {
    overview: {
      one_line_summary: "Summary",
      system_name: "System",
      company: "Company",
      domain: ["platform"],
      full_summary: "Full summary",
      why_it_exists: "Because",
      reading_time_min: 2,
    },
    key_concepts: { concepts: [] },
    problem_statement: null,
    architecture: null,
    flow: null,
    tradeoffs: null,
  },
};

describe("getLibraryCardData", () => {
  it("downgrades unsafe source urls to plain text", () => {
    expect(getLibraryCardData(sampleArticle, 0).sourceUrl).toBeNull();
  });
});
