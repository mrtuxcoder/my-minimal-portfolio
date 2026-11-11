"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { LatestNote } from "@/lib/notes-feed";

const DISMISSED_STORAGE_KEY = "portfolio_dismissed_note_id";
const RECHECK_INTERVAL_MS = 5 * 60 * 1000;
const EXIT_ANIMATION_MS = 200;

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

export default function LatestNoteCapsule() {
  const [note, setNote] = useState<LatestNote | null>(null);
  const [shown, setShown] = useState(false);

  const lastCheckedAtRef = useRef<number>(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (hideTimerRef.current !== null) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const checkLatestNote = useCallback(async (signal?: AbortSignal) => {
    lastCheckedAtRef.current = Date.now();
    try {
      const res = await fetch("/api/latest-note", {
        cache: "no-store",
        signal,
      });
      if (!res.ok) return;
      const data = (await res.json()) as { note?: LatestNote | null };
      const latest = data.note ?? null;

      if (!latest) {
        setShown(false);
        setNote(null);
        return;
      }

      if (readDismissedId() === latest.id) {
        setShown(false);
        setNote(null);
        return;
      }

      clearTimers();
      setNote(latest);
      rafRef.current = requestAnimationFrame(() => {
        setShown(true);
      });
    } catch {
      // Fail silently if aborted or offline
    }
  }, [clearTimers]);

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
          setShown(false);
          return null;
        }
        return current;
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      controller.abort();
      clearTimers();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [checkLatestNote, clearTimers]);

  const handleDismiss = useCallback(() => {
    if (!note) return;
    writeDismissedId(note.id);
    clearTimers();
    setShown(false);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setNote(null);
      return;
    }

    hideTimerRef.current = setTimeout(() => {
      setNote(null);
    }, EXIT_ANIMATION_MS);
  }, [note, clearTimers]);

  if (!note) return null;

  return (
    <div
      role="region"
      aria-label="Latest writing notification"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          handleDismiss();
        }
      }}
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 flex justify-center sm:justify-end pointer-events-none"
    >
      <div
        className={`pointer-events-auto flex items-center gap-2 sm:gap-2.5 max-w-full sm:max-w-[440px] rounded-full border border-primary/15 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-lg shadow-primary/5 transition-all duration-200 ease-out motion-reduce:transition-none ${
          shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <span
          className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"
          aria-hidden="true"
        />

        <span className="shrink-0 rounded-full bg-primary/5 px-2 py-0.5 text-[11px] font-medium tracking-wide text-primary/75 whitespace-nowrap">
          {note.label}
        </span>

        <a
          href={note.url}
          target="_blank"
          rel="noopener noreferrer"
          title={note.title}
          className="group min-w-0 flex items-center gap-1 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 rounded-sm"
        >
          <span className="truncate">{note.title}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-secondary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          />
        </a>

        <span
          className="h-3.5 w-px shrink-0 bg-primary/10"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full text-secondary hover:text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 transition-colors cursor-pointer"
        >
          <X aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
