"use client";
import { useState } from "react";

const DevOps = () => {

    return (
        <section>
            <div className="container">
                <div className="border-x border-primary/10 bg-[url('/images/about-me/about-me-bg.svg')] bg-cover bg-center bg-no-repeat">
                
                    <div className="flex flex-col gap-8 max-w-5xl mx-auto px-4 sm:px-7 py-11 md:py-20">
                        <div className="flex flex-col gap-4">
                            <p className="text-sm tracking-[2px] text-primary uppercase font-medium">Cloud & Infrastructure</p>

                            <div className="flex items-center">
                                <span className="text-violet-700 font-normal text-base">
                                    Azure VM – Infrastructure Setup
                                </span>
                            </div>
                             <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                Provisioned and configured a Linux VM on Microsoft Azure using SSH key authentication and custom networking settings. Set up secure remote access and prepared the environment for backend deployment and cloud-based testing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DevOps;