/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Briefcase,
  Mail,
  Code2,
  Server,
  Database,
  Cpu,
  Palette,
  FileCode,
  Wind,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { PERSONAL_INFO, PORTFOLIO_IMAGES, CORE_TECH_STACK, PROJECTS_LIST } from '../data/portfolioData';
import { SafeImage } from '../components/SafeImage';
import { MernArchitectureHub } from '../components/MernArchitectureHub';
import { AmbientBackground } from '../components/AmbientBackground';
import { FeaturedProjectCard } from '../components/FeaturedProjectCard';
import { SplitText } from '../components/motion/SplitText';
import { Magnetic } from '../components/motion/Magnetic';
import { Marquee } from '../components/motion/Marquee';
import { SectionHeading } from '../components/motion/SectionHeading';
import { gsap, MOTION, MOTION_OK_QUERY, useReveal, useStaggerOnChange } from '../utils/gsapAnimations';

interface TechItemDetail {
  name: string;
  category: 'frontend' | 'backend' | 'database';
  categoryLabel: string;
  level: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  iconBg: string;
  hoverGlow: string;
  topGradient: string;
  tags: string[];
}

const ENHANCED_TECH_STACK: TechItemDetail[] = [
  {
    name: 'React.js',
    category: 'frontend',
    categoryLabel: 'Frontend Architecture',
    level: 'MERN Specialist',
    description: 'Component-driven UI engineering with custom hooks, Context API, stateful routing, and declarative rendering.',
    icon: Layers,
    accentColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    hoverGlow: 'hover:border-cyan-500/50 hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]',
    topGradient: 'from-cyan-500 to-sky-400',
    tags: ['Custom Hooks', 'Virtual DOM', 'SPA Architecture'],
  },
  {
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Server Runtime',
    level: 'High Concurrency',
    description: 'Event-driven, asynchronous backend runtime for non-blocking I/O operations and scalable networked services.',
    icon: Server,
    accentColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    hoverGlow: 'hover:border-emerald-500/50 hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]',
    topGradient: 'from-emerald-500 to-green-400',
    tags: ['Event Loop', 'Async Runtime', 'Server Microservices'],
  },
  {
    name: 'Express.js',
    category: 'backend',
    categoryLabel: 'RESTful Framework',
    level: 'API Pipelines',
    description: 'Robust middleware routing architecture, JWT authentication guards, request validation, and clean CORS policies.',
    icon: Cpu,
    accentColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    hoverGlow: 'hover:border-amber-500/50 hover:shadow-[0_0_24px_rgba(245,158,11,0.15)]',
    topGradient: 'from-amber-500 to-yellow-400',
    tags: ['Middleware Pipelines', 'JWT & RBAC Guards', 'JSON Endpoints'],
  },
  {
    name: 'MongoDB',
    category: 'database',
    categoryLabel: 'NoSQL Persistence',
    level: 'Document Engine',
    description: 'Flexible JSON-like document modeling, Mongoose schema validation, aggregation pipelines, and high-speed indexing.',
    icon: Database,
    accentColor: 'text-green-400',
    iconBg: 'bg-green-500/10 text-green-400 border-green-500/30',
    hoverGlow: 'hover:border-green-500/50 hover:shadow-[0_0_24px_rgba(34,197,94,0.15)]',
    topGradient: 'from-green-500 to-emerald-400',
    tags: ['Mongoose Schemas', 'Aggregation Pipelines', 'BSON Indexing'],
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Utility Design System',
    level: 'Modern Styling',
    description: 'Precision responsive design tokens, utility layouts, theme configuration, dark mode, and smooth glassmorphism.',
    icon: Wind,
    accentColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    hoverGlow: 'hover:border-sky-500/50 hover:shadow-[0_0_24px_rgba(56,189,248,0.15)]',
    topGradient: 'from-sky-500 to-teal-400',
    tags: ['Responsive Layouts', 'Design Tokens', 'Glassmorphism'],
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    categoryLabel: 'Core Language',
    level: 'Full Standard',
    description: 'Modern language mastery: closures, async/await, Promises, functional arrays, destructuring, and event architectures.',
    icon: Code2,
    accentColor: 'text-yellow-400',
    iconBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    hoverGlow: 'hover:border-yellow-500/50 hover:shadow-[0_0_24px_rgba(234,179,8,0.15)]',
    topGradient: 'from-yellow-500 to-amber-400',
    tags: ['ES6+ Standards', 'Promises & Async', 'DOM Manipulation'],
  },
  {
    name: 'CSS3',
    category: 'frontend',
    categoryLabel: 'Styling & Motion',
    level: 'Visual Layout',
    description: 'Advanced CSS Grid, Flexbox alignment, CSS custom properties, media queries, and smooth keyframe animations.',
    icon: Palette,
    accentColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    hoverGlow: 'hover:border-blue-500/50 hover:shadow-[0_0_24px_rgba(59,130,246,0.15)]',
    topGradient: 'from-blue-500 to-indigo-400',
    tags: ['CSS Grid & Flexbox', 'Fluid Typography', 'Custom Properties'],
  },
  {
    name: 'HTML5',
    category: 'frontend',
    categoryLabel: 'Markup & Semantics',
    level: 'Accessible Standard',
    description: 'Semantic document structure, WCAG AA accessibility compliance, SEO metadata, and clean DOM hierarchies.',
    icon: FileCode,
    accentColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    hoverGlow: 'hover:border-orange-500/50 hover:shadow-[0_0_24px_rgba(249,115,22,0.15)]',
    topGradient: 'from-orange-500 to-rose-400',
    tags: ['Semantic Hierarchy', 'WCAG AA Standards', 'SEO Optimization'],
  },
];

