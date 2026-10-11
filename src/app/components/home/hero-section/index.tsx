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
    const socialIcon = [
        {
            img: "/images/icon/twitter-icon.svg",
            href: "https://x.com/mrtuxcoder" ,
            icon: ""
        },
        {
            img: "/images/icon/github-icon.svg",
            href: "https://github.com/mrtuxcoder",
            icon: "GitHub"
        },
        {
            img: "/images/icon/linkedin-icon.svg",
            href: "https://www.linkedin.com/in/guganraj-rengaraju/",
            icon: "LinkedIn"
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
                                <Image src={"/images/hero-sec/guganraj-rengaraju.png"} alt="Guganraj Rengaraju" width={145} height={145} className="h-20 w-20 border-4 border-white rounded-full sm:h-[145px] sm:w-[145px]" />
                                <span className="absolute bottom-1 right-1.5 w-3 h-3 bg-primary/60 border-2 border-white rounded-full sm:bottom-2.5 sm:right-5 sm:h-4 sm:w-4" />
                            </div>

                            <div className="flex min-h-20 flex-col items-start justify-between gap-4 pl-0 sm:min-h-0 sm:flex-row sm:items-center sm:gap-8">
                                <div className="flex flex-col gap-1 text-left sm:gap-2">
                                    <h1 className="text-xl leading-tight sm:text-3xl">Guganraj Rengaraju</h1>
                                    <p className="flex items-center gap-1.5 text-sm text-primary/70 font-normal sm:text-base">
                                        <BriefcaseBusiness aria-hidden="true" className="h-4 w-4 shrink-0" />
                                        <span>Junior DevOps Engineer</span>
                                    </p>
                                    <p className="flex items-center gap-1.5 text-sm text-secondary sm:text-base">
                                        <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                                        <span>Thanjavur, Tamil Nadu, India</span>
                                    </p>
                                </div>

                                <div className="relative z-10 flex w-full max-w-full flex-nowrap items-center justify-between gap-2 sm:w-auto sm:max-w-xs sm:flex-col sm:items-end sm:gap-2">
                                    <span className="hero-badge hero-badge-linux">
                                        Linux Enthusiast
                                    </span>
                                    <span className="hero-badge hero-badge-hosted">
                                        Self-Hosted
                                    </span>
                                    <span className="hero-badge hero-badge-open">
                                        Open to Opportunities
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-start gap-2 sm:mt-6 sm:gap-3">
                                <div className="flex flex-wrap items-center justify-start gap-2">
                                    {socialIcon?.map((value) => {
                                        return (
                                            <Link
                                                href={value?.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                key={value.icon}
                                                className="inline-flex items-center gap-1.5 rounded-md border border-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 sm:px-3 sm:text-sm"
                                            >
                                                <span className="relative block h-4 w-4 shrink-0">
                                                    <Image src={value?.img} alt="" fill sizes="16px" className="object-contain" />
                                                </span>
                                                <span>{value.icon}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                                <Link
                                    href="/docs/Guganraj-Resume.pdf"
                                    download="Guganraj-Resume.pdf"
                                    className="inline-flex items-center gap-1.5 rounded-md border border-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 sm:px-3 sm:text-sm"
                                >
                                    <Download aria-hidden="true" size={16} strokeWidth={2} />
                                    <span>Resume</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection

