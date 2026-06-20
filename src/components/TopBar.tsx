import { motion } from "framer-motion";

export default function TopBar() {
  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b border-border-subtle bg-bg-canvas/80 backdrop-blur-md"
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl border border-border-default bg-bg-panel shadow-panel">
            <div className="relative h-4 w-4">
              <span className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-copper" />
              <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-accent-blue" />
              <span className="absolute bottom-0 right-1 h-1.5 w-1.5 rounded-full bg-accent-teal" />
              <span className="absolute left-[5px] top-[7px] h-px w-6 -rotate-[28deg] bg-border-emphasis" />
            </div>
          </div>

          <div>
            <span className="block text-sm font-semibold tracking-tight text-text-primary">
              Mental Model Generator
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <div className="h-2 w-2 rounded-full bg-accent-teal" />
          <span className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
            Ready
          </span>
        </div>
      </div>
    </motion.header>
  );
}
