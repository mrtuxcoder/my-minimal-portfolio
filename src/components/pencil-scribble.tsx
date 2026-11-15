import React from "react";

/**
 * Hand-drawn horizontal subtle pencil scribble divider line.
 */
export function PencilDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full py-1 overflow-hidden select-none opacity-30 dark:opacity-25 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 768 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-2 text-foreground/50 stroke-current"
        preserveAspectRatio="none"
      >
        <path
          d="M1 4.2C64 3.1 128 5.7 192 4.1C256 2.5 320 5.3 384 4.4C448 3.5 512 5.8 576 4.0C640 2.2 704 5.1 767 3.9"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Hand-drawn vertical pencil scribble line that tiles down container margins or borders.
 */
export function VerticalPencilLine({
  position = "left",
  className = "",
}: {
  position?: "left" | "right";
  className?: string;
}) {
  const patternId = `pencil-vert-pattern-${position}`;
  // Left and right have slight natural variation in their hand-drawn pencil wobble
  const pathD =
    position === "left"
      ? "M4 0 C2.8 20 5.2 40 3.6 60 C4.6 80 3.4 100 4 120 C4.5 140 3.5 150 4 160"
      : "M4 0 C5.2 25 3.1 50 4.6 75 C3.8 95 4.9 120 3.7 140 C4.4 150 3.9 155 4 160";

  return (
    <div
      className={`absolute top-0 bottom-0 w-2.5 overflow-hidden pointer-events-none select-none opacity-25 dark:opacity-20 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full text-foreground/60 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width="8"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <path
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

/**
 * Hand-drawn pencil scribble arrow annotation.
 */
export function PencilArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 54 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-secondary/50 stroke-current select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 18C16 22 34 18 48 8"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 7L48 8L46 16"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
