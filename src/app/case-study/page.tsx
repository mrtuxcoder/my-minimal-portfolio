import ChronicleCaseStudy from "./chronicle-case-study";
import GuidraCaseStudy from "./guidra-case-study";

type CaseStudyPageProps = {
  searchParams: Promise<{
    title?: string;
  }>;
};

const CaseStudyPage = async ({ searchParams }: CaseStudyPageProps) => {
  const params = await searchParams;
  const title =
    params?.title || "End-to-End Deployment of Guidra Backend on Azure VM";
  const isChronicle = title.includes("Chronicle");
  const subtitle = isChronicle
    ? "Docker → Nginx → Node.js → MongoDB → Tailscale → Homelab"
    : "Azure VM → Nginx → Node.js → MongoDB Atlas";

  return (
    <main>
      <section>
        <div className="container">
          <div className="border-x border-primary/10">
            <article className="mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-7 md:py-16">
              <header className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[2px] text-primary">
                  Case Study
                </p>
                <h1 className="text-3xl font-bold leading-tight text-primary sm:text-4xl">
                  {title}
                </h1>
                <p className="text-base leading-relaxed text-secondary sm:text-lg">
                  {subtitle}
                </p>
              </header>

              {isChronicle ? <ChronicleCaseStudy /> : <GuidraCaseStudy />}
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudyPage;
