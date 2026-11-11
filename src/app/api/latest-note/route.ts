import { NextResponse } from "next/server";
import {
  NOTES_BASE_URL,
  pickLatestFromRssXml,
  pickLatestFromSearchJson,
  type LatestNote,
} from "@/lib/notes-feed";

export const revalidate = 300;

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
};

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

const UPSTREAM_TIMEOUT_MS = 7000;

async function fetchFromSearchJson(): Promise<LatestNote | null> {
  try {
    const res = await fetch(`${NOTES_BASE_URL}/search.json`, {
      next: { revalidate },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const payload: unknown = await res.json();
    return pickLatestFromSearchJson(payload, NOTES_BASE_URL);
  } catch {
    return null;
  }
}

async function fetchFromRssXml(): Promise<LatestNote | null> {
  try {
    const res = await fetch(`${NOTES_BASE_URL}/rss.xml`, {
      next: { revalidate },
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const xml = await res.text();
    return pickLatestFromRssXml(xml, NOTES_BASE_URL);
  } catch {
    return null;
  }
}

export const GET = async () => {
  const note = (await fetchFromSearchJson()) ?? (await fetchFromRssXml());
  return NextResponse.json(
    { note },
    { headers: note ? CACHE_HEADERS : NO_STORE_HEADERS }
  );
};
