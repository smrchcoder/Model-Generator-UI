import clsx from "clsx";
import { ArrowUpRight, House, LibraryBig } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { badgeStyles } from "./ui/styles";

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  clsx(
    badgeStyles({
      tone: isActive ? "mint" : "surface",
      shape: "pill",
      className:
        "flex-1 justify-center px-4 py-2.5 text-text-primary transition-transform duration-150 hover:-translate-y-0.5 sm:flex-none",
    }),
  );

export default function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[1.35rem] border-2 border-border-default bg-bg-panel/96 shadow-[0_18px_40px_rgba(24,28,31,0.16)] backdrop-blur-xl">
          <div className="atlas-stripe h-1.5" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(246,195,54,0.12),transparent_28%,rgba(24,95,213,0.08)_72%,transparent)]" />

          <div className="relative flex flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-border-default bg-bg-surface shadow-panel">
                <div className="relative h-5 w-5">
                  <span className="absolute left-0 top-0 h-2.5 w-2.5 bg-accent-copper" />
                  <span className="absolute right-0 top-0 h-2.5 w-2.5 bg-accent-blue" />
                  <span className="absolute bottom-0 left-0 h-2.5 w-2.5 bg-accent-mint" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-accent-teal" />
                </div>
              </div>

              <div className="min-w-0">
                <span className="block truncate font-display text-lg font-extrabold text-text-primary">
                  Mental Model Generator
                </span>
                <span className="hidden truncate font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-text-tertiary sm:block">
                  Structured reading for dense systems writing
                </span>
              </div>
            </Link>

            <nav
              aria-label="Primary"
              className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end"
            >
              <NavLink end to="/" className={navLinkClassName}>
                <House size={15} />
                Home
              </NavLink>

              <NavLink to="/library" className={navLinkClassName}>
                <LibraryBig size={15} />
                Model Library
              </NavLink>

              <NavLink
                to="/try"
                className={({ isActive }) =>
                  clsx(
                    navLinkClassName({ isActive }),
                    !isActive && "bg-accent-blue text-text-inverse",
                  )
                }
              >
                Try it out
                <ArrowUpRight size={15} />
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
