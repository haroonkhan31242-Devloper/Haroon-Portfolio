/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Check, Building, KeyRound, ShieldCheck, X, Maximize2, ArrowRight } from 'lucide-react';
import { PROJECTS_LIST, PORTFOLIO_IMAGES } from '../data/portfolioData';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/motion/SectionHeading';
import { Magnetic } from '../components/motion/Magnetic';
import { gsap, isReducedMotion, MOTION, useHoverDrift, useReveal } from '../utils/gsapAnimations';

const ACTOR_STYLES: Record<string, string> = {
  Admin: 'text-violet-300 border-violet-400/25 bg-violet-400/[0.07]',
  Owner: 'text-amber-300 border-amber-400/25 bg-amber-400/[0.07]',
  Tenant: 'text-cyan-300 border-cyan-400/25 bg-cyan-400/[0.07]',
  System: 'text-slate-300 border-white/15 bg-white/[0.04]',
};

const workflows = [
  {
    role: 'System Administrator',
    Icon: ShieldCheck,
    tone: 'text-violet-300',
    title: 'Admin Workflow',
    description: 'Supervises platform activity, provisions verified Property Owner credentials, and oversees global tenant activity.',
    points: [
      'Creates and provisions authenticated owner profiles',
      'Sets property limits and oversees platform authorization boundaries',
      'Monitors system health and audits administrative operations',
    ],
  },
  {
    role: 'Property Owner',
    Icon: Building,
    tone: 'text-amber-300',
    title: 'Owner Workflow',
    description: 'Manages physical real estate units, invites prospective tenants, and records verified rental payments.',
    points: [
      'Registers residential buildings and creates individual rental units',
      'Generates secure one-time onboarding invitation tokens for tenants',
      'Manually records received rent payments with payment method notes',
      'Assigns and reallocates vacant units to active tenants',
    ],
  },
  {
    role: 'Residential Tenant',
    Icon: KeyRound,
    tone: 'text-cyan-300',
    title: 'Tenant Workflow',
    description: 'Activates their account via secure link, reviews assigned lease unit, and tracks rent transactions.',
    points: [
      'Claims onboarding invitation token and establishes encrypted credentials',
      'Inspects assigned home/unit details, lease terms, and monthly rent rate',
      'Views complete payment history with receipt IDs and timestamps',
      'Accesses immutable transaction audit trail to eliminate billing disputes',
    ],
  },
];

const ScreenshotCard: React.FC<{ title: string; caption: string; url: string; onOpen: () => void }> = ({
  title,
  caption,
  url,
  onOpen,
}) => {
  const frameRef = useHoverDrift<HTMLDivElement>(6, 1.06);
  return (
    <div className="card card-hover spotlight group relative flex w-full flex-col overflow-hidden p-2">
      <div ref={frameRef} className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-ink-950">
        <SafeImage src={url} alt={title} fallbackTitle={title} className="h-full w-full object-cover will-change-transform" />
        <span className="pointer-events-none absolute right-3 bottom-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" />
          Expand
        </span>
      </div>
      <div className="px-3 pt-4 pb-3">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{caption}</p>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 z-10 cursor-zoom-in rounded-[inherit]"
        aria-label={`Expand screenshot: ${title}`}
      />
    </div>
  );
};

