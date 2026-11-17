export interface PullRequestItem {
  number: number;
  title: string;
  url: string;
  mergedAt?: string;
}

export interface RepositoryGroup {
  name: string;
  repoUrl: string;
  pullRequests: PullRequestItem[];
}

export interface GitHubIssueSearchItem {
  title: string;
  html_url: string;
  number: number;
  closed_at?: string;
  pull_request?: {
    merged_at?: string;
  };
}

export const fallbackRepositories: RepositoryGroup[] = [
  {
    name: "meshery/meshkit",
    repoUrl: "https://github.com/meshery/meshkit",
    pullRequests: [
      {
        number: 1177,
        title: "[utils/broadcast] test: add unit tests for broadcaster lifecycle and concurrency",
        url: "https://github.com/meshery/meshkit/pull/1177",
        mergedAt: "2026-11-17T06:35:14Z",
      },
      {
        number: 1168,
        title: "[generators/artifacthub] Add unit tests for 5xx recovery, retry exhaustion, and transport errors",
        url: "https://github.com/meshery/meshkit/pull/1168",
        mergedAt: "2026-11-14T16:48:42Z",
      },
      {
        number: 1167,
        title: "[ArtifactHub] Add exponential backoff retry for 429 and 5xx responses",
        url: "https://github.com/meshery/meshkit/pull/1167",
        mergedAt: "2026-11-14T08:27:01Z",
      },
    ],
  },
  {
    name: "meshery/meshery",
    repoUrl: "https://github.com/meshery/meshery",
    pullRequests: [
      {
        number: 23485,
        title: "Add Guganraj Rengaraju's introduction to meetings",
        url: "https://github.com/meshery/meshery/pull/23485",
        mergedAt: "2026-11-13T15:05:12Z",
      },
    ],
  },
  {
    name: "sandbox-quantum/switch",
    repoUrl: "https://github.com/sandbox-quantum/switch",
    pullRequests: [
      {
        number: 1505,
        title: "fix(telegram): configure explicit network timeouts on application builder",
        url: "https://github.com/sandbox-quantum/switch/pull/1505",
        mergedAt: "2026-11-09T17:05:48Z",
      },
    ],
  },
  {
    name: "se7engoodfellas/zenmix",
    repoUrl: "https://github.com/se7engoodfellas/zenmix",
    pullRequests: [
      {
        number: 39,
        title: "update preview image to match latest UI",
        url: "https://github.com/se7engoodfellas/zenmix/pull/39",
        mergedAt: "2025-12-20T14:58:03Z",
      },
      {
        number: 38,
        title: "Refine active sound states with pastel theme and improve UI consistency",
        url: "https://github.com/se7engoodfellas/zenmix/pull/38",
        mergedAt: "2025-12-20T12:37:27Z",
      },
      {
        number: 21,
        title: "updated favicon with headphones icon",
        url: "https://github.com/se7engoodfellas/zenmix/pull/21",
        mergedAt: "2025-12-10T14:08:16Z",
      },
    ],
  },
  {
    name: "firstcontributions/first-contributions",
    repoUrl: "https://github.com/firstcontributions/first-contributions",
    pullRequests: [
      {
        number: 102615,
        title: "add Guganraj",
        url: "https://github.com/firstcontributions/first-contributions/pull/102615",
        mergedAt: "2025-08-28T06:29:11Z",
      },
    ],
  },
];

export function parseGitHubIssuesToRepositories(items: GitHubIssueSearchItem[]): {
  repositories: RepositoryGroup[];
  totalCount: number;
} {
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

  // Sort pull requests in each repository by mergedAt descending
  for (const repo of repoMap.values()) {
    repo.pullRequests.sort(
      (a, b) =>
        new Date(b.mergedAt || 0).getTime() - new Date(a.mergedAt || 0).getTime()
    );
  }

  // Sort repositories by their latest pull request's mergedAt descending
  const repositories = Array.from(repoMap.values()).sort((a, b) => {
    const latestA = new Date(a.pullRequests[0]?.mergedAt || 0).getTime();
    const latestB = new Date(b.pullRequests[0]?.mergedAt || 0).getTime();
    return latestB - latestA;
  });

  const totalCount = repositories.reduce(
    (acc, repo) => acc + repo.pullRequests.length,
    0
  );

  return { repositories, totalCount };
}

export async function getGitHubPRs(): Promise<{
  repositories: RepositoryGroup[];
  totalCount: number;
  source: "live" | "fallback";
}> {
  try {
    const url =
      "https://api.github.com/search/issues?q=is:pr+is:merged+author:mrtuxcoder+-user:mrtuxcoder&sort=updated&order=desc&per_page=100";

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "mrtuxcoder-portfolio",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(
        `[github-prs] GitHub API request returned status ${response.status}. Using fallback data.`
      );
      return {
        repositories: fallbackRepositories,
        totalCount: fallbackRepositories.reduce(
          (acc, repo) => acc + repo.pullRequests.length,
          0
        ),
        source: "fallback",
      };
    }

    const data = await response.json();
    const items: GitHubIssueSearchItem[] = data.items || [];
    const parsed = parseGitHubIssuesToRepositories(items);

    return {
      repositories: parsed.repositories,
      totalCount: parsed.totalCount,
      source: "live",
    };
  } catch (error) {
    console.error("[github-prs] Error fetching GitHub PRs:", error);
    return {
      repositories: fallbackRepositories,
      totalCount: fallbackRepositories.reduce(
        (acc, repo) => acc + repo.pullRequests.length,
        0
      ),
      source: "fallback",
    };
  }
}
