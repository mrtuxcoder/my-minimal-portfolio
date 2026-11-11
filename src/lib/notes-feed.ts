export type NoteCategory = "blog" | "case-study";

export type LatestNote = {
  id: string;
  title: string;
  category: NoteCategory;
  label: string;
  url: string;
  date: string | null;
};

export const NOTES_BASE_URL = "https://notes.guganraj.me";

const CATEGORY_LABELS: Record<NoteCategory, string> = {
  blog: "New Blog",
  "case-study": "New Case Study",
};

/**
 * Normalizes a candidate article URL against the notes origin and strips trailing slashes
 * so IDs remain stable across different feed formats.
 */
export function normalizeNoteUrl(
  rawUrl: unknown,
  baseUrl: string = NOTES_BASE_URL
): string | null {
  if (typeof rawUrl !== "string") return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const base = new URL(baseUrl);
    const parsed = new URL(trimmed, base);
    if (parsed.origin !== base.origin) return null;
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    const cleanPath = parsed.pathname.replace(/\/+$/, "") || "/";
    return `${parsed.origin}${cleanPath}`;
  } catch {
    return null;
  }
}

/**
 * Classifies an article into "blog" or "case-study".
 * Returns null for "thoughts" or unrecognized categories so they are excluded.
 */
export function classifyCategory(
  rawCategory?: unknown,
  url?: string | null
): NoteCategory | null {
  const value =
    typeof rawCategory === "string" ? rawCategory.trim().toLowerCase() : "";

  if (value === "blog" || value === "blogs") return "blog";
  if (
    value === "case-study" ||
    value === "case-studies" ||
    value === "case study" ||
    value === "case studies"
  ) {
    return "case-study";
  }
  if (value === "thought" || value === "thoughts") return null;

  if (url) {
    try {
      const pathname = new URL(url).pathname.toLowerCase();
      if (pathname.startsWith("/blogs/") || pathname.startsWith("/blog/")) {
        return "blog";
      }
      if (
        pathname.startsWith("/case-study/") ||
        pathname.startsWith("/case-studies/")
      ) {
        return "case-study";
      }
      if (pathname.startsWith("/thoughts/") || pathname.startsWith("/thought/")) {
        return null;
      }
    } catch {
      return null;
    }
  }

  return null;
}

function parseTimestamp(rawDate: unknown): { iso: string | null; ms: number } {
  if (typeof rawDate !== "string" && !(rawDate instanceof Date)) {
    return { iso: null, ms: Number.NEGATIVE_INFINITY };
  }
  const str = rawDate instanceof Date ? rawDate.toISOString() : rawDate.trim();
  if (!str) return { iso: null, ms: Number.NEGATIVE_INFINITY };

  const ms = Date.parse(str);
  if (Number.isNaN(ms)) return { iso: null, ms: Number.NEGATIVE_INFINITY };
  return { iso: new Date(ms).toISOString(), ms };
}

function pickNewestCandidate(
  candidates: Array<{ note: LatestNote; ms: number; index: number }>
): LatestNote | null {
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => {
    if (b.ms !== a.ms) return b.ms - a.ms;
    return a.index - b.index;
  });
  return candidates[0].note;
}

function extractSearchItems(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    if (Array.isArray(obj.items)) return obj.items;
    if (Array.isArray(obj.articles)) return obj.articles;
    if (Array.isArray(obj.posts)) return obj.posts;
  }
  return [];
}

/**
 * Picks the newest blog or case study from a search.json payload.
 */
export function pickLatestFromSearchJson(
  payload: unknown,
  baseUrl: string = NOTES_BASE_URL
): LatestNote | null {
  const items = extractSearchItems(payload);
  const candidates: Array<{ note: LatestNote; ms: number; index: number }> = [];

  items.forEach((raw, index) => {
    if (!raw || typeof raw !== "object") return;
    const item = raw as Record<string, unknown>;
    if (item.draft === true) return;

    const title = typeof item.title === "string" ? item.title.trim() : "";
    if (!title) return;

    const rawUrl =
      item.url ??
      item.link ??
      item.href ??
      (typeof item.slug === "string"
        ? typeof item.category === "string" && item.category.trim()
          ? `/${item.category.trim().replace(/^\/+|\/+$/g, "")}/${item.slug.replace(/^\/+/, "")}`
          : `/${item.slug.replace(/^\/+/, "")}`
        : null);

    const url = normalizeNoteUrl(rawUrl, baseUrl);
    if (!url) return;

    const category = classifyCategory(item.category, url);
    if (!category) return;

    const { iso, ms } = parseTimestamp(item.date ?? item.pubDate ?? item.publishedAt);
    candidates.push({
      note: {
        id: url,
        title,
        category,
        label: CATEGORY_LABELS[category],
        url,
        date: iso,
      },
      ms,
      index,
    });
  });

  return pickNewestCandidate(candidates);
}

function decodeXmlEntities(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => {
      const n = Number(code);
      return Number.isFinite(n) ? String.fromCodePoint(n) : _;
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      const n = parseInt(hex, 16);
      return Number.isFinite(n) ? String.fromCodePoint(n) : _;
    })
    .trim();
}

function extractXmlTag(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeXmlEntities(match[1]) : null;
}

/**
 * Picks the newest blog or case study from an RSS XML feed.
 */
export function pickLatestFromRssXml(
  xml: string,
  baseUrl: string = NOTES_BASE_URL
): LatestNote | null {
  if (typeof xml !== "string" || !xml.trim()) return null;

  const itemMatches = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const candidates: Array<{ note: LatestNote; ms: number; index: number }> = [];

  itemMatches.forEach((block, index) => {
    const title = extractXmlTag(block, "title");
    const rawLink = extractXmlTag(block, "link") ?? extractXmlTag(block, "guid");
    if (!title || !rawLink) return;

    const url = normalizeNoteUrl(rawLink, baseUrl);
    if (!url) return;

    const rawCategory = extractXmlTag(block, "category");
    const category = classifyCategory(rawCategory, url);
    if (!category) return;

    const rawDate = extractXmlTag(block, "pubDate") ?? extractXmlTag(block, "dc:date");
    const { iso, ms } = parseTimestamp(rawDate);

    candidates.push({
      note: {
        id: url,
        title,
        category,
        label: CATEGORY_LABELS[category],
        url,
        date: iso,
      },
      ms,
      index,
    });
  });

  return pickNewestCandidate(candidates);
}
