"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ChronicleCaseStudy from "./chronicle-case-study";
import LanBoxCaseStudy from "./lanbox-case-study";
import GuidraCaseStudy from "./guidra-case-study";

function CaseStudyContent() {
  const searchParams = useSearchParams();
  const title =
    searchParams.get("title") ||
    "End-to-End Deployment of Guidra Backend on Azure VM";

  const isChronicle = title.includes("Chronicle");
  const isLanBox = title.includes("LANBox");

  const subtitle = isChronicle
    ? "Internet → Cloudflare → Tunnel → Homelab → Docker → Nginx"
    : isLanBox
      ? "LAN Device → Linux Server → Docker → Nginx → LANBox Backend → Filesystem"
      : "Azure VM → Nginx → Node.js → MongoDB Atlas";

  return (
    <>
      <header className="space-y-2 sm:space-y-3">
        <p className="text-xs sm:text-sm font-medium uppercase tracking-[2px] text-primary">
          Case Study
        </p>

        <h1 className="text-[26px] xs:text-[28px] font-bold leading-[1.2] tracking-tight text-primary sm:text-4xl sm:leading-tight break-words">
          {title}
        </h1>

        <p className="text-xs sm:text-base leading-relaxed text-secondary pt-0.5">
          {subtitle}
        </p>
      </header>

      {isChronicle ? (
        <ChronicleCaseStudy />
      ) : isLanBox ? (
        <LanBoxCaseStudy />
      ) : (
        <GuidraCaseStudy />
      )}
    </>
  );
}

function CaseStudyLoadingFallback() {
  return (
    <header className="space-y-2 sm:space-y-3 animate-pulse">
      <div className="h-3.5 w-24 rounded bg-primary/10" />
      <div className="h-8 w-3/4 rounded bg-primary/10" />
      <div className="h-4 w-1/2 rounded bg-primary/10" />
    </header>
  );
}

const CaseStudyPage = () => {
  return (
    <section>
      <div className="container">
        <div className="section-surface border-x border-primary/10">
          <article className="mx-auto max-w-4xl space-y-6 sm:space-y-10 px-4 py-6 sm:px-7 sm:py-12 md:py-16">
            <Suspense fallback={<CaseStudyLoadingFallback />}>
              <CaseStudyContent />
            </Suspense>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyPage;
