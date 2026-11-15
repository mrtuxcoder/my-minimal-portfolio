import { NextResponse } from "next/server";
import {
  fallbackRepositories,
  type PullRequestItem,
  type RepositoryGroup,
} from "@/lib/github-prs";

export const revalidate = 3600; // Cache on server/CDN for 1 hour auto-refresh

interface GitHubIssueSearchItem {
  title: string;
  html_url: string;
  number: number;
  closed_at?: string;
  pull_request?: {
    merged_at?: string;
  };
}

export const GET = async () => {
  try {
    const url =
      "https://api.github.com/search/issues?q=is:pr+is:merged+author:mrtuxcoder+-user:mrtuxcoder&sort=created&order=desc&per_page=100";

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "mrtuxcoder-portfolio",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      console.warn(
        `[github-prs] GitHub API request returned status ${response.status}. Using fallback data.`
      );
      return NextResponse.json(
        {
          repositories: fallbackRepositories,
          totalCount: fallbackRepositories.reduce(
            (acc, repo) => acc + repo.pullRequests.length,
            0
          ),
          source: "fallback",
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }

    const data = await response.json();
    const items: GitHubIssueSearchItem[] = data.items || [];

    const repoMap = new Map<string, RepositoryGroup>();

    for (const item of items) {
      const match = item.html_url.match(
        /https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/
      );
      if (!match) continue;

      const owner = match[1];
      const repo = match[2];
      const repoFullName = `${owner}/${repo}`;
      const repoUrl = `https://github.com/${owner}/${repo}`;

      if (!repoMap.has(repoFullName)) {
        repoMap.set(repoFullName, {
          name: repoFullName,
          repoUrl,
          pullRequests: [],
        });
      }

      const prItem: PullRequestItem = {
        number: item.number,
        title: item.title,
        url: item.html_url,
        mergedAt: item.pull_request?.merged_at || item.closed_at,
      };

      repoMap.get(repoFullName)!.pullRequests.push(prItem);
    }

    const repositories = Array.from(repoMap.values());
    const totalCount = repositories.reduce(
      (acc, repo) => acc + repo.pullRequests.length,
      0
    );

    return NextResponse.json(
      { repositories, totalCount, source: "live" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      }
    );
  } catch (error) {
    console.error("[github-prs] Error fetching GitHub PRs:", error);
    return NextResponse.json(
      {
        repositories: fallbackRepositories,
        totalCount: fallbackRepositories.reduce(
          (acc, repo) => acc + repo.pullRequests.length,
          0
        ),
        source: "fallback",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  }
};
