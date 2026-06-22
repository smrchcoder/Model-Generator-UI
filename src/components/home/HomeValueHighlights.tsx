import { Compass, GitBranch, Network } from "lucide-react";

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

export default function HomeValueHighlights() {
  return (
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
  );
}
