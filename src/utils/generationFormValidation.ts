import type { CreateRunRequest } from "../api/mentalModelApi";
import { parsePublicHttpUrl } from "./urlSafety";

export const SOURCE_URL_MAX_LENGTH = 2048;
export const SOURCE_TITLE_MAX_LENGTH = 255;
export const SOURCE_DOMAIN_MAX_LENGTH = 255;
export const RAW_TEXT_MIN_LENGTH = 120;
export const RAW_TEXT_MAX_LENGTH = 100000;

export type GenerationSourceMode = "url" | "text";

export interface GenerationFormValues {
  mode: GenerationSourceMode;
  sourceUrl: string;
  rawText: string;
  sourceTitle: string;
  sourceDomain: string;
}

export interface GenerationFormValidationResult {
  errors: Partial<Record<keyof GenerationFormValues, string>>;
  payload: CreateRunRequest | null;
}

function trimOptionalValue(value: string) {
  const trimmedValue = value.trim();
  return trimmedValue ? trimmedValue : null;
}

export function validateGenerationForm(
  values: GenerationFormValues,
): GenerationFormValidationResult {
  const errors: Partial<Record<keyof GenerationFormValues, string>> = {};
  const sourceTitle = trimOptionalValue(values.sourceTitle);
  const sourceDomain = trimOptionalValue(values.sourceDomain);

  if (sourceTitle && sourceTitle.length > SOURCE_TITLE_MAX_LENGTH) {
    errors.sourceTitle = `Source title must be ${SOURCE_TITLE_MAX_LENGTH} characters or fewer.`;
  }

  if (sourceDomain && sourceDomain.length > SOURCE_DOMAIN_MAX_LENGTH) {
    errors.sourceDomain = `Source domain must be ${SOURCE_DOMAIN_MAX_LENGTH} characters or fewer.`;
  }

  if (values.mode === "url") {
    const sourceUrl = values.sourceUrl.trim();

    if (!sourceUrl) {
      errors.sourceUrl = "Enter a source URL.";
    } else if (sourceUrl.length > SOURCE_URL_MAX_LENGTH) {
      errors.sourceUrl = `Source URL must be ${SOURCE_URL_MAX_LENGTH} characters or fewer.`;
    } else if (!parsePublicHttpUrl(sourceUrl)) {
      errors.sourceUrl =
        "Use a public http(s) URL. Localhost, private IPs, and non-web schemes are not allowed.";
    }
  } else {
    const rawText = values.rawText.trim();

    if (!rawText) {
      errors.rawText = "Paste source text to generate a model.";
    } else if (rawText.length < RAW_TEXT_MIN_LENGTH) {
      errors.rawText = `Raw text must be at least ${RAW_TEXT_MIN_LENGTH} characters.`;
    } else if (rawText.length > RAW_TEXT_MAX_LENGTH) {
      errors.rawText = `Raw text must be ${RAW_TEXT_MAX_LENGTH} characters or fewer.`;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, payload: null };
  }

  return {
    errors,
    payload: {
      source_url:
        values.mode === "url" ? values.sourceUrl.trim() : undefined,
      raw_text: values.mode === "text" ? values.rawText.trim() : undefined,
      source_title: sourceTitle,
      source_domain: sourceDomain,
    },
  };
}
