export default function TopBar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b-2 border-border-default bg-bg-panel/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-border-default bg-bg-surface shadow-panel">
            <div className="relative h-4 w-4">
              <span className="absolute left-0 top-0 h-2 w-2 bg-accent-copper" />
              <span className="absolute right-0 top-0 h-2 w-2 bg-accent-blue" />
              <span className="absolute bottom-0 left-0 h-2 w-2 bg-accent-mint" />
              <span className="absolute bottom-0 right-0 h-2 w-2 bg-accent-teal" />
            </div>
          </div>

          <div>
            <span className="block font-display text-base font-extrabold text-text-primary">
              Mental Model Generator
            </span>
            <span className="hidden font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-text-tertiary sm:block">
              Turn technical reading into an organized walkthrough
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
            <a href="#how-it-works" className="transition-colors hover:text-text-primary">
              Six lenses
            </a>
            <a href="#showcase" className="transition-colors hover:text-text-primary">
              Sample analysis
            </a>
          </nav>

          <a
            href="#showcase"
            className="inline-flex items-center gap-2 rounded-md border-2 border-border-default bg-bg-surface px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-primary shadow-panel transition-transform duration-150 hover:-translate-y-0.5"
          >
            View walkthrough
          </a>
        </div>
      </div>
    </header>
  );
}
