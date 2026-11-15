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

export const fallbackRepositories: RepositoryGroup[] = [
  {
    name: "meshery/meshkit",
    repoUrl: "https://github.com/meshery/meshkit",
    pullRequests: [
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
