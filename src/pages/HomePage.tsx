import {
  ArrowRight,
  BrainCircuit,
  Compass,
  GitBranch,
  Network,
  ScanSearch,
} from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundGrid from "../components/BackgroundGrid";
import {
  experiencePillars,
  outputSections,
  productContext,
} from "../content/productContext";

export default function HomePage() {
  const heroSignals = [
    {
      value: "06",
      label: "mental model sections",
      description:
        "Overview, concepts, problem, architecture, flow, and tradeoffs in one structured output.",
    },
    {
      value: "Linked",
      label: "navigable output",
      description:
        "Move between sections without losing context or collapsing everything into one summary block.",
    },
    {
      value: "Real",
      label: "article example",
      description:
        "Designed for real engineering articles, not placeholder examples or generic filler.",
    },
  ];

  const valueCards = [
    {
      title: "Understand the system faster",
      description:
        "Readers get orientation before implementation detail, so the big picture lands before the article gets dense.",
      icon: Compass,
      accent: "bg-accent-mint/32",
    },
    {
      title: "Turn articles into structured mental models",
      description:
        "Architecture, sequence, concepts, and tradeoffs sit side by side instead of getting buried inside one generic summary.",
      icon: Network,
      accent: "bg-accent-blue/14",
    },
    {
      title: "Make design decisions easier to inspect",
      description:
        "Constraints, tradeoffs, and problem framing stay visible as part of the output instead of fading into the background.",
      icon: GitBranch,
      accent: "bg-accent-copper/14",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-canvas">
      <BackgroundGrid />

      <main className="relative z-10 px-4 pb-24 pt-28 sm:px-6 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <section className="grid min-h-[calc(100vh-8rem)] gap-10 border-b-2 border-border-default/70 pb-14 pt-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-md border-2 border-border-default bg-bg-panel px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary shadow-panel">
                <span className="h-2.5 w-2.5 bg-accent-copper" />
                {productContext.productLabel}
              </div>

              <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                {productContext.heroEyebrow}
              </p>

              <h1 className="mt-5 max-w-5xl font-display text-[3.35rem] font-extrabold leading-[0.95] text-text-primary sm:text-[4.4rem] lg:text-[5.3rem]">
                Build a six-part mental model
                <span className="text-gradient-ink">
                  {" "}
                  before the details blur together.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-text-secondary">
                {productContext.heroDescription}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
                {productContext.promise} Instead of a generic summary, the product
                turns a dense article into a guided workspace that helps you inspect
                structure, vocabulary, flow, and architectural intent.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/try"
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-border-default bg-accent-blue px-5 py-3 text-sm font-bold text-text-inverse shadow-panel transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Try it out
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {heroSignals.map((signal) => (
                  <div
                    key={signal.label}
                    className="rounded-lg border-2 border-border-default bg-bg-surface/90 p-4 shadow-panel"
                  >
                    <p className="font-display text-[2rem] font-extrabold leading-none text-text-primary">
                      {signal.value}
                    </p>
                    <p className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                      {signal.label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                      {signal.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-10 hidden h-28 w-28 rounded-full bg-accent-mint/24 blur-3xl lg:block" />
              <div className="absolute bottom-12 right-2 hidden h-24 w-24 rounded-full bg-accent-blue/22 blur-3xl lg:block" />

              <div className="relative overflow-hidden rounded-[1.5rem] border-2 border-border-default bg-bg-panel/95 p-5 shadow-float">
                <div className="atlas-stripe h-2 rounded-full" />

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                      How it works
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-extrabold text-text-primary">
                      A structured mental model, not just a summary.
                    </h2>
                  </div>
                  <div className="hidden rounded-md border-2 border-border-default bg-bg-surface px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary shadow-panel sm:block">
                    {productContext.productName}
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border-2 border-border-default bg-bg-surface p-4 shadow-panel">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-border-default bg-accent-mint/45">
                        <ScanSearch size={18} />
                      </div>
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                          Input
                        </p>
                        <p className="mt-2 text-sm font-semibold text-text-primary">
                          A technical article, engineering post, or system deep-dive.
                        </p>
                        <p className="mt-2 text-sm leading-6 text-text-secondary">
                          {productContext.inputNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="translate-x-0 rounded-xl border-2 border-border-default bg-bg-canvas/90 p-4 shadow-panel sm:translate-x-8">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-border-default bg-accent-blue/14 text-accent-blue">
                        <BrainCircuit size={18} />
                      </div>
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                          Six-part model
                        </p>
                        <p className="mt-2 text-sm font-semibold text-text-primary">
                          Breaks the article into six connected sections you can
                          scan in order or explore individually.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {outputSections.slice(0, 3).map((section) => (
                            <span
                              key={section.id}
                              className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary"
                            >
                              {section.shortLabel}
                            </span>
                          ))}
                          <span className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-blue">
                            +{outputSections.length - 3} more
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border-2 border-border-default bg-bg-surface p-4 shadow-panel">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-border-default bg-accent-copper/12 text-accent-copper">
                        <Network size={18} />
                      </div>
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                          Outcome
                        </p>
                        <p className="mt-2 text-sm font-semibold text-text-primary">
                          A technical brief you can scan, navigate, and return to.
                        </p>
                        <p className="mt-2 text-sm leading-6 text-text-secondary">
                          Readers get orientation first, then detail, with
                          architecture and flow treated as first-class
                          understanding tools.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border-2 border-dashed border-border-default bg-bg-surface/80 p-4">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    What the reader can do
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Start with a clear overview, move into concepts and structure,
                    and come back to the details when needed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 py-12 lg:grid-cols-3">
            {valueCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="rounded-xl border-2 border-border-default bg-bg-surface/90 p-6 shadow-panel"
                >
                  <div
                    className={`inline-flex rounded-lg border-2 border-border-default p-3 ${card.accent}`}
                  >
                    <Icon size={19} />
                  </div>
                  <h2 className="mt-5 font-display text-[1.65rem] font-extrabold leading-tight text-text-primary">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-text-secondary md:text-base">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </section>

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
                  Six sections that make dense technical writing easier to
                  understand.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-text-secondary md:text-base">
                Each section plays a different role: orient the reader, define
                the vocabulary, frame the problem, show the structure, trace the
                flow, and expose the tradeoffs.
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
                The product stays structured, calm, and visual enough for
                complex systems reading without drifting into chat-first patterns.
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
        </div>
      </main>
    </div>
  );
}
