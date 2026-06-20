import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ArrowRight, FileText, Link2, LoaderCircle } from "lucide-react";

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
    mode === "url" ? value.trim().length > 0 : value.trim().length >= 120;

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey && mode === "url") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full">
      <motion.div
        className={clsx(
          "relative overflow-hidden rounded-[26px] border bg-bg-panel/95 transition-all duration-200",
          isFocused
            ? "border-accent-blue shadow-focus"
            : "border-border-default shadow-panel hover:border-border-emphasis",
          isProcessing && "pointer-events-none opacity-60",
        )}
        layout
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle px-5 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("url")}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-150",
                mode === "url"
                  ? "bg-bg-surface text-text-primary ring-1 ring-border-default"
                  : "text-text-secondary hover:bg-bg-surface hover:text-text-primary",
              )}
            >
              <Link2 size={15} />
              URL
            </button>

            <button
              onClick={() => setMode("text")}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-150",
                mode === "text"
                  ? "bg-bg-surface text-text-primary ring-1 ring-border-default"
                  : "text-text-secondary hover:bg-bg-surface hover:text-text-primary",
              )}
            >
              <FileText size={15} />
              Raw text
            </button>
          </div>

          <p className="text-xs font-medium text-text-tertiary">
            {mode === "url" ? "One article link" : "At least 120 characters"}
          </p>
        </div>

        <div className="px-5 pb-5 pt-5">
          {mode === "url" ? (
            <input
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Paste a technical article URL"
              className="w-full bg-transparent text-[15px] text-text-primary outline-none placeholder-text-tertiary caret-accent-blue"
              disabled={isProcessing}
            />
          ) : (
            <textarea
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Paste the article text here..."
              rows={5}
              className="w-full resize-none bg-transparent text-[15px] leading-7 text-text-primary outline-none placeholder-text-tertiary caret-accent-blue"
              disabled={isProcessing}
            />
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-border-subtle px-5 pb-5 pt-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {isProcessing && (
              <div className="flex items-center gap-2 text-text-secondary">
                <LoaderCircle className="animate-spin" size={16} />
                <span className="text-sm">
                  Building the six-part model...
                </span>
              </div>
            )}

            {!isProcessing && mode === "text" && (
              <span
                className={clsx(
                  "text-sm",
                  value.trim().length >= 120
                    ? "text-accent-blue"
                    : "text-text-tertiary",
                )}
              >
                {value.trim().length}/120 characters
              </span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isProcessing}
            className={clsx(
              "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-150",
              canSubmit && !isProcessing
                ? "bg-accent-blue text-white shadow-panel hover:translate-y-[-1px] hover:bg-accent-blue/90"
                : "cursor-not-allowed border border-border-subtle bg-bg-surface text-text-tertiary",
            )}
          >
            {isProcessing ? "Generating model" : "Generate model"}
            {!isProcessing && <ArrowRight size={16} />}
          </button>
        </div>
      </motion.div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-text-tertiary">
        <span>Press</span>
        <kbd className="rounded bg-bg-panel px-1.5 py-0.5 text-text-secondary ring-1 ring-border-subtle">
          Enter
        </kbd>
        <span>to submit a URL. Use raw text for copied technical articles.</span>
      </div>
    </div>
  );
}
