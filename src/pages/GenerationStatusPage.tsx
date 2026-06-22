import clsx from "clsx";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  getAvailableSectionIds,
  normalizeProcessingRun,
} from "../api/normalizeMentalModel";
import AppBackgroundGrid from "../components/AppBackgroundGrid";
import MentalModelExplorer from "../components/mental-model/MentalModelExplorer";
import { outputSections } from "../content/productContext";
import { useProcessingRun } from "../hooks/useProcessingRun";

function formatStepName(step: string) {
  return step
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function statusIcon(status: string | undefined, isPolling: boolean) {
  if (status === "completed") return <CheckCircle2 size={18} />;
  if (status === "failed") return <AlertTriangle size={18} />;
  if (isPolling) return <LoaderCircle className="animate-spin" size={18} />;
  return <Clock3 size={18} />;
}

export default function GenerationStatusPage() {
  const { runId } = useParams<{ runId: string }>();
  const { run, error, isLoading, isPolling } = useProcessingRun(runId);
  const model = run ? normalizeProcessingRun(run) : null;
  const availableSections = run ? getAvailableSectionIds(run) : [];
  const progress = run?.progress_percent ?? 0;
  const isTerminal = run?.status === "completed" || run?.status === "failed";

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-canvas">
      <AppBackgroundGrid />

      <main className="relative z-10 px-4 pb-20 pt-28 sm:px-6 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-[1.7rem] border-2 border-border-default bg-bg-panel/96 p-5 shadow-float md:p-7">
            <div className="atlas-stripe h-2 rounded-full" />

            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-md border-2 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] shadow-panel",
                    run?.status === "failed"
                      ? "border-accent-copper bg-accent-copper/10 text-accent-copper"
                      : "border-border-default bg-bg-surface text-text-secondary",
                  )}
                >
                  {statusIcon(run?.status, isPolling)}
                  {run?.status ?? "loading"}
                </div>

                <h1 className="mt-5 font-display text-[2.7rem] font-extrabold leading-[0.95] text-text-primary md:text-[4rem]">
                  {run?.status === "completed"
                    ? "Your mental model is ready."
                    : "Building your mental model."}
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
                  {run
                    ? `Current step: ${formatStepName(run.current_step)}`
                    : "Starting the processing run and waiting for the backend status."}
                </p>
              </div>

              <div className="w-full max-w-md rounded-lg border-2 border-border-default bg-bg-surface p-4 shadow-panel">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                      Progress
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-text-primary">
                      {progress}%
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border-2 border-border-default bg-accent-mint text-text-primary">
                    {isPolling && !isTerminal ? (
                      <RefreshCw className="animate-spin" size={18} />
                    ) : (
                      statusIcon(run?.status, isPolling)
                    )}
                  </div>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full border-2 border-border-default bg-bg-panel">
                  <div
                    className={clsx(
                      "h-full transition-all duration-300",
                      run?.status === "failed" ? "bg-accent-copper" : "bg-accent-blue",
                    )}
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                  />
                </div>

                {runId && (
                  <p className="mt-3 break-all font-mono text-[11px] text-text-tertiary">
                    {runId}
                  </p>
                )}
              </div>
            </div>

            {(error || run?.error_message) && (
              <div className="mt-6 rounded-lg border-2 border-accent-copper bg-accent-copper/10 p-4 text-sm leading-6 text-text-primary">
                {run?.error_message || error}
              </div>
            )}

            {isLoading && (
              <div className="mt-6 rounded-lg border-2 border-border-default bg-bg-surface p-5 text-sm text-text-secondary shadow-panel">
                Loading run status...
              </div>
            )}

            {availableSections.length > 0 && run?.status !== "completed" && (
              <div className="mt-6 rounded-lg border-2 border-border-default bg-bg-surface p-5 shadow-panel">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Sections available so far
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {availableSections.map((sectionId) => {
                    const section = outputSections.find((item) => item.id === sectionId);
                    return (
                      <span
                        key={sectionId}
                        className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary"
                      >
                        {section?.title ?? formatStepName(sectionId)}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {!isLoading && run?.status === "completed" && !model && (
              <div className="mt-6 rounded-lg border-2 border-accent-copper bg-accent-copper/10 p-4 text-sm leading-6 text-text-primary">
                The run completed, but the response is missing one or more required sections.
              </div>
            )}

            {run?.status === "failed" && (
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/try"
                  className="inline-flex items-center justify-center rounded-md border-2 border-border-default bg-accent-blue px-4 py-2 text-sm font-bold text-text-inverse shadow-panel"
                >
                  Try another source
                </Link>
                <Link
                  to="/library"
                  className="inline-flex items-center justify-center rounded-md border-2 border-border-default bg-bg-surface px-4 py-2 text-sm font-bold text-text-primary shadow-panel"
                >
                  Browse library
                </Link>
              </div>
            )}
          </section>

          {run?.status === "completed" && model && (
            <div className="mt-8">
              <MentalModelExplorer
                model={model}
                badgeLabel="Generated Model"
                headline={model.overview.system_name}
                description={model.overview.one_line_summary}
                sourceLabel="Processing run"
                sourceTitle={model.run_id}
                sourceSubtitle={`Updated ${model.updated_at || "recently"}`}
                extraChips={model.overview.domain}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
