export default function BackgroundGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="research-grid-bg absolute inset-0 opacity-60" />
      <div className="hero-wash absolute inset-0" />
      <div className="absolute left-1/2 top-[18%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-accent-blue/12 blur-3xl" />
      <div className="absolute left-[18%] top-[48%] h-64 w-64 rounded-full bg-accent-copper/10 blur-3xl" />
      <div className="absolute right-[14%] top-[20%] h-64 w-64 rounded-full bg-accent-teal/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-bg-canvas to-transparent" />
    </div>
  );
}
