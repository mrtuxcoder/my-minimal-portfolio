import { NextResponse } from "next/server";

const featureWork = [
    {
        title: "Guidra - Structured AI Learning Platform",
        description:
            "An AI-powered learning platform that turns any topic into a structured, step-by-step learning path with persistent progress, recall workflows, and cached AI-generated content.",
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
    title: "Chronicle - Homelab Publishing Platform",
    description:
        "A full-stack publishing platform with public reading and admin-only publishing, evolved into a practical homelab project for learning Docker, CI/CD, networking, and self-hosted deployment.",
    roles: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Docker",
        "GitHub Actions",
        "Nginx",
        "Tailscale"
    ],
    highlights: [
        "Built a full-stack publishing platform with admin-only article management and public reading",
        "Containerized React, Node.js, and MongoDB using Docker Compose",
        "Configured Nginx reverse proxy with Docker service networking and internal DNS",
        "Tested container recovery and server reboot persistence on a Linux homelab"
    ],
    deployment: [
        "Docker images built and published to GitHub Container Registry",
        "Automated deployment to a self-hosted Linux homelab server",
        "Private server access through Tailscale"
    ],
    caseStudyTitle: "From Code to Containers: Chronicle Homelab Deployment",
    image: "/images/feature-work/chronicle-cover.png"
}
];
export const GET = async () => {
    return NextResponse.json({
        featureWork
    });
};