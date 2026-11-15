import { NextResponse } from "next/server";
import fallbackContributions from "@/lib/github-contributions-fallback.json";

export const revalidate = 3600; // 1 hour auto-refresh

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export const GET = async () => {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/mrtuxcoder?y=last",
      {
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data = await res.json();
    const contributions: ContributionDay[] = data.contributions || [];
    const totalLastYear: number = data.total?.lastYear || 517;

    return NextResponse.json(
      {
        total: totalLastYear,
        contributions: contributions,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      }
    );
  } catch (error) {
    console.warn("[github-stats] Error fetching from remote API, serving fallback:", error);
    return NextResponse.json(
      {
        total: fallbackContributions.total.lastYear,
        contributions: fallbackContributions.contributions,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  }
};
