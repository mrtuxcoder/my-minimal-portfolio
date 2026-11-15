"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioningRef.current) return;

    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    const nextTheme = isCurrentlyDark ? "light" : "dark";

    const applyTheme = () => {
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      try {
        localStorage.setItem("theme", nextTheme);
      } catch {}

      setTheme(nextTheme);
    };

    // If View Transitions API is not supported or user prefers reduced motion
    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      typeof (document as any).startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme();
      return;
    }

    isTransitioningRef.current = true;

    // Get click coordinates (or fallback to button center)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    try {
      const transition = (document as any).startViewTransition(() => {
        applyTheme();
      });

      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ];

          document.documentElement.animate(
            {
              clipPath: clipPath,
            },
            {
              duration: 450,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
              pseudoElement: "::view-transition-new(root)",
            } as any
          );
        })
        .catch(() => {
          // Fallback if animation fails
        });

      transition.finished.finally(() => {
        isTransitioningRef.current = false;
      });
    } catch {
      applyTheme();
      isTransitioningRef.current = false;
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle theme"
      className={`group relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-secondary hover:bg-muted/80 hover:text-primary transition-colors cursor-pointer select-none ${className}`}
    >
      <Sun className="h-4 w-4 hidden dark:block transition-transform hover:rotate-45 text-amber-400" />
      <Moon className="h-4 w-4 block dark:hidden transition-transform hover:-rotate-12 text-slate-700" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
