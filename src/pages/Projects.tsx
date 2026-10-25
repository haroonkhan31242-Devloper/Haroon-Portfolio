import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS_LIST, type ProjectData } from '../data/portfolioData';
import { SafeImage } from '../components/SafeImage';
import { FeaturedProjectCard } from '../components/FeaturedProjectCard';
import { SectionHeading } from '../components/motion/SectionHeading';
import { useHoverDrift, useReveal, useStaggerOnChange } from '../utils/gsapAnimations';

type ProjectFilter = 'All' | 'Full-Stack' | 'Frontend' | 'Backend';

const matchesFilter = (p: ProjectData, filter: ProjectFilter) => {
  if (filter === 'All') return true;
  if (filter === 'Full-Stack') return p.category.includes('Full-Stack');
  if (filter === 'Frontend') return p.category === 'Frontend';
  if (filter === 'Backend') return p.category.includes('Backend');
  return true;
};

const ProjectCard: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
  const frameRef = useHoverDrift<HTMLDivElement>(6, 1.06);
  const isCaseStudy = project.slug === 'tenant-management-system';

  return (
    <article className="card card-hover spotlight group flex w-full flex-col overflow-hidden p-2">
      <div ref={frameRef} className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-ink-950">
        <SafeImage
          src={project.image}
          alt={project.imageAlt}
          fallbackTitle={project.title}
          className="h-full w-full object-cover will-change-transform"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
        <span className="chip absolute top-3 left-3 border-white/15 bg-black/50 text-slate-100 backdrop-blur-md">{project.category}</span>
        <span className="absolute top-3 right-3 font-mono text-[11px] text-white/60">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="flex flex-1 flex-col px-4 pt-5 pb-3">
        <h3 className="text-lg font-semibold tracking-tight text-white">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">{project.shortDescription}</p>

        <div className="mt-4 mb-6 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="chip !text-[10px]">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="chip chip-accent !text-[10px]">+{project.technologies.length - 4}</span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
          {isCaseStudy ? (
            <Link to={`/projects/${project.slug}`} className="btn btn-primary btn-sm">
              <span>Case Study</span>
              <ArrowRight className="icon-shift h-3.5 w-3.5" />
            </Link>
          ) : (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              <span>Inspect Code</span>
              <ArrowUpRight className="icon-lift h-3.5 w-3.5" />
            </a>
          )}

          <div className="flex items-center gap-1">
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Demo"
              className="btn btn-ghost btn-sm !px-3"
            >
              <span>Demo</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Repository"
              aria-label={`${project.title} on GitHub`}
              className="btn btn-ghost btn-sm !px-2.5"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useReveal(containerRef);
  useStaggerOnChange(gridRef, activeFilter);

  const filteredProjects = PROJECTS_LIST.filter((p) => matchesFilter(p, activeFilter));
  const mainProject = PROJECTS_LIST.find((p) => p.slug === 'tenant-management-system') || PROJECTS_LIST[0];

  return (
    <div ref={containerRef} className="relative">
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeading
            as="h1"
            eyebrow="Selected Works"
            title={
              <>
                Engineering projects &amp; <span className="serif-accent text-accent">real-world</span> implementations
              </>
            }
            description="Real full-stack architectures, interactive frontend applications, and secure RESTful services built using React, Node.js, Express, and MongoDB."
            className="max-w-4xl"
          />
        </div>
      </section>

      {/* Flagship */}
      <section className="pb-20">
        <div className="container-x">
          <FeaturedProjectCard
            project={mainProject}
            label="Flagship case study"
            headingLevel="h2"
            highlights={[
              'Admin creates and manages owner accounts',
              'Owners create and invite tenants with unique tokens',
              'Tenants activate accounts and view assigned rental units',
              'Owners record rent payments; tenants inspect transparent audit ledger',
            ]}
          />
        </div>
      </section>

      {/* All projects */}
      <section className="border-t border-white/[0.05] pt-16 pb-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div data-reveal="up">
              <h2 className="heading-md">All Projects Portfolio</h2>
              <p className="mt-2 text-sm text-slate-400">Filter by engineering focus area</p>
            </div>
            <div data-reveal="fade" className="segmented self-start sm:self-auto" role="tablist" aria-label="Project Categories">
              {(['All', 'Full-Stack', 'Frontend', 'Backend'] as const).map((cat) => (
                <button key={cat} type="button" role="tab" aria-selected={activeFilter === cat} onClick={() => setActiveFilter(cat)}>
                  <span>{cat}</span>
                  <span className="count">{PROJECTS_LIST.filter((p) => matchesFilter(p, cat)).length}</span>
                </button>
              ))}
            </div>
          </div>

          <div ref={gridRef} data-reveal-group className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div key={project.id} data-reveal-item className="flex">
                <ProjectCard project={project} index={PROJECTS_LIST.indexOf(project)} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
