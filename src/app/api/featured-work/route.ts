import { NextResponse } from "next/server";

const featureWork = [
    {
        title: "Guidra",
        description:
            "An AI-powered learning platform that turns topics into structured learning paths. Features multi-model AI generation, progress tracking, and recall workflows.",
        roles: [
            "React",
            "Material UI",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Docker",
            "Azure VM"
        ],
        highlights: [
            "Structured learning pipeline with lessons, examples, practice, quizzes, and mind maps",
            "Multi-model AI generation using Gemini, Groq LLaMA, and HuggingFace",
            "Content caching, version access, and controlled regeneration for consistent learning",
            "Progress tracking, Recall Mode, custom topics, and study-focused workflows"
        ],
        deployment: [
            "Dockerized backend deployed on an Azure Linux VM",
            "Nginx reverse proxy configured with SSL",
            "PM2 process management for production backend",
            "Frontend deployed through Vercel"
        ],
        caseStudyTitle: "End-to-End Deployment of Guidra Backend on Azure VM",
        image: "/images/feature-work/guidra-cover.png"
    },
    {
        title: "Chronicle",
        description:
            "A self-hosted publishing platform built with Docker Compose. Automates image publishing and deployment with GitHub Actions, GHCR, and private networking.",
        roles: [
            "React",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Docker",
            "GitHub Actions",
            "Cloudflare Tunnel"
        ],
        highlights: [
            "Full-stack publishing platform with admin publishing and public reading",
            "Containerized React, Node.js, and MongoDB using Docker Compose",
            "Automated Docker image builds and deployment through GitHub Actions and GHCR",
            "Publicly exposed through Cloudflare Tunnel from a self-hosted Linux homelab"
        ],
        deployment: [
            "Dockerized services deployed on a Linux homelab",
            "Nginx reverse proxy with internal Docker networking",
            "Tailscale used for private server access and deployment",
            "Cloudflare Tunnel with cloudflared provides public HTTPS access"
        ],
        caseStudyTitle: "From Code to Containers: Chronicle Homelab Deployment",
        image: "/images/feature-work/chronicle-cover.png"
    }
];

const additionalProjects = [
    {
        id: 1,
        title: "LANBox",
        description: "A self-hosted private cloud for your local network.",
        repoUrl: "https://github.com/mrtuxcoder/LANBox",
    },
    {
        id: 2,
        title: "Linux Automation Toolkit",
        description: "Practical Bash automation scripts for system administration, monitoring workflows.",
        repoUrl: "https://github.com/mrtuxcoder/my-scripts",
    },
];

export const GET = async () => {
    return NextResponse.json({ featureWork, additionalProjects }, {
        headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
        },
    });
};
