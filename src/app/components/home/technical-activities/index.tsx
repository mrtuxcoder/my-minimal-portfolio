"use client";
import { useState } from "react";
import { Activity, ChevronDown } from "lucide-react";

interface TechnicalActivityItem {
    role: string;
    organization: string;
    bulletPoints: string[];
    links?: string[];
}

const technicalActivitiesData: TechnicalActivityItem[] = [
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
    {
        role: "Open Source Contribution",
        organization: "zenmix (GitHub)",
        bulletPoints: [
            "Submitted multiple pull requests focused on UI improvements and theming",
            "Worked on light/dark mode behavior and visual consistency",
            "Collaborated with the maintainer through code reviews and feedback",
            "Had several contributions merged into the main codebase",
        ],
        links: [
            "https://github.com/se7engoodfellas/zenmix/pull/39",
            "https://github.com/se7engoodfellas/zenmix/pull/38",
            "https://github.com/se7engoodfellas/zenmix/pull/21",
        ],
    },
    {
        role: "Open Source Contribution",
        organization: "Study-Notion LMS (GitHub)",
        bulletPoints: [
            "Identified and fixed documentation issues in an open-source LMS project",
            "Created and submitted a pull request that was successfully merged",
            "Gained hands-on experience with GitHub workflows (forking, branching, PR)",
        ],
        links: [
            "https://github.com/BoddepallyVenkatesh06/Study-Notion-LMS/pull/6",
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

                                                {item.links && item.links.length > 0 && (
                                                    <div className="mt-4 flex flex-col gap-2">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                                                            <span className="font-medium">Pull Requests:</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-3">
                                                            {item.links.map((link, linkIndex) => (
                                                                <a
                                                                    key={linkIndex}
                                                                    href={link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-transparent px-3 py-1 text-xs font-medium text-primary hover:bg-primary/5"
                                                                >
                                                                    <span>PR #{linkIndex + 1}</span>
                                                                </a>
                                                            ))}
                                                        </div>
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
