import { NextResponse } from "next/server";

const featureWork = [
  {
        title: "Guidra - AI Learning Platform",
        description:
            "A structured AI-powered learning system designed to turn chaotic AI responses into guided, trackable learning.",
        roles: ["Node.js", "React", "MongoDB"],
        highlights: [
            "Implemented multi-model AI fallback system",
            "Designed caching system to optimize performance and reduce API usage",
            "Features Google OAuth, JWT auth, user progress tracking, quizzes",
            "Generates structured lessons, exercises, and mind maps"
        ],
        deployment: [
            "Backend hosted on Azure VM (Linux VPS)",
            "Dockerized for consistent deployment",
            "Configured with NGINX + PM2 + SSL"
        ],
        caseStudyTitle: "End-to-End Deployment of Guidra Backend on Azure VM",
        image: "/images/feature-work/feature-img-11.png"
    }
  
]

export const GET = async () => {
    return NextResponse.json({
        featureWork
    });
};