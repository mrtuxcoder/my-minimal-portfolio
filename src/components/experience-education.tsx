"use client";

import { Briefcase, GraduationCap } from "lucide-react";

interface ExperienceItem {
  role: string;
  organization: string;
  location?: string;
  period: string;
  summary: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "Technical Instructor (Part-time)",
    organization: "JADEL INFO TECH",
    location: "Remote",
    period: "Mar 2026 – Apr 2026",
    summary:
      "Delivered online sessions covering web development, Python, debugging workflows, and guided mini-projects.",
  },
  {
    role: "Freelance Web Developer",
    organization: "SAP CONSERV",
    location: "Tamil Nadu, India",
    period: "Feb 2026",
    summary:
      "Built and deployed a responsive business website with domain/hosting configuration and SEO-focused structure.",
  },
  {
    role: "Full Stack Development Intern",
    organization: "Dragon Media IT Solution",
    location: "Tamil Nadu, India",
    period: "May 2025 – Oct 2025",
    summary:
      "Collaborated across MERN stack and Spring Boot backend features, Git-based workflows, and API integrations.",
  },
];

const educationList = [
  {
    degree: "M.C.A. — Computer Applications",
    institution: "T.U.K College, Thanjavur",
    period: "2025 – Present",
  },
  {
    degree: "B.C.A. — Computer Applications",
    institution: "Annai Vailankanni Arts & Science College, Thanjavur",
    period: "2022 – 2025",
  },
];

/**
 * Work Experience section - placed high to maximize employability & credibility for recruiters
 */
export function WorkExperience() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-primary/70" />
        <h2 className="text-sm sm:text-base font-semibold tracking-tight text-primary">
          Work Experience
        </h2>
      </div>

      <div className="space-y-3">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="rounded-xl border border-border/80 bg-card/60 p-3.5 space-y-1.5 transition-colors hover:border-primary/20"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
              <span className="font-semibold text-xs sm:text-sm text-primary">
                {exp.role}
              </span>
              <span className="text-[11px] font-mono text-secondary/70">
                {exp.period}
              </span>
            </div>
            <p className="text-xs font-medium text-primary/80">
              {exp.organization}
              {exp.location && (
                <span className="text-secondary font-normal">
                  {" "}
                  · {exp.location}
                </span>
              )}
            </p>
            <p className="text-xs text-secondary leading-relaxed pt-0.5">
              {exp.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Education section - academic foundation
 */
export function Education() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <GraduationCap className="h-4 w-4 text-primary/70" />
        <h2 className="text-sm sm:text-base font-semibold tracking-tight text-primary">
          Education
        </h2>
      </div>

      <div className="space-y-2.5">
        {educationList.map((edu, index) => (
          <div
            key={index}
            className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5 rounded-xl border border-border/80 bg-card/60 p-3"
          >
            <div>
              <span className="font-semibold text-xs sm:text-sm text-primary">
                {edu.degree}
              </span>
              <p className="text-xs text-secondary mt-0.5">
                {edu.institution}
              </p>
            </div>
            <span className="text-[11px] font-mono text-secondary/70">
              {edu.period}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Combined helper for backwards compatibility
 */
export function ExperienceEducation() {
  return (
    <div className="space-y-6">
      <WorkExperience />
      <Education />
    </div>
  );
}
