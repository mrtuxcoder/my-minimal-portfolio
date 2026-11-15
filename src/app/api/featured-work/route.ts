import { NextResponse } from "next/server";

const featureWork = [
    {
        title: "Guidra",
        description:
            "Production deployment across Multi-AZ private EC2 subnets behind an AWS Application Load Balancer with Docker, immutable CI/CD via GitHub Actions & SSM, and CloudWatch monitoring.",
        image: "/images/feature-work/guidra-cover.png",
        caseStudyUrl: "https://notes.guganraj.me/case-study/guidra-aws",
        liveUrl: "https://www.guidra.tech",
        technologies: ["AWS (ALB & EC2)", "Docker", "Nginx", "GitHub Actions", "MongoDB Atlas"],
    },
    {
        title: "Chronicle",
        description:
            "Self-hosted publishing platform containerized with Docker Compose, automated multi-arch image builds via GitHub Actions & GHCR, and reverse-proxied with Nginx.",
        image: "/images/feature-work/chronicle-cover.png",
        caseStudyUrl: "https://notes.guganraj.me/case-study/chronicle",
        repoUrl: "https://github.com/mrtuxcoder/chronicle",
        technologies: ["Docker Compose", "GitHub Actions", "Nginx", "Node.js", "MongoDB"],
    }
];

const additionalProjects = [
    {
        id: 1,
        title: "LANBox",
        description: "Self-hosted private LAN file-sharing infrastructure with automated Bash installer, containerized frontend & backend, and pre-built GHCR image distribution.",
        repoUrl: "https://github.com/mrtuxcoder/LANBox",
        caseStudyUrl: "https://notes.guganraj.me/case-study/lanbox",
        technologies: ["Docker Compose", "Linux", "Nginx", "GHCR", "Bash"],
    },
    {
        id: 2,
        title: "Linux Automation Toolkit",
        description: "Practical Bash automation scripts for Linux system administration, server health monitoring, cron scheduling, and environment maintenance.",
        repoUrl: "https://github.com/mrtuxcoder/my-scripts",
        technologies: ["Bash", "Linux", "Cron", "Systemd", "Shell Scripting"],
    },
];

export const GET = async () => {
    return NextResponse.json({ featureWork, additionalProjects }, {
        headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
        },
    });
};
