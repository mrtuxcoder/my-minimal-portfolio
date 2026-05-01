const AboutMe = () => {
    const skillGroups = [
        {
            heading: "Linux & Systems",
            items: [
                "Linux (Rocky/Ubuntu)",
                "User & group management",
                "File permissions",
                "systemd / services",
                "Networking basics",
                "Logs & troubleshooting",
                "RHCSA-Level Linux Administration",
                "Bash Scripting",
            ],
        },
        {
            heading: "DevOps & Infrastructure",
            items: [
                "Docker",
                "Nginx",
                "Reverse proxy",
                "SSL setup",
                "Application Deployment on Linux servers",
                "Azure VM",
                "Git & GitHub",
                "Basic CI/CD (GitHub Actions)"
            ],
        },
        {
            heading: "Backend & Programming",
            items: [
                "JavaScript (ES6+)",
                "Node.js",
                "Express",
                "REST APIs",
                "MongoDB / MySQL",
                "Mongoose",
                "JWT Authentication",
            ],
        },
    ];

    return (
        <section>
            <div className="container">
                <div className="border-x border-primary/10 bg-[url('/images/about-me/about-me-bg.svg')] bg-cover bg-center bg-no-repeat">
                    <div className="flex flex-col gap-8 max-w-5xl mx-auto px-4 sm:px-7 py-11 md:py-20">
                        <div className="flex flex-col gap-4">
                            <p className="text-sm tracking-[2px] text-primary uppercase font-medium">About Me</p>

                            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-snug">
                               Junior DevOps Engineer with hands-on experience in
                                <span className="bg-[linear-gradient(90deg,_rgba(168,85,247,0.4)_0%,_rgba(168,85,247,0.05)_100%)]">
                                    &nbsp;  Linux-based deployments and backend systems.
                                </span> Built and deployed production-ready applications using Docker, Nginx, and Azure VM, with focus on reliability, security, and performance.

                            </h2>

                            <h5 className="text-secondary font-normal text-base sm:text-lg">
                Actively preparing for RHCSA and continuing to build real-world systems.
                            </h5>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <p className="text-sm tracking-[2px] text-primary uppercase font-medium">Skills</p>

                            <div className="flex flex-col gap-4">
                                {skillGroups.map(group => (
                                    <div
                                        key={group.heading}
                                        className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white/70 p-4 dark:bg-gray-950/40 md:flex-row md:items-start"
                                    >
                                        <h3 className="shrink-0 text-sm font-semibold uppercase tracking-[1.5px] text-primary md:w-48">
                                            {group.heading}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base leading-6 text-foreground/80">
                                            {group.items.map((item, index) => (
                                                <span key={item} className="flex items-center gap-3">
                                                    <span>{item}</span>
                                                    {index !== group.items.length - 1 ? (
                                                        <span className="text-primary/40">•</span>
                                                    ) : null}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;