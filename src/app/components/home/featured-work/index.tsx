"use client";
import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, ExternalLink, FileText, FolderKanban } from "lucide-react";
import { useEffect, useState } from "react";

type FeaturedProject = {
  title: string;
  description: string;
  roles: string[];
  highlights: string[];
  deployment: string[];
  caseStudyTitle: string;
  image: string;
};

type AdditionalProject = {
  id: number;
  title: string;
  description: string;
  repoUrl: string;
  liveUrl?: string;
};

const defaultFeaturedProjects: FeaturedProject[] = [
  {
    title: "Guidra",
    description:
      "An AI-powered learning platform that turns topics into structured learning paths. Features multi-model AI generation, progress tracking, and recall workflows.",
    roles: [
      "React",
      "Material UI",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Docker",
      "Azure VM",
    ],
    highlights: [
      "Structured learning pipeline with lessons, examples, practice, quizzes, and mind maps",
      "Multi-model AI generation using Gemini, Groq LLaMA, and HuggingFace",
      "Content caching, version access, and controlled regeneration for consistent learning",
      "Progress tracking, Recall Mode, custom topics, and study-focused workflows",
    ],
    deployment: [
      "Dockerized backend deployed on an Azure Linux VM",
      "Nginx reverse proxy configured with SSL",
      "PM2 process management for production backend",
      "Frontend deployed through Vercel",
    ],
    caseStudyTitle: "End-to-End Deployment of Guidra Backend on Azure VM",
    image: "/images/feature-work/guidra-cover.png",
  },
  {
    title: "Chronicle",
    description:
      "A self-hosted publishing platform built with Docker Compose. Automates image publishing and deployment with GitHub Actions, GHCR, and private networking.",
    roles: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "Cloudflare Tunnel",
    ],
    highlights: [
      "Full-stack publishing platform with admin publishing and public reading",
      "Containerized React, Node.js, and MongoDB using Docker Compose",
      "Automated Docker image builds and deployment through GitHub Actions and GHCR",
      "Publicly exposed through Cloudflare Tunnel from a self-hosted Linux homelab",
    ],
    deployment: [
      "Dockerized services deployed on a Linux homelab",
      "Nginx reverse proxy with internal Docker networking",
      "Tailscale used for private server access and deployment",
      "Cloudflare Tunnel with cloudflared provides public HTTPS access",
    ],
    caseStudyTitle: "From Code to Containers: Chronicle Homelab Deployment",
    image: "/images/feature-work/chronicle-cover.png",
  },
];

const defaultAdditionalProjects: AdditionalProject[] = [
  {
    id: 1,
    title: "LANBox",
    description: "A self-hosted private cloud for your local network.",
    repoUrl: "https://github.com/mrtuxcoder/LANBox",
  },
  {
    id: 2,
    title: "Linux Automation Toolkit",
    description: "Practical Bash automation scripts for system administration, monitoring, and infrastructure workflows",
    repoUrl: "https://github.com/mrtuxcoder/my-scripts",
  },
];

