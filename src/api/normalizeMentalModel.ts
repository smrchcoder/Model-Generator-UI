import type {
  ConvertedArticleRead,
  ProcessingRunRead,
} from "./mentalModelApi";
import { getSafeHttpUrl } from "../utils/urlSafety";
import type {
  MentalModelArchitecture,
  MentalModelConcept,
  MentalModelFlow,
  MentalModelOverview,
  MentalModelProblemStatement,
  MentalModelRun,
  MentalModelSectionId,
  MentalModelTradeoffs,
} from "../types/mentalModel";

const DEFAULT_SECTION_ORDER: MentalModelSectionId[] = [
  "overview",
  "key_concepts",
  "problem_statement",
  "architecture",
  "flow",
  "tradeoffs",
];

const isSectionId = (value: string): value is MentalModelSectionId =>
  DEFAULT_SECTION_ORDER.includes(value as MentalModelSectionId);

export function convertedArticleToRun(article: ConvertedArticleRead): ProcessingRunRead {
  return {
    run_id: article.run_id,
    status: "completed",
    current_step: "completed",
    progress_percent: 100,
    article_id: article.article_id,
    section_order: DEFAULT_SECTION_ORDER,
    overview: article.sections.overview,
    key_concepts: article.sections.key_concepts,
    problem_statement: article.sections.problem_statement,
    architecture: article.sections.architecture,
    flow: article.sections.flow,
    tradeoffs: article.sections.tradeoffs,
    error_message: null,
    created_at: article.created_at,
    updated_at: article.updated_at,
  };
}

function normalizeSectionOrder(sectionOrder: string[]) {
  const validSections = sectionOrder.filter(isSectionId);
  return validSections.length > 0 ? validSections : DEFAULT_SECTION_ORDER;
}

function normalizeOverview(overview: MentalModelOverview): MentalModelOverview {
  return {
    one_line_summary: overview.one_line_summary || "Mental model generated from source material.",
    system_name: overview.system_name || "Generated mental model",
    company: overview.company || "Not stated in the article",
    domain: Array.isArray(overview.domain) ? overview.domain : [],
    full_summary: overview.full_summary || overview.one_line_summary || "",
    why_it_exists: overview.why_it_exists || "Not stated in the article.",
    reading_time_min: Number.isFinite(overview.reading_time_min)
      ? overview.reading_time_min
      : 1,
  };
}

function normalizeConcept(rawConcept: Record<string, unknown>, index: number): MentalModelConcept {
  return {
    id: String(rawConcept.id || `concept-${index + 1}`),
    name: String(rawConcept.name || `Concept ${index + 1}`),
    short_def: String(rawConcept.short_def || ""),
    why_it_matters: String(rawConcept.why_it_matters || ""),
    category: String(rawConcept.category || "pattern"),
    difficulty: String(rawConcept.difficulty || "intermediate"),
    rank: Number(rawConcept.rank || index + 1),
    architecture_node_refs: Array.isArray(rawConcept.architecture_node_refs)
      ? rawConcept.architecture_node_refs.map(String)
      : [],
    evidence: String(rawConcept.evidence || ""),
  };
}

function normalizeProblemStatement(
  problemStatement: MentalModelProblemStatement,
): MentalModelProblemStatement {
  return {
    problem_narrative: problemStatement.problem_narrative || "",
    core_problem: problemStatement.core_problem || "Problem statement",
    why_it_hurt: problemStatement.why_it_hurt || "",
    signals: (problemStatement.signals ?? []).map((signal, index) => ({
      description: signal.description || `Signal ${index + 1}`,
      severity: signal.severity || "major",
      scale_dimension: signal.scale_dimension || "not specified",
      evidence: signal.evidence || "",
      affected_entity_ids: signal.affected_entity_ids ?? [],
    })),
  };
}

function normalizeArchitecture(architecture: MentalModelArchitecture): MentalModelArchitecture {
  return {
    overview_narrative: architecture.overview_narrative || "Architecture overview",
    nodes: (architecture.nodes ?? []).map((node) => ({
      ...node,
      layer: node.layer || "System Layer",
      connected_to: node.connected_to ?? [],
      architecture_role: node.architecture_role ?? null,
      parent_id: node.parent_id ?? null,
      evidence: node.evidence ?? null,
    })),
    edges: architecture.edges ?? [],
    layers: (architecture.layers ?? []).map((layer) => ({
      ...layer,
      description: layer.description || "",
    })),
    key_relationships: architecture.key_relationships ?? [],
  };
}

