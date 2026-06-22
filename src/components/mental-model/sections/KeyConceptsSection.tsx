import clsx from "clsx";
import MentalModelSectionFrame from "./MentalModelSectionFrame";
import type { MentalModelConcept } from "../../../types/mentalModel";

interface KeyConceptsSectionProps {
  concepts: MentalModelConcept[];
}

const difficultyClassNames: Record<string, string> = {
  beginner: "text-accent-teal",
  intermediate: "text-accent-blue",
  advanced: "text-accent-copper",
};

export default function KeyConceptsSection({
  concepts,
}: KeyConceptsSectionProps) {
  return (
    <MentalModelSectionFrame
      sectionId="key_concepts"
      eyebrow="Shared vocabulary"
      title="Key Concepts"
      description="The vocabulary layer makes the rest of the model easier to scan before the architecture gets dense."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {concepts.map((concept) => (
          <article
            key={concept.id}
            className="atlas-card p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="atlas-chip px-2.5 py-1 font-mono text-[11px] text-text-tertiary">
                #{String(concept.rank).padStart(2, "0")}
              </span>
              <span className="atlas-chip px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-text-tertiary">
                {concept.category.replace("_", " ")}
              </span>
              <span
                className={clsx(
                  "text-[11px] font-semibold uppercase tracking-[0.16em]",
                  difficultyClassNames[concept.difficulty] ?? "text-text-secondary",
                )}
              >
                {concept.difficulty}
              </span>
            </div>

            <h4 className="mt-4 text-xl font-semibold capitalize text-text-primary">
              {concept.name}
            </h4>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              {concept.short_def}
            </p>

            <div className="atlas-card mt-4 bg-bg-panel p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                Why it matters
              </p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {concept.why_it_matters}
              </p>
            </div>
          </article>
        ))}
      </div>
    </MentalModelSectionFrame>
  );
}
