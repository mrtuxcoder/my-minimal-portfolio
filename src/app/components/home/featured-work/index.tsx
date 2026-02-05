"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FeaturedWork = () => {
  const [featureWork, setFeatureWork] = useState<any>(null);
  const [additionalProjects, setAdditionalProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/featured-work");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFeatureWork(data?.featureWork);
        
        const extraProjects = [
          {
            id: 1,
            title: "easyList",
            description: "Minimalist MEN stack todo app with authentication",
            repoUrl: "https://github.com/mrtuxcoder/easyList",
            liveUrl: "https://easylist-minm.onrender.com"
          },
          {
            id: 2,
            title: "EventHub",
            description: "Event booking system with admin CRUD operations",
            repoUrl: "https://github.com/mrtuxcoder/event-booking-management",
            liveUrl: "https://george1518.github.io/event-booking-management/"
          },
        ];
        setAdditionalProjects(extraProjects);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="border-x border-primary/10">
          {/* Header */}
          <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
            <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
              <p className="text-sm tracking-[2px] text-primary uppercase font-medium">
                Featured work
              </p>
            </div>
          </div>

          {/* Main Featured Projects */}
          <div className="border-t border-primary/10">
            {featureWork?.map((value: any, index: number) => (
              <div
                key={index}
                className="group flex flex-col lg:flex-row gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8"
              >
                {/* Image container */}
                <div className="lg:w-[58%] overflow-hidden">
                  <Link href={"/"}>
                    <Image
                      src={
                        value?.image || "/images/feature-work/feature-img-11.png"
                      }
                      alt={value?.title || "Featured work image"}
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
                    />
                  </Link>
                </div>

                {/* Text content */}
                <div className="lg:w-[42%] flex flex-col justify-center gap-4 sm:gap-5 lg:pl-8">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <Link href={"/"}>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                        {value?.title || "Guidra"}
                      </h3>
                    </Link>

                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value?.description ||
                        "Developed a modern brand identity and a responsive web experience tailored for a professional cleaning company, focused on clarity and usability."}
                    </p>

                    <div className="mt-2">
                      <p className="text-sm sm:text-base text-primary font-medium">
                        {value?.roles?.join(", ") || "UX Designer, Framer Designer"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <Link href={"https://guidra.guganraj.site/"}>
                      <span className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        Live here
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Additional Projects Section */}
          <div className="border-t border-primary/10 py-8 sm:py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-7">
              <h3 className="text-base font-medium text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wider">
                Other Projects
              </h3>
              
              <div className="space-y-4">
                {additionalProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">
                            {project.title}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            •
                          </span>
                          <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                            {project.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <Link
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                        >
                          Repo →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Optional minimal footer */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <Link
                  href="https://github.com/mrtuxcoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors inline-flex items-center"
                >
                  View all on GitHub
                  <svg
                    className="ml-2 w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;