import { useEffect, useRef, useState } from "react";
import { Orbit, ScanSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackgroundGrid from "../components/BackgroundGrid";
import InputSection from "../components/InputSection";
import { modelLibrary } from "../content/modelLibrary";

export default function TryItOutPage() {
  const navigate = useNavigate();
  const [isDemoProcessing, setIsDemoProcessing] = useState(false);
  const demoTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (demoTimeoutRef.current) {
        window.clearTimeout(demoTimeoutRef.current);
      }
    };
  }, []);

  const handleDemoSubmit = () => {
    setIsDemoProcessing(true);

    if (demoTimeoutRef.current) {
      window.clearTimeout(demoTimeoutRef.current);
    }

    demoTimeoutRef.current = window.setTimeout(() => {
      setIsDemoProcessing(false);
      navigate(`/library/${modelLibrary[0].slug}`);
    }, 950);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-canvas">
      <BackgroundGrid />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[12%] h-40 w-40 rounded-full bg-accent-mint/18 blur-3xl" />
        <div className="absolute right-[10%] top-[18%] h-48 w-48 rounded-full bg-accent-blue/16 blur-3xl" />
        <div className="absolute bottom-[12%] left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-accent-copper/12 blur-3xl" />
      </div>

      <main className="relative z-10 flex min-h-screen items-center px-4 pb-10 pt-28 sm:px-6 md:pt-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-border-default bg-bg-panel/96 p-5 shadow-float md:p-8">
            <div className="atlas-stripe h-2 rounded-full" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(246,195,54,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(24,95,213,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.38),transparent_24%)]" />

            <div className="relative">
              <div className="mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border-2 border-border-default bg-bg-surface/96 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-secondary shadow-panel">
                  Try It Out
                </div>

                <h1 className="font-display text-[3rem] font-extrabold leading-[0.92] text-text-primary md:text-[4.6rem]">
                  Turn a dense article into
                  <span className="text-gradient-ink"> a readable system model.</span>
                </h1>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border-2 border-border-default bg-bg-surface/96 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary shadow-panel">
                    <ScanSearch size={14} />
                    URL or raw text
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border-2 border-border-default bg-bg-surface/96 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary shadow-panel">
                    <Orbit size={14} />
                    Six connected sections
                  </span>
                </div>
              </div>

              <div className="mx-auto mt-10 max-w-3xl">
                <div className="rounded-[1.6rem] border-2 border-border-default bg-bg-surface/76 p-3 shadow-[0_14px_34px_rgba(24,28,31,0.12)] backdrop-blur-sm md:p-4">
                  <InputSection
                    isProcessing={isDemoProcessing}
                    onSubmit={handleDemoSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
