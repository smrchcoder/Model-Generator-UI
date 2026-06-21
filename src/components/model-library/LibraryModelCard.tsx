import { ArrowRight, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { LibraryModelEntry } from "../../content/modelLibrary";

interface LibraryModelCardProps {
  entry: LibraryModelEntry;
}

export default function LibraryModelCard({ entry }: LibraryModelCardProps) {
  const flowCount = entry.model.flow.flows.length;

  return (
    <Link
      to={`/library/${entry.slug}`}
      className="group rounded-[1.2rem] border-2 border-border-default bg-bg-surface/92 p-5 shadow-panel transition-transform duration-150 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            {entry.modelLabel}
          </p>
          <h3 className="mt-3 font-display text-[1.45rem] font-extrabold leading-tight text-text-primary">
            {entry.title}
          </h3>
        </div>
        <span className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-blue">
          {entry.focusLabel}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-text-secondary">
        {entry.summary}
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border-2 border-border-default bg-bg-panel px-3 py-3">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            Source title
          </p>
          <p className="mt-2 text-sm font-semibold text-text-primary">
            {entry.sourceTitle}
          </p>
        </div>
        <div className="rounded-lg border-2 border-border-default bg-bg-panel px-3 py-3">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            Source domain
          </p>
          <p className="mt-2 text-sm font-semibold text-text-primary">
            {entry.sourceDomain}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
          {entry.model.section_order.length} sections
        </span>
        <span className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
          {flowCount} flow {flowCount === 1 ? "path" : "paths"}
        </span>
        <span className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
          {entry.model.overview.reading_time_min} min read
        </span>
        <span className="atlas-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-copper">
          {entry.difficulty}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border-default/80 bg-bg-canvas px-2.5 py-1 text-xs text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t-2 border-border-default/80 pt-4">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Link2 size={16} />
          <span>Open model</span>
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-bold text-text-primary">
          Explore
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
