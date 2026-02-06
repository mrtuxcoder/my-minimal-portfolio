"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FeaturedWork = () => {
  const [featureWork, setFeatureWork] = useState<any>(null);
  const [additionalProjects, setAdditionalProjects] = useState<any[]>([]);
  const [scriptsVisible, setScriptsVisible] = useState(false);

  const scripts = [
    {
      id: 1,
      name: "User Monitor",
      description: "Track logins, accounts & security",
      repoUrl:
        "https://github.com/mrtuxcoder/my-scripts/blob/main/user_monitor.sh",
      icon: "👤",
    },
  ];

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
            liveUrl: "https://easylist-minm.onrender.com",
          },
          {
            id: 2,
            title: "EventHub",
            description: "Event booking system with admin CRUD operations",
            repoUrl: "https://github.com/mrtuxcoder/event-booking-management",
            liveUrl: "https://george1518.github.io/event-booking-management/",
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
                className={`group flex flex-col lg:flex-row gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="lg:w-[58%] overflow-hidden">
                  <Link href={"/"}>
                    <Image
                      src={
                        value?.image ||
                        "/images/feature-work/feature-img-11.png"
                      }
                      alt={value?.title || "Featured work image"}
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
                    />
                  </Link>
                </div>

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
                        {value?.roles?.join(", ") ||
                          "UX Designer, Framer Designer"}
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

          {/* Scripts Section - Right Side Rectangle Grid */}
          <div className="border-t border-primary/10 py-6 sm:py-8 lg:py-12">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              {/* Left Content - Consistent sizing */}
              <div className="lg:w-[40%] flex flex-col">
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-snug lg:leading-tight">
                    Linux Automation Toolkit
                  </h3>

                  {/* Fixed height container for text content */}
                  <div className="min-h-[100px] sm:min-h-[130px]">
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {scriptsVisible ? (
                        <>
                          Real-world Bash automation scripts built during my
                          Linux system administration training. Focused on
                          monitoring, user auditing, logging, and system-level
                          operations.
                          <span className="mt-3 block text-sm text-primary">
                            Each script is documented and available on GitHub.
                          </span>
                        </>
                      ) : (
                        "Practical Linux automation tools designed for system reliability, monitoring, and administrative workflows."
                      )}
                    </p>
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-primary font-medium tracking-wide">
                      Bash • Linux Administration • Automation
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6 sm:mt-8 max-w-md">
                  <button
                    onClick={() => setScriptsVisible(!scriptsVisible)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="text-lg">
                      {scriptsVisible ? "📂" : "📁"}
                    </span>
                    <span className="whitespace-nowrap">
                      {scriptsVisible ? "Hide Scripts" : "Explore Scripts"}
                    </span>
                  </button>

                  <Link
                    href="https://github.com/mrtuxcoder/my-scripts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors border border-gray-300 dark:border-gray-600 rounded-lg hover:border-primary/50"
                  >
                    <span className="whitespace-nowrap">View Repository</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right Side - Enhanced Grid Container */}
              <div className="lg:w-[60%]">
                <div className="relative w-full min-h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Grid Header - Fixed height */}
                  <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">📁</div>
                        <div>
                          <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                            scripts/
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {scripts.length} files • Click to view source
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                            scriptsVisible
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {scriptsVisible ? "Visible" : "Hidden"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Main Grid Area - Consistent aspect ratios */}
<div className="p-4 sm:p-6">
  <div className={`${scriptsVisible ? 'h-[300px] overflow-y-auto' : 'h-auto'} pr-2`}>
    {scriptsVisible ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 auto-rows-fr">
        {scripts.map((script) => (
          <Link
            key={script.id}
            href={script.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center p-2 sm:p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 min-h-[100px] sm:min-h-[120px]"
          >
            {/* External link indicator */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>

            <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-3 group-hover:scale-110 transition-transform">
              {script.icon}
            </div>

            <div className="text-center w-full px-1">
              <h5 className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 mb-0.5 sm:mb-1 line-clamp-1">
                {script.name}
              </h5>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-tight">
                {script.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 h-[100px] sm:h-[120px]"
          >
            <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-3 opacity-40">
              {["📁", "📄", "⚙️", "🔧", "📦", "🖥️"][i % 6]}
            </div>
            <div className="w-12 h-1.5 sm:w-16 sm:h-2 bg-gray-300 dark:bg-gray-700 rounded-full mb-1.5 sm:mb-2 animate-pulse"></div>
            <div className="w-8 h-1 sm:w-12 sm:h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

                  {/* Grid Footer - Consistent with header */}
                  <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {scriptsVisible ? (
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Scripts loaded
                          </span>
                        ) : (
                          "Click 'Explore Scripts' to view"
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {scripts.length} items
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                          <p className="text-sm text-gray-600 dark:text-gray-gray-400 flex-1">
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
