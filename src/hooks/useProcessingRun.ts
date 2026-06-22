import { useEffect, useState } from "react";
import {
  ApiError,
  getProcessingRun,
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
      setIsLoading(false);
      setError("Missing run id.");
      return;
    }

    let isCancelled = false;
    let timeoutId: number | null = null;

    const poll = async () => {
      setIsPolling(true);

      try {
        const nextRun = await getProcessingRun(runId);
        if (isCancelled) return;

        setRun(nextRun);
        setError(null);
        setIsLoading(false);

        if (nextRun.status !== "completed" && nextRun.status !== "failed") {
          timeoutId = window.setTimeout(poll, POLL_INTERVAL_MS);
        }
      } catch (caughtError) {
        if (isCancelled) return;

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
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [runId]);

  return { run, error, isLoading, isPolling };
}