type TechFilter = 'all' | 'frontend' | 'backend' | 'database';

const TECH_FILTERS: { id: TechFilter; label: string }[] = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'database', label: 'Database' },
];

const HERO_SOCIALS = [
  { label: 'GitHub', href: PERSONAL_INFO.github, Icon: Github, external: true },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, Icon: Linkedin, external: true },
  { label: 'Fiverr', href: PERSONAL_INFO.fiverr, Icon: Briefcase, external: true },
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, Icon: Mail, external: false },
];

export const Home: React.FC = () => {
  const tenantProject = PROJECTS_LIST.find((p) => p.slug === 'tenant-management-system') || PROJECTS_LIST[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const techGridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<TechFilter>('all');

  useReveal(containerRef);
  useStaggerOnChange(techGridRef, activeCategory);

  // Hero entrance + scroll-out choreography
  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const mm = gsap.matchMedia(hero);

    mm.add(MOTION_OK_QUERY, () => {
      const tl = gsap.timeline({ defaults: { ease: MOTION.ease, duration: 0.8 }, delay: 0.1 });
      tl.from('.hero-eyebrow', { autoAlpha: 0, y: 12, duration: 0.6 })
        .from('.hero-title .split-inner', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.07 }, '-=0.35')
        .from('.hero-role', { autoAlpha: 0, y: 16 }, '-=0.75')
        .from('.hero-intro', { autoAlpha: 0, y: 16 }, '-=0.6')
        .from('.hero-cta > *', { autoAlpha: 0, y: 14, stagger: 0.08 }, '-=0.55')
        .from('.hero-social > *', { autoAlpha: 0, y: 10, stagger: 0.05, duration: 0.6 }, '-=0.5')
        .fromTo(
          '.hero-portrait-frame',
          { clipPath: 'inset(100% 0% 0% 0% round 28px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.3, ease: 'expo.inOut' },
          0.15
        )
        .from('.hero-portrait-img', { scale: 1.2, duration: 1.8, ease: 'expo.out' }, 0.45)
        .from('.hero-portrait-ring', { autoAlpha: 0, scale: 0.94, duration: 1.2 }, 0.6)
        .from('.hero-portrait-caption', { autoAlpha: 0, y: 14 }, 1.05)
        .from('.hero-float', { autoAlpha: 0, y: 10, stagger: 0.12 }, 1.2)
        .from('.hero-scroll-cue', { autoAlpha: 0, duration: 0.6 }, 1.4);

      // Gentle idle float for the small detail chips
      gsap.to('.hero-float', { y: -6, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.8, delay: 2 });
    });

    // Scroll-out: copy and portrait drift apart slightly as the hero leaves.
    mm.add(`${MOTION_OK_QUERY} and (min-width: 1024px)`, () => {
      const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 };
      gsap.to('.hero-copy', { yPercent: -8, autoAlpha: 0.35, ease: 'none', scrollTrigger: st });
      gsap.to('.hero-portrait', { yPercent: -14, ease: 'none', scrollTrigger: st });
    });

    return () => mm.revert();
  }, []);

  const visibleTech = ENHANCED_TECH_STACK.filter((t) => activeCategory === 'all' || t.category === activeCategory);
  const countFor = (id: TechFilter) =>
    id === 'all' ? ENHANCED_TECH_STACK.length : ENHANCED_TECH_STACK.filter((t) => t.category === id).length;

  return (
    <div ref={containerRef} className="relative">
      {/* ================================================================ HERO */}
      <section
        ref={heroRef}
        className="relative isolate -mt-[72px] flex min-h-[100svh] items-center overflow-hidden pt-[112px] pb-24 lg:pb-28"
        aria-labelledby="hero-heading"
      >
        {/* Backdrop layers (CSS fallback always present beneath WebGL) */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="grid-backdrop absolute inset-0 opacity-60" />
          <div className="absolute top-[-10%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan-400/[0.07] blur-[120px]" />
          <div className="absolute right-[-10%] bottom-[10%] h-[420px] w-[520px] rounded-full bg-indigo-500/[0.07] blur-[120px]" />
          <AmbientBackground className="opacity-90" />
          {/* Readability scrims */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06080c] via-[#06080c]/75 to-[#06080c]/10 lg:via-[#06080c]/55" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#06080c] to-transparent" />
        </div>

        <div className="container-x relative">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
            {/* Copy */}
            <div className="hero-copy lg:col-span-7">
              <div className="hero-eyebrow inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] py-1.5 pr-3.5 pl-3 text-xs text-slate-300 backdrop-blur-sm">
                <span className="status-dot" aria-hidden="true" />
                <span>{PERSONAL_INFO.availability}</span>
              </div>

              <h1 id="hero-heading" className="hero-title heading-xl mt-7">
                <SplitText text="Hello, I’m" className="block text-slate-200" />
                <SplitText text={PERSONAL_INFO.name} className="block" wordClassName="text-gradient" />
              </h1>

              <p className="hero-role mt-5 text-xl font-light tracking-tight text-slate-300 sm:text-2xl lg:text-[1.75rem]">
                Full-Stack <span className="serif-accent text-[1.15em] text-white">MERN</span> Developer
              </p>

              <p className="hero-intro lede mt-6 max-w-xl text-slate-400">{PERSONAL_INFO.heroIntro}</p>

              <div className="hero-cta mt-9 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Link to="/projects" className="btn btn-primary">
                    <span>View Projects</span>
                    <ArrowRight className="icon-shift h-4 w-4" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link to="/contact" className="btn btn-secondary">
                    <span>Hire Me</span>
                    <ArrowUpRight className="icon-lift h-4 w-4 text-slate-400" />
                  </Link>
                </Magnetic>
              </div>

              <ul className="hero-social mt-10 flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Social links">
                {HERO_SOCIALS.map(({ label, href, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      <Icon className="h-4 w-4 transition-colors group-hover:text-accent" />
                      <span className="link-u pb-0.5">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Portrait */}
            <div className="hero-portrait relative mx-auto w-full max-w-[380px] sm:max-w-[420px] lg:col-span-5 lg:mr-0 lg:max-w-[440px]">
              <div
                className="hero-portrait-ring absolute -inset-4 rounded-[40px] border border-white/[0.06] sm:-inset-5"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-tr from-cyan-400/15 via-transparent to-indigo-500/15 blur-3xl"
                aria-hidden="true"
              />

              <figure className="hero-portrait-frame relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 bg-ink-850 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                <SafeImage
                  src={PORTFOLIO_IMAGES.heroProfile}
                  srcSet={PORTFOLIO_IMAGES.heroProfileSrcSet}
                  sizes="(max-width: 1023px) 86vw, 460px"
                  width={900}
                  height={900}
                  priority
                  alt="Portrait of Haroon Khan, Full-Stack MERN Developer, wearing a dark blazer and light blue shirt"
                  fallbackTitle="Haroon Khan"
                  className="hero-portrait-img h-full w-full object-cover object-[50%_28%]"
                />
                {/* subtle lighting + legibility gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10 ring-inset" />

                <figcaption className="hero-portrait-caption absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{PERSONAL_INFO.name}</p>
                    <p className="truncate font-mono text-[11px] text-accent">{PERSONAL_INFO.title}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 text-[11px] font-medium text-emerald-300">
                    <span className="status-dot" aria-hidden="true" />
                    Available for Hire
                  </span>
                </figcaption>
              </figure>

              {/* Small detail chips */}
              <div
                className="hero-float absolute top-8 -left-4 hidden items-center gap-2 rounded-xl border border-white/10 bg-ink-900/80 px-3 py-2 font-mono text-[11px] text-slate-300 shadow-xl backdrop-blur-md sm:flex lg:-left-10"
                aria-hidden="true"
              >
                <Code2 className="h-3.5 w-3.5 text-accent" />
                React · Node.js
              </div>
              <div
                className="hero-float absolute top-1/2 -right-3 hidden items-center gap-2 rounded-xl border border-white/10 bg-ink-900/80 px-3 py-2 font-mono text-[11px] text-slate-300 shadow-xl backdrop-blur-md sm:flex lg:-right-6"
                aria-hidden="true"
              >
                <Database className="h-3.5 w-3.5 text-emerald-400" />
                MongoDB
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll-cue absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" aria-hidden="true">
          <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500 uppercase">Scroll</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_cubic-bezier(.16,1,.3,1)_infinite] bg-accent" />
          </span>
        </div>
      </section>

      {/* ================================================================ STACK MARQUEE */}
      <section aria-label="Core engineering stack" className="border-y border-white/[0.06] bg-ink-900/60 py-7">
        <div className="container-x mb-4 flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">Core Engineering Stack</span>
          <span className="hidden font-mono text-[11px] text-slate-600 sm:block">{CORE_TECH_STACK.length} technologies</span>
        </div>
        <Marquee items={CORE_TECH_STACK.map((t) => t.name)} />
      </section>

      {/* ================================================================ ARCHITECTURE */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="System Architecture & Lifecycle"
            title={
              <>
                MERN architecture &amp; <span className="serif-accent text-accent">engineering</span> pipeline
              </>
            }
            description="Explore the end-to-end data pipeline: from client-side React UI components, through Express REST middleware and Node.js asynchronous runtime, down to persistent MongoDB document clusters."
          />
          <div data-reveal="up" className="mt-12">
            <MernArchitectureHub />
          </div>
        </div>
      </section>

      {/* ================================================================ TECH STACK */}
      <section className="section-y relative border-t border-white/[0.05]">
        <div className="container-x">
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Core Technology Stack"
              title={
                <>
                  Technologies engineered <br className="hidden sm:block" />
                  for <span className="serif-accent text-accent">production</span>
                </>
              }
              description="Proven modern full-stack technologies utilized to construct robust, high-performance web applications, responsive user interfaces, and reliable RESTful architectures."
            />
            <div data-reveal="fade" className="segmented self-start" role="tablist" aria-label="Filter technologies">
              {TECH_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === f.id}
                  onClick={() => setActiveCategory(f.id)}
                >
                  <span>{f.label}</span>
                  <span className="count">{countFor(f.id)}</span>
                </button>
              ))}
            </div>
          </div>

          <div
            ref={techGridRef}
            data-reveal-group
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visibleTech.map((tech) => {
              const Icon = tech.icon;
              return (
                <div key={tech.name} data-reveal-item className="card card-hover spotlight group flex flex-col p-6">
                  <div className="flex items-start justify-between">
                    <div className="icon-tile !border-white/10 !bg-white/[0.03]">
                      <Icon className={`h-5 w-5 ${tech.accentColor}`} />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">{tech.level}</span>
                  </div>
                  <div className="mt-6">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase">{tech.categoryLabel}</span>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-white">{tech.name}</h3>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-slate-400">{tech.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {tech.tags.map((tag) => (
                      <span key={tag} className="chip !text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Standards banner */}
          <div data-reveal="up" className="card mt-6 flex flex-col items-start justify-between gap-6 p-6 sm:p-7 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="icon-tile">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Engineered for Reliability &amp; Scale</h3>
                <p className="mt-1 max-w-xl text-sm text-slate-400">
                  Every project enforces strict ES6+ modularization, secure JWT role verification, clean REST API contracts, and fluid
                  responsive styling.
                </p>
              </div>
            </div>
            <Link to="/skills" className="btn btn-secondary btn-sm w-full sm:w-auto">
              <span>Explore All Technical Skills</span>
              <ArrowRight className="icon-shift h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ FEATURED PROJECT */}
      <section className="section-y relative border-t border-white/[0.05] bg-gradient-to-b from-ink-900/50 to-transparent">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Featured Case Study"
              title={
                <>
                  Selected <span className="serif-accent text-accent">work</span>
                </>
              }
              description="A closer look at the flagship full-stack MERN build — architecture, roles, and the problems it solves."
            />
            <Link
              data-reveal="fade"
              to="/projects/tenant-management-system"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
            >
              <span className="link-u pb-0.5">Read Full Case Study</span>
              <ArrowRight className="h-4 w-4 text-accent transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>

          <FeaturedProjectCard
            project={tenantProject}
            highlights={[
              'Admin, Owner, and Tenant role segregation with secured JWT middleware.',
              'Unit assignments, invitation token activation, and payment audit logs.',
              'MongoDB Mongoose modeling with multi-tenant data isolation.',
            ]}
          />
        </div>
      </section>

      {/* ================================================================ CTA */}
      <section className="section-y pt-8">
        <div className="container-x">
          <div data-reveal="scale" className="card relative overflow-hidden px-6 py-16 text-center sm:px-12 md:py-24">
            <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-3xl">
              <span className="eyebrow">Ready to Collaborate</span>
              <h2 className="mt-6 text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-balance text-white sm:text-4xl lg:text-[2.9rem]">
                {PERSONAL_INFO.contactCta}
              </h2>
              <p className="lede mx-auto mt-5 max-w-xl text-slate-400">
                Whether you need a full-stack MERN application from scratch, modern React frontend development, RESTful API architecture,
                or database optimization, I am ready to deliver clean, maintainable code.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <Link to="/contact" className="btn btn-primary">
                    <span>Start a Conversation</span>
                    <ArrowRight className="icon-shift h-4 w-4" />
                  </Link>
                </Magnetic>
                <a href={PERSONAL_INFO.fiverr} target="_blank" rel="noopener noreferrer" className="btn btn-fiverr">
                  <Briefcase className="h-4 w-4" />
                  <span>Hire on Fiverr</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
