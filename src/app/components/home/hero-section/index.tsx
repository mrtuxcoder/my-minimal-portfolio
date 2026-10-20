"use client";

import { useState } from "react";
import Image from "next/image"
import Link from "next/link";
import { BriefcaseBusiness, Download, MapPin } from "lucide-react";

const bannerSrc = "/images/hero-sec/banner.png";

const BannerMedia = ({
    alt,
    className,
    priority,
}: {
    alt: string;
    className: string;
    priority?: boolean;
}) => {
    return (
        <img
            src={bannerSrc}
            alt={alt}
            className={`absolute inset-0 h-full w-full ${className}`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            style={{ pointerEvents: "none" }}
        />
    );
};

const HeroSection = () => {
    const [activeHover, setActiveHover] = useState<string | null>(null);

    const isFinePointer = () => {
        if (typeof window === "undefined") return false;
        return (
            window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
            window.matchMedia("(min-width: 640px)").matches
        );
    };

    const socialProfiles = [
        {
            name: "X",
            label: "Visit X Profile",
            img: "/images/icon/twitter-icon.svg",
            href: "https://x.com/mrtuxcoder"
        },
        {
            name: "GitHub",
            label: "Visit GitHub Profile",
            img: "/images/icon/github-icon.svg",
            href: "https://github.com/mrtuxcoder"
        },
        {
            name: "LinkedIn",
            label: "Visit LinkedIn Profile",
            img: "/images/icon/linkedin-icon.svg",
            href: "https://www.linkedin.com/in/guganraj-rengaraju/"
        },
    ];
    return (
        <section>
            <div className="container">
                <div className="">
                    <div className="relative w-full h-48 sm:h-72 overflow-hidden">
                        <BannerMedia alt="banner-img mobile" priority className="object-cover xs:hidden" />
                        <BannerMedia alt="banner-img desktop" priority className="hidden object-cover xs:block" />
                    </div>
                    <div className="section-surface border-x border-primary/10">
                        <div className="relative max-w-5xl mx-auto px-4 sm:px-7 pt-14 pb-5 sm:pt-24 sm:pb-12">
                            <div className="absolute left-4 sm:left-7 top-0 -translate-y-1/2">
                                <Image
                                    src="/images/hero-sec/guganraj-rengaraju.jpeg"
                                    alt="Guganraj Rengaraju"
                                    width={145}
                                    height={145}
                                    className="h-20 w-20 rounded-[22%] border-4 border-white object-cover sm:h-[145px] sm:w-[145px]"
                                />
                            </div>

                            <div className="flex flex-col gap-1 text-left sm:gap-2">
                                <h1 className="text-xl font-semibold leading-tight text-primary sm:text-3xl">Guganraj Rengaraju</h1>
                                <p className="flex items-center gap-1.5 text-sm font-medium text-primary/85 sm:text-base">
                                    <BriefcaseBusiness aria-hidden="true" className="h-4 w-4 shrink-0 text-primary/70" />
                                    <span>Junior DevOps Engineer</span>
                                </p>
                                <p className="flex items-center gap-2 text-sm text-secondary sm:text-base">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                                    <span>Open to opportunities</span>
                                </p>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
                                <div
                                    role="group"
                                    aria-label="Social profiles"
                                    className="inline-flex h-8 items-center rounded-md border border-primary/10 bg-transparent text-primary overflow-hidden transition-all duration-200 ease-out sm:h-9 motion-reduce:transition-none"
                                    onPointerLeave={(e) => {
                                        if (e.pointerType !== "touch") {
                                            setActiveHover(null);
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (!e.currentTarget.contains(e.relatedTarget)) {
                                            setActiveHover(null);
                                        }
                                    }}
                                >
                                    {socialProfiles.map((item) => {
                                        const isHovered = activeHover === item.name;
                                        const isOtherHovered = activeHover !== null && !isHovered;

                                        return (
                                            <Link
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                key={item.name}
                                                aria-label={item.label}
                                                onPointerEnter={(e) => {
                                                    if (e.pointerType !== "touch" && isFinePointer()) {
                                                        setActiveHover(item.name);
                                                    }
                                                }}
                                                onFocus={() => {
                                                    if (isFinePointer()) {
                                                        setActiveHover(item.name);
                                                    }
                                                }}
                                                className={`social-pill-link min-w-0 inline-flex h-full items-center justify-center text-xs font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 sm:text-sm transition-all duration-200 ease-out motion-reduce:transition-none ${
                                                    isOtherHovered
                                                        ? "max-w-0 opacity-0 overflow-hidden px-0 pointer-events-none"
                                                        : isHovered
                                                        ? "max-w-[260px] opacity-100 px-3"
                                                        : "max-w-[50px] opacity-100 px-2 sm:px-2.5"
                                                }`}
                                            >
                                                <span className="relative block h-4 w-4 shrink-0">
                                                    <Image src={item.img} alt="" fill sizes="16px" className="object-contain" />
                                                </span>
                                                <span
                                                    className={`social-pill-label min-w-0 overflow-hidden whitespace-nowrap transition-all duration-200 ease-out motion-reduce:transition-none ${
                                                        isHovered ? "max-w-[200px] opacity-100 ml-1.5" : "max-w-0 opacity-0 ml-0"
                                                    }`}
                                                >
                                                    {item.label}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </div>
                                <a
                                    href="/docs/guganraj-rengaraju-resume.pdf"
                                    download="Guganraj-Resume.pdf"
                                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 sm:h-9 sm:px-3 sm:text-sm"
                                >
                                    <Download aria-hidden="true" size={16} strokeWidth={2} />
                                    <span>Resume</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
