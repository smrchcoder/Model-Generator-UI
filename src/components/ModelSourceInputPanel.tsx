import { useState } from "react";
import clsx from "clsx";
import { ArrowRight, FileText, Link2, LoaderCircle } from "lucide-react";
import type { CreateRunRequest } from "../api/mentalModelApi";
import {
  RAW_TEXT_MAX_LENGTH,
  RAW_TEXT_MIN_LENGTH,
  SOURCE_DOMAIN_MAX_LENGTH,
  SOURCE_TITLE_MAX_LENGTH,
  type GenerationFormValues,
  validateGenerationForm,
} from "../utils/generationFormValidation";
import { buttonStyles } from "./ui/styles";

interface ModelSourceInputPanelProps {
  onSubmit: (payload: CreateRunRequest) => void;
  isProcessing: boolean;
  errorMessage?: string | null;
}

export default function ModelSourceInputPanel({
  onSubmit,
  isProcessing,
  errorMessage,
}: ModelSourceInputPanelProps) {
  const [values, setValues] = useState<GenerationFormValues>({
    mode: "url",
    sourceUrl: "",
    rawText: "",
    sourceTitle: "",
    sourceDomain: "",
  });
  const [isFocused, setIsFocused] = useState(false);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof GenerationFormValues, string>>
  >({});

  const canSubmit =
    values.mode === "url"
      ? values.sourceUrl.trim().length > 0
      : values.rawText.trim().length >= RAW_TEXT_MIN_LENGTH;
  const inputId = values.mode === "url" ? "source-url-input" : "source-text-input";

  const updateField = <K extends keyof GenerationFormValues>(
    key: K,
    value: GenerationFormValues[K],
  ) => {
    setValues((currentValues) => ({ ...currentValues, [key]: value }));
    setFormErrors((currentErrors) => ({ ...currentErrors, [key]: undefined }));
  };

  const handleSubmit = () => {
    if (!canSubmit || isProcessing) return;

    const result = validateGenerationForm(values);
    setFormErrors(result.errors);

    if (!result.payload) return;
    onSubmit(result.payload);
  };

  const handleModeChange = (nextMode: "url" | "text") => {
    setValues((currentValues) => ({ ...currentValues, mode: nextMode }));
    setFormErrors({});
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey && values.mode === "url") {
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
              type="button"
              onClick={() => handleModeChange("url")}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-150",
                values.mode === "url"
                  ? "border-border-default bg-accent-mint text-text-primary"
                  : "border-transparent text-text-secondary hover:bg-bg-surface hover:text-text-primary",
              )}
            >
              <Link2 size={15} />
              URL
            </button>

            <button
              type="button"
              onClick={() => handleModeChange("text")}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-150",
                values.mode === "text"
                  ? "border-border-default bg-accent-teal text-text-inverse"
                  : "border-transparent text-text-secondary hover:bg-bg-surface hover:text-text-primary",
              )}
            >
              <FileText size={15} />
              Raw text
            </button>
          </div>

          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
            {values.mode === "url" ? "One public article link" : `At least ${RAW_TEXT_MIN_LENGTH} characters`}
          </p>
        </div>

        <div className="px-5 pb-5 pt-5">
          {values.mode === "url" ? (
            <>
              <div>
                <label
                  htmlFor={inputId}
                  className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary"
                >
                  Article URL
                </label>
                <input
                  id={inputId}
                  type="url"
                  inputMode="url"
                  value={values.sourceUrl}
                  onChange={(event) => updateField("sourceUrl", event.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Paste a technical article URL"
                  aria-describedby={formErrors.sourceUrl ? "source-url-error" : "source-input-hint"}
                  aria-invalid={Boolean(formErrors.sourceUrl)}
                  className="w-full rounded-lg border-2 border-border-default bg-bg-surface/75 px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder-text-tertiary caret-accent-blue focus:border-accent-blue"
                  disabled={isProcessing}
                />
              </div>
              <p className="mt-3 text-xs leading-6 text-text-tertiary">
                Use a public `http` or `https` URL. Localhost, loopback, and obvious
                private network targets are blocked before submission.
              </p>
              {formErrors.sourceUrl && (
                <p
                  id="source-url-error"
                  role="alert"
                  className="mt-2 text-sm font-semibold text-accent-copper"
                >
                  {formErrors.sourceUrl}
                </p>
              )}
            </>
          ) : (
            <>
              <label htmlFor={inputId} className="sr-only">
                Technical article text
              </label>
              <textarea
                id={inputId}
                value={values.rawText}
                onChange={(event) => updateField("rawText", event.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Paste the article text here..."
                aria-describedby={formErrors.rawText ? "source-text-error" : "source-input-hint"}
                aria-invalid={Boolean(formErrors.rawText)}
                rows={6}
                className="w-full resize-none bg-transparent text-[15px] leading-7 text-text-primary outline-none placeholder-text-tertiary caret-accent-blue"
                disabled={isProcessing}
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs leading-6 text-text-tertiary">
                <span>
                  {values.rawText.trim().length}/{RAW_TEXT_MAX_LENGTH} characters
                </span>
                <span>Exactly one source is submitted: either URL or raw text.</span>
              </div>
              {formErrors.rawText && (
                <p
                  id="source-text-error"
                  role="alert"
                  className="mt-2 text-sm font-semibold text-accent-copper"
                >
                  {formErrors.rawText}
                </p>
              )}
            </>
          )}

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="source-title-input"
                className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary"
              >
                Source title
              </label>
              <input
                id="source-title-input"
                type="text"
                value={values.sourceTitle}
                onChange={(event) => updateField("sourceTitle", event.target.value)}
                maxLength={SOURCE_TITLE_MAX_LENGTH}
                className="w-full rounded-lg border-2 border-border-default bg-bg-surface/75 px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent-blue"
                placeholder="Optional title for the source"
                disabled={isProcessing}
              />
              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-text-tertiary">
                <span>Optional</span>
                <span>{values.sourceTitle.length}/{SOURCE_TITLE_MAX_LENGTH}</span>
              </div>
              {formErrors.sourceTitle && (
                <p role="alert" className="mt-2 text-sm font-semibold text-accent-copper">
                  {formErrors.sourceTitle}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="source-domain-input"
                className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary"
              >
                Source domain
              </label>
              <input
                id="source-domain-input"
                type="text"
                value={values.sourceDomain}
                onChange={(event) => updateField("sourceDomain", event.target.value)}
                maxLength={SOURCE_DOMAIN_MAX_LENGTH}
                className="w-full rounded-lg border-2 border-border-default bg-bg-surface/75 px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent-blue"
                placeholder="Optional domain like engineering.example.com"
                disabled={isProcessing}
              />
              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-text-tertiary">
                <span>Optional</span>
                <span>{values.sourceDomain.length}/{SOURCE_DOMAIN_MAX_LENGTH}</span>
              </div>
              {formErrors.sourceDomain && (
                <p role="alert" className="mt-2 text-sm font-semibold text-accent-copper">
                  {formErrors.sourceDomain}
                </p>
              )}
            </div>
          </div>
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

            {!isProcessing && errorMessage && (
              <span
                role="alert"
                className="text-sm font-semibold text-accent-copper"
              >
                {errorMessage}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || isProcessing}
            className={clsx(
              buttonStyles({
                shape: "pill",
                size: "lg",
                disabled: !canSubmit || isProcessing,
              }),
              canSubmit && !isProcessing && "hover:translate-y-[-1px]",
            )}
          >
            {isProcessing ? "Generating mental model" : "Generate mental model"}
            {!isProcessing && <ArrowRight size={16} />}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-text-tertiary">
        <span id="source-input-hint" className="sr-only">
          Submit one source: either a public technical article URL or pasted article text.
        </span>
        <span>Press</span>
        <kbd className="rounded-md border border-border-default bg-bg-panel px-1.5 py-0.5 font-mono text-text-secondary">
          Enter
        </kbd>
        <span>to submit a URL. Use raw text for copied technical articles.</span>
      </div>
    </div>
  );
}
