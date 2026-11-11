"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bell, X } from "lucide-react";
import type { LatestNote } from "@/lib/notes-feed";

const DISMISSED_STORAGE_KEY = "portfolio_dismissed_note_id";
const RECHECK_INTERVAL_MS = 5 * 60 * 1000;
const EXPAND_DELAY_MS = 300;
const COLLAPSE_DURATION_MS = 260;
const LIFT_DURATION_MS = 220;

type CapsulePhase = "drop" | "expanded" | "collapsing" | "lifting";

function readDismissedId(): string | null {
  try {
    return window.localStorage.getItem(DISMISSED_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeDismissedId(id: string): void {
  try {
    window.localStorage.setItem(DISMISSED_STORAGE_KEY, id);
  } catch {
    // Ignore storage quota or private-mode restrictions
  }
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function LatestNoteCapsule() {
  const [note, setNote] = useState<LatestNote | null>(null);
  const [phase, setPhase] = useState<CapsulePhase>("drop");

  const lastCheckedAtRef = useRef<number>(0);
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const clearAllTimers = useCallback(() => {
    for (const id of timersRef.current) {
      clearTimeout(id);
    }
    timersRef.current = [];
  }, []);

  const scheduleTimer = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const checkLatestNote = useCallback(
    async (signal?: AbortSignal) => {
      lastCheckedAtRef.current = Date.now();
      try {
        const res = await fetch("/api/latest-note", {
          cache: "no-store",
          signal,
        });
        if (!res.ok) return;
        const data = (await res.json()) as { note?: LatestNote | null };
        const latest = data.note ?? null;

        if (!latest || readDismissedId() === latest.id) {
          clearAllTimers();
          setNote(null);
          setPhase("drop");
          return;
        }

        clearAllTimers();
        setNote(latest);

        if (prefersReducedMotion()) {
          setPhase("expanded");
          return;
        }

        setPhase("drop");
        scheduleTimer(() => {
          setPhase("expanded");
        }, EXPAND_DELAY_MS);
      } catch {
        // Fail silently if aborted or offline
      }
    },
    [clearAllTimers, scheduleTimer]
  );

  useEffect(() => {
    const controller = new AbortController();
    void checkLatestNote(controller.signal);

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastCheckedAtRef.current < RECHECK_INTERVAL_MS) return;
      void checkLatestNote(controller.signal);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== DISMISSED_STORAGE_KEY) return;
      setNote((current) => {
        if (current && event.newValue === current.id) {
          clearAllTimers();
          setPhase("drop");
          return null;
        }
        return current;
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      controller.abort();
      clearAllTimers();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [checkLatestNote, clearAllTimers]);

  const handleDismiss = useCallback(() => {
    if (!note || phase === "collapsing" || phase === "lifting") return;
    writeDismissedId(note.id);
    clearAllTimers();

    if (prefersReducedMotion()) {
      setNote(null);
      setPhase("drop");
      return;
    }

    setPhase("collapsing");
    scheduleTimer(() => {
      setPhase("lifting");
      scheduleTimer(() => {
        setNote(null);
        setPhase("drop");
      }, LIFT_DURATION_MS);
    }, COLLAPSE_DURATION_MS);
  }, [note, phase, clearAllTimers, scheduleTimer]);

  if (!note) return null;

  const isExpanded = phase === "expanded";
  const isLifting = phase === "lifting";

  return (
    <div
      role="region"
      aria-label="Latest writing notification"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          handleDismiss();
        }
      }}
      className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100vw-3.25rem)] sm:max-w-[520px] pointer-events-none"
    >
      <div
        className={`pointer-events-auto flex w-full items-center rounded-full border border-primary/15 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md p-1 sm:p-1.5 shadow-[0_10px_30px_rgba(28,33,43,0.14)] ${
          isLifting ? "animate-note-capsule-lift" : "animate-note-capsule-drop"
        }`}
      >
        <div
          className="relative flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary"
          aria-hidden="true"
        >
          <Bell className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2} />
          <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900" />
        </div>

        <div
          className={`grid min-w-0 transition-[grid-template-columns,opacity,margin] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            isExpanded
              ? "grid-cols-[1fr] opacity-100 ml-1.5 mr-0.5 sm:ml-2 sm:mr-1"
              : "grid-cols-[0fr] opacity-0 ml-0 mr-0 pointer-events-none"
          }`}
        >
          <div className="min-w-0 overflow-hidden flex items-center gap-1.5 sm:gap-2.5">
            <span className="shrink-0 rounded-full bg-primary/5 px-1.5 py-0.5 sm:px-2 text-[10px] sm:text-[11px] font-medium tracking-wide text-primary/80 whitespace-nowrap">
              <span className="sm:hidden">
                {note.category === "case-study" ? "Case Study" : "Blog"}
              </span>
              <span className="hidden sm:inline">{note.label}</span>
            </span>

            <a
              href={note.url}
              target="_blank"
              rel="noopener noreferrer"
              title={note.title}
              tabIndex={isExpanded ? 0 : -1}
              className="group min-w-0 flex-1 flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-sm font-medium text-primary hover:text-primary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 rounded-sm"
            >
              <span className="truncate">{note.title}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-secondary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </a>

            <span
              className="h-3 sm:h-3.5 w-px shrink-0 bg-primary/15"
              aria-hidden="true"
            />

            <button
              type="button"
              onClick={handleDismiss}
              tabIndex={isExpanded ? 0 : -1}
              aria-label="Dismiss notification"
              className="shrink-0 inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-secondary hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 transition-colors cursor-pointer"
            >
              <X aria-hidden="true" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