export const ProjectDetails: React.FC = () => {
  const project = PROJECTS_LIST.find((p) => p.slug === 'tenant-management-system') || PROJECTS_LIST[0];
  const [selected, setSelected] = useState<{ url: string; title: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useReveal(containerRef);

  // Hero entrance
  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero || isReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: MOTION.ease } })
        .from('.pd-crumb', { autoAlpha: 0, y: 8, duration: 0.5 })
        .from('.pd-chip', { autoAlpha: 0, y: 8, stagger: 0.06, duration: 0.5 }, '-=0.3')
        .from('.pd-title', { autoAlpha: 0, y: 28, duration: 0.9, ease: 'expo.out' }, '-=0.3')
        .from('.pd-lede', { autoAlpha: 0, y: 16, duration: 0.7 }, '-=0.6')
        .from('.pd-cta > *', { autoAlpha: 0, y: 12, stagger: 0.08, duration: 0.6 }, '-=0.5');
    }, hero);
    return () => ctx.revert();
  }, []);

  // Lightbox: escape to close, scroll lock, focus management, entrance tween
  useEffect(() => {
    if (!selected) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);

    let tween: gsap.core.Timeline | undefined;
    if (lightboxRef.current && !isReducedMotion()) {
      tween = gsap
        .timeline()
        .fromTo(lightboxRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
        .fromTo(
          lightboxRef.current.querySelector('[data-lightbox-panel]'),
          { y: 20, scale: 0.97 },
          { y: 0, scale: 1, duration: 0.5, ease: MOTION.ease },
          0
        );
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      tween?.kill();
      lastFocus.current?.focus?.();
    };
  }, [selected]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden pt-12 pb-14 sm:pt-16">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative">
          <div className="pd-crumb flex flex-wrap items-center justify-between gap-4">
            <Link to="/projects" className="group inline-flex items-center gap-2 font-mono text-xs text-slate-400 transition-colors hover:text-white">
              <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
              <span>Back to All Projects</span>
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <Link to="/projects" className="hover:text-white">
                Projects
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-accent" aria-current="page">
                Tenant Management System
              </span>
            </nav>
          </div>

          <div className="mt-14 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pd-chip chip chip-accent">Full-Stack MERN Architecture</span>
              <span className="pd-chip chip">Role-Based Access Control (RBAC)</span>
            </div>
            <h1 className="pd-title heading-xl mt-6">{project.title}</h1>
            <p className="pd-lede lede mt-6 max-w-3xl">{project.shortDescription}</p>
            <div className="pd-cta mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <span>Launch Live Demo</span>
                  <ExternalLink className="icon-lift h-4 w-4" />
                </a>
              </Magnetic>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Github className="h-4 w-4 text-slate-400" />
                <span>Inspect Source on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main screenshot */}
      <section className="pb-24">
        <div className="container-x">
          <figure data-reveal="clip" className="card overflow-hidden p-2">
            <div className="overflow-hidden rounded-[14px] border border-white/[0.06] bg-ink-950">
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
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <div data-parallax="8" className="absolute -inset-y-6 inset-x-0">
                  <SafeImage src={project.image} alt={project.imageAlt} fallbackTitle={project.title} className="h-full w-full object-cover object-top" />
                </div>
              </div>
            </div>
            <figcaption className="flex flex-col gap-1 px-3 pt-3 pb-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <span>Unified Property &amp; Tenant Management Dashboard</span>
              <span className="font-mono text-accent">React · Tailwind CSS · Node.js · Express · MongoDB</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Workflow */}
      <section className="section-y border-t border-white/[0.05]">
        <div className="container-x">
          <SectionHeading
            eyebrow="System Architecture Flow"
            title={
              <>
                Complete end-to-end <span className="serif-accent text-accent">operational</span> workflow
              </>
            }
            description="From administrative tenant onboarding to transparent rent payment auditing."
          />

          <ol data-reveal-group className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.rolesWorkflow?.map((step) => (
              <li key={step.stepNumber} data-reveal-item className="card card-hover spotlight p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-slate-500 uppercase">
                    Step <span className="text-accent">0{step.stepNumber}</span>
                  </span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${ACTOR_STYLES[step.actor]}`}>{step.actor}</span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-white">{step.action}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
              </li>
            ))}
          </ol>

          <div
            data-reveal="up"
            className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-5 text-center font-mono text-xs"
          >
            <span className="text-violet-300">Admin creates owner</span>
            <ArrowRight className="h-3 w-3 text-slate-600" />
            <span className="text-amber-300">Owner invites tenant</span>
            <ArrowRight className="h-3 w-3 text-slate-600" />
            <span className="text-cyan-300">Tenant activates account</span>
            <ArrowRight className="h-3 w-3 text-slate-600" />
            <span className="text-white">Tenant receives assigned home</span>
            <ArrowRight className="h-3 w-3 text-slate-600" />
            <span className="text-amber-300">Owner records payment</span>
            <ArrowRight className="h-3 w-3 text-slate-600" />
            <span className="text-cyan-300">Tenant views payment &amp; audit history</span>
          </div>
        </div>
      </section>

      {/* Problem & solution */}
      <section className="pb-24">
        <div className="container-x grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article data-reveal="up" className="card p-8 sm:p-10">
            <span className="eyebrow">The Challenge</span>
            <h2 className="heading-md mt-4">Problem Solved</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-300/90">{project.problemSolved}</p>
            <ul className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
              {[
                'Replaces disorganized manual paperwork with centralized cloud records.',
                'Enforces cryptographic token invitation to prevent unauthorized tenant registration.',
                'Provides total transparency over payment histories to eliminate misunderstandings.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-slate-400">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </article>

          <article data-reveal="up" data-delay="0.08" className="card p-8 sm:p-10">
            <span className="eyebrow">Engineered Solution</span>
            <h2 className="heading-md mt-4">Full-Stack MERN Architecture</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-300/90">{project.fullDescription}</p>
            <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-6">
              {project.technologies.map((t) => (
                <span key={t} className="chip chip-accent">
                  {t}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* RBAC roles */}
      <section className="section-y border-t border-white/[0.05]">
        <div className="container-x">
          <SectionHeading
            eyebrow="Role Segregation"
            title={
              <>
                Three-tier role-based <span className="serif-accent text-accent">access</span> control
              </>
            }
            description="Each user persona enters a dedicated interface strictly scoped to their operational permissions."
          />
          <div data-reveal-group className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {workflows.map(({ role, Icon, tone, title, description, points }) => (
              <article key={role} data-reveal-item className="card card-hover spotlight flex flex-col p-7">
                <div className="flex items-center gap-4">
                  <div className="icon-tile !border-white/10 !bg-white/[0.03]">
                    <Icon className={`h-5 w-5 ${tone}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{role}</h3>
                    <span className="font-mono text-[11px] text-slate-500">{title}</span>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-slate-400">{description}</p>
                <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
                  {points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[13px] text-slate-300">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.5} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="pb-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Visual Interfaces"
            title="Application Screenshots & Walkthrough"
            description="Click any screenshot to inspect high-resolution interface details."
            size="md"
          />
          <div data-reveal-group className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {PORTFOLIO_IMAGES.tenantScreenshots.map((item) => (
              <div key={item.title} data-reveal-item className="flex">
                <ScreenshotCard {...item} onOpen={() => setSelected({ url: item.url, title: item.title })} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section-y border-t border-white/[0.05]">
        <div className="container-x">
          <SectionHeading
            eyebrow="Engineering Rigor"
            title={
              <>
                Key technical <span className="serif-accent text-accent">challenges</span> &amp; solutions
              </>
            }
          />
          <div data-reveal-group className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {project.challenges.map((item, idx) => (
              <article key={item.problem} data-reveal-item className="card p-7">
                <span className="font-mono text-[11px] tracking-[0.16em] text-slate-500 uppercase">
                  Challenge <span className="text-accent">0{idx + 1}</span>
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{item.problem}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.solution}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="pb-24 sm:pb-28">
        <div className="container-x">
          <div data-reveal="scale" className="card p-8 sm:p-12">
            <span className="eyebrow">Impact</span>
            <h2 className="heading-md mt-4">Final Results &amp; Takeaways</h2>
            <div data-reveal-group className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.outcomes.map((outcome) => (
                <div key={outcome} data-reveal-item className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-300">{outcome}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-400">Interested in deploying a similar MERN management platform or dashboard?</p>
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Link to="/contact" className="btn btn-primary btn-sm">
                    <span>Hire Haroon Khan</span>
                    <ArrowRight className="icon-shift h-3.5 w-3.5" />
                  </Link>
                </Magnetic>
                <Link to="/projects" className="btn btn-secondary btn-sm">
                  More Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setSelected(null)}
        >
          <div
            data-lightbox-panel
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <span className="truncate font-mono text-xs text-slate-300">{selected.title}</span>
              <button
                ref={closeBtnRef}
                onClick={() => setSelected(null)}
                className="cursor-pointer rounded-full p-1.5 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Close Preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-[16/10] w-full bg-ink-950">
              <img src={selected.url} alt={selected.title} className="h-full w-full object-contain" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
