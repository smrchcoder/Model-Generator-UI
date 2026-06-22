const SAFE_HTTP_PROTOCOLS = new Set(["http:", "https:"]);

function parseUrlCandidate(value: string | null | undefined) {
  if (typeof value !== "string") return null;

  const trimmedValue = value.trim();
  if (!trimmedValue) return null;

  try {
    return new URL(trimmedValue);
  } catch {
    return null;
  }
}

export function parseSafeHttpUrl(value: string | null | undefined) {
  const parsedUrl = parseUrlCandidate(value);

  if (!parsedUrl || !SAFE_HTTP_PROTOCOLS.has(parsedUrl.protocol)) {
    return null;
  }

  return parsedUrl;
}

export function getSafeHttpUrl(value: string | null | undefined) {
  return parseSafeHttpUrl(value)?.toString() ?? null;
}

export function isSafeHttpUrl(value: string | null | undefined) {
  return parseSafeHttpUrl(value) !== null;
}
