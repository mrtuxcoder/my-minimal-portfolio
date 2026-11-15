"use client";
import { useEffect, useState } from "react";
import { Activity, ChevronDown, ExternalLink } from "lucide-react";
import {
    fallbackRepositories,
    type RepositoryGroup,
} from "@/lib/github-prs";

interface TechnicalActivityItem {
    role: string;
    organization: string;
    bulletPoints?: string[];
    isGithubPrs?: boolean;
}

const activitiesMeta: TechnicalActivityItem[] = [
    {
        role: "Open Source Contributions",
        organization: "GitHub",
        isGithubPrs: true,
    },
    {
        role: "Student Coordinator – Debugging Competition",
        organization: "TECHIES 8.0",
        bulletPoints: [
            "Set up debugging programs across multiple lab systems",
            "Standardized file naming and folder structure for participants",
            "Assisted faculty during competition execution",
            "Guided participants on accessing and running programs",
            "Helped monitor lab environment and quiz evaluation",
        ],
    },
];

const TechnicalActivities = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [repositories, setRepositories] = useState<RepositoryGroup[]>(fallbackRepositories);

    useEffect(() => {
        let isMounted = true;
        fetch("/api/github-prs")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (isMounted && data?.repositories && Array.isArray(data.repositories)) {
                    setRepositories(data.repositories);
                }
            })
            .catch((err) => {
                console.warn("[github-prs] Failed to refresh live PRs, using fallback", err);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section>
            <div className="container">
                <div className="section-surface border-x border-primary/10">
                    <div className="flex flex-col max-w-3xl mx-auto py-10 sm:py-8 px-4 sm:px-7">
                        <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                            <p className="flex items-center gap-2 text-sm tracking-[2px] text-primary uppercase font-medium">
                                <Activity aria-hidden="true" className="h-4 w-4" />
                                <span>Technical Activity</span>
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-primary/10">
                        <div className="flex flex-col max-w-5xl mx-auto px-4 sm:px-7 py-9 md:py-10">
                            {activitiesMeta.map((item, index) => {
                                const isOpen = openIndex === index;
                                const accordionId = `technical-activity-panel-${index}`;

                                return (
                                    <div
                                        key={index}
                                        className="border-dashed border-b border-primary/10 last:border-b-0 py-7 sm:py-8 first:pt-0 last:pb-0"
                                    >
                                        <button
                                            type="button"
                                            className="group w-full text-left cursor-pointer"
                                            onClick={() => setOpenIndex(isOpen ? null : index)}
                                            aria-expanded={isOpen}
                                            aria-controls={accordionId}
                                        >
                                            <div className="flex items-start gap-3 sm:gap-4">
                                                <span className="hidden sm:block mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary/60" />
                                                <div className="min-w-0 flex-1">
                                                    <h5 className="text-base font-medium leading-snug text-primary sm:text-lg">
                                                        {item.role}
                                                    </h5>
                                                    {item.organization && (
                                                        <p className="mt-1 text-sm leading-snug text-secondary sm:text-base">
                                                            {item.organization}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="mt-0.5 shrink-0 rounded-md p-1 text-primary transition-colors group-hover:bg-primary/5">
                                                    <ChevronDown
                                                        className={`h-5 w-5 transition-transform ${
                                                            isOpen ? "rotate-180" : ""
                                                        }`}
                                                    />
                                                </span>
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div id={accordionId} className="pt-5 sm:pl-6">
                                                {item.bulletPoints && item.bulletPoints.length > 0 && (
                                                    <ul className="space-y-2.5">
                                                        {item.bulletPoints.map((point, pointIndex) => (
                                                            <li
                                                                key={pointIndex}
                                                                className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary sm:text-base"
                                                            >
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
                                                                />
                                                                <span>{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {item.isGithubPrs && (
                                                    <div className="space-y-5">
                                                        {repositories.map((repository) => (
                                                            <div key={repository.name} className="space-y-1.5">
                                                                <div className="flex items-center gap-2 text-sm text-primary">
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
                                                                    />
                                                                    <a
                                                                        href={repository.repoUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="font-medium hover:underline underline-offset-4"
                                                                    >
                                                                        {repository.name}
                                                                    </a>
                                                                    <span className="text-xs text-secondary/60">
                                                                        · {repository.pullRequests.length}{" "}
                                                                        {repository.pullRequests.length === 1 ? "PR" : "PRs"}
                                                                    </span>
                                                                </div>

                                                                <div className="space-y-1 pl-3.5 sm:pl-4">
                                                                    {repository.pullRequests.map((pullRequest) => (
                                                                        <a
                                                                            key={pullRequest.number}
                                                                            href={pullRequest.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            title={pullRequest.title}
                                                                            className="group flex items-baseline gap-2 py-0.5 text-xs sm:text-sm text-secondary hover:text-primary transition-colors max-w-full"
                                                                        >
                                                                            <span className="shrink-0 font-mono text-[11px] sm:text-xs text-primary/70 group-hover:text-primary">
                                                                                #{pullRequest.number}
                                                                            </span>
                                                                            <span className="truncate group-hover:underline underline-offset-2">
                                                                                {pullRequest.title}
                                                                            </span>
                                                                            <ExternalLink className="h-3 w-3 shrink-0 text-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechnicalActivities;
