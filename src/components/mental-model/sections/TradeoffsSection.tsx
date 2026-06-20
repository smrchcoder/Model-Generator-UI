import SectionFrame from "./SectionFrame";
import type { MentalModelTradeoffs } from "../../../types/mentalModel";

interface TradeoffsSectionProps {
  tradeoffs: MentalModelTradeoffs;
}

export default function TradeoffsSection({
  tradeoffs,
}: TradeoffsSectionProps) {
  return (
    <SectionFrame
      sectionId="tradeoffs"
      eyebrow="Decision quality"
      title="Tradeoffs"
      description={tradeoffs.takeaways}
    >
      <div className="grid gap-4 xl:grid-cols-3">
        {tradeoffs.tradeoffs.map((tradeoff, index) => (
          <article
            key={`${tradeoff.description}-${index}`}
            className="atlas-card p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="atlas-chip px-2.5 py-1 font-mono text-[11px] text-text-tertiary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-text-tertiary">
                {tradeoff.category}
              </span>
            </div>

            <h4 className="mt-4 text-lg font-semibold text-text-primary">
              {tradeoff.description}
            </h4>

            <div className="mt-4 space-y-3 text-sm leading-6 text-text-secondary">
              <p>
                <span className="font-semibold text-text-primary">Benefit:</span>{" "}
                {tradeoff.benefit}
              </p>
              <p>
                <span className="font-semibold text-text-primary">Cost:</span>{" "}
                {tradeoff.cost}
              </p>
              <p>
                <span className="font-semibold text-text-primary">Insight:</span>{" "}
                {tradeoff.insight}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
