const TechnicalActivities = () => {
    const openSourceLinks = [
        "https://github.com/se7engoodfellas/zenmix/pull/39",
        "https://github.com/se7engoodfellas/zenmix/pull/38",
        "https://github.com/se7engoodfellas/zenmix/pull/21"
    ];
    const studyNotionLinks = [
        "https://github.com/BoddepallyVenkatesh06/Study-Notion-LMS/pull/6"
    ];

    return (
        <section>
            <div className="container">
                <div className="border-x border-primary/10">
                    <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
                        <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                            <p className="text-sm tracking-[2px] text-primary uppercase font-medium">Technical Activity</p>
                        </div>
                    </div>

                    <div className="border-t border-primary/10">
                        <div className="flex flex-col max-w-none px-4 sm:px-7 py-8 md:py-8">
                            <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(240px,0.3fr)_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-3">
                                <h5 className="lg:col-start-1 lg:row-start-1">Student Coordinator – Debugging Competition (TECHIES 8.0)</h5>

                                <ul className="space-y-1 lg:col-start-2 lg:row-start-1">
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Set up debugging programs across multiple lab systems
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Standardized file naming and folder structure for participants
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Assisted faculty during competition execution
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Guided participants on accessing and running programs
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Helped monitor lab environment and quiz evaluation
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col gap-3 border-dashed border-t border-primary/10 pt-6 sm:pt-6 mt-6 sm:mt-6 lg:grid lg:grid-cols-[minmax(240px,0.3fr)_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-3">
                                <h5 className="lg:col-start-1 lg:row-start-1">Open Source Contribution - zenmix (GitHub)</h5>

                                <ul className="space-y-1 lg:col-start-2 lg:row-start-1">
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Submitted multiple pull requests focused on UI improvements and theming
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Worked on light/dark mode behavior and visual consistency
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Collaborated with the maintainer through code reviews and feedback
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Had several contributions merged into the main codebase
                                    </li>
                                </ul>

                                <div className="flex flex-wrap gap-3 lg:col-start-2 lg:row-start-2">
                                    {openSourceLinks.map((link, index) => (
                                        <a
                                            key={link}
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors px-3 py-1.5 bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/10"
                                        >
                                            <span>PR #{index + 1}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 border-dashed border-t border-primary/10 pt-6 sm:pt-6 mt-6 sm:mt-6 lg:grid lg:grid-cols-[minmax(240px,0.3fr)_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-3">
                                <h5 className="lg:col-start-1 lg:row-start-1">Open Source Contribution - Study-Notion LMS (GitHub)</h5>

                                <ul className="space-y-1 lg:col-start-2 lg:row-start-1">
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Identified and fixed documentation issues in an open-source LMS project
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Created and submitted a pull request that was successfully merged
                                    </li>
                                    <li className="flex items-start gap-2 text-base font-normal text-secondary">
                                        <span className="hidden sm:inline-block w-2.5 h-2.5 text-secondary">•</span>
                                        Gained hands-on experience with GitHub workflows (forking, branching, PR)
                                    </li>
                                </ul>

                                <div className="flex flex-wrap gap-3 lg:col-start-2 lg:row-start-2">
                                    {studyNotionLinks.map((link, index) => (
                                        <a
                                            key={link}
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors px-3 py-1.5 bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/10"
                                        >
                                            <span>PR #{index + 1}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TechnicalActivities
