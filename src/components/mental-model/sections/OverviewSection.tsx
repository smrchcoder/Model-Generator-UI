import MentalModelSectionFrame from "./MentalModelSectionFrame";
import type { MentalModelOverview } from "../../../types/mentalModel";

interface OverviewSectionProps {
  overview: MentalModelOverview;
}

export default function OverviewSection({ overview }: OverviewSectionProps) {
  return (
    <MentalModelSectionFrame
      sectionId="overview"
      eyebrow="Fast orientation"
      title={overview.system_name}
      description={overview.one_line_summary}
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="atlas-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            Full summary
          </p>
          <p className="mt-4 text-sm leading-7 text-text-secondary md:text-base">
            {overview.full_summary}
          </p>
        </article>

        <article className="grid gap-4">
          <div className="atlas-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Why it exists
            </p>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              {overview.why_it_exists}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="atlas-card p-4">
              <span className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
                Company
              </span>
              <p className="mt-2 text-lg font-semibold text-text-primary">
                {overview.company}
              </p>
            </div>

            <div className="atlas-card p-4">
              <span className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
                Reading time
              </span>
              <p className="mt-2 text-lg font-semibold text-text-primary">
                {overview.reading_time_min} min
              </p>
            </div>
          </div>
        </article>
      </div>

      <article className="atlas-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
          Domain
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {overview.domain.map((domain) => (
            <span
              key={domain}
              className="atlas-chip px-3 py-1.5 text-xs font-medium text-text-secondary"
            >
              {domain}
            </span>
          ))}
        </div>
      </article>
    </MentalModelSectionFrame>
  );
}
