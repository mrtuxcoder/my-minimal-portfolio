import { HeroAbout } from "@/components/hero-about";
import { WorkExperience, Education } from "@/components/experience-education";
import { FeaturedProjects } from "@/components/featured-projects";
import { OpenSourcePRs } from "@/components/open-source-prs";
import { SkillsGrid } from "@/components/skills-grid";
import { GitHubStats } from "@/components/github-stats";
import { PencilDivider } from "@/components/pencil-scribble";
import { getGitHubPRs } from "@/lib/github-prs";

// ISR: revalidate the entire page every 60 seconds
export const revalidate = 60;

export default async function Page() {
  const prsData = await getGitHubPRs();

  return (
    <main className="mx-auto max-w-3xl px-5 sm:px-6 pt-3 sm:pt-4 pb-8 sm:pb-12 space-y-7">
      {/* 1. Hero: Bio, Highlighter, Social Links & Resume Access */}
      <HeroAbout />

      <PencilDivider />

      {/* 2. Work Experience: Immediate commercial credibility for recruiters */}
      <WorkExperience />

      <PencilDivider />

      {/* 3. Featured Projects: Infrastructure & systems proofs with case studies & live link */}
      <FeaturedProjects />

      <PencilDivider />

      {/* 4. Open Source Contributions: Real merged PRs (plain & unboxed) */}
      <OpenSourcePRs
        initialRepositories={prsData.repositories}
        initialTotalCount={prsData.totalCount}
      />

      <PencilDivider />

      {/* 5. Technical Skills: Categorized DevOps, Cloud, Containers, Linux stack */}
      <SkillsGrid />

      <PencilDivider />

      {/* 6. GitHub Activity: 517 contributions showing daily consistency & passion */}
      <GitHubStats />

      <PencilDivider />

      {/* 7. Education: Academic background (M.C.A. & B.C.A.) */}
      <Education />
    </main>
  );
}
