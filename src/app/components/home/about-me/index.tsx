"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const AboutMe = () => {
    const servicesBadge = [
        "Linux Fundamentals",
        "RHCSA-Level Linux Administration",
        "Bash Scripting (Basics)",
        "System Commands & Troubleshooting",
        "JavaScript (Core Concepts)",
        "Node.js & Express",
        "REST API Design",
        "JWT Authentication (Basics)",
        "MongoDB & Mongoose",
        "API Testing with Postman",
        "Git & GitHub",
        "Problem Solving & Debugging"
    ];

    const [pausedRows, setPausedRows] = useState<number[]>([]);
    
    // Split into two rows
    const row1 = servicesBadge.slice(0, Math.ceil(servicesBadge.length / 2));
    const row2 = servicesBadge.slice(Math.ceil(servicesBadge.length / 2));

    const toggleRowPause = (rowNumber: number) => {
        setPausedRows(prev => 
            prev.includes(rowNumber) 
                ? prev.filter(r => r !== rowNumber)
                : [...prev, rowNumber]
        );
    };

    return (
        <section>
            <div className="container">
                <div className="border-x border-primary/10 bg-[url('/images/about-me/about-me-bg.svg')] bg-cover bg-center bg-no-repeat">
                    <div className="flex flex-col gap-8 max-w-5xl mx-auto px-4 sm:px-7 py-11 md:py-20">
                        <div className="flex flex-col gap-4">
                            <p className="text-sm tracking-[2px] text-primary uppercase font-medium">About Me</p>

                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] leading-relaxed">
                                Hey, I'm Guganraj - an MCA student focused on
                                <span className="bg-[linear-gradient(90deg,_rgba(243,202,77,0.4)_0%,_rgba(243,202,77,0.05)_100%)]">
                                    &nbsp; Linux systems and backend development
                                </span>, building reliable tools and learning how systems work under the hood.
                            </h2>

                            <h5 className="text-secondary font-normal text-lg">
                                Preparing for RHCSA and building Guidra as a long-term project.
                            </h5>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <p className="text-sm text-primary uppercase font-medium">Skills</p>
                            
                            {/* Row 1 - Left to Right */}
                            <div 
                                className="overflow-hidden py-2 rounded-xl cursor-pointer"
                                onClick={() => toggleRowPause(1)}
                            >
                                <div className={`flex gap-3 ${pausedRows.includes(1) ? '' : 'animate-marquee-left'}`}>
                                    {/* Double the content for seamless loop */}
                                    {[...row1, ...row1].map((value, index) => (
                                        <Badge 
                                            key={`row1-${index}`}
                                            variant="outline"
                                            className="py-2 px-4 rounded-lg shrink-0 border-primary/20 bg-white dark:bg-gray-900 hover:scale-105 transition-transform duration-200"
                                        >
                                            <p className="text-sm font-medium text-primary whitespace-nowrap">
                                                {value}
                                            </p>
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Row 2 - Right to Left */}
                            <div 
                                className="overflow-hidden py-2 rounded-xl cursor-pointer"
                                onClick={() => toggleRowPause(2)}
                            >
                                <div className={`flex gap-3 ${pausedRows.includes(2) ? '' : 'animate-marquee-right'}`}>
                                    {/* Double the content for seamless loop */}
                                    {[...row2, ...row2].map((value, index) => (
                                        <Badge 
                                            key={`row2-${index}`}
                                            variant="outline"
                                            className="py-2 px-4 rounded-lg shrink-0 border-primary/20 bg-white dark:bg-gray-900 hover:scale-105 transition-transform duration-200"
                                        >
                                            <p className="text-sm font-medium text-primary whitespace-nowrap">
                                                {value}
                                            </p>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;