import type { ReactNode } from "react";
import clsx from "clsx";
import { getSectionPalette } from "../mentalModelTheme";
import type { MentalModelSectionId } from "../../../types/mentalModel";

interface SectionFrameProps {
  sectionId: MentalModelSectionId;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function SectionFrame({
  sectionId,
  eyebrow,
  title,
  description,
  children,
}: SectionFrameProps) {
  const palette = getSectionPalette(sectionId);

  return (
    <div className={clsx("rounded-lg border-2 p-4 shadow-panel md:p-5", palette.frame)}>
      <div
        className={clsx(
          "rounded-md border-2 px-4 py-4 md:px-5",
          palette.header,
        )}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-display text-[1.9rem] leading-tight text-text-primary md:text-[2.3rem]">
          {title}
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-text-secondary md:text-base">
          {description}
        </p>
      </div>

      <div className="mt-5 space-y-5">{children}</div>
    </div>
  );
}
