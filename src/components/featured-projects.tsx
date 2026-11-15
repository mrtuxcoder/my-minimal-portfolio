"use client";

import { ExternalLink, FileText } from "lucide-react";
import { GitHubIcon } from "@/app/components/home/about-me/tech-icons";

interface Project {
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  desktopOnly?: boolean;
}

const projects: Project[] = [
  {
    title: "Guidra",
    description:
      "Production deployment across Multi-AZ private EC2 subnets behind an AWS Application Load Balancer with Docker, immutable CI/CD via GitHub Actions & SSM, and CloudWatch monitoring.",
    tags: ["AWS (ALB & EC2)", "Docker", "Nginx", "GitHub Actions", "MongoDB Atlas"],
    liveUrl: "https://www.guidra.tech",
    caseStudyUrl: "https://notes.guganraj.me/case-study/guidra-aws",
  },
  {
    title: "Chronicle",
    description:
      "Self-hosted publishing platform containerized with Docker Compose, automated multi-arch image builds via GitHub Actions & GHCR, and reverse-proxied with Nginx.",
    tags: ["Docker Compose", "GitHub Actions", "Nginx", "Node.js", "MongoDB"],
    caseStudyUrl: "https://notes.guganraj.me/case-study/chronicle",
    repoUrl: "https://github.com/mrtuxcoder/chronicle",
  },
  {
    title: "LANBox",
    description:
      "Self-hosted private LAN file-sharing infrastructure with automated Bash installer, containerized frontend & backend, and pre-built GHCR image distribution.",
    tags: ["Docker Compose", "Linux", "Nginx", "GHCR", "Bash"],
    caseStudyUrl: "https://notes.guganraj.me/case-study/lanbox",
    repoUrl: "https://github.com/mrtuxcoder/LANBox",
  },
  {
    title: "Linux Automation Toolkit",
    description:
      "Practical Bash automation scripts for Linux system administration, server health monitoring, cron scheduling, and environment maintenance.",
    tags: ["Bash", "Linux", "Cron", "Systemd", "Shell Scripting"],
    repoUrl: "https://github.com/mrtuxcoder/my-scripts",
    desktopOnly: true,
  },
];

export function FeaturedProjects() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-semibold tracking-tight text-primary">
          Featured Projects
        </h2>
        <a
          href="https://github.com/mrtuxcoder?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1 select-none"
        >
          <span>View all repos</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {projects.map((project) => (
          <div
            key={project.title}
            className={`group flex flex-col justify-between rounded-xl border border-border/80 bg-card/60 p-3 sm:p-3.5 transition-all hover:border-primary/25 hover:bg-muted/40 ${
              project.desktopOnly ? "hidden sm:flex" : "flex"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-xs sm:text-sm text-primary">
                  {project.title}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  {/* GitHub Link */}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary/70 hover:text-primary transition-colors"
                      title="GitHub Repository"
                      aria-label={`${project.title} GitHub`}
                    >
                      <GitHubIcon className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {/* Case Study Link (Paper Icon) */}
                  {project.caseStudyUrl && (
                    <a
                      href={project.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary/70 hover:text-primary transition-colors"
                      title="Read Case Study (notes.guganraj.me)"
                      aria-label={`${project.title} Case Study`}
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {/* Live Website Link */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary/70 hover:text-primary transition-colors"
                      title="Visit Live Website"
                      aria-label={`${project.title} Live Website`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border/70 bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium text-secondary/90 font-mono leading-tight"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
