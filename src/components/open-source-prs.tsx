"use client";

import { useEffect, useMemo, useState } from "react";
import { GitPullRequest, ExternalLink } from "lucide-react";
import {
  fallbackRepositories,
  type RepositoryGroup,
} from "@/lib/github-prs";

export function OpenSourcePRs() {
  const [repositories, setRepositories] =
    useState<RepositoryGroup[]>(fallbackRepositories);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/github-prs")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (
          isMounted &&
          data?.repositories &&
          Array.isArray(data.repositories)
        ) {
          setRepositories(data.repositories);
        }
      })
      .catch((err) =>
        console.warn("[github-prs] Using fallback PR data", err)
      );

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPrs = useMemo(() => {
    return repositories.reduce(
      (sum, repo) => sum + repo.pullRequests.length,
      0
    );
  }, [repositories]);

  // Always show exactly the recent 6 PRs
  const recentRepositories = useMemo(() => {
    let count = 0;
    const result: RepositoryGroup[] = [];

    for (const repo of repositories) {
      if (count >= 6) break;
      const remaining = 6 - count;
      const prs = repo.pullRequests.slice(0, remaining);
      if (prs.length > 0) {
        result.push({
          ...repo,
          pullRequests: prs,
        });
        count += prs.length;
      }
    }
    return result;
  }, [repositories]);

  return (
    <div className="space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-semibold tracking-tight text-primary">
          Open Source Contributions
        </h2>
        <span className="text-[11px] font-mono text-secondary/70">
          {totalPrs} merged PRs
        </span>
      </div>

      {/* Plain, unboxed PR list */}
      <div className="space-y-4">
        {recentRepositories.map((repo) => (
          <div key={repo.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <a
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <GitPullRequest className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                <span className="group-hover:underline underline-offset-4">
                  {repo.name}
                </span>
                <ExternalLink className="h-3 w-3 text-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <span className="text-[11px] text-secondary/50 font-mono">
                {repo.pullRequests.length}{" "}
                {repo.pullRequests.length === 1 ? "PR" : "PRs"}
              </span>
            </div>

            <div className="space-y-1 pl-3.5 border-l border-border/70 ml-1.5">
              {repo.pullRequests.map((pr) => (
                <a
                  key={pr.number}
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={pr.title}
                  className="group/pr flex items-baseline justify-between gap-3 py-1 text-xs text-secondary hover:text-primary transition-colors"
                >
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="shrink-0 font-mono text-[11px] text-primary/60 group-hover/pr:text-primary">
                      #{pr.number}
                    </span>
                    <span className="truncate group-hover/pr:underline underline-offset-2">
                      {pr.title}
                    </span>
                  </div>
                  <ExternalLink className="h-3 w-3 shrink-0 text-secondary/40 opacity-0 group-hover/pr:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Plain link to check all PRs on GitHub */}
      <div className="pt-0.5">
        <a
          href="https://github.com/search?q=is%3Apr+is%3Amerged+author%3Amrtuxcoder+-user%3Amrtuxcoder&type=pullrequests"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-xs font-medium text-secondary hover:text-primary transition-colors select-none"
        >
          <span className="underline underline-offset-4 decoration-border/80 group-hover:decoration-primary">
            View all merged PRs on GitHub
          </span>
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
