"use client";
import { useState } from "react";
import { Activity, ChevronDown } from "lucide-react";

interface TechnicalActivityItem {
    role: string;
    organization: string;
    bulletPoints?: string[];
    repositories?: {
        name: string;
        pullRequests: {
            number: number;
            url: string;
        }[];
    }[];
}

const technicalActivitiesData: TechnicalActivityItem[] = [
    {
        role: "Open Source Contributions",
        organization: "GitHub",
        repositories: [
            {
                name: "Switch",
                pullRequests: [
                    { number: 1505, url: "https://github.com/sandbox-quantum/switch/pull/1505" },
                ],
            },
            {
                name: "zenmix",
                pullRequests: [
                    { number: 39, url: "https://github.com/se7engoodfellas/zenmix/pull/39" },
                    { number: 38, url: "https://github.com/se7engoodfellas/zenmix/pull/38" },
                    { number: 21, url: "https://github.com/se7engoodfellas/zenmix/pull/21" },
                ],
            },
            {
                name: "Study-Notion LMS",
                pullRequests: [
                    { number: 6, url: "https://github.com/BoddepallyVenkatesh06/Study-Notion-LMS/pull/6" },
                ],
            },
        ],
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
                            {technicalActivitiesData.map((item, index) => {
                                const isOpen = openIndex === index;
                                const accordionId = `technical-activity-panel-${index}`;

                                return (
                                    <div
                                        key={index}
                                        className="border-dashed border-b border-primary/10 last:border-b-0 py-7 sm:py-8 first:pt-0 last:pb-0"
                                    >
                                        <button
                                            type="button"
                                            className="group w-full text-left"
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

                                                {item.repositories && item.repositories.length > 0 && (
                                                    <div className="flex flex-col gap-2.5">
                                                        {item.repositories.map((repository) => (
                                                            <div
                                                                key={repository.name}
                                                                className="flex items-center justify-between gap-4 border-b border-primary/10 pb-2.5 last:border-b-0 last:pb-0"
                                                            >
                                                                <span className="text-sm font-medium text-secondary sm:text-base">
                                                                    {repository.name}
                                                                </span>
                                                                <div className="flex shrink-0 flex-wrap justify-end gap-2">
                                                                    {repository.pullRequests.map((pullRequest) => (
                                                                        <a
                                                                            key={pullRequest.number}
                                                                            href={pullRequest.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center rounded-full border border-primary/15 bg-transparent px-3 py-1 text-xs font-medium text-primary hover:bg-primary/5"
                                                                        >
                                                                            PR #{pullRequest.number}
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
