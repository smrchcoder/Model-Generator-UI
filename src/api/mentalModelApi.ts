import type {
  MentalModelArchitecture,
  MentalModelOverview,
  MentalModelProblemStatement,
  MentalModelSectionId,
} from "../types/mentalModel";
import { getSafeHttpUrl } from "../utils/urlSafety";

export const REQUEST_TIMEOUT_MS = 15000;

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

export interface ConvertedArticlesQuery {
  limit?: number;
  offset?: number;
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

export function resolveApiBaseUrl(
  rawValue: string | undefined,
) {
  const trimmedValue = rawValue?.trim();

  if (!trimmedValue) {
    return "";
  }

  const normalizedUrl = getSafeHttpUrl(trimmedValue);
  if (!normalizedUrl) {
    throw new Error("VITE_API_BASE_URL must be an absolute http(s) URL.");
  }

  return normalizedUrl.replace(/\/+$/, "");
}

export function getApiBaseUrl() {
  return resolveApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
}

export function formatApiError(status: number, body: unknown) {
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

function createRequestSignal(
  signal: AbortSignal | null | undefined,
  timeoutMs: number,
) {
  const controller = new AbortController();
  let didTimeOut = false;

  const abortFromUpstream = () => {
    controller.abort(signal?.reason);
  };

  if (signal?.aborted) {
    controller.abort(signal.reason);
  } else {
    signal?.addEventListener("abort", abortFromUpstream);
  }

  const timeoutId = globalThis.setTimeout(() => {
    didTimeOut = true;
    controller.abort(new DOMException("The request timed out.", "TimeoutError"));
  }, timeoutMs);

  return {
    signal: controller.signal,
    didTimeOut: () => didTimeOut,
    cleanup: () => {
      globalThis.clearTimeout(timeoutId);
      signal?.removeEventListener("abort", abortFromUpstream);
    },
  };
}

export function isAbortError(error: unknown) {
  return error instanceof Error && error.name === "AbortError";
}

interface RequestJsonOptions {
  timeoutMs?: number;
}

export async function requestJson<T>(
  path: string,
  init?: RequestInit,
  options: RequestJsonOptions = {},
): Promise<T> {
  const apiBaseUrl = getApiBaseUrl();
  const timeoutMs = options.timeoutMs ?? REQUEST_TIMEOUT_MS;
  const requestSignal = createRequestSignal(init?.signal, timeoutMs);
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...init,
      signal: requestSignal.signal,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
  } catch (error) {
    if (init?.signal?.aborted) {
      throw error;
    }

    if (requestSignal.didTimeOut()) {
      throw new ApiError(
        `Request to ${path} timed out after ${timeoutMs}ms.`,
        undefined,
        error,
      );
    }

    throw new ApiError(
      apiBaseUrl
        ? `Unable to reach the backend at ${apiBaseUrl}. Check that the API is running and CORS is configured.`
        : "Unable to reach the backend. Check that the API is running and that the local proxy or backend CORS settings are configured.",
      undefined,
      error,
    );
  } finally {
    requestSignal.cleanup();
  }

  const body = await readResponseBody(response);

  if (!response.ok) {
    throw new ApiError(formatApiError(response.status, body), response.status, body);
  }

  return body as T;
}

export function createProcessingRun(
  payload: CreateRunRequest,
  signal?: AbortSignal,
) {
  return requestJson<ProcessingRunRead>("/orchestrator/runs", {
    method: "POST",
    body: JSON.stringify(payload),
    signal,
  });
}

export function getProcessingRun(runId: string, signal?: AbortSignal) {
  return requestJson<ProcessingRunRead>(
    `/orchestrator/runs/${encodeURIComponent(runId)}`,
    { signal },
  );
}

export function getConvertedArticles(
  query: ConvertedArticlesQuery = {},
  signal?: AbortSignal,
) {
  const searchParams = new URLSearchParams();
  if (typeof query.limit === "number") {
    searchParams.set("limit", String(query.limit));
  }
  if (typeof query.offset === "number") {
    searchParams.set("offset", String(query.offset));
  }

  const queryString = searchParams.toString();

  return requestJson<ConvertedArticleRead[]>(
    `/storage/articles/converted${queryString ? `?${queryString}` : ""}`,
    { signal },
  );
}

export async function getConvertedArticleByRunId(
  runId: string,
  signal?: AbortSignal,
) {
  try {
    return await requestJson<ConvertedArticleRead>(
      `/storage/articles/converted/by-run/${encodeURIComponent(runId)}`,
      { signal },
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export const findConvertedArticleByRunId = getConvertedArticleByRunId;
