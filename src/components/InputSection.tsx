import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface InputSectionProps {
  onSubmit: (value: string) => void;
  isProcessing: boolean;
}

export default function InputSection({
  onSubmit,
  isProcessing,
}: InputSectionProps) {
  const [mode, setMode] = useState<"url" | "text">("url");
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const canSubmit =
    mode === "url" ? value.trim().length > 0 : value.length >= 50;

  const handleSubmit = () => {
    if (!canSubmit || isProcessing) return;
    if (mode === "url") {
      try {
        new URL(value);
      } catch {
        return;
      }
    }
    onSubmit(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && mode === "url") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full">
      <motion.div
        className={clsx(
          "relative rounded-xl border bg-bg-secondary/60 backdrop-blur-sm transition-all duration-200",
          isFocused
            ? "border-border-yellow shadow-glow-yellow"
            : "border-border-subtle hover:border-border-default",
          isProcessing && "pointer-events-none opacity-60",
        )}
        layout
      >
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="absolute -inset-px rounded-xl bg-accent-yellow-subtle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1 px-4 pt-4">
          <button
            onClick={() => setMode("url")}
            className={clsx(
              "text-sm px-3 py-1.5 rounded-md transition-all duration-150",
              mode === "url"
                ? "text-text-primary bg-bg-tertiary border border-border-default"
                : "text-text-tertiary hover:text-text-secondary",
            )}
          >
            URL
          </button>
          <button
            onClick={() => setMode("text")}
            className={clsx(
              "text-sm px-3 py-1.5 rounded-md transition-all duration-150",
              mode === "text"
                ? "text-text-primary bg-bg-tertiary border border-border-default"
                : "text-text-tertiary hover:text-text-secondary",
            )}
          >
            Text
          </button>
        </div>

        <div className="px-4 pt-3 pb-4">
          {mode === "url" ? (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="https://netflixtechblog.com/article..."
              className="w-full bg-transparent text-text-primary text-base font-mono outline-none placeholder-text-quaternary caret-accent-yellow"
              disabled={isProcessing}
            />
          ) : (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Paste the article text here..."
              rows={5}
              className="w-full bg-transparent text-text-primary text-sm leading-relaxed outline-none placeholder-text-quaternary caret-accent-yellow resize-none"
              disabled={isProcessing}
            />
          )}
        </div>

        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-3">
            {isProcessing && (
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-4 h-4 border-2 border-accent-yellow border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="text-sm text-text-secondary">
                  Processing...
                </span>
              </div>
            )}

            {mode === "text" && (
              <span
                className={clsx(
                  "text-sm",
                  value.length >= 50
                    ? "text-text-yellow"
                    : "text-text-quaternary",
                )}
              >
                {value.length}/50 chars
              </span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isProcessing}
            className={clsx(
              "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
              canSubmit && !isProcessing
                ? "bg-accent-yellow text-black hover:bg-accent-yellow/90 shadow-glow-yellow"
                : "bg-bg-tertiary text-text-quaternary cursor-not-allowed border border-border-subtle",
            )}
          >
            {isProcessing ? "Processing" : "Generate Story"}
            {!isProcessing && <span>→</span>}
          </button>
        </div>
      </motion.div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="text-xs text-text-quaternary">Press</span>
        <kbd className="text-xs text-text-tertiary bg-bg-tertiary border border-border-subtle rounded px-1.5 py-0.5">
          Enter
        </kbd>
        <span className="text-xs text-text-quaternary">to submit</span>
      </div>
    </div>
  );
}