const FeaturedWork = () => {
  const [featureWork, setFeatureWork] = useState<FeaturedProject[]>(defaultFeaturedProjects);
  const [additionalProjects, setAdditionalProjects] = useState<AdditionalProject[]>(defaultAdditionalProjects);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/featured-work", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data: { featureWork?: FeaturedProject[]; additionalProjects?: AdditionalProject[] } = await res.json();
        if (data.featureWork && data.featureWork.length > 0) {
          setFeatureWork(data.featureWork);
        }
        setAdditionalProjects(data.additionalProjects ?? defaultAdditionalProjects);
      } catch { }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="section-surface border-x border-primary/10">
          {/* Header */}
          <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
            <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
              <p className="flex items-center gap-2 text-sm tracking-[2px] text-primary uppercase font-medium">
                <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />
                <span>Featured Work</span>
              </p>
            </div>
          </div>

          {/* Main Featured Projects Gallery */}
          <div className="border-t border-primary/10">
            <div className="max-w-5xl mx-auto px-4 sm:px-7 py-9 md:py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {featureWork?.map((project, index) => {
                  const titleLower = project.title.toLowerCase();
                  const isGuidra = titleLower.includes("guidra") || index === 0;
                  const isChronicle = titleLower.includes("chronicle") || index === 1;

                  return (
                    <div
                      key={project.title}
                      className="rounded-xl bg-[linear-gradient(180deg,rgba(28,33,43,0.06)_0%,rgba(255,255,255,0)_45%)] p-4 sm:p-5 border border-primary/10 flex flex-col justify-between h-full transition-all duration-300 hover:border-primary/20"
                    >
                      <div>
                        {/* Project Image with consistent 16:9 aspect ratio */}
                        <div className="relative overflow-hidden rounded-lg aspect-[16/9] mb-3.5 bg-primary/5">
                          <Image
                            src={project?.image || "/images/feature-work/feature-img-11.png"}
                            alt={project?.title || "Featured work image"}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="eager"
                            className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                          />
                        </div>

                        {/* Project Title & Short Description */}
                        <h3 className="text-base sm:text-lg font-semibold text-foreground">
                          {project.title.split(" - ")[0]}
                        </h3>
                        <p className="text-xs sm:text-sm text-secondary leading-relaxed mt-1.5">
                          {project.description}
                        </p>
                      </div>

                      {/* Clear Actions: Case study & Visit site / GitHub */}
                      <div className="pt-3.5 mt-4 border-t border-primary/10 flex items-center justify-between gap-3">
                        <Link
                          href={{
                            pathname: "/case-study",
                            query: {
                              title:
                                project?.caseStudyTitle ||
                                (isGuidra
                                  ? "End-to-End Deployment of Guidra Backend on Azure VM"
                                  : "From Code to Containers: Chronicle Homelab Deployment"),
                            },
                          }}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-foreground/85 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded px-1 py-1"
                        >
                          <FileText className="h-3.5 w-3.5 text-primary/70" aria-hidden="true" />
                          <span>Case study</span>
                        </Link>

                        {isGuidra && (
                          <a
                            href="https://www.guidra.tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded px-1 py-1"
                          >
                            <span>Visit site</span>
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        )}

                        {isChronicle && (
                          <a
                            href="https://github.com/mrtuxcoder/chronicle"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded px-1 py-1"
                          >
                            <span>GitHub</span>
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="h-4 border border-primary/10" />

           {/* Other Projects */}
          <div>
            <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
              <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                <p className="flex items-center gap-2 text-sm tracking-[2px] text-primary uppercase font-medium">
                  <FolderKanban aria-hidden="true" className="h-4 w-4" />
                  <span>Other Projects</span>
                </p>
              </div>
            </div>

            <div className="border-t border-primary/10">
              <div className="max-w-5xl mx-auto px-4 py-8 sm:px-7 sm:py-10 lg:py-8">
                <div>
                  {additionalProjects.map((project) => (
                    <div
                      key={project.id}
                      className="group border-dashed border-b border-primary/10 py-5 first:pt-0 last:border-b-0 last:pb-0 sm:py-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
                            <h4 className="text-base sm:text-lg font-semibold leading-snug text-primary">
                              {project.title}
                            </h4>
                            <p className="text-sm leading-relaxed text-secondary sm:flex-1">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:shrink-0">
                          <Link
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            Repo →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-gray-100 pt-4 dark:border-gray-800">
                  <Link
                    href="https://github.com/mrtuxcoder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors sm:text-sm"
                  >
                    View all on GitHub
                    <svg
                      className="ml-2 w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="h-4 border border-primary/10" />

          {/* Case Studies */}
          <div>
            <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
              <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                <p className="flex items-center gap-2 text-sm tracking-[2px] text-primary uppercase font-medium">
                  <FolderKanban aria-hidden="true" className="h-4 w-4" />
                  <span>Case Studies</span>
                </p>
              </div>
            </div>

            <div className="border-t border-primary/10">
              <div className="max-w-5xl mx-auto px-4 py-8 sm:px-7 sm:py-10 lg:py-8">
                <div>
                  <Link
                    href={{
                      pathname: "/case-study",
                      query: { title: "End-to-End Deployment of Guidra Backend on Azure VM" },
                    }}
                    className="group block border-dashed border-b border-primary/10 py-5 first:pt-0 last:border-b-0 last:pb-0 hover:opacity-80 transition-opacity sm:py-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold leading-snug text-primary group-hover:text-primary/80 transition-colors">
                          End-to-End Deployment of Guidra Backend on Azure VM
                        </h3>
                        <p className="hidden mt-1 text-sm leading-relaxed text-secondary sm:block">
                          Production deployment with Nginx, PM2, Azure VM, SSL, and security hardening
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 sm:mt-0 sm:shrink-0">
                        <span className="text-xs font-medium text-primary group-hover:text-primary/80 transition-colors sm:text-sm">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href={{
                      pathname: "/case-study",
                      query: {
                        title: "Automated Linux Deployment of LANBox — a File Sharing Platform",
                      },
                    }}
                    className="group block border-dashed border-b border-primary/10 py-5 first:pt-0 last:border-b-0 last:pb-0 hover:opacity-80 transition-opacity sm:py-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold leading-snug text-primary group-hover:text-primary/80 transition-colors">
                          Automated Linux Deployment of LANBox — a File Sharing Platform
                        </h3>
                        <p className="hidden mt-1 text-sm leading-relaxed text-secondary sm:block">
                          Docker-based LAN file sharing with Linux deployment, GHCR images,
                          firewall configuration, and automated installation
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 sm:mt-0 sm:shrink-0">
                        <span className="text-xs font-medium text-primary group-hover:text-primary/80 transition-colors sm:text-sm">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href={{
                      pathname: "/case-study",
                      query: { title: "From Code to Containers: Chronicle Homelab Deployment" },
                    }}
                    className="group block border-dashed border-b border-primary/10 py-5 first:pt-0 last:border-b-0 last:pb-0 hover:opacity-80 transition-opacity sm:py-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold leading-snug text-primary group-hover:text-primary/80 transition-colors">
                          From Code to Containers: Chronicle Homelab Deployment
                        </h3>
                        <p className="hidden mt-1 text-sm leading-relaxed text-secondary sm:block">
                          Containerization, CI/CD, Docker networking, Nginx, GHCR, Tailscale, Cloudflare and homelab deployment
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 sm:mt-0 sm:shrink-0">
                        <span className="text-xs font-medium text-primary group-hover:text-primary/80 transition-colors sm:text-sm">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default FeaturedWork;
