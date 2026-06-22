import { experiencePillars } from "../../content/productContext";

export default function HomeExperiencePrinciples() {
  return (
    <section className="py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
            Experience principles
          </p>
          <h2 className="mt-3 font-display text-[2rem] font-extrabold leading-tight text-text-primary md:text-[2.8rem]">
            Built to feel like a technical workspace, not a generic AI tool.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-text-secondary md:text-base">
          The product stays structured, calm, and visual enough for complex
          systems reading without drifting into chat-first patterns.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {experiencePillars.map((pillar) => (
          <article
            key={pillar.title}
            className="rounded-xl border-2 border-border-default bg-bg-surface/90 p-5 shadow-panel"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Principle
            </p>
            <h3 className="mt-3 text-xl font-extrabold text-text-primary">
              {pillar.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              {pillar.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
