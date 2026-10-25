/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github, Check } from 'lucide-react';
import type { ProjectData } from '../data/portfolioData';
import { SafeImage } from './SafeImage';
import { Magnetic } from './motion/Magnetic';
import { useHoverDrift } from '../utils/gsapAnimations';

interface FeaturedProjectCardProps {
  project: ProjectData;
  highlights: string[];
  index?: string;
  label?: string;
  headingLevel?: 'h2' | 'h3';
}

/**
 * Case-study style showcase for the flagship project: framed screenshot with
 * pointer drift on the left, structured summary + actions on the right.
 */
export const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  project,
  highlights,
  index = '01',
  label = 'Featured case study',
  headingLevel = 'h3',
}) => {
  const frameRef = useHoverDrift<HTMLAnchorElement>(8, 1.05);
  const Heading = headingLevel;

  return (
    <article className="card spotlight overflow-hidden p-2 sm:p-3">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-3">
        {/* Visual */}
        <div data-reveal="clip" className="lg:col-span-7">
          <div className="relative h-full overflow-hidden rounded-[14px] border border-white/[0.06] bg-ink-950">
            {/* Window chrome */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 truncate rounded-md bg-white/[0.03] px-3 py-1 text-center font-mono text-[10px] text-slate-500">
                {project.slug}
              </div>
            </div>
            <Link
              to={`/projects/${project.slug}`}
              ref={frameRef}
              className="group relative block aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-[calc(100%-41px)] lg:min-h-[420px]"
              aria-label={`Open ${project.title} case study`}
            >
              <SafeImage
                src={project.image}
                alt={project.imageAlt}
                fallbackTitle={project.title}
                className="h-full w-full object-cover object-top will-change-transform"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                View case study <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-col justify-between gap-8 p-5 sm:p-8 lg:col-span-5">
          <div data-reveal-group className="space-y-5">
            <div data-reveal-item className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase">
                <span className="text-accent">{index}</span> — {label}
              </span>
              <span className="chip chip-accent">{project.category}</span>
            </div>

            <Heading data-reveal-item className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-[2rem] sm:leading-tight">
              {project.title}
            </Heading>

            <p data-reveal-item className="text-sm leading-relaxed text-slate-300/90 sm:text-[15px]">
              {project.shortDescription}
            </p>

            <ul data-reveal-item className="space-y-2.5 border-t border-white/[0.06] pt-5">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-[13px] leading-relaxed text-slate-300">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div data-reveal-item className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 border-t border-white/[0.06] pt-6">
            <Magnetic>
              <Link to={`/projects/${project.slug}`} className="btn btn-primary btn-sm">
                <span>View Details</span>
                <ArrowRight className="icon-shift h-3.5 w-3.5" />
              </Link>
            </Magnetic>
            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              <span>Live Demo</span>
              <ExternalLink className="icon-lift h-3.5 w-3.5 text-slate-400" />
            </a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
