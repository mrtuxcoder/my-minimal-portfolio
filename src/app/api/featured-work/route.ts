import { NextResponse } from "next/server";

const featureWork = [
    {
        title: "Guidra",
        description:
            "An AI-powered learning platform that turns topics into structured learning paths. Features multi-model AI generation, progress tracking, and recall workflows.",
        image: "/images/feature-work/guidra-cover.png",
        caseStudyUrl: "https://notes.guganraj.me/case-study/guidra-aws"
    },
    {
        title: "Chronicle",
        description:
            "A self-hosted publishing platform built with Docker Compose. Automates image publishing and deployment with GitHub Actions, GHCR, and private networking.",
        image: "/images/feature-work/chronicle-cover.png",
        caseStudyUrl: "https://notes.guganraj.me/case-study/chronicle"
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
