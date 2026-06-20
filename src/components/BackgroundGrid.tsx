export default function BackgroundGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-bg-canvas" />
      <div className="hero-wash absolute inset-0" />
      <div className="research-grid-bg absolute inset-0 opacity-80" />
      <div className="atlas-noise absolute inset-0 opacity-35" />
      <div className="atlas-stripe absolute left-0 top-0 h-full w-3" />
      <div className="atlas-stripe absolute left-0 right-0 top-16 h-2" />
      <div className="absolute left-[8%] top-24 h-72 w-72 rounded-full bg-accent-mint/18 blur-3xl" />
      <div className="absolute right-[6%] top-24 h-80 w-80 rounded-full bg-accent-blue/16 blur-3xl" />
      <div className="absolute bottom-[-4rem] left-[18%] h-72 w-72 rounded-full bg-accent-copper/12 blur-3xl" />
      <div className="absolute right-[10%] top-28 h-28 w-28 rotate-6 border-2 border-text-primary/18 bg-bg-panel/55 shadow-panel" />
      <div className="absolute bottom-20 left-[12%] h-20 w-52 -rotate-3 border-2 border-text-primary/15 bg-accent-mint/25 shadow-panel" />
      <div className="absolute bottom-[18%] right-[18%] h-24 w-40 rotate-[8deg] border-2 border-text-primary/12 bg-bg-surface/45" />
    </div>
  );
}
