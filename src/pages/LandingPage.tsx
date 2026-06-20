import {
  ArrowDownRight,
  ArrowRight,
  BrainCircuit,
  Compass,
  GitBranch,
  Network,
  ScanSearch,
} from "lucide-react";
import BackgroundGrid from "../components/BackgroundGrid";
import MentalModelShowcase from "../components/mental-model/MentalModelShowcase";
import TopBar from "../components/TopBar";
import {
  experiencePillars,
  outputSections,
  productContext,
} from "../content/productContext";
import { sampleMentalModel } from "../content/sampleMentalModel";

export default function LandingPage() {
  const heroSignals = [
    {
      value: "06",
      label: "connected views",
      description: "From orientation and vocabulary to architecture, flow, and tradeoffs.",
    },
    {
      value: "01",
      label: "navigable workspace",
      description: "The output is structured like a technical brief, not a loose chat summary.",
    },
    {
      value: "11m",
      label: "sample source",
      description: "The current walkthrough demonstrates the experience on a real engineering article.",
    },
  ];

  const valueCards = [
    {
      title: "Understand the system shape fast",
      description:
        "The landing experience should communicate that this product helps readers see the big picture before diving into implementation detail.",
      icon: Compass,
      accent: "bg-accent-mint/32",
    },
    {
      title: "Turn articles into inspectable models",
      description:
        "Architecture, sequence, and concept mapping sit beside the narrative so technical writing becomes easier to reason about.",
      icon: Network,
      accent: "bg-accent-blue/14",
    },
    {
      title: "Surface the decisions behind the design",
      description:
        "Tradeoffs, constraints, and problem framing appear as first-class outputs instead of getting lost inside a summary paragraph.",
      icon: GitBranch,
      accent: "bg-accent-copper/14",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-canvas">
      <BackgroundGrid />
      <TopBar />

      <main className="relative z-10 px-4 pb-24 pt-20 sm:px-6 md:pt-24">
        <div className="mx-auto max-w-7xl">
          <section className="grid min-h-[calc(100vh-7rem)] gap-10 border-b-2 border-border-default/70 pb-14 pt-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-md border-2 border-border-default bg-bg-panel px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary shadow-panel">
                <span className="h-2.5 w-2.5 bg-accent-copper" />
                {productContext.productLabel}
              </div>

              <p className="mt-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                Technical reading should feel more like orientation than overload.
              </p>

              <h1 className="mt-5 max-w-5xl font-display text-[3.35rem] font-extrabold leading-[0.95] text-text-primary sm:text-[4.4rem] lg:text-[5.3rem]">
                Understand the system
                <span className="text-gradient-ink"> before the details blur together.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-text-secondary">
                {productContext.heroDescription}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
                {productContext.promise} Instead of a generic summary, the product turns a dense article into a guided workspace that helps you inspect structure, vocabulary, flow, and architectural intent.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#showcase"
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-border-default bg-accent-blue px-5 py-3 text-sm font-bold text-text-inverse shadow-panel transition-transform duration-150 hover:-translate-y-0.5"
                >
                  Explore sample analysis
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-border-default bg-bg-surface px-5 py-3 text-sm font-bold text-text-primary shadow-panel transition-transform duration-150 hover:-translate-y-0.5"
                >
                  See the six lenses
                  <ArrowDownRight size={16} />
                </a>
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
                      Product perspective
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-extrabold text-text-primary">
                      A guided mental model, not a wall of text.
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
                          Best suited for material where architecture, constraints, and behavior matter more than headline-level summary.
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
                          Mental model engine
                        </p>
                        <p className="mt-2 text-sm font-semibold text-text-primary">
                          Reframes the article into six connected lenses with navigable sections.
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
                          Readers get orientation first, then the details, with architecture and flow represented as first-class understanding tools.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border-2 border-dashed border-border-default bg-bg-surface/80 p-4">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    Why this landing page works better
                  </p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    It sells the product through clarity, sample evidence, and structure instead of leading with an unfinished input box.
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
                  <div className={`inline-flex rounded-lg border-2 border-border-default p-3 ${card.accent}`}>
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
                  Six lenses that make dense technical writing easier to hold in your head.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-text-secondary md:text-base">
                Each section plays a different role: orient the reader, define the vocabulary, frame the tension, show the structure, trace the sequence, and expose the design choices.
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
                  The interface should feel like a confident technical companion, not a generic AI template.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-text-secondary md:text-base">
                These principles already exist in the product thinking. The landing page now makes them visible before the user reaches the sample output.
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

          <section id="showcase" className="pb-8">
            <MentalModelShowcase model={sampleMentalModel} />
          </section>
        </div>
      </main>
    </div>
  );
}
