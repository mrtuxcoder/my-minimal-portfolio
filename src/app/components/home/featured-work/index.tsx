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

  // Always show 8 items (real + placeholders) to maintain layout
  const totalItemsToShow = 8;
  const emptySlots = Math.max(0, totalItemsToShow - scripts.length);

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
          <div className="border-t border-primary/10">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
              {/* Left Content */}
              <div className="lg:w-[42%] flex flex-col justify-center gap-4 sm:gap-5">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                    Linux Automation Toolkit
                  </h3>

                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {scriptsVisible ? (
                      <>
                        <span className="sm:hidden">
                          {/* Mobile short version when visible */}
                          Bash automation scripts for system monitoring and
                          auditing.
                        </span>
                        <span className="hidden sm:inline">
                          {/* Desktop full version */}
                          Real-world Bash automation scripts built during my
                          Linux system administration training. Focused on
                          monitoring, user auditing, logging, and system-level
                          operations.
                        </span>
                        <span className="block mt-2 text-sm text-primary">
                          Each script is documented and available on GitHub.
                        </span>
                      </>
                    ) : (
                      "Practical Linux automation tools designed for system reliability, monitoring, and administrative workflows."
                    )}
                  </p>

                  <div className="mt-2">
                    <p className="text-sm sm:text-base text-primary font-medium">
                      Bash • Linux Administration • Automation
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => setScriptsVisible(!scriptsVisible)}
                    className="inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span className="mr-2 text-lg">
                      {scriptsVisible ? "📂" : "📁"}
                    </span>
                    {scriptsVisible ? "Hide" : "Explore"}
                  </button>

                  <Link
                    href="https://github.com/mrtuxcoder/my-scripts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    View Repository
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right Side Rectangle Grid - FIXED HEIGHT */}
              <div className="lg:w-[58%]">
                <div className="relative w-full h-full min-h-[380px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-4 sm:p-6">
                  {/* Grid Header */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📁</div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          scripts/
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {scripts.length} files • Click to view source
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          scriptsVisible
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {scriptsVisible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                  </div>

                  {/* Main Grid Area - Fixed height with consistent content */}
                  <div className="min-h-[280px] h-[280px] overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {/* Always show scripts when visible */}
                      {scriptsVisible ? (
                        <>
                          {scripts.map((script) => (
                            <Link
                              key={script.id}
                              href={script.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/script relative flex flex-col items-center p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                              <div className="absolute top-2 right-2 opacity-0 group-hover/script:opacity-100 transition-opacity">
                                <svg
                                  className="w-4 h-4 text-primary"
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

                              <div className="text-3xl mb-3 transform group-hover/script:scale-110 transition-transform">
                                {script.icon}
                              </div>

                              <div className="text-center">
                                <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1 line-clamp-1">
                                  {script.name}
                                </h5>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                  {script.description}
                                </p>
                              </div>
                            </Link>
                          ))}

                          {/* Empty placeholder slots to maintain layout */}
                          {Array.from({ length: emptySlots }).map((_, i) => (
                            <div
                              key={`empty-${i}`}
                              className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/30 dark:bg-gray-800/30 border border-gray-200/50 dark:border-gray-700/50"
                            >
                              <div className="text-3xl mb-3 opacity-40">
                                {["📁", "📄", "⚙️", "🔧"][i % 4]}
                              </div>
                              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-2 opacity-50"></div>
                              <div className="w-12 h-1.5 bg-gray-100 dark:bg-gray-600 rounded-full opacity-30"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        /* Hidden state - show all placeholders */
                        Array.from({ length: totalItemsToShow }).map((_, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50"
                          >
                            <div className="text-3xl mb-3 opacity-60">
                              {
                                [
                                  "📁",
                                  "📄",
                                  "⚙️",
                                  "🔧",
                                  "📦",
                                  "🖥️",
                                  "🗄️",
                                  "🔍",
                                ][i % 8]
                              }
                            </div>
                            <div className="w-16 h-2 bg-gray-300 dark:bg-gray-700 rounded-full mb-2"></div>
                            <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Grid Footer */}
                  <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {scriptsVisible ? (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Scripts loaded
                        </span>
                      ) : (
                        "Click 'Explore Scripts' to view"
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {scripts.length} items
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
