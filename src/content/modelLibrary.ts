import { sampleMentalModel } from "./sampleMentalModel";
import type { MentalModelRun } from "../types/mentalModel";

export interface LibraryModelEntry {
  slug: string;
  title: string;
  focusLabel: string;
  sourceTitle: string;
  sourceDomain: string;
  sourceUrl: string;
  summary: string;
  modelLabel: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  model: MentalModelRun;
}

interface ModelVariantConfig {
  runId: string;
  articleId: string;
  systemName: string;
  oneLineSummary: string;
  fullSummary: string;
  whyItExists: string;
  domains: string[];
  readingTimeMin: number;
}

const buildModelVariant = ({
  runId,
  articleId,
  systemName,
  oneLineSummary,
  fullSummary,
  whyItExists,
  domains,
  readingTimeMin,
}: ModelVariantConfig): MentalModelRun => ({
  ...sampleMentalModel,
  run_id: runId,
  article_id: articleId,
  overview: {
    ...sampleMentalModel.overview,
    system_name: systemName,
    one_line_summary: oneLineSummary,
    full_summary: fullSummary,
    why_it_exists: whyItExists,
    domain: domains,
    reading_time_min: readingTimeMin,
  },
});

export const modelLibrary: LibraryModelEntry[] = [
  {
    slug: "scaling-archrules-nebula",
    title: "Scaling ArchRules with Nebula ArchRules",
    focusLabel: "Architecture governance",
    sourceTitle: "Scaling ArchRules with Nebula ArchRules",
    sourceDomain: "netflixtechblog.com",
    sourceUrl:
      "https://netflixtechblog.com/scaling-archunit-with-nebula-archrules",
    summary:
      "A library model showing how Netflix scales architectural rule enforcement across thousands of repositories.",
    modelLabel: "Model 01",
    difficulty: "Advanced",
    tags: ["ArchUnit", "Java", "Platform engineering"],
    model: buildModelVariant({
      runId: "sample-run-01",
      articleId: "sample-article-01",
      systemName: "Nebula ArchRules",
      oneLineSummary:
        "Netflix scales architectural rule enforcement by combining Nebula ArchRules, ServiceLoader discovery, and build-time reporting.",
      fullSummary:
        "This library model explains how Netflix uses Nebula ArchRules to scale architectural checks across a polyrepo Java ecosystem. It focuses on the build pipeline, rule distribution, and the reporting path that gives developers actionable feedback without relying on a monorepo.",
      whyItExists:
        "The system exists to make architectural expectations enforceable across thousands of repositories while keeping feedback close to the developer workflow.",
      domains: ["Platform engineering", "Architecture governance", "Developer tools"],
      readingTimeMin: 11,
    }),
  },
  {
    slug: "serviceloader-rule-discovery",
    title: "ServiceLoader for Rule Discovery",
    focusLabel: "Rule discovery flow",
    sourceTitle: "ServiceLoader as the discovery layer for shared rules",
    sourceDomain: "netflixtechblog.com",
    sourceUrl:
      "https://netflixtechblog.com/scaling-archunit-with-nebula-archrules",
    summary:
      "A public model focused on how rules are discovered, loaded, and made available to the runner plugin.",
    modelLabel: "Model 02",
    difficulty: "Intermediate",
    tags: ["ServiceLoader", "Discovery", "JVM ecosystem"],
    model: buildModelVariant({
      runId: "sample-run-02",
      articleId: "sample-article-02",
      systemName: "ServiceLoader rule discovery",
      oneLineSummary:
        "The pipeline uses ServiceLoader to discover shared rule definitions and make them available during build-time evaluation.",
      fullSummary:
        "This version of the library model highlights the discovery path inside the Nebula ArchRules workflow. It emphasizes how ServiceLoader helps rule authors publish reusable checks that can be picked up automatically across repositories.",
      whyItExists:
        "Discovery matters because shared rules only become operationally useful when teams can publish them once and consume them everywhere.",
      domains: ["Developer tooling", "Rule distribution", "JVM ecosystem"],
      readingTimeMin: 9,
    }),
  },
  {
    slug: "deprecated-api-lifecycle",
    title: "Managing Deprecated APIs Across Repositories",
    focusLabel: "Lifecycle management",
    sourceTitle: "Managing deprecated APIs across large Java estates",
    sourceDomain: "netflixtechblog.com",
    sourceUrl:
      "https://netflixtechblog.com/scaling-archunit-with-nebula-archrules",
    summary:
      "A library model that centers on the technical-debt and lifecycle-management problem behind the rules infrastructure.",
    modelLabel: "Model 03",
    difficulty: "Advanced",
    tags: ["Technical debt", "Deprecation", "Repository scale"],
    model: buildModelVariant({
      runId: "sample-run-03",
      articleId: "sample-article-03",
      systemName: "Java library lifecycle management",
      oneLineSummary:
        "Netflix needed a reliable way to track deprecated APIs and lifecycle risk across thousands of Java repositories.",
      fullSummary:
        "This catalog entry frames the article through the operational problem it solves: managing deprecated APIs, technical debt, and backwards-incompatible changes without losing visibility at organizational scale.",
      whyItExists:
        "Library authors need better evidence for when code can be removed safely and when old APIs still affect downstream systems.",
      domains: ["Technical debt", "Dependency management", "Developer platform"],
      readingTimeMin: 10,
    }),
  },
  {
    slug: "bundled-rule-libraries",
    title: "Bundled Rule Libraries",
    focusLabel: "Library packaging",
    sourceTitle: "Bundling reusable ArchUnit rules with implementation libraries",
    sourceDomain: "netflixtechblog.com",
    sourceUrl:
      "https://netflixtechblog.com/scaling-archunit-with-nebula-archrules",
    summary:
      "A public model focused on how reusable rules are packaged, discovered, and applied only where they matter.",
    modelLabel: "Model 04",
    difficulty: "Intermediate",
    tags: ["Rule libraries", "Gradle", "Shared standards"],
    model: buildModelVariant({
      runId: "sample-run-04",
      articleId: "sample-article-04",
      systemName: "Bundled rule libraries",
      oneLineSummary:
        "Bundled rule libraries let teams ship architectural expectations together with the libraries they want to govern.",
      fullSummary:
        "This entry narrows in on how bundled rule libraries reduce rollout friction by letting teams package enforcement logic alongside the code those rules are meant to protect.",
      whyItExists:
        "Bundling rules improves targeting and adoption because the right checks can travel with the dependency itself.",
      domains: ["Gradle", "Rule packaging", "Build systems"],
      readingTimeMin: 8,
    }),
  },
  {
    slug: "rule-evaluation-pipeline",
    title: "Rule Evaluation Pipeline",
    focusLabel: "Build-time execution",
    sourceTitle: "Build-time rule evaluation in the ArchRules runner",
    sourceDomain: "netflixtechblog.com",
    sourceUrl:
      "https://netflixtechblog.com/scaling-archunit-with-nebula-archrules",
    summary:
      "A library model for the end-to-end path from rules classpath discovery to serialized violation output.",
    modelLabel: "Model 05",
    difficulty: "Advanced",
    tags: ["Build pipeline", "Violation reporting", "Automation"],
    model: buildModelVariant({
      runId: "sample-run-05",
      articleId: "sample-article-05",
      systemName: "Rule evaluation pipeline",
      oneLineSummary:
        "The ArchRules runner evaluates shared rules at build time and writes structured outputs for later reporting and analysis.",
      fullSummary:
        "This library model emphasizes the execution path inside the rules runner, including classpath determination, rule loading, work actions, and structured output generation for downstream systems.",
      whyItExists:
        "Build-time feedback gives developers immediate visibility into rule violations before drift compounds across repositories.",
      domains: ["Build automation", "Static analysis", "Developer feedback"],
      readingTimeMin: 12,
    }),
  },
  {
    slug: "reporting-architectural-violations",
    title: "Reporting Architectural Violations at Scale",
    focusLabel: "Reporting and feedback",
    sourceTitle: "Turning architectural checks into developer-facing reports",
    sourceDomain: "netflixtechblog.com",
    sourceUrl:
      "https://netflixtechblog.com/scaling-archunit-with-nebula-archrules",
    summary:
      "A library model focused on how rule outputs become reports that teams can inspect, route, and act on.",
    modelLabel: "Model 06",
    difficulty: "Intermediate",
    tags: ["Reporting", "Developer experience", "Feedback loops"],
    model: buildModelVariant({
      runId: "sample-run-06",
      articleId: "sample-article-06",
      systemName: "Architectural violation reporting",
      oneLineSummary:
        "Structured console and JSON reports turn architectural checks into feedback that teams can inspect and operationalize.",
      fullSummary:
        "This entry focuses on the reporting side of the system, showing how architectural findings become portable outputs that developers and internal platforms can consume.",
      whyItExists:
        "Rule enforcement only becomes useful when the resulting feedback is clear enough to inspect, route, and act on.",
      domains: ["Reporting", "Developer portals", "Operational feedback"],
      readingTimeMin: 7,
    }),
  },
];

export function getLibraryModelBySlug(slug: string) {
  return modelLibrary.find((entry) => entry.slug === slug);
}
