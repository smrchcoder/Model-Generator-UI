import type {
  MentalModelArchitecture,
  MentalModelOverview,
  MentalModelProblemStatement,
  MentalModelSectionId,
} from "../types/mentalModel";

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:8000").replace(
    /\/+$/,
    "",
  );

export type RunStatus = "queued" | "running" | "completed" | "failed";

export interface CreateRunRequest {
  source_url?: string;
  raw_text?: string;
  source_title?: string | null;
  source_domain?: string | null;
}

export interface BackendFlowStep {
  id: string;
  order: number;
  actor: string;
  action: string;
  target: string | null;
  data: string | null;
  description: string | null;
  interaction_type: string | null;
  actor_node_id: string | null;
  target_node_id: string | null;
  evidence: string | null;
}

export interface BackendFlow {
  id: string;
  flow_name: string;
  entry_point: string;
  exit_point: string;
  overview: string;
  steps: BackendFlowStep[];
  transitions?: unknown[];
  evidence: string | null;
}

export interface BackendFlowSection {
  flows: BackendFlow[];
}

export interface BackendTradeoff {
  description: string;
  benefit: string;
  cost: string;
  condition: string | null;
  category: string | null;
  insight: string | null;
  evidence: string | null;
  affected_entities: string[];
  affected_entity_ids: string[];
}

export interface BackendConstraint {
  description: string;
  impact: string | null;
  evidence: string | null;
}

export interface BackendTradeoffsSection {
  tradeoffs: BackendTradeoff[];
  constraints: BackendConstraint[];
  takeaways: string;
}

export interface ProcessingRunRead {
  run_id: string;
  status: RunStatus;
  current_step: string;
  progress_percent: number;
  article_id: string | null;
  section_order: MentalModelSectionId[];
  overview: MentalModelOverview | null;
  key_concepts: { concepts: Array<Record<string, unknown>> } | null;
  problem_statement: MentalModelProblemStatement | null;
  architecture: MentalModelArchitecture | null;
  flow: BackendFlowSection | null;
  tradeoffs: BackendTradeoffsSection | null;
  error_message: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ConvertedArticleRead {
  article_id: string;
  source_title: string | null;
  source_domain: string | null;
  source_url: string | null;
  word_count: number;
  created_at: string;
  run_id: string;
  status: string;
  updated_at: string;
  sections: {
    overview: MentalModelOverview | null;
    key_concepts: { concepts: Array<Record<string, unknown>> } | null;
    problem_statement: MentalModelProblemStatement | null;
    architecture: MentalModelArchitecture | null;
    flow: BackendFlowSection | null;
    tradeoffs: BackendTradeoffsSection | null;
  };
}

export class ApiError extends Error {
  status?: number;
  details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function formatApiError(status: number, body: unknown) {
  if (body && typeof body === "object" && "detail" in body) {
    const detail = (body as { detail: unknown }).detail;

    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      return detail
        .map((item) => {
          if (item && typeof item === "object" && "msg" in item) {
            return String((item as { msg: unknown }).msg);
          }
          return String(item);
        })
        .join(" ");
    }
  }

  if (typeof body === "string" && body.trim()) return body;

  if (status === 404) return "The requested backend resource was not found.";
  if (status === 422) return "The backend could not validate the submitted article.";
  if (status >= 500) return "The backend hit an internal error.";
  return `Request failed with status ${status}.`;
}

async function readResponseBody(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
  } catch (error) {
    throw new ApiError(
      `Unable to reach the backend at ${API_BASE_URL}. Check that the API is running and CORS is configured.`,
      undefined,
      error,
    );
  }

  const body = await readResponseBody(response);

  if (!response.ok) {
    throw new ApiError(formatApiError(response.status, body), response.status, body);
  }

  return body as T;
}

export function createProcessingRun(payload: CreateRunRequest) {
  return requestJson<ProcessingRunRead>("/orchestrator/runs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getProcessingRun(runId: string) {
  return requestJson<ProcessingRunRead>(
    `/orchestrator/runs/${encodeURIComponent(runId)}`,
  );
}

export function getConvertedArticles() {
  return requestJson<ConvertedArticleRead[]>("/storage/articles/converted");
}
