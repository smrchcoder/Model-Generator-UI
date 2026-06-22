import MentalModelSectionFrame from "./MentalModelSectionFrame";
import type { MentalModelFlow } from "../../../types/mentalModel";

interface FlowSectionProps {
  flows: MentalModelFlow[];
}

export default function FlowSection({ flows }: FlowSectionProps) {
  const primaryFlow = flows[0];

  return (
    <MentalModelSectionFrame
      sectionId="flow"
      eyebrow="End-to-end movement"
      title={primaryFlow?.flow_name ?? "Flow"}
      description={primaryFlow?.overview ?? "The sequence of actions across the system."}
    >
      {primaryFlow && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="atlas-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                Entry point
              </p>
              <p className="mt-3 text-sm leading-7 text-text-primary">
                {primaryFlow.entry_point}
              </p>
            </article>

            <article className="atlas-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                Exit point
              </p>
              <p className="mt-3 text-sm leading-7 text-text-primary">
                {primaryFlow.exit_point}
              </p>
            </article>
          </div>

          <div className="space-y-4">
            {primaryFlow.steps.map((step, index) => (
              <article
                key={step.id}
                className="atlas-card relative p-5 pl-16"
              >
                <div className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-md border-2 border-border-default bg-accent-mint font-mono text-xs font-bold text-text-primary">
                  {step.order}
                </div>
                {index < primaryFlow.steps.length - 1 && (
                  <div className="absolute bottom-[-18px] left-[36px] top-12 w-px bg-border-subtle" />
                )}

                <div className="flex flex-wrap items-center gap-2">
                  <span className="atlas-chip px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-text-tertiary">
                    {step.interaction_type.replace("_", " ")}
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
                    {step.actor}
                    {step.target ? ` -> ${step.target}` : ""}
                  </span>
                </div>

                <h4 className="mt-3 text-lg font-semibold text-text-primary">
                  {step.action}
                </h4>
                <p className="mt-2 text-sm leading-7 text-text-secondary">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </>
      )}
    </MentalModelSectionFrame>
  );
}
