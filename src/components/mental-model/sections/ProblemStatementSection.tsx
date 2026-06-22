import clsx from "clsx";
import MentalModelSectionFrame from "./MentalModelSectionFrame";
import type { MentalModelProblemStatement } from "../../../types/mentalModel";

interface ProblemStatementSectionProps {
  problemStatement: MentalModelProblemStatement;
}

const severityClassNames: Record<string, string> = {
  critical: "border-accent-copper/50 bg-accent-copper/10 text-accent-copper",
  major: "border-accent-blue/45 bg-accent-blue/10 text-accent-blue",
  minor: "border-accent-teal/45 bg-accent-teal/10 text-accent-teal",
};

export default function ProblemStatementSection({
  problemStatement,
}: ProblemStatementSectionProps) {
  const narrativeParagraphs = problemStatement.problem_narrative.split("\n\n");

  return (
    <MentalModelSectionFrame
      sectionId="problem_statement"
      eyebrow="What broke down"
      title="Problem Statement"
      description={problemStatement.core_problem}
    >
      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="atlas-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            Problem narrative
          </p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-text-secondary">
            {narrativeParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="grid gap-4">
          <article className="atlas-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Why it hurt
            </p>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              {problemStatement.why_it_hurt}
            </p>
          </article>

          <div className="grid gap-3">
            {problemStatement.signals.map((signal, index) => (
              <article
                key={`${signal.severity}-${index}`}
                className="atlas-card p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={clsx(
                      "rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
                      severityClassNames[signal.severity] ??
                        "border-border-default bg-bg-panel text-text-secondary",
                    )}
                  >
                    {signal.severity}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-text-tertiary">
                    {signal.scale_dimension}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-text-primary">
                  {signal.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </MentalModelSectionFrame>
  );
}
