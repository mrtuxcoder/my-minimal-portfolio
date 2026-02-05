import { NextResponse } from "next/server";

const featureWork = [
  {
    title: "Guidra",
    description: "Currently building an AI-powered learning platform focused on structured content generation, stability, and long-term academic use.",
    roles: ["Full Stack Developer", "Product Builder"],
    image: "/images/feature-work/feature-img-11.png"
}
  
]

export const GET = async () => {
    return NextResponse.json({
        featureWork
    });
};