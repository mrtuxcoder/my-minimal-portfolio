import { NextResponse } from "next/server";

const experienceData = [


    {
    "icon": "/images/icon/tailwind-icon.svg",
    "role": "Technical Instructor (Part-time)",
    "location": "Remote, India",
    "organization": "JADEL INFO TECH",
    "startYear": "Mar 2026",
    "endYear": "Apr 2026",
    "bulletPoints": [
        "Delivered online sessions covering web development and Python fundamentals.",
        "Taught technical concepts through structured lessons and hands-on exercises.",
        "Guided learners through mini-projects, debugging, and development workflows."
    ]
}



    ,{
    icon: "/images/icon/tailwind-icon.svg",
    role: "Freelance Web Developer",
    location: "Tamil Nadu, India",
    organization: "SAP CONSERV",
    startYear: "Feb 2026",
    endYear: "Feb 2026",
    bulletPoints: [
        "Developed and deployed a responsive business website aligned with client requirements.",
        "Handled hosting configuration, domain setup, and the production release.",
        "Improved performance and SEO-focused content structure while incorporating client feedback."
    ],
     websitelink: [
    "https://www.sapconserv.com/"]
},
 {
    icon: "/images/icon/tailwind-icon.svg",
    role: "Full Stack Development Intern",
    location: "Tamil Nadu, India",
    organization: "Dragon Media IT Solution",
    startYear: "May 2025",
    endYear: "Oct 2025",
    bulletPoints: [
        "Built and maintained full-stack features using the MERN stack and Spring Boot.",
        "Collaborated across frontend, backend, and deployment workflows.",
        "Worked with Git-based workflows, API integration, debugging, and performance improvements."
    ]
},
]

const educationData = [
      {
        date: "2025 - Present",
        title: "M.C.A., - Computer Applications",
        subtitle: "T.U.K college, Thanjavur, TamilNadu, India"
    },
    {
        date: "2022 - 2025",
        title: "B.C.A., - Computer Applications",
        subtitle: "Annai Vailankanni arts and science college, Thanjavur, TamilNadu, India",

    }
];


const projectOverview = {
    caseStudies: [
        { name: "Wellnest", url: "#" },
        { name: "ScoutHire", url: "#" },
    ],
    sideProjects: [
        { name: "Formless", url: "#" },
        { name: "Gridsnap", comingSoon: true },
        { name: "OrbitPay Mobile App", comingSoon: true },
        { name: "Siteflow Page Builder", comingSoon: true },
    ]
};


export const GET = async () => {
    return NextResponse.json({ experienceData, educationData, projectOverview }, {
        headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
        },
    });
};
