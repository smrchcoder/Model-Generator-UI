import { outputSections } from "../../content/productContext";

export default function HomeModelSectionsOverview() {
  return (
    <section
      id="how-it-works"
      className="rounded-[1.75rem] border-2 border-border-default bg-bg-panel/95 px-4 py-8 shadow-float sm:px-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
            What the reader gets
          </p>
          <h2 className="mt-3 font-display text-[2.3rem] font-extrabold leading-[1] text-text-primary md:text-[3.2rem]">
            Six sections that make dense technical writing easier to understand.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-text-secondary md:text-base">
          Each section plays a different role: orient the reader, define the
          vocabulary, frame the problem, show the structure, trace the flow, and
          expose the tradeoffs.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {outputSections.map((section, index) => (
          <article
            key={section.id}
            className="rounded-xl border-2 border-border-default bg-bg-surface p-5 shadow-panel"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-text-primary">
                  {section.title}
                </h3>
              </div>
              <span className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-teal">
                {section.shortLabel}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-text-secondary">
              {section.summary}
            </p>
            <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              {section.emphasis}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
