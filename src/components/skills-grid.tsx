"use client";

import {
  Cloud,
  GitBranch,
  Globe,
  Layers,
  Network,
  Package,
  ShieldCheck,
  Terminal,
  Wrench,
  Server,
} from "lucide-react";
import {
  DockerIcon,
  GitIcon,
  LinuxIcon,
  MongoDBIcon,
  MySQLIcon,
  NginxIcon,
  NodeJsIcon,
  ReactIcon,
  TailscaleIcon,
  GoIcon,
  PythonIcon,
} from "@/app/components/home/about-me/tech-icons";

interface SkillItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const skillCategories: { title: string; skills: SkillItem[] }[] = [
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker", icon: DockerIcon },
      { name: "Docker Compose", icon: Layers },
      { name: "GitHub Actions (CI/CD)", icon: GitBranch },
      { name: "Terraform (IaC)", icon: Wrench },
      { name: "AWS", icon: Cloud },
      { name: "Nginx Reverse Proxy", icon: NginxIcon },
      { name: "GHCR / ECR", icon: Package },
    ],
  },
  {
    title: "Linux & Systems",
    skills: [
      { name: "Linux Administration", icon: LinuxIcon },
      { name: "Bash Scripting", icon: Terminal },
      { name: "Tailscale (Mesh VPN)", icon: TailscaleIcon },
      { name: "Linux Networking & Firewalls", icon: Network },
      { name: "Self-Hosted Infrastructure", icon: Server },
      { name: "SSL / TLS (Certbot)", icon: ShieldCheck },
    ],
  },
  {
    title: "Backend & Programming",
    skills: [
      { name: "Go (Golang)", icon: GoIcon },
      { name: "Python", icon: PythonIcon },
      { name: "MySQL", icon: MySQLIcon },
      { name: "MongoDB", icon: MongoDBIcon },
      { name: "Node.js", icon: NodeJsIcon },
      { name: "React", icon: ReactIcon },
      { name: "RESTful APIs", icon: Globe },
      { name: "Git", icon: GitIcon },
    ],
  },
];

export function SkillsGrid() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm sm:text-base font-semibold tracking-tight text-primary">
        Skills &amp; Technologies
      </h2>

      <div className="space-y-2.5">
        {skillCategories.map((category) => (
          <div key={category.title} className="space-y-1">
            <span className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-wider text-secondary/70">
              {category.title}
            </span>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {category.skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-card/60 px-2 py-0.5 text-[11px] sm:text-xs font-medium text-foreground transition-colors hover:border-primary/25 hover:bg-muted/80"
                  >
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary/80 shrink-0" />
                    <span>{skill.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
