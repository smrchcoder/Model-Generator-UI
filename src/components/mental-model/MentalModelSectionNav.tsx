import clsx from "clsx";
import type { OutputSection } from "../../content/productContext";
import type { MentalModelSectionId } from "../../types/mentalModel";
import { getSectionPalette } from "./mentalModelTheme";

interface MentalModelSectionNavProps {
  activeSectionId: MentalModelSectionId;
  sections: OutputSection[];
  onSelect: (sectionId: MentalModelSectionId) => void;
}

export default function MentalModelSectionNav({
  activeSectionId,
  sections,
  onSelect,
}: MentalModelSectionNavProps) {
  return (
    <nav
      aria-label="Demo result sections"
      className="flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0"
    >
      {sections.map((section, index) => {
        const isActive = section.id === activeSectionId;
        const palette = getSectionPalette(section.id);

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(section.id)}
            className={clsx(
              "group relative min-w-[180px] rounded-lg border-2 px-4 py-3 text-left transition-all duration-200 lg:min-w-0",
              isActive
                ? clsx(palette.border, palette.header, "translate-y-[-2px] shadow-panel")
                : "border-border-default bg-bg-panel hover:bg-bg-surface",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] font-semibold text-text-tertiary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={clsx("h-3 w-3 rounded-sm", palette.dot)} />
            </div>

            <h3 className="mt-2 whitespace-nowrap text-sm font-extrabold text-text-primary lg:whitespace-normal">
              {section.title}
            </h3>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
              {section.shortLabel}
            </p>

            {isActive && (
              <span className="absolute inset-x-3 bottom-[-8px] h-2 rounded-sm border-2 border-border-default bg-text-primary" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
