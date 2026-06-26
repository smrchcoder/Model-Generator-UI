import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ApiError,
  getConvertedArticleByRunId,
  isAbortError,
  type ConvertedArticleRead,
} from "../api/mentalModelApi";
import {
  convertedArticleToRun,
  getLibraryCardData,
  normalizeProcessingRun,
} from "../api/normalizeMentalModel";
import AppBackgroundGrid from "../components/AppBackgroundGrid";
import MentalModelExplorer from "../components/mental-model/MentalModelExplorer";

export default function LibraryModelPage() {
  const { runId } = useParams<{ runId: string }>();
  const [article, setArticle] = useState<ConvertedArticleRead | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMissingRunId = !runId;
  const isPageLoading = isMissingRunId ? false : isLoading;

  useEffect(() => {
    if (!runId) {
      return;
    }

    const requestedRunId = runId;
    let isCancelled = false;
    const abortController = new AbortController();

    async function loadArticle() {
      setIsLoading(true);

      try {
        const nextArticle = await getConvertedArticleByRunId(
          requestedRunId,
          abortController.signal,
        );
        if (isCancelled) return;
        setArticle(nextArticle);
        setError(null);
      } catch (caughtError) {
        if (isCancelled) return;
        if (isAbortError(caughtError)) return;
        setError(
          caughtError instanceof ApiError
            ? caughtError.message
            : "Unable to load this library model.",
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadArticle();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [runId]);

  const card = useMemo(
    () => (article ? getLibraryCardData(article, 0) : null),
    [article],
  );
  const model = article
    ? normalizeProcessingRun(convertedArticleToRun(article))
    : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-canvas">
      <AppBackgroundGrid />

      <main className="relative z-10 px-4 pb-20 pt-28 sm:px-6 md:pt-32">
        <div className="mx-auto max-w-7xl">
          {!isMissingRunId && isPageLoading && (
            <section className="rounded-lg border-2 border-border-default bg-bg-surface p-5 text-sm text-text-secondary shadow-panel">
              Loading model from the backend...
            </section>
          )}

          {(isMissingRunId || error) && !isPageLoading && (
            <section
              role="alert"
              className="rounded-lg border-2 border-accent-copper bg-accent-copper/10 p-5 text-sm leading-6 text-text-primary shadow-panel"
            >
              {error || "Missing run id."}
            </section>
          )}

          {!isMissingRunId && !error && !isPageLoading && !article && (
            <section className="rounded-[1.2rem] border-2 border-border-default bg-bg-panel p-6 shadow-float">
              <div className="atlas-stripe h-2 rounded-full" />
              <h1 className="mt-6 font-display text-[2.5rem] font-extrabold leading-tight text-text-primary">
                Library model not found.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary">
                This run is not in the completed conversion history returned by
                the backend.
              </p>
              <Link
                to="/library"
                className="mt-6 inline-flex rounded-md border-2 border-border-default bg-accent-blue px-4 py-2 text-sm font-bold text-text-inverse shadow-panel"
              >
                Back to library
              </Link>
            </section>
          )}

          {!error && article && !model && (
            <section className="rounded-lg border-2 border-accent-copper bg-accent-copper/10 p-5 text-sm leading-6 text-text-primary shadow-panel">
              This stored conversion is missing one or more required model sections.
            </section>
          )}

          {article && card && model && (
            <MentalModelExplorer
              model={model}
              badgeLabel="Library Model"
              headline={card.title}
              description={card.summary}
              sourceLabel="Source article"
              sourceTitle={card.sourceTitle}
              sourceSubtitle={card.sourceDomain}
              sourceHref={card.sourceUrl ?? undefined}
              extraChips={[card.focusLabel, card.difficulty]}
            />
          )}
        </div>
      </main>
    </div>
  );
}
