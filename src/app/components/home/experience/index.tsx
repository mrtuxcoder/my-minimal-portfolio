"use client";
import { useEffect, useState } from "react";
import { BriefcaseBusiness, ChevronDown } from 'lucide-react';

const Experience = () => {
    const [experienceData, setExperienceData] = useState<any>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/page-data', { cache: 'no-store' })
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setExperienceData(data?.experienceData)
            } catch {}
        }

        fetchData()
    }, [])

    return (
        <section>
            <div className="container">
                <div className="section-surface border-x border-primary/10">
                    <div className="flex flex-col max-w-3xl mx-auto py-10 sm:py-8 px-4 sm:px-7">
                        <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                            <p className="flex items-center gap-2 text-sm tracking-[2px] text-primary uppercase font-medium">
                                <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />
                                <span>Experience</span>
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-primary/10">
                        <div className="flex flex-col max-w-5xl mx-auto px-4 sm:px-7 py-9 md:py-10">
                            {experienceData?.map((value: any, index: any) => {
                                const hasDuration = value?.startYear && value?.endYear;
                                const isOpen = openIndex === index;
                                const accordionId = `experience-panel-${index}`;

                                return (
                                    <div
                                        key={index}
                                        className="border-dashed border-b border-primary/10 last:border-b-0 py-7 sm:py-8 first:pt-0 last:pb-0">
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
                                                    <h5 className="text-base font-medium leading-snug text-primary sm:text-lg">{value?.role}</h5>
                                                    {value?.organization && (
                                                        <p className="mt-1 text-sm leading-snug text-secondary sm:text-base">{value.organization}</p>
                                                    )}
                                                    {hasDuration && (
                                                        <p className="mt-1 text-sm leading-snug text-secondary">
                                                            {value.startYear} – {value.endYear}
                                                            {value?.location && ` · ${value?.location}`}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="mt-0.5 shrink-0 rounded-md p-1 text-primary transition-colors group-hover:bg-primary/5">
                                                    <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                                </span>
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div id={accordionId} className="pt-5 sm:pl-6">
                                                <ul className="space-y-2.5">
                                                    {value?.bulletPoints?.map((point: any, pointIndex: any) => {
                                                        return (
                                                            <li
                                                                key={pointIndex}
                                                                className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary sm:text-base"
                                                            >
                                                                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                                                                <span>{point}</span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>

                                                {/* Links section - optional with icons */}
                                                {value?.websitelink && value.websitelink.length > 0 && (
                                                    <div className="mt-4 flex flex-col gap-2">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                                                            <span className="font-medium">Website:</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-3">
                                                            {value.websitelink.map((link: string, linkIndex: number) => (
                                                                <a
                                                                    key={linkIndex}
                                                                    href={link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-transparent px-3 py-1 text-xs font-medium text-primary hover:bg-primary/5"
                                                                >
                                                                    <span>Visit site</span>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {value?.links && value.links.length > 0 && (
                                                    <div className="mt-4 flex flex-col gap-2">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                                                            <span className="font-medium">Pull Requests:</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-3">
                                                            {value.links.map((link: string, linkIndex: number) => (
                                                                <a
                                                                    key={linkIndex}
                                                                    href={link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors px-3 py-1.5 bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/10"
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
    )
}

export default Experience
