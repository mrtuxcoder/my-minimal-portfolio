import { NextResponse } from "next/server";
import { getGitHubPRs } from "@/lib/github-prs";

export const revalidate = 60; // Auto-refresh every 60 seconds

export const GET = async () => {
  const result = await getGitHubPRs();

  return NextResponse.json(result, {
    headers: {
      "Cache-Control":
        result.source === "live"
          ? "public, max-age=0, s-maxage=60, stale-while-revalidate=120"
          : "public, max-age=0, s-maxage=30, stale-while-revalidate=60",
    },
  });
};
