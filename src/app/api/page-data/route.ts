import { NextResponse } from "next/server";

const experienceData = [

    {
    icon: "/images/icon/tailwind-icon.svg",
    role: "Freelance Full Stack Developer",
    location: "Tamil Nadu, India",
    organization: "SAP CONSERV",
    startYear: "Feb 2026",
    endYear: "Feb 2026",
    bulletPoints: [
        "Designed and developed a production-ready responsive business website aligned with client requirements.",
        "Handled full deployment lifecycle including hosting configuration, domain setup, and production release",
        "Implemented performance optimizations and SEO-focused content structure to improve discoverability and scalability.",
        "Communicated directly with client to gather requirements, iterate on feedback, and deliver final product",
        "Successfully delivered live project and received first freelance payment as a student developer"
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
        "Worked with MERN stack and Spring Boot to build and maintain full-stack features",
        "Collaborated with developers across backend, frontend, and deployment workflows",
        "Contributed to real-world projects with focus on code quality, debugging, and performance improvements",
        "Gained hands-on experience with Git-based workflows and API integration"
    ]
},
{
    icon: "/images/icon/tailwind-icon.svg",
  role: "Open Source Contributor",
  organization: "zenmix (GitHub)",
  startYear: "",
  endYear: "Dec 2025",
  bulletPoints: [
    "Submitted multiple pull requests focused on UI improvements and theming",
    "Worked on light/dark mode behavior and visual consistency",
    "Collaborated with the maintainer through code reviews and feedback",
    "Had several contributions merged into the main codebase"
  ],
  links: [
    "https://github.com/se7engoodfellas/zenmix/pull/39",
    "https://github.com/se7engoodfellas/zenmix/pull/38",
    "https://github.com/se7engoodfellas/zenmix/pull/21"
  ]
}
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
    return NextResponse.json({
        experienceData,
        educationData,
        projectOverview
    });
};