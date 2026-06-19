export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 dot-grid-bg" style={{ opacity: 0.6 }} />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(74, 222, 128, 0.05), transparent)',
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-96"
        style={{ background: 'linear-gradient(to top, #000000, transparent)' }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, #000000, transparent)' }}
      />
    </div>
  );
}
