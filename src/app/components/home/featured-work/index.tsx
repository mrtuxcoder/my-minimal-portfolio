"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FeaturedWork = () => {
  const [featureWork, setFeatureWork] = useState<any>(null);
  const [additionalProjects, setAdditionalProjects] = useState<any[]>([]);
  const [scriptsVisible, setScriptsVisible] = useState(false);
  const [scripts, setScripts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [hoveredScript, setHoveredScript] = useState<string | null>(null);

  const GITHUB_USERNAME = "mrtuxcoder";
  const REPO_NAME = "my-scripts";

  // === CACHE HELPERS ===
  const getCachedScripts = (): any[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const cached = localStorage.getItem('portfolio_scripts_cache');
      const timestamp = localStorage.getItem('portfolio_scripts_timestamp');
      
      if (!cached || !timestamp) return [];
      
      const cacheAge = Date.now() - parseInt(timestamp);
      if (cacheAge > 30 * 60 * 1000) return [];
      
      return JSON.parse(cached);
    } catch {
      return [];
    }
  };

  const saveScriptsToCache = (scripts: any[]) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('portfolio_scripts_cache', JSON.stringify(scripts));
      localStorage.setItem('portfolio_scripts_timestamp', Date.now().toString());
    } catch {}
  };

  // === EMOJI & CATEGORY HELPERS ===
  const getEmojiByPattern = (filename: string): string => {
    const lower = filename.toLowerCase();
    
    if (lower.includes('backup') || lower.includes('save') || lower.includes('archive')) return '💾';
    if (lower.includes('clean') || lower.includes('remove') || lower.includes('delete')) return '🧹';
    if (lower.includes('deploy') || lower.includes('launch') || lower.includes('release')) return '🚀';
    if (lower.includes('monitor') || lower.includes('watch') || lower.includes('check')) return '👁️';
    if (lower.includes('security') || lower.includes('audit') || lower.includes('protect')) return '🔒';
    if (lower.includes('network') || lower.includes('ping') || lower.includes('connect')) return '🌐';
    if (lower.includes('docker') || lower.includes('container') || lower.includes('image')) return '🐳';
    if (lower.includes('git') || lower.includes('repo') || lower.includes('version')) return '📦';
    if (lower.includes('cron') || lower.includes('schedule') || lower.includes('timer')) return '⏰';
    if (lower.includes('user') || lower.includes('account') || lower.includes('login')) return '👤';
    if (lower.includes('health') || lower.includes('status') || lower.includes('checkup')) return '🫀';
    if (lower.includes('log') || lower.includes('report') || lower.includes('export')) return '📊';
    if (lower.includes('system') || lower.includes('server') || lower.includes('host')) return '🖥️';
    if (lower.includes('ssl') || lower.includes('cert') || lower.includes('tls')) return '🔐';
    if (lower.includes('disk') || lower.includes('storage') || lower.includes('space')) return '💿';
    if (lower.includes('service') || lower.includes('daemon') || lower.includes('process')) return '⚙️';
    
    return '🔧'; // Default fallback
  };

  const getCategoryByPattern = (filename: string): string => {
    const lower = filename.toLowerCase();
    
    if (lower.includes('backup') || lower.includes('save') || lower.includes('archive')) return 'Backup';
    if (lower.includes('clean') || lower.includes('remove') || lower.includes('delete')) return 'Maintenance';
    if (lower.includes('deploy') || lower.includes('launch') || lower.includes('release')) return 'Deployment';
    if (lower.includes('monitor') || lower.includes('watch') || lower.includes('check')) return 'Monitoring';
    if (lower.includes('security') || lower.includes('audit') || lower.includes('protect')) return 'Security';
    if (lower.includes('network') || lower.includes('ping') || lower.includes('connect')) return 'Network';
    if (lower.includes('docker') || lower.includes('container') || lower.includes('image')) return 'Docker';
    if (lower.includes('git') || lower.includes('repo') || lower.includes('version')) return 'Git';
    if (lower.includes('cron') || lower.includes('schedule') || lower.includes('timer')) return 'Automation';
    if (lower.includes('user') || lower.includes('account') || lower.includes('login')) return 'User Management';
    if (lower.includes('health') || lower.includes('status') || lower.includes('checkup')) return 'Health';
    if (lower.includes('log') || lower.includes('report') || lower.includes('export')) return 'Logging';
    if (lower.includes('system') || lower.includes('server') || lower.includes('host')) return 'System';
    if (lower.includes('ssl') || lower.includes('cert') || lower.includes('tls')) return 'SSL';
    if (lower.includes('disk') || lower.includes('storage') || lower.includes('space')) return 'Storage';
    
    return 'Utility';
  };

  // === GITHUB INTEGRATION ===
  const parseReadmeTags = (markdown: string): Record<string, string[]> => {
    const tags: Record<string, string[]> = {};
    
    if (!markdown) return tags;
    
    // Find any markdown table
    const tableRegex = /\|([^\n|]+(?:\|[^\n|]+)+)\|/g;
    const tables = [];
    let match;
    
    while ((match = tableRegex.exec(markdown)) !== null) {
      tables.push(match[1].trim());
    }
    
    if (tables.length === 0) {
      return tags;
    }
    
    // Find the table with "Filename" header
    let targetTable = '';
    for (const table of tables) {
      if (table.toLowerCase().includes('filename')) {
        targetTable = table;
        break;
      }
    }
    
    if (!targetTable) {
      return tags;
    }
    
    // Split table into rows
    const rows = targetTable.split('\n').filter(row => row.trim() !== '');
    
    if (rows.length < 2) return tags;
    
    // Find Tags column index (last column)
    const headers = rows[0].split('|').map(h => h.trim().toLowerCase());
    const tagsIndex = headers.length - 1; // Tags is last column
    
    // Parse each data row
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.split('|').map(cell => cell.trim());
      
      if (cells.length > tagsIndex) {
        const filename = cells[0] || '';
        const tagsStr = cells[tagsIndex] || '';
        
        if (filename && tagsStr) {
          // Parse tags (comma-separated)
          const parsedTags = tagsStr.split(',').map(tag => tag.trim()).filter(tag => tag);
          tags[filename] = parsedTags;
        }
      }
    }
    
    return tags;
  };

  const fetchGitHubScripts = async (): Promise<any[]> => {
    try {
      const [readmeResponse, filesResponse] = await Promise.all([
        fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/README.md`),
        fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/`)
      ]);

      if (!readmeResponse.ok || !filesResponse.ok) {
        throw new Error('GitHub fetch failed');
      }

      const [readmeText, filesData] = await Promise.all([
        readmeResponse.text(),
        filesResponse.json()
      ]);

      const tagsData = parseReadmeTags(readmeText);
      
      const scriptExtensions = ['.sh', '.bash', '.js', '.py', '.rb', '.php', '.pl', '.zsh'];
      const githubScripts = filesData
        .filter((item: any) => 
          item.type === 'file' && 
          scriptExtensions.some(ext => item.name.toLowerCase().endsWith(ext))
        )
        .map((item: any) => {
          const nameWithoutExt = item.name.replace(/\.[^/.]+$/, '');
          const displayName = nameWithoutExt.replace(/_/g, ' ');
          
          // Get tags from README table if available
          const tags = tagsData[item.name] || [];
          const hasTags = tags.length > 0;
          
          // Auto-detect emoji and category based on filename
          const emoji = getEmojiByPattern(item.name);
          const category = getCategoryByPattern(item.name);
          
          return {
            name: displayName,
            originalName: displayName,
            shortName: displayName.length > 15 ? displayName.substring(0, 12) + '..' : displayName,
            filename: item.name,
            emoji: emoji,
            category: category,
            description: `${displayName} script${tags.length > 0 ? ' - ' + tags.join(', ') : ''}`,
            tags: tags,
            repoUrl: item.html_url,
            needsScroll: displayName.length > 15,
            nameLength: displayName.length,
            fromTable: hasTags // Mark as "from table" if it has tags in README
          };
        });

      return githubScripts;
    } catch {
      return [];
    }
  };

  
  // === MAIN LOADING ===
  const loadScripts = async (forceRefresh = false) => {
    setIsLoading(true);
    
    try {
      let scriptsToDisplay: any[] = [];
      
      // Try cache first
      if (!forceRefresh) {
        scriptsToDisplay = getCachedScripts();
      }
      
      // Fetch from GitHub if needed
      if (forceRefresh || scriptsToDisplay.length === 0) {
        const githubScripts = await fetchGitHubScripts();
        if (githubScripts.length > 0) {
          scriptsToDisplay = githubScripts;
          saveScriptsToCache(githubScripts);
        }
      }
      
      // Fallback if empty
      if (scriptsToDisplay.length === 0) {
        scriptsToDisplay = [
          {
            name: "User Monitor",
            shortName: "User Monitor",
            filename: "user_monitor.sh",
            emoji: "👁️",
            category: "Security",
            description: "Real-time user login monitoring and security auditing",
            tags: ["monitoring", "security", "users"],
            repoUrl: "https://github.com/mrtuxcoder/my-scripts/blob/main/user_monitor.sh",
            needsScroll: false,
            nameLength: 11,
            fromTable: true
          }
        ];
      }
      
      setScripts(scriptsToDisplay);
      setLastUpdated(new Date().toLocaleTimeString());

    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadScripts();
  }, []);

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
            description: "Minimal MEN-stack to-do app with authentication",
            repoUrl: "https://github.com/mrtuxcoder/easyList",
            liveUrl: "https://easylist-minm.onrender.com",
          },
          {
            id: 2,
            title: "EventHub",
            description: "Event booking system with admin CRUD capabilities",
            repoUrl: "https://github.com/mrtuxcoder/event-booking-management",
            liveUrl: "https://george1518.github.io/event-booking-management/",
          },
        ];
        setAdditionalProjects(extraProjects);
      } catch {}
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
                Featured Work
              </p>
            </div>
          </div>

          {/* Main Featured Projects */}
          <div className="border-t border-primary/10">
            {featureWork?.map((value: any, index: number) => (
              <div
                key={index}
                className="px-2 py-3 sm:p-4 lg:p-6"
              >
                <div className="rounded-2xl bg-[linear-gradient(180deg,rgba(120,119,198,0.06)_0%,rgba(255,255,255,0)_45%)] p-3 sm:p-5 lg:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-4 gap-4 sm:gap-5">

                    {/* Top Left - Image */}
                    <div className="order-2 lg:order-1 lg:col-span-2 lg:row-span-2">
                      <div className="w-full border border-primary/10 rounded-xl p-1.5 bg-background/90">
                        <Link href={"/"}>
                          <div className="relative overflow-hidden rounded-lg aspect-[5/4]">
                            <Image
                              src={value?.image || "/images/feature-work/feature-img-11.png"}
                              alt={value?.title || "Featured work image"}
                              width={500}
                              height={400}
                              className="w-full h-full object-cover hover:scale-105 transition-all duration-500 ease-in-out"
                            />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Top Right - Title and Description */}
                    <div className="flex flex-col gap-4 order-1 lg:order-2 lg:col-span-2 lg:row-span-2 justify-center">
                      <div className="flex flex-col gap-2.5">
                        <Link
                          href={{
                            pathname: "/case-study",
                            query: {
                              title: value?.caseStudyTitle || "End-to-End Deployment of Guidra Backend on Azure VM",
                            },
                          }}
                        >
                          <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-tight hover:text-primary/80 transition-colors">
                            {value?.title || "Guidra"}
                          </h3>
                        </Link>

                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          {value?.description ||
                            "Developed a modern brand identity and a responsive web experience tailored for a professional cleaning company, focused on clarity and usability."}
                        </p>

                        <a
                          href="https://www.guidra.tech"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          Visit Site
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
                        </a>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {[
                            ...(value?.roles?.filter((role: string) => !/mongo/i.test(role)) ?? []),
                            "Express.js",
                            "REST API",
                            "MUI",
                            "OAuth",
                            "Mongoose",
                            "Mermaid",
                            "JWT",
                            "Groq",
                            "Gemini",
                            "Hugging Face",
                            "Docker",
                            "Nginx",
                            "PM2",
                            "Azure VM",
                            "HTTPS",
                            "UFW",
                            "Fail2ban",
                          ].map((item, itemIndex) => (
                            <span
                              key={`${item}-${itemIndex}`}
                              className="text-xs text-primary font-medium border border-primary/20 rounded-full px-2.5 py-1"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                      </div>

                    </div>

                    {/* Bottom Left - Highlights */}
                    <div className="order-3 lg:order-3 lg:col-span-2 lg:row-span-2">
                      <div className="border border-primary/10 rounded-xl p-3.5 sm:p-4 bg-background/80 h-full">
                        <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-[1px]">Highlights</p>
                        <ul className="space-y-1.5">
                          {[
                            "Structured AI learning platform (not a chatbot)",
                            "Multi-model AI fallback system for reliability",
                            "Content caching to reduce API usage and latency",
                            "Google OAuth + JWT-based authentication",
                            "User progress tracking with quizzes",
                            "AI-generated lessons (concept -> example -> exercise)",
                            "Mind map visualization using Mermaid",
                            "Dockerized backend deployed on Azure VM",
                            "NGINX reverse proxy with SSL + PM2 process management",
                            "Built for scalability and real-world usage",
                          ].map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Right - Deployment and Case Study */}
                    <div className="flex flex-col gap-4 order-4 lg:order-4 lg:col-span-2 lg:row-span-2 justify-center items-center">
                      {value?.deployment?.length > 0 && (
                        <div className="w-full max-w-xl border border-primary/10 rounded-xl p-3.5 sm:p-4 bg-background/80">
                          <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-[1px]">Deployment</p>
                          <ul className="space-y-1.5">
                            {value.deployment.map((item: string, itemIndex: number) => (
                              <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link
                        className="w-full max-w-xl"
                        href={{
                          pathname: "/case-study",
                          query: {
                            title: value?.caseStudyTitle || "End-to-End Deployment of Guidra Backend on Azure VM",
                          },
                        }}
                      >
                        <div className="rounded-lg border border-primary/10 p-3.5 sm:p-4 bg-[repeating-linear-gradient(180deg,rgba(148,163,184,0.08)_0px,rgba(148,163,184,0.08)_1px,transparent_1px,transparent_28px)] hover:border-primary/30 transition-colors">
                          <p className="text-[11px] tracking-[2px] text-primary uppercase font-semibold">Case Study</p>
                          <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            Deployment notes and production setup summary.
                          </p>
                          <div className="mt-2.5 flex items-center justify-between">
                            <span className="text-xs text-gray-500">10 min read</span>
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </Link>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scripts Section */}
          <div className="border-t border-primary/10 py-6 sm:py-8 lg:py-12">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              {/* Left Content */}
              <div className="lg:w-[40%] flex flex-col">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-snug lg:leading-tight">
                      Linux Automation Toolkit
                    </h3>
                    
                    {/* Refresh Button */}
                    {/* <button
                      onClick={() => loadScripts(true)}
                      disabled={isLoading}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                      title="Refresh from GitHub"
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      )}
                    </button> */}
                  </div>

                  {/* Stats & Debug */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <span className="text-lg">📊</span>
                        {scripts.length} scripts
                      </span>
                      {lastUpdated && (
                        <span className="flex items-center gap-1">
                          <span className="text-lg">⏱️</span>
                          Updated {lastUpdated}
                        </span>
                      )}
                    </div>
                    
                  </div>

                  {/* Description */}
                  <div className="min-h-[100px] sm:min-h-[130px]">
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {scriptsVisible ? (
                        <>
                          Real-world Bash automation scripts automatically fetched from GitHub.
                    
                        </>
                      ) : (
                        "Practical Linux automation tools designed for system reliability, monitoring, and administrative workflows."
                      )}
                    </p>
                  </div>
                  <div className="mt-2">
                     <p className="text-sm text-violet-700 font-normal tracking-wide">
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

              {/* Right Side Grid */}
              <div className="lg:w-[60%]">
                <div className="relative w-full h-[420px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Grid Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">📁</div>
                        <div>
                          <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                            scripts/
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {isLoading ? 'Fetching from GitHub...' : `${scripts.length} files • Click to view source files`}
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

                  {/* Main Grid Area */}
                  <div className="p-4 sm:p-6 h-[calc(400px-8rem)] overflow-hidden">
                    <div className={`${scriptsVisible ? 'h-full overflow-y-auto pr-2' : 'h-full'}`}>
                      {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-fr">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 h-[140px] animate-pulse"
                            >
                              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mb-3"></div>
                              <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded-full mb-2"></div>
                              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                            </div>
                          ))}
                        </div>
                      ) : scriptsVisible ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-fr">
                          {scripts.map((script, index) => (
                            <div
                              key={`${script.filename}-${index}`}
                              className="relative h-[140px]"
                              onMouseEnter={() => setHoveredScript(script.filename)}
                              onMouseLeave={() => setHoveredScript(null)}
                            >
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 group-hover:block hidden">
                                <div className="font-medium mb-1 max-w-[180px] truncate">{script.description}</div>
                                <div className="text-gray-300 text-[10px]">
                                  {script.category} • {script.fromTable ? 'Has tags in README' : 'Auto-detected'}
                                  {script.tags && script.tags.length > 0 && (
                                    <div className="mt-1">
                                      Tags: {script.tags.join(', ')}
                                    </div>
                                  )}
                                </div>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                  <div className="w-2 h-2 bg-gray-900 rotate-45"></div>
                                </div>
                              </div>

                              <Link
                                href={script.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 h-full"
                              >
                                {/* Source Indicator */}
                                <div className={`absolute top-2 left-2 px-1.5 py-0.5 text-[8px] font-medium rounded-full ${
                                  script.fromTable 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                                }`}>
                                  {script.fromTable ? '✓' : '⚡'}
                                </div>

                                {/* External Link */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg
                                    className="w-3 h-3 text-primary"
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

                                {/* Emoji */}
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                                  {script.emoji}
                                </div>

                                {/* Script Name */}
                                <div className="w-full text-center overflow-hidden">
                                  <div className={`text-sm font-medium text-gray-800 dark:text-gray-200 mb-2 ${script.needsScroll ? 'relative inline-block max-w-full' : ''}`}>
                                    {script.needsScroll ? (
                                      <div className="relative overflow-hidden whitespace-nowrap">
                                        <span 
                                          className={`inline-block ${hoveredScript === script.filename ? 'animate-marquee' : ''}`}
                                          style={{
                                            animationDuration: `${script.nameLength * 0.15}s`,
                                            paddingLeft: hoveredScript === script.filename ? '100%' : '0'
                                          }}
                                        >
                                          {script.originalName}
                                        </span>
                                        {hoveredScript !== script.filename && (
                                          <span className="opacity-100">{script.shortName}</span>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="block truncate">{script.name}</span>
                                    )}
                                  </div>

                                  {/* Category Badge */}
                                  <span className="inline-block px-2 py-1 text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                                    {script.category}
                                  </span>
                                </div>

                                {/* Scroll Hint */}
                                {script.needsScroll && (
                                  <div className="absolute bottom-1 text-[8px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    ↕ hover to scroll
                                  </div>
                                )}
                              </Link>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-fr">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 h-[140px]"
                            >
                              <div className="text-3xl mb-3 opacity-30">
                                {["⚙️", "🔧", "📦", "🖥️", "📁", "📄", "🔒", "🌐"][i % 8]}
                              </div>
                              <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 animate-pulse"></div>
                              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Grid Footer */}
                  <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                            Fetching from GitHub...
                          </span>
                        ) : scriptsVisible ? (
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            {scripts.length} scripts loaded
                          </span>
                        ) : (
                          'Click "Explore Scripts" to view scripts'
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Projects */}
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
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
          animation-play-state: running;
        }
      `}</style>
    </section>
  );
};

export default FeaturedWork;