function normalizeFlow(flow: ProcessingRunRead["flow"]): { flows: MentalModelFlow[] } {
  return {
    flows: (flow?.flows ?? []).map((item, flowIndex) => ({
      id: item.id || `flow-${flowIndex + 1}`,
      flow_name: item.flow_name || `Flow ${flowIndex + 1}`,
      entry_point: item.entry_point || "Entry point not stated.",
      exit_point: item.exit_point || "Exit point not stated.",
      overview: item.overview || "The sequence of actions across the system.",
      evidence: item.evidence ?? null,
      steps: (item.steps ?? []).map((step, stepIndex) => ({
        id: step.id || `flow-${flowIndex + 1}-step-${stepIndex + 1}`,
        order: Number(step.order || stepIndex + 1),
        actor: step.actor || "System",
        action: step.action || `Step ${stepIndex + 1}`,
        target: step.target ?? null,
        data: step.data ?? null,
        description: step.description || step.action || "",
        interaction_type: step.interaction_type || "data_flow",
        actor_node_id: step.actor_node_id ?? null,
        target_node_id: step.target_node_id ?? null,
        evidence: step.evidence ?? null,
      })),
    })),
  };
}

function normalizeTradeoffs(
  tradeoffs: ProcessingRunRead["tradeoffs"],
): MentalModelTradeoffs {
  return {
    tradeoffs: (tradeoffs?.tradeoffs ?? []).map((tradeoff) => ({
      description: tradeoff.description || "Tradeoff",
      benefit: tradeoff.benefit || "Benefit not stated.",
      cost: tradeoff.cost || "Cost not stated.",
      condition: tradeoff.condition ?? null,
      category: tradeoff.category || "other",
      insight: tradeoff.insight || "",
      evidence: tradeoff.evidence || "",
      affected_entities: tradeoff.affected_entities ?? [],
      affected_entity_ids: tradeoff.affected_entity_ids ?? [],
    })),
    constraints: (tradeoffs?.constraints ?? []).map((constraint) =>
      constraint.impact
        ? `${constraint.description}: ${constraint.impact}`
        : constraint.description,
    ),
    takeaways: tradeoffs?.takeaways || "Key tradeoffs and constraints.",
  };
}

export function normalizeProcessingRun(run: ProcessingRunRead): MentalModelRun | null {
  if (
    !run.overview ||
    !run.key_concepts ||
    !run.problem_statement ||
    !run.architecture ||
    !run.flow ||
    !run.tradeoffs
  ) {
    return null;
  }

  return {
    run_id: run.run_id,
    status: run.status,
    current_step: run.current_step,
    progress_percent: run.progress_percent,
    article_id: run.article_id ?? "",
    section_order: normalizeSectionOrder(run.section_order),
    overview: normalizeOverview(run.overview),
    key_concepts: {
      concepts: (run.key_concepts.concepts ?? []).map(normalizeConcept),
    },
    problem_statement: normalizeProblemStatement(run.problem_statement),
    architecture: normalizeArchitecture(run.architecture),
    flow: normalizeFlow(run.flow),
    tradeoffs: normalizeTradeoffs(run.tradeoffs),
    error_message: run.error_message,
    created_at: run.created_at ?? "",
    updated_at: run.updated_at ?? "",
  };
}

export function getAvailableSectionIds(run: ProcessingRunRead) {
  return DEFAULT_SECTION_ORDER.filter((sectionId) => Boolean(run[sectionId]));
}

export interface LibraryCardData {
  id: string;
  title: string;
  focusLabel: string;
  sourceTitle: string;
  sourceDomain: string;
  sourceUrl: string | null;
  summary: string;
  modelLabel: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  sectionCount: number;
  flowCount: number;
  readingTimeMin: number;
}

export function getLibraryCardData(
  article: ConvertedArticleRead,
  index: number,
): LibraryCardData {
  const overview = article.sections.overview;
  const concepts = article.sections.key_concepts?.concepts ?? [];
  const difficulties = concepts.map((concept) =>
    String(concept.difficulty || "").toLowerCase(),
  );
  const difficulty = difficulties.includes("advanced")
    ? "Advanced"
    : difficulties.includes("intermediate")
      ? "Intermediate"
      : "Beginner";
  const tags = overview?.domain?.length
    ? overview.domain
    : article.source_domain
      ? [article.source_domain]
      : ["Mental model"];

  return {
    id: article.run_id,
    title: article.source_title || overview?.system_name || "Untitled mental model",
    focusLabel: tags[0] || "Mental model",
    sourceTitle: article.source_title || article.source_url || "Source article",
    sourceDomain: article.source_domain || "Unknown source",
    sourceUrl: getSafeHttpUrl(article.source_url),
    summary:
      overview?.one_line_summary ||
      "A completed six-section model generated from source material.",
    modelLabel: `Model ${String(index + 1).padStart(2, "0")}`,
    difficulty,
    tags,
    sectionCount: DEFAULT_SECTION_ORDER.filter((sectionId) =>
      Boolean(article.sections[sectionId]),
    ).length,
    flowCount: article.sections.flow?.flows.length ?? 0,
    readingTimeMin: overview?.reading_time_min ?? Math.max(1, Math.ceil(article.word_count / 220)),
  };
}
