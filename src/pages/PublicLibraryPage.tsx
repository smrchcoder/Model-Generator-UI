import { useEffect, useState } from "react";
import {
  ApiError,
  getConvertedArticles,
  isAbortError,
  type ConvertedArticleRead,
} from "../api/mentalModelApi";
import { getLibraryCardData } from "../api/normalizeMentalModel";
import AppBackgroundGrid from "../components/AppBackgroundGrid";
import LibraryModelPreviewCard from "../components/model-library/LibraryModelPreviewCard";

const PAGE_SIZE = 9;

export default function PublicLibraryPage() {
  const [articles, setArticles] = useState<ConvertedArticleRead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const abortController = new AbortController();

    async function loadArticles() {
      setIsLoading(true);

      try {
        const nextArticles = await getConvertedArticles(
          { limit: PAGE_SIZE + 1, offset },
          abortController.signal,
        );
        if (isCancelled) return;
        setArticles(nextArticles.slice(0, PAGE_SIZE));
        setHasNextPage(nextArticles.length > PAGE_SIZE);
        setError(null);
      } catch (caughtError) {
        if (isCancelled) return;
        if (isAbortError(caughtError)) return;
        setError(
          caughtError instanceof ApiError
            ? caughtError.message
            : "Unable to load the model library.",
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadArticles();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [offset]);

  const cards = articles.map((article, index) =>
    getLibraryCardData(article, offset + index),
  );
  const pageLabel =
    articles.length > 0
      ? `${offset + 1}-${offset + articles.length}`
      : `${offset + 1}-${offset}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-canvas">
      <AppBackgroundGrid />

      <main className="relative z-10 px-4 pb-20 pt-28 sm:px-6 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[1.7rem] border-2 border-border-default bg-bg-panel/96 p-5 shadow-float md:p-7">
            <div className="atlas-stripe h-2 rounded-full" />

            <div className="mt-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-md border-2 border-border-default bg-bg-surface px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary shadow-panel">
                Model Library
              </div>

              <h1 className="mt-5 font-display text-[2.9rem] font-extrabold leading-[0.95] text-text-primary md:text-[4rem]">
                Browse public mental models
                <span className="text-gradient-ink">
                  {" "}
                  built from real technical articles.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
                This library is a free public collection of model examples for
                readers who want to inspect how dense systems writing gets
                translated into a six-part mental model. Open any entry to
                explore the structure in a focused reading view.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border-2 border-border-default bg-bg-surface p-4 shadow-panel">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Showing now
                </p>
                <p className="mt-2 text-3xl font-extrabold text-text-primary">
                  {isLoading ? "--" : articles.length}
                </p>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  Current public showcase entries returned for this page of completed conversions.
                </p>
              </article>

              <article className="rounded-xl border-2 border-border-default bg-bg-surface p-4 shadow-panel">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Page window
                </p>
                <p className="mt-2 text-2xl font-extrabold text-text-primary">
                  {isLoading ? "--" : pageLabel}
                </p>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  Loaded with `limit` and `offset` so the public history can be browsed page by page.
                </p>
              </article>

              <article className="rounded-xl border-2 border-border-default bg-bg-surface p-4 shadow-panel">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Best for
                </p>
                <p className="mt-2 text-lg font-extrabold text-text-primary">
                  Previewing real outputs
                </p>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  Compare examples, inspect article breakdowns, and understand
                  the output before generating your own model.
                </p>
              </article>
            </div>
          </div>

          {!error && !isLoading && (
            <section className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-lg border-2 border-border-default bg-bg-surface p-4 shadow-panel">
              <p className="text-sm text-text-secondary">
                Browse completed public history entries without leaving the showcase flow.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setOffset((currentOffset) => Math.max(0, currentOffset - PAGE_SIZE))}
                  disabled={offset === 0 || isLoading}
                  className="inline-flex items-center justify-center rounded-md border-2 border-border-default bg-bg-panel px-4 py-2 text-sm font-bold text-text-primary shadow-panel disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setOffset((currentOffset) => currentOffset + PAGE_SIZE)}
                  disabled={!hasNextPage || isLoading}
                  className="inline-flex items-center justify-center rounded-md border-2 border-border-default bg-accent-blue px-4 py-2 text-sm font-bold text-text-inverse shadow-panel disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Next
                </button>
              </div>
            </section>
          )}

          {isLoading && (
            <section className="mt-8 rounded-lg border-2 border-border-default bg-bg-surface p-5 text-sm text-text-secondary shadow-panel">
              Loading public models from the backend...
            </section>
          )}

          {error && !isLoading && (
            <section
              role="alert"
              className="mt-8 rounded-lg border-2 border-accent-copper bg-accent-copper/10 p-5 text-sm leading-6 text-text-primary shadow-panel"
            >
              {error}
            </section>
          )}

          {!error && !isLoading && cards.length === 0 && (
            <section className="mt-8 rounded-lg border-2 border-border-default bg-bg-surface p-5 text-sm leading-6 text-text-secondary shadow-panel">
              No completed models are available yet. Generate a model from the try page
              and it will appear here after the backend marks it completed.
            </section>
          )}

          {!error && cards.length > 0 && (
            <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {cards.map((entry) => (
                <LibraryModelPreviewCard key={entry.id} entry={entry} />
              ))}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
