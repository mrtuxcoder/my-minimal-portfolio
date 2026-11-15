"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GitCommit, ExternalLink } from "lucide-react";
import initialContributions from "@/lib/github-contributions-fallback.json";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export function GitHubStats() {
  const [total, setTotal] = useState<number>(
    initialContributions.total.lastYear || 517
  );
  const [days, setDays] = useState<ContributionDay[]>(
    initialContributions.contributions as ContributionDay[]
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/github-stats")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data?.total) setTotal(data.total);
        if (Array.isArray(data?.contributions) && data.contributions.length > 0) {
          setDays(data.contributions);
        }
      })
      .catch((err) =>
        console.warn("[github-stats] Using pre-bundled contribution data", err)
      );
  }, []);

  // Split into weeks (7 days each: Sunday = 0 to Saturday = 6)
  const weeks = useMemo(() => {
    const allWeeks: ContributionDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      allWeeks.push(days.slice(i, i + 7));
    }
    return allWeeks;
  }, [days]);

  // Auto-scroll on mount on small screens so recent activity is visible
  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      el.scrollLeft = el.scrollWidth;
    }
  }, [weeks]);

  // Compute month label positions deterministically without timezone hydration skew
  const monthLabels = useMemo(() => {
    const MONTH_NAMES = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const labels: { month: string; weekIdx: number }[] = [];
    let lastMonth = "";
    weeks.forEach((week, idx) => {
      if (week.length === 0) return;
      const mIdx = parseInt(week[0].date.slice(5, 7), 10) - 1;
      const m = MONTH_NAMES[mIdx] || "";
      if (m && m !== lastMonth) {
        labels.push({ month: m, weekIdx: idx });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  const getLevelClass = (level: number) => {
    switch (level) {
      case 1:
        return "fill-emerald-500/40 dark:fill-emerald-500/35";
      case 2:
        return "fill-emerald-500/65 dark:fill-emerald-500/60";
      case 3:
        return "fill-emerald-500/90 dark:fill-emerald-500/85";
      case 4:
        return "fill-emerald-600 dark:fill-emerald-400";
      default:
        return "fill-zinc-200/70 dark:fill-zinc-800/80";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <a
          href="https://github.com/mrtuxcoder"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <GitCommit className="h-3.5 w-3.5 text-primary/70" />
          <span>GitHub Activity</span>
          <ExternalLink className="h-3 w-3 text-secondary/40 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

        <span className="text-[11px] sm:text-xs text-secondary/70 font-mono">
          {total} contributions in the last year
        </span>
      </div>

      <div className="rounded-xl border border-border/80 bg-card p-3 sm:p-4">
        {/* Scrollable on mobile so boxes stay crisp and readable; fits cleanly on desktop */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin [scrollbar-width:thin]"
        >
          <div className="min-w-[664px]">
            <svg
              viewBox="0 0 664 104"
              className="w-[664px] h-[104px] select-none block"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Month Labels */}
              {monthLabels.map((lbl) => (
                <text
                  key={lbl.month + lbl.weekIdx}
                  x={26 + lbl.weekIdx * 12}
                  y="11"
                  className="fill-secondary/70 text-[9.5px] font-mono"
                >
                  {lbl.month}
                </text>
              ))}

              {/* Weekday Labels (Mon, Wed, Fri) */}
              <text
                x="2"
                y="39"
                className="fill-secondary/60 text-[8.5px] font-mono"
              >
                Mon
              </text>
              <text
                x="2"
                y="63"
                className="fill-secondary/60 text-[8.5px] font-mono"
              >
                Wed
              </text>
              <text
                x="2"
                y="87"
                className="fill-secondary/60 text-[8.5px] font-mono"
              >
                Fri
              </text>

              {/* 53 Columns of 7 Rows */}
              {weeks.map((week, wIdx) => {
                const x = 26 + wIdx * 12;
                return week.map((day, dIdx) => {
                  const y = 16 + dIdx * 12;
                  return (
                    <rect
                      key={day.date}
                      x={x}
                      y={y}
                      width="9.5"
                      height="9.5"
                      rx="2"
                      ry="2"
                      className={`transition-colors ${getLevelClass(day.level)}`}
                    />
                  );
                });
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
