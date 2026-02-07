"use client";
import Image from "next/image"
import { useEffect, useState } from "react";
import { ExternalLink, GitPullRequest } from 'lucide-react';

const Experience = () => {
    const [experienceData, setExperienceData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/page-data')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setExperienceData(data?.experienceData)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <section>
            <div className="container">
                <div className="border-x border-primary/10">
                    <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
                        <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                            <p className="text-sm tracking-[2px] text-primary uppercase font-medium">Experience</p>
                        </div>
                    </div>
                    <div className="border-t border-primary/10">
                        <div className="flex flex-col max-w-3xl mx-auto px-4 sm:px-7 py-9 md:py-16 ">
                            {experienceData?.map((value: any, index: any) => {
                                const hasDuration = value?.startYear && value?.endYear;
                                
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-5 border-dashed border-b border-primary/10 last:border-b-0 pt-8 sm:pt-10 pb-8 sm:pb-10 first:pt-0 last:pb-0">
                                        <Image src={value?.icon} alt="icon" width={32} height={19} />
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-wrap gap-5 items-center justify-between">
                                                <h5>{value?.role}</h5>
                                                {hasDuration && (
                                                    <div className="flex items-center gap-2.5 border border-primary/10 rounded-lg py-1.5 px-3">
                                                        <div className={`w-4 h-2 rounded-sm ${value?.endYear == "Present" ? 'bg-primary' : 'bg-primary/10'} `} />
                                                        <p className="text-sm xs:text-base text-primary">
                                                            {value.startYear} – {value.endYear} 
                                                            {value?.location && ` · ${value?.location}`}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Organization display with blue color */}
                                            {value?.organization && (
                                                <div className="flex items-center">
                                                    <span className="text-violet-700 font-normal text-base">
                                                        {value.organization}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <ul className="space-y-2">
                                            {value?.bulletPoints?.map((point: any, pointIndex: any) => {
                                                return (
                                                    <li
                                                        key={pointIndex}
                                                        className="flex items-start gap-2 text-base font-normal text-secondary"
                                                    >
                                                        <span className="w-2.5 h-2.5 text-secondary">•</span>
                                                        {point}
                                                    </li>
                                                );
                                            })}
                                        </ul>

                                        {/* Links section - optional with icons */}
                                        {value?.links && value.links.length > 0 && (
                                            <div className="mt-4 flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <GitPullRequest className="w-4 h-4" />
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
                                                            <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    ))}
                                                </div>
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