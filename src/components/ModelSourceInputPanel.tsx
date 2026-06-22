import { useState } from "react";
import clsx from "clsx";
import { ArrowRight, FileText, Link2, LoaderCircle } from "lucide-react";

interface ModelSourceInputPanelProps {
  onSubmit: (value: string, mode: "url" | "text") => void;
  isProcessing: boolean;
  errorMessage?: string | null;
}

export default function ModelSourceInputPanel({
  onSubmit,
  isProcessing,
  errorMessage,
}: ModelSourceInputPanelProps) {
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

    onSubmit(value.trim(), mode);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey && mode === "url") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full">
      <div
        className={clsx(
          "relative overflow-hidden rounded-[1.25rem] border-2 bg-bg-panel transition-all duration-200",
          isFocused
            ? "border-accent-blue shadow-focus"
            : "border-border-default shadow-panel hover:border-border-emphasis",
          isProcessing && "pointer-events-none opacity-60",
        )}
      >
        <div className="atlas-stripe h-2" />
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-border-default bg-bg-surface/75 px-5 py-4">
          <div className="flex items-center gap-2 rounded-full border-2 border-border-default bg-bg-panel p-1 shadow-panel">
            <button
              onClick={() => setMode("url")}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-150",
                mode === "url"
                  ? "border-border-default bg-accent-mint text-text-primary"
                  : "border-transparent text-text-secondary hover:bg-bg-surface hover:text-text-primary",
              )}
            >
              <Link2 size={15} />
              URL
            </button>

            <button
              onClick={() => setMode("text")}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-150",
                mode === "text"
                  ? "border-border-default bg-accent-teal text-text-inverse"
                  : "border-transparent text-text-secondary hover:bg-bg-surface hover:text-text-primary",
              )}
            >
              <FileText size={15} />
              Raw text
            </button>
          </div>

          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
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
              className="w-full bg-transparent text-[16px] font-medium text-text-primary outline-none placeholder-text-tertiary caret-accent-blue"
              disabled={isProcessing}
            />
          ) : (
            <textarea
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Paste the article text here..."
              rows={6}
              className="w-full resize-none bg-transparent text-[15px] leading-7 text-text-primary outline-none placeholder-text-tertiary caret-accent-blue"
              disabled={isProcessing}
            />
          )}
        </div>

        <div className="flex flex-col gap-4 border-t-2 border-border-default bg-bg-surface/65 px-5 pb-5 pt-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {isProcessing && (
              <div className="flex items-center gap-2 text-text-secondary">
                <LoaderCircle className="animate-spin" size={16} />
                <span className="text-sm">
                  Building the six-part mental model...
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

            {errorMessage && !isProcessing && (
              <span className="text-sm font-semibold text-accent-copper">
                {errorMessage}
              </span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isProcessing}
            className={clsx(
              "inline-flex items-center justify-center gap-2 rounded-full border-2 px-5 py-3 text-sm font-bold transition-all duration-150",
              canSubmit && !isProcessing
                ? "border-border-default bg-accent-blue text-text-inverse shadow-panel hover:translate-y-[-1px]"
                : "cursor-not-allowed border border-border-subtle bg-bg-panel text-text-tertiary",
            )}
          >
            {isProcessing ? "Generating mental model" : "Generate mental model"}
            {!isProcessing && <ArrowRight size={16} />}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-text-tertiary">
        <span>Press</span>
        <kbd className="rounded-md border border-border-default bg-bg-panel px-1.5 py-0.5 font-mono text-text-secondary">
          Enter
        </kbd>
        <span>to submit a URL. Use raw text for copied technical articles.</span>
      </div>
    </div>
  );
}
