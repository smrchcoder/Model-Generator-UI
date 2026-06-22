import { useEffect, useState } from "react";
import {
  ApiError,
  getProcessingRun,
  isAbortError,
  type ProcessingRunRead,
} from "../api/mentalModelApi";

const POLL_INTERVAL_MS = 5000;

export function useProcessingRun(runId: string | undefined) {
  const [run, setRun] = useState<ProcessingRunRead | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    if (!runId) {
      return;
    }

    let isCancelled = false;
    let timeoutId: number | null = null;
    const abortController = new AbortController();

    const poll = async () => {
      setIsPolling(true);

      try {
        const nextRun = await getProcessingRun(runId, abortController.signal);
        if (isCancelled) return;

        setRun(nextRun);
        setError(null);
        setIsLoading(false);

        if (nextRun.status !== "completed" && nextRun.status !== "failed") {
          timeoutId = window.setTimeout(poll, POLL_INTERVAL_MS);
        }
      } catch (caughtError) {
        if (isCancelled) return;
        if (isAbortError(caughtError)) return;

        setError(
          caughtError instanceof ApiError
            ? caughtError.message
            : "Unable to poll the processing run.",
        );
        setIsLoading(false);
        timeoutId = window.setTimeout(poll, POLL_INTERVAL_MS);
      } finally {
        if (!isCancelled) {
          setIsPolling(false);
        }
      }
    };

    poll();

    return () => {
      isCancelled = true;
      abortController.abort();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [runId]);

  if (!runId) {
    return {
      run: null,
      error: "Missing run id.",
      isLoading: false,
      isPolling: false,
    };
  }

  return { run, error, isLoading, isPolling };
}
