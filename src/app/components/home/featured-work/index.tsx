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
    } catch (error) {
      console.error('Error saving cache:', error);
    }
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
      console.log('No tables found in README');
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
      console.log('No table with "Filename" header found');
      return tags;
    }
    
    // Split table into rows
    const rows = targetTable.split('\n').filter(row => row.trim() !== '');
    
    if (rows.length < 2) return tags;
    
    // Find Tags column index (last column)
    const headers = rows[0].split('|').map(h => h.trim().toLowerCase());
    const tagsIndex = headers.length - 1; // Tags is last column
    
    console.log('Tags column index:', tagsIndex);
    
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
          console.log(`Parsed tags for ${filename}:`, parsedTags);
        }
      }
    }
    
    return tags;
  };

  const fetchGitHubScripts = async (): Promise<any[]> => {
    try {
      console.log('=== FETCHING FROM GITHUB ===');
      
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
      
      console.log('=== TAGS EXTRACTED ===');
      console.log('Files with tags:', Object.keys(tagsData));
      
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
          
          console.log(`\n📄 ${item.name}:`);
          console.log(`   Emoji: ${emoji} (auto-detected)`);
          console.log(`   Category: ${category} (auto-detected)`);
          console.log(`   Tags: ${tags.length > 0 ? tags.join(', ') : 'none'}`);
          console.log(`   Has tags in README? ${hasTags ? 'YES' : 'NO'}`);
          
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

      console.log('=== FINAL SCRIPTS ===');
      githubScripts.forEach((script : any) => {
        console.log(`${script.filename}: ${script.emoji} ${script.fromTable ? '✓ HAS TAGS' : '⚡ AUTO'}`);
      });

      return githubScripts;
    } catch (error) {
      console.error('GitHub fetch failed:', error);
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
        if (scriptsToDisplay.length > 0) {
          console.log('Loaded from cache:', scriptsToDisplay.length, 'scripts');
        }
      }
      
      // Fetch from GitHub if needed
      if (forceRefresh || scriptsToDisplay.length === 0) {
        console.log('Fetching fresh from GitHub...');
        const githubScripts = await fetchGitHubScripts();
        if (githubScripts.length > 0) {
          scriptsToDisplay = githubScripts;
          saveScriptsToCache(githubScripts);
          console.log('Saved to cache:', githubScripts.length, 'scripts');
        }
      }
      
      // Fallback if empty
      if (scriptsToDisplay.length === 0) {
        console.log('Using fallback scripts');
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
      
      console.log('✅ Scripts loaded:', scriptsToDisplay.length);
      
    } catch (error) {
      console.error('Failed to load scripts:', error);
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
                    {/* <Link href={"https://guidra.guganraj.site/"}>
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
                    </Link> */}
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
                            {isLoading ? 'Fetching from GitHub...' : `${scripts.length} files • Click to view source`}
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
                          "Click 'Explore Scripts' to view"
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