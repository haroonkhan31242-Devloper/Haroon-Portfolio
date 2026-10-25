import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Server,
  Database,
  ArrowRight,
  ShieldCheck,
  FileCode,
  Palette,
  Wind,
  Layers,
  Smartphone,
  Cpu,
  Network,
  Lock,
  Users,
  GitBranch,
  GitPullRequest,
  Zap,
  Search,
  Brain,
} from 'lucide-react';
import { SKILLS_CATEGORIES } from '../data/portfolioData';
import { SectionHeading } from '../components/motion/SectionHeading';
import { useReveal } from '../utils/gsapAnimations';

// Dynamic icon mapping helper
const getSkillIcon = (iconName: string) => {
  const iconProps = { className: 'w-5 h-5' };
  switch (iconName) {
    case 'FileCode':
      return <FileCode {...iconProps} />;
    case 'Palette':
      return <Palette {...iconProps} />;
    case 'Wind':
      return <Wind {...iconProps} />;
    case 'Code':
      return <Code2 {...iconProps} />;
    case 'Layers':
      return <Layers {...iconProps} />;
    case 'Smartphone':
      return <Smartphone {...iconProps} />;
    case 'Server':
      return <Server {...iconProps} />;
    case 'Cpu':
      return <Cpu {...iconProps} />;
    case 'Network':
      return <Network {...iconProps} />;
    case 'Lock':
      return <Lock {...iconProps} />;
    case 'ShieldCheck':
      return <ShieldCheck {...iconProps} />;
    case 'Users':
      return <Users {...iconProps} />;
    case 'Database':
      return <Database {...iconProps} />;
    case 'GitBranch':
      return <GitBranch {...iconProps} />;
    case 'GitPullRequest':
      return <GitPullRequest {...iconProps} />;
    case 'Zap':
      return <Zap {...iconProps} />;
    case 'Search':
      return <Search {...iconProps} />;
    case 'Brain':
      return <Brain {...iconProps} />;
    default:
      return <Code2 {...iconProps} />;
  }
};

type SkillFilter = 'all' | 'frontend' | 'backend' | 'database_tools';

const SKILL_GROUPS = [
  {
    key: 'frontend' as const,
    title: 'Frontend Engineering',
    tabLabel: 'Frontend Engineering',
    subtitle: 'User interfaces, accessibility standards, responsive layouts, and state architecture',
    tier: 'Client Tier',
    Icon: Code2,
    tone: 'text-cyan-300',
    dot: 'bg-cyan-400',
  },
  {
    key: 'backend' as const,
    title: 'Backend Skills & Security',
    tabLabel: 'Backend & Security',
    subtitle: 'Server runtimes, REST endpoints, JWT authentication, and RBAC authorization',
    tier: 'Server Tier',
    Icon: Server,
    tone: 'text-amber-300',
    dot: 'bg-amber-400',
  },
  {
    key: 'database_tools' as const,
    title: 'Database & Engineering Tools',
    tabLabel: 'Database & Dev Tools',
    subtitle: 'NoSQL data modeling, Git collaboration, API integration, and debugging',
    tier: 'Storage & Ops',
    Icon: Database,
    tone: 'text-emerald-300',
    dot: 'bg-emerald-400',
  },
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillFilter>('all');
  const headerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const totalSkills = SKILL_GROUPS.reduce((n, g) => n + SKILLS_CATEGORIES[g.key].length, 0);

  // Re-run reveals whenever the filter changes so new cards animate in.
  useReveal(headerRef);
  useReveal(listRef, [activeCategory]);

  const visibleGroups = SKILL_GROUPS.filter((g) => activeCategory === 'all' || activeCategory === g.key);

  return (
    <div className="relative">
      <section ref={headerRef} className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeading
            as="h1"
            eyebrow="Technical Competencies"
            title={
              <>
                Skills &amp; development <span className="serif-accent text-accent">capabilities</span>
              </>
            }
            description="A comprehensive inventory of modern web technologies, runtime frameworks, and architectural paradigms I utilize to build scalable MERN applications."
          />

          <div className="segmented mt-10" role="tablist" aria-label="Filter skills by category">
            <button type="button" role="tab" aria-selected={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>
              <span>All Skills</span>
              <span className="count">{totalSkills}</span>
            </button>
            {SKILL_GROUPS.map((g) => (
              <button
                key={g.key}
                type="button"
                role="tab"
                aria-selected={activeCategory === g.key}
                onClick={() => setActiveCategory(g.key)}
              >
                <span>{g.tabLabel}</span>
                <span className="count">{SKILLS_CATEGORIES[g.key].length}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div ref={listRef} className="container-x space-y-20 pb-24">
        {visibleGroups.map((group) => {
          const items = SKILLS_CATEGORIES[group.key];
          const GroupIcon = group.Icon;
          return (
            <section key={group.key} aria-labelledby={`skills-${group.key}`}>
              <div data-reveal="up" className="flex flex-col gap-4 border-b border-white/[0.06] pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="icon-tile !border-white/10 !bg-white/[0.03]">
                    <GroupIcon className={`h-5 w-5 ${group.tone}`} />
                  </div>
                  <div>
                    <h2 id={`skills-${group.key}`} className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {group.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">{group.subtitle}</p>
                  </div>
                </div>
                <span className="chip self-start sm:self-auto">
                  <span className={`h-1.5 w-1.5 rounded-full ${group.dot}`} />
                  {items.length} Competencies
                </span>
              </div>

              <div data-reveal-group className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((skill, i) => (
                  <article key={skill.name} data-reveal-item className="card card-hover spotlight group flex flex-col p-6">
                    <div className="flex items-start justify-between">
                      <div className={`icon-tile !border-white/10 !bg-white/[0.03] ${group.tone}`}>{getSkillIcon(skill.iconName)}</div>
                      <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">{group.tier}</span>
                    </div>
                    <div className="mt-6 flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="text-lg font-semibold tracking-tight text-white">{skill.name}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{skill.description}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                      {skill.tags.map((tag) => (
                        <span key={tag} className="chip !text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <div data-reveal="up" className="card flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center sm:p-9">
          <div className="flex items-start gap-4">
            <div className="icon-tile">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">See These Skills in Production</h3>
              <p className="mt-1 max-w-xl text-sm text-slate-400">
                Inspect how these frontend and backend technologies come together in the Tenant Management System case study.
              </p>
            </div>
          </div>
          <Link to="/projects/tenant-management-system" className="btn btn-primary btn-sm">
            <span>View Case Study</span>
            <ArrowRight className="icon-shift h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
