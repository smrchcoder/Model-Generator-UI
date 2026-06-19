import { motion } from 'framer-motion';

export default function TopBar() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg-canvas/80 backdrop-blur-md"
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="h-14 px-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-bg-tertiary border border-border-subtle flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="4" height="4" rx="0.5" fill="#4ade80" />
              <rect x="7" y="1" width="4" height="4" rx="0.5" fill="#fbbf24" />
              <rect x="1" y="7" width="4" height="4" rx="0.5" fill="#fbbf24" />
              <rect x="7" y="7" width="4" height="4" rx="0.5" fill="#4ade80" />
            </svg>
          </div>
          <span className="text-sm font-medium text-text-primary tracking-tight">
            RetroIntel
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse-slow" />
            <span className="text-sm text-text-yellow">READY</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
