"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Terminal } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-medium text-primary transition-colors"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-muted/60 text-primary transition-transform group-hover:scale-105">
            <Terminal className="h-3.5 w-3.5" />
          </span>
          <span className="font-semibold tracking-tight text-xs sm:text-sm">
            guganraj.me
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="https://notes.guganraj.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-medium text-secondary hover:text-primary transition-colors"
          >
            Notes ↗
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
