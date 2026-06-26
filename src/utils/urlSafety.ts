const SAFE_HTTP_PROTOCOLS = new Set(["http:", "https:"]);

const LOCAL_HOSTNAMES = new Set([
  "localhost",
  "0.0.0.0",
  "127.0.0.1",
  "::1",
  "host.docker.internal",
]);

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

function isIpv4SegmentInRange(
  candidate: string,
  firstSegment: number,
  secondSegmentRange?: readonly [number, number],
) {
  const segments = candidate.split(".");
  if (segments.length !== 4) return false;

  const parsedSegments = segments.map((segment) => Number.parseInt(segment, 10));
  if (parsedSegments.some((segment) => Number.isNaN(segment))) return false;

  if (parsedSegments[0] !== firstSegment) return false;
  if (!secondSegmentRange) return true;

  return (
    parsedSegments[1] >= secondSegmentRange[0] &&
    parsedSegments[1] <= secondSegmentRange[1]
  );
}

function isClearlyLocalHostname(hostname: string) {
  const normalizedHostname = hostname.trim().toLowerCase().replace(/\.$/, "");
  if (!normalizedHostname) return true;

  if (LOCAL_HOSTNAMES.has(normalizedHostname)) return true;
  if (
    normalizedHostname.endsWith(".localhost") ||
    normalizedHostname.endsWith(".local") ||
    normalizedHostname.endsWith(".internal")
  ) {
    return true;
  }

  if (normalizedHostname.startsWith("[") && normalizedHostname.endsWith("]")) {
    const ipv6Host = normalizedHostname.slice(1, -1);
    return (
      ipv6Host === "::1" ||
      ipv6Host.startsWith("fc") ||
      ipv6Host.startsWith("fd") ||
      ipv6Host.startsWith("fe8") ||
      ipv6Host.startsWith("fe9") ||
      ipv6Host.startsWith("fea") ||
      ipv6Host.startsWith("feb")
    );
  }

  return (
    isIpv4SegmentInRange(normalizedHostname, 10) ||
    isIpv4SegmentInRange(normalizedHostname, 127) ||
    isIpv4SegmentInRange(normalizedHostname, 169, [254, 254]) ||
    isIpv4SegmentInRange(normalizedHostname, 172, [16, 31]) ||
    isIpv4SegmentInRange(normalizedHostname, 192, [168, 168])
  );
}

export function parsePublicHttpUrl(value: string | null | undefined) {
  const parsedUrl = parseSafeHttpUrl(value);
  if (!parsedUrl) return null;

  if (isClearlyLocalHostname(parsedUrl.hostname)) {
    return null;
  }

  return parsedUrl;
}

export function getPublicHttpUrl(value: string | null | undefined) {
  return parsePublicHttpUrl(value)?.toString() ?? null;
}

export function isPublicHttpUrl(value: string | null | undefined) {
  return parsePublicHttpUrl(value) !== null;
}

export function getSafeHttpUrl(value: string | null | undefined) {
  return parseSafeHttpUrl(value)?.toString() ?? null;
}

export function isSafeHttpUrl(value: string | null | undefined) {
  return parseSafeHttpUrl(value) !== null;
}
