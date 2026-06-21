import BackgroundGrid from "../components/BackgroundGrid";
import LibraryModelCard from "../components/model-library/LibraryModelCard";
import { modelLibrary } from "../content/modelLibrary";

export default function ModelLibraryPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-canvas">
      <BackgroundGrid />

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
                  Public models
                </p>
                <p className="mt-2 text-3xl font-extrabold text-text-primary">
                  {modelLibrary.length}
                </p>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  Free sample entries available for anyone to browse right now.
                </p>
              </article>

              <article className="rounded-xl border-2 border-border-default bg-bg-surface p-4 shadow-panel">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Format
                </p>
                <p className="mt-2 text-3xl font-extrabold text-text-primary">
                  6 sections
                </p>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  Every library model follows the same overview, concepts,
                  problem, architecture, flow, and tradeoffs structure.
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

          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {modelLibrary.map((entry) => (
              <LibraryModelCard key={entry.slug} entry={entry} />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
