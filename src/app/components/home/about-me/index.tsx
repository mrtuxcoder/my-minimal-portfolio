import {
    Cloud,
    GitBranch,
    Globe,
    Layers,
    Network,
    Package,
    ShieldCheck,
    Sparkles,
    Terminal,
    UserRound,
    Workflow,
    Wrench,
} from "lucide-react";
import {
    AzureIcon,
    DockerIcon,
    GitIcon,
    LinuxIcon,
    MongoDBIcon,
    NginxIcon,
    NodeJsIcon,
    ReactIcon,
} from "./tech-icons";

interface SkillItem {
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const mobileSkills: SkillItem[] = [
    { name: "Linux", icon: LinuxIcon },
    { name: "Bash", icon: Terminal },
    { name: "Networking", icon: Network },
    { name: "Docker", icon: DockerIcon },
    { name: "Compose", icon: Layers },
    { name: "Nginx", icon: NginxIcon },
    { name: "CI/CD", icon: GitBranch },
    { name: "GitHub Actions", icon: Workflow },
    { name: "AWS", icon: Cloud },
    { name: "Azure", icon: AzureIcon },
    { name: "Git", icon: GitIcon },
    { name: "MongoDB", icon: MongoDBIcon },
    { name: "MERN Stack", icon: ReactIcon },
];

const desktopSkills: SkillItem[] = [
    { name: "Linux", icon: LinuxIcon },
    { name: "Bash", icon: Terminal },
    { name: "Networking", icon: Network },
    { name: "Troubleshooting", icon: Wrench },
    { name: "Docker", icon: DockerIcon },
    { name: "Docker Compose", icon: Layers },
    { name: "Nginx", icon: NginxIcon },
    { name: "CI/CD", icon: GitBranch },
    { name: "GitHub Actions", icon: Workflow },
    { name: "AWS", icon: Cloud },
    { name: "Azure", icon: AzureIcon },
    { name: "ECR / GHCR", icon: Package },
    { name: "Git", icon: GitIcon },
    { name: "SSL / TLS", icon: ShieldCheck },
    { name: "Node.js", icon: NodeJsIcon },
    { name: "REST APIs", icon: Globe },
    { name: "MongoDB", icon: MongoDBIcon },
    { name: "MERN Stack", icon: ReactIcon },
];

const AboutMe = () => {
    return (
        <section>
            <div className="container">
                <div className="section-surface border-x border-primary/10 bg-[url('/images/about-me/about-me-bg.svg')] bg-cover bg-center bg-no-repeat">
                    <div className="flex flex-col gap-8 max-w-5xl mx-auto px-4 sm:px-7 py-8 sm:py-11 md:py-12">
                        <div className="flex flex-col gap-4">
                            <p className="flex items-center gap-2 text-sm tracking-[2px] text-primary uppercase font-medium">
                                <UserRound aria-hidden="true" className="h-4 w-4" />
                                <span>About Me</span>
                            </p>

                            <h2 className="text-base leading-relaxed sm:text-2xl sm:leading-snug">
                                Junior DevOps Engineer with hands-on experience in Linux-based deployments, containerized applications, and backend systems. Built and deployed production-ready applications using Docker, Nginx, GitHub Actions, and Azure VM with a focus on reliability, security, automation, and practical deployment workflows.
                            </h2>
                        </div>

                        <div className="flex flex-col gap-3 sm:gap-3.5">
                            <p className="flex items-center gap-2 text-sm tracking-[2px] text-primary uppercase font-medium">
                                <Sparkles aria-hidden="true" className="h-4 w-4" />
                                <span>Skills</span>
                            </p>

                            {/* Mobile-only compact collection (approx. 3-4 rows) */}
                            <div className="flex flex-wrap items-center gap-1.5 sm:hidden">
                                {mobileSkills.map((skill) => {
                                    const Icon = skill.icon;
                                    return (
                                        <span
                                            key={skill.name}
                                            className="inline-flex min-h-[26px] items-center gap-1.5 rounded-full border border-primary/10 bg-primary/[0.03] px-2.5 py-1 text-xs font-medium text-foreground/90 transition-colors hover:bg-primary/[0.06] hover:border-primary/20 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                                        >
                                            <Icon
                                                aria-hidden="true"
                                                className="h-3 w-3 shrink-0 text-primary/80"
                                            />
                                            <span>{skill.name}</span>
                                        </span>
                                    );
                                })}
                            </div>

                            {/* Desktop collection */}
                            <div className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-2.5">
                                {desktopSkills.map((skill) => {
                                    const Icon = skill.icon;
                                    return (
                                        <span
                                            key={skill.name}
                                            className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full border border-primary/10 bg-primary/[0.03] px-3 py-1 text-xs font-medium text-foreground/90 transition-colors hover:bg-primary/[0.06] hover:border-primary/20 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] sm:min-h-[32px] sm:px-3.5 sm:py-1.5 sm:text-sm sm:gap-2"
                                        >
                                            <Icon
                                                aria-hidden="true"
                                                className="h-3.5 w-3.5 shrink-0 text-primary/80 sm:h-4 sm:w-4"
                                            />
                                            <span>{skill.name}</span>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;