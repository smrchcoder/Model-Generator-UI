import {
  ArrowRight,
  BrainCircuit,
  Network,
  ScanSearch,
} from "lucide-react";
import { Link } from "react-router-dom";
import { outputSections, productContext } from "../../content/productContext";
import { badgeStyles, buttonStyles, surfaceStyles } from "../ui/styles";

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

export default function HomeHeroSection() {
  return (
    <section className="grid min-h-[calc(100vh-8rem)] gap-10 border-b-2 border-border-default/70 pb-14 pt-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
      <div className="max-w-3xl">
        <div
          className={badgeStyles({
            tone: "panel",
            size: "md",
            className: "px-4 py-2",
          })}
        >
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
          {productContext.promise} Instead of a generic summary, the product turns
          a dense article into a guided workspace that helps you inspect
          structure, vocabulary, flow, and architectural intent.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/try"
            className={buttonStyles({ size: "lg" })}
          >
            Try it out
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {heroSignals.map((signal) => (
            <div
              key={signal.label}
              className={surfaceStyles({
                className: "bg-bg-surface/90 p-4",
              })}
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
            <div
              className={badgeStyles({
                tone: "surface",
                size: "md",
                className: "hidden px-3 py-2 sm:block",
              })}
            >
              {productContext.productName}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className={surfaceStyles({ radius: "xl", className: "p-4" })}>
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

            <div
              className={surfaceStyles({
                tone: "canvas",
                radius: "xl",
                className: "translate-x-0 p-4 sm:translate-x-8",
              })}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-border-default bg-accent-blue/14 text-accent-blue">
                  <BrainCircuit size={18} />
                </div>
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    Six-part model
                  </p>
                  <p className="mt-2 text-sm font-semibold text-text-primary">
                    Breaks the article into six connected sections you can scan in
                    order or explore individually.
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

            <div className={surfaceStyles({ radius: "xl", className: "p-4" })}>
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
                    Readers get orientation first, then detail, with architecture
                    and flow treated as first-class understanding tools.
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
              Start with a clear overview, move into concepts and structure, and
              come back to the details when needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
