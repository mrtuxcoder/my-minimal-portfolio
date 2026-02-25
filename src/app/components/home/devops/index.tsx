"use client";
import Link from "next/link";

const DevOps = () => {

    return (
        <section>
            <div className="container">
                <div className="border-x border-primary/10 bg-[url('/images/about-me/about-me-bg.svg')] bg-cover bg-center bg-no-repeat">
                    <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
                        <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                            <p className="text-sm tracking-[2px] text-primary uppercase font-medium">Case Study</p>
                        </div>
                    </div>

                    <div className="border-t border-primary/10">
                        <div className="flex flex-col max-w-3xl mx-auto px-4 sm:px-7 py-9 md:py-16">
                            <ul className="flex flex-col gap-2.5">
                                <li>
                                    <Link
                                        href={{
                                            pathname: "/case-study",
                                            query: {
                                                title: "End-to-End Deployment of Guidra Backend on Azure VM",
                                            },
                                        }}
                                        className="group inline-flex items-center gap-2"
                                    >
                                        <span className="text-violet-700 font-normal text-base">
                                            End-to-End Deployment of Guidra Backend on Azure VM
                                        </span>
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DevOps;