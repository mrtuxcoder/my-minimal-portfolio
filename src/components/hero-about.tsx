"use client";

import Image from "next/image";
import { Download, MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubIcon } from "@/app/components/home/about-me/tech-icons";

export function HeroAbout() {
  return (
    <div className="space-y-5">
      {/* Compact Banner - sits high up with minimal gap */}
      <div className="relative h-24 sm:h-28 w-full overflow-hidden rounded-2xl border border-border/80 bg-muted">
        <img
          src="/images/hero-sec/banner.png"
          alt="Profile banner"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Avatar & Header Details */}
      <div className="relative px-1 -mt-11 sm:-mt-14 space-y-3.5">
        <div className="flex items-end justify-between gap-3">
          {/* Squircle Avatar with Status Dot */}
          <div className="relative shrink-0">
            <Image
              src="/images/hero-sec/guganraj-rengaraju.jpeg"
              alt="Guganraj Rengaraju"
              width={84}
              height={84}
              priority
              className="h-20 w-20 sm:h-22 sm:w-22 rounded-[26%] border-2 border-border/90 bg-muted object-cover ring-4 ring-background shadow-sm"
            />
            <span
              className="absolute bottom-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-background ring-2 ring-background z-10"
              title="Open to opportunities"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </span>
          </div>

          {/* Top Quick Links & Theme Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/docs/guganraj-rengaraju-resume.pdf"
              download="Guganraj-Resume.pdf"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-xs font-medium text-primary hover:bg-muted/80 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Resume</span>
            </a>
            <a
              href="https://notes.guganraj.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-xs font-medium text-primary hover:bg-muted/80 transition-colors"
            >
              <span>Notes ↗</span>
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Name & Title */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Guganraj Rengaraju
          </h1>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs sm:text-sm text-secondary">
            <span className="font-medium text-primary/90">
              Junior DevOps Engineer
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Tamil Nadu, India
            </span>
          </p>
        </div>

        {/* Minimal Bio with slow highlighter sweep effect */}
        <p className="text-xs sm:text-sm leading-relaxed text-secondary">
          <span className="highlighter-sweep font-medium text-primary/90">
            DevOps and systems engineer
          </span>{" "}
          focused on{" "}
          <span className="highlighter-sweep-2 font-medium text-primary/90">
            Linux administration, Docker containerization, CI/CD automation
          </span>
          , and cloud infrastructure. Open source contributor passionate about
          building{" "}
          <span className="highlighter-sweep-3 font-medium text-primary/90">
            self-hosted architectures
          </span>
          .
        </p>

        {/* Social Links Row */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <a
            href="https://github.com/mrtuxcoder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-medium text-secondary hover:bg-muted hover:text-primary transition-colors"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/guganraj-rengaraju/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-medium text-secondary hover:bg-muted hover:text-primary transition-colors"
          >
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://x.com/mrtuxcoder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-medium text-secondary hover:bg-muted hover:text-primary transition-colors"
          >
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>X</span>
          </a>
        </div>
      </div>
    </div>
  );
}
