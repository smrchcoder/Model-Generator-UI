import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Link2,
} from "lucide-react";
import { outputSections } from "../../content/productContext";
import type {
  MentalModelRun,
  MentalModelSectionId,
} from "../../types/mentalModel";
import { getSectionPalette } from "./mentalModelPalette";
import MentalModelSectionContent from "./MentalModelSectionContent";
import MentalModelSectionNavigator from "./MentalModelSectionNavigator";

interface MentalModelExplorerProps {
  model: MentalModelRun;
  badgeLabel?: string;
  headline?: string;
  description?: string;
  sourceLabel?: string;
  sourceTitle?: string;
  sourceSubtitle?: string;
  sourceHref?: string;
  extraChips?: string[];
  topRightSlot?: ReactNode;
}

export default function MentalModelExplorer({
  model,
  badgeLabel = "Sample model",
  headline = "Explore a sample mental model built from a real engineering article.",
  description = "This walkthrough uses a library model from a Netflix engineering article so you can inspect the structure, pacing, and navigation of the output experience on real source material.",
  sourceLabel = "Source article",
  sourceTitle = "netflixtechblog.com/scaling-archunit-with-nebula-archrules",
  sourceSubtitle,
  sourceHref,
  extraChips = [],
  topRightSlot,
}: MentalModelExplorerProps) {
  const orderedSections = useMemo(
    () =>
      model.section_order
        .map((sectionId) =>
          outputSections.find((section) => section.id === sectionId),
        )
        .filter(
          (section): section is (typeof outputSections)[number] =>
            Boolean(section),
        ),
    [model.section_order],
  );

  const [activeSectionId, setActiveSectionId] = useState<MentalModelSectionId>(
    model.section_order[0],
  );

  const activeIndex = orderedSections.findIndex(
    (section) => section.id === activeSectionId,
  );
  const activeSection = orderedSections[activeIndex] ?? orderedSections[0];
  const activePalette = getSectionPalette(activeSection.id);

  const goToRelativeSection = (direction: -1 | 1) => {
    const nextIndex =
      (activeIndex + direction + orderedSections.length) %
      orderedSections.length;
    setActiveSectionId(orderedSections[nextIndex].id);
  };

  return (
    <section className="border-y-2 border-border-default bg-bg-panel py-6 shadow-float">
      <div className="atlas-stripe h-3" />
      <div className="px-4 py-6 md:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md border-2 border-border-default bg-bg-surface px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary shadow-panel">
              <CheckCircle2 size={14} />
              {badgeLabel}
            </div>

            <h2 className="mt-5 font-display text-[2.2rem] font-extrabold leading-[1] text-text-primary md:text-[3rem]">
              {headline}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
              {description}
            </p>
          </div>

          <div className="w-full max-w-xl rounded-lg border-2 border-border-default bg-bg-surface p-4 shadow-panel">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-2 border-border-default bg-accent-mint text-text-primary">
                <Link2 size={17} />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  {sourceLabel}
                </p>
                {sourceHref ? (
                  <a
                    href={sourceHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex max-w-full items-center gap-2 truncate text-sm font-semibold text-text-primary hover:text-accent-blue"
                  >
                    <span className="truncate">{sourceTitle}</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <p className="mt-2 truncate text-sm font-semibold text-text-primary">
                    {sourceTitle}
                  </p>
                )}
                {sourceSubtitle && (
                  <p className="mt-1 text-xs leading-5 text-text-secondary">
                    {sourceSubtitle}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-teal">
                    {model.status}
                  </span>
                  <span className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
                    {orderedSections.length} sections
                  </span>
                  <span className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
                    {model.overview.reading_time_min} min read
                  </span>
                  {extraChips.map((chip) => (
                    <span
                      key={chip}
                      className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-blue"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {topRightSlot && <div className="mt-4">{topRightSlot}</div>}
          </div>
        </div>

        <div className="mt-8 space-y-5">
          <div className="rounded-lg border-2 border-border-default bg-bg-surface p-4 shadow-panel">
            <div className="flex flex-col gap-4 border-b-2 border-border-default pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Model sections
                </p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Move through the model one section at a time.
                </p>
              </div>

              <div
                className={clsx(
                  "rounded-md border-2 px-3 py-2 text-sm font-bold",
                  activePalette.border,
                  activePalette.accentBg,
                  activePalette.accentText,
                )}
              >
                Viewing {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(orderedSections.length).padStart(2, "0")}
              </div>
            </div>

            <div className="mt-4">
              <MentalModelSectionNavigator
                activeSectionId={activeSectionId}
                sections={orderedSections}
                onSelect={setActiveSectionId}
              />
            </div>
          </div>

          <div
            className={clsx(
              "rounded-lg border-2 px-4 py-4 shadow-panel sm:flex sm:items-center sm:justify-between",
              activePalette.border,
              activePalette.surface,
            )}
          >
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                Selected section
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-text-primary">
                {activeSection.title}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">
                {activeSection.summary}
              </p>
              <p className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                {activeSection.emphasis}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-0 sm:justify-end">
              <button
                type="button"
                onClick={() => goToRelativeSection(-1)}
                className="inline-flex items-center gap-2 rounded-md border-2 border-border-default bg-bg-panel px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
              >
                <ArrowLeft size={16} />
                Previous
              </button>
              <button
                type="button"
                onClick={() => goToRelativeSection(1)}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-md border-2 px-4 py-2 text-sm font-semibold transition-colors hover:text-text-primary",
                  activePalette.border,
                  activePalette.accentBg,
                  activePalette.accentText,
                )}
              >
                Next
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="min-h-[640px]">
            <MentalModelSectionContent
              activeSectionId={activeSection.id}
              model={model}
              sectionMeta={activeSection}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
