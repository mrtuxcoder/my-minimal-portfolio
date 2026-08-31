import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
            icon: "X"
        },
        {
            img: "/images/icon/github-icon.svg",
            href: "https://github.com/mrtuxcoder",
            icon: "Behance"
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
                    <div className="relative w-full h-56 sm:h-72 overflow-hidden">
                        <BannerMedia alt="banner-img mobile" priority className="object-cover xs:hidden" />
                        <BannerMedia alt="banner-img desktop" priority className="hidden object-cover xs:block" />
                    </div>
                    <div className="border-x border-primary/10">
                        <div className="relative flex flex-col xs:flex-row items-center xs:items-start justify-center xs:justify-between max-w-3xl mx-auto gap-10 xs:gap-3 px-4 sm:px-7 pt-22 pb-8 sm:pb-12">
                            <div className="absolute top-0 transform -translate-y-1/2">
                                <Image src={"/images/hero-sec/profile.png"} alt="user-img" width={145} height={145} className="border-4 border-white rounded-full" />
                                <span className="absolute bottom-2.5 right-5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                            </div>
                            <div className="flex flex-col gap-2 sm:gap-3 items-center text-center xs:items-start">
                                <h1 className="pt-2 text text-3xl">Guganraj Rengaraju</h1>
                                <p className="text-violet-700 font-normal">Junior DevOps Engineer</p>
                                <div className="flex items-center gap-2">
                                    <Image src={"/images/icon/map-icon.svg"} alt="map-icon" width={20} height={20} />
                                    <p className="text-primary">Tamil Nadu, India</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="flex items-center gap-2">
                                    {socialIcon?.map((value, index) => {
                                        return (
                                            <Link
                                                href={value?.href}
                                                target="_blank"
                                                key={index}
                                                className={`social-icon-spin w-fit p-2.5 sm:p-3.5 hover:bg-primary/5 border border-primary/10 rounded-full ${index === 0 ? 'social-icon-glitter-purple' : index === 1 ? 'social-icon-glitter-sky' : index === 2 ? 'social-icon-glitter-pink' : ''}`}
                                                style={{ animationDelay: `${index * 140}ms` }}
                                            >
                                                <Image src={value?.img} alt={value?.icon} width={18} height={18} className="w-[18px] h-[18px]" />
                                            </Link>
                                        )
                                    })}
                                </div>
                                <Button asChild className="h-auto rounded-full p-0.5!">
                                    <Link
                                        href="https://t.me/mrtuxcoder"
                                        className="inline-block p-0.5 rounded-full bg-[linear-gradient(96.09deg,_#9282F8_12.17%,_#F3CA4D_90.71%)]"
                                    >
                                        <span className="flex items-center gap-3 bg-primary hover:bg-[linear-gradient(96.09deg,_#9282F8_12.17%,_#F3CA4D_90.71%)] py-2.5 px-5 rounded-full">
                                            <Image
                                                src="/images/icon/spark-icon.svg"
                                                alt="spark-icon"
                                                width={14}
                                                height={14}
                                                className="w-[14px] h-[14px]"
                                            />
                                            <span className="text-sm sm:text-base font-semibold text-white">Get in touch</span>
                                        </span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection

