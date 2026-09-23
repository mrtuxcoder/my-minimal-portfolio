"use client";
import Image from "next/image";
import Link from "next/link";
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

const FeaturedWork = () => {
  const [featureWork, setFeatureWork] = useState<FeaturedProject[] | null>(null);
  const [additionalProjects, setAdditionalProjects] = useState<AdditionalProject[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/featured-work");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: { featureWork: FeaturedProject[] } = await res.json();
        setFeatureWork(data?.featureWork);

        const extraProjects = [
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
        setAdditionalProjects(extraProjects);
      } catch { }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="border-x border-primary/10">
          {/* Header */}
          <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
            <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
              <p className="text-sm tracking-[2px] text-primary uppercase font-medium">
                Featured Work
              </p>
            </div>
          </div>

          {/* Main Featured Projects */}
          <div className="border-t border-primary/10 px-2 py-3 sm:p-4 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {featureWork?.map((project, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-[linear-gradient(180deg,rgba(120,119,198,0.06)_0%,rgba(255,255,255,0)_45%)] p-4 sm:p-5 border border-primary/10 flex flex-col h-full"
                >
                  {/* Project Image */}
                  <div className="mb-4 -mx-4 -mt-4 sm:-mx-5 sm:-mt-5">
                    <div className="relative overflow-hidden rounded-t-2xl aspect-[16/9]">
                      <Image
                        src={project?.image || "/images/feature-work/feature-img-11.png"}
                        alt={project?.title || "Featured work image"}
                        width={600}
                        height={340}
                        loading="eager"
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-500 ease-in-out"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 flex-grow">
                    {/* Title */}
                    <Link
                      href={{
                        pathname: "/case-study",
                        query: {
                          title: project?.caseStudyTitle || project?.title,
                        },
                      }}
                    >
                      <h3 className="text-lg sm:text-xl font-semibold leading-snug hover:text-primary/80 transition-colors">
                        {project?.title}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="text-base text-secondary leading-relaxed">
                      {project?.description}
                    </p>

                    {/* Highlights and Deployment */}
                    <div className="space-y-3 py-2">
                      {/* Highlights */}
                      {project?.highlights && project.highlights.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-[1px]">Key Features</p>
                          <ul className="space-y-1.5 text-base text-secondary leading-relaxed">
                            {project.highlights.map((highlight: string, hIndex: number) => (
                              <li key={hIndex} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/70 shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Deployment */}
                      {project?.deployment && project.deployment.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-[1px]">Deployment</p>
                          <ul className="space-y-1.5 text-base text-secondary leading-relaxed">
                            {project.deployment.map((item: string, dIndex: number) => (
                              <li key={dIndex} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/70 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 py-2">
                      {project?.roles?.map((tech: string, tIndex: number) => (
                        <span
                          key={`${tech}-${tIndex}`}
                          className="text-xs text-primary font-medium border border-primary/20 rounded-full px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-auto border-t border-primary/10">
                      {/* Visit Site - for Guidra */}
                      {index === 0 && (
                        <a
                          href="https://www.guidra.tech"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          Visit Site
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}

                      {/* Case Study */}
                      <Link
                        href={{
                          pathname: "/case-study",
                          query: {
                            title: project?.caseStudyTitle || project?.title,
                          },
                        }}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Case Study
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>

                      {/* GitHub - for Chronicle */}
                      {index === 1 && (
                        <a
                          href="https://github.com/mrtuxcoder/chronicle"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          GitHub
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Case Studies */}
          <div className="border-t border-primary/10">
            <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
              <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                <p className="text-sm tracking-[2px] text-primary uppercase font-medium">
                  Case Studies
                </p>
              </div>
            </div>

            <div className="border-t border-primary/10">
              <div className="max-w-5xl mx-auto px-4 py-8 sm:px-7 sm:py-10 lg:py-8">
                <div className="space-y-4">
                  <Link
                    href={{
                      pathname: "/case-study",
                      query: { title: "End-to-End Deployment of Guidra Backend on Azure VM" },
                    }}
                    className="group block border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          End-to-End Deployment of Guidra Backend on Azure VM
                        </h3>
                        <p className="text-xs text-base text-secondary flex-1 leading-relaxed">
                          Production deployment with Nginx, PM2, Azure VM, SSL, and security hardening
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <span className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
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
                    className="group block border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          Automated Linux Deployment of LANBox — a File Sharing Platform
                        </h3>

                        <p className="text-xs text-base text-secondary flex-1 leading-relaxed">
                          Docker-based LAN file sharing with Linux deployment, GHCR images,
                          firewall configuration, and automated installation
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <span className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
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
                    className="group block border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          From Code to Containers: Chronicle Homelab Deployment
                        </h3>
                        <p className="text-xs text-base text-secondary flex-1 leading-relaxed">
                          Containerization, CI/CD, Docker networking, Nginx, GHCR, Tailscale, Cloudflare and homelab deployment
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <span className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Other Projects */}
          <div className="border-t border-primary/10">
            <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
              <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                <p className="text-sm tracking-[2px] text-primary uppercase font-medium">
                  Other Projects
                </p>
              </div>
            </div>

            <div className="border-t border-primary/10">
              <div className="max-w-5xl mx-auto px-4 py-8 sm:px-7 sm:py-10 lg:py-8">
                <div className="space-y-4">
                  {additionalProjects.map((project) => (
                    <div
                      key={project.id}
                      className="group border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-3">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                              {project.title}
                            </h4>
                            <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-400">

                            </span>
                            <p className="text-xs text-secondary flex-1 leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2 sm:mt-0 sm:shrink-0">
                          <Link
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                          >
                            Repo →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-800">
                  <Link
                    href="https://github.com/mrtuxcoder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors inline-flex items-center"
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
        </div>
      </div>

    </section>
  );
};

export default FeaturedWork;
