import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Layout,
  Layers,
  Server,
  Network,
  Database,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Bug,
  Wrench,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Check,
  Briefcase,
} from 'lucide-react';
import { SERVICES_LIST, PERSONAL_INFO } from '../data/portfolioData';
import { SectionHeading } from '../components/motion/SectionHeading';
import { Magnetic } from '../components/motion/Magnetic';
import { useReveal } from '../utils/gsapAnimations';

const getServiceIcon = (iconName: string) => {
  const iconProps = { className: 'w-5 h-5' };
  switch (iconName) {
    case 'Smartphone':
      return <Smartphone {...iconProps} />;
    case 'Layout':
      return <Layout {...iconProps} />;
    case 'Layers':
      return <Layers {...iconProps} />;
    case 'Server':
      return <Server {...iconProps} />;
    case 'Network':
      return <Network {...iconProps} />;
    case 'Database':
      return <Database {...iconProps} />;
    case 'ShieldCheck':
      return <ShieldCheck {...iconProps} />;
    case 'BarChart3':
      return <BarChart3 {...iconProps} />;
    case 'Sparkles':
      return <Sparkles {...iconProps} />;
    case 'Bug':
      return <Bug {...iconProps} />;
    case 'Wrench':
      return <Wrench {...iconProps} />;
    case 'Zap':
      return <Zap {...iconProps} />;
    default:
      return <Layers {...iconProps} />;
  }
};

const PROCESS = [
  {
    phase: 'Phase 01',
    title: 'Discovery & Scope',
    text: 'Clarifying feature requirements, user roles, database schema relationships, and target timelines.',
  },
  {
    phase: 'Phase 02',
    title: 'Architecture & APIs',
    text: 'Constructing secure REST endpoints, database collections, and auth middleware validation layers.',
  },
  {
    phase: 'Phase 03',
    title: 'Frontend & UI',
    text: 'Building responsive React components with Tailwind CSS, state hooks, and fluid user feedback.',
  },
  {
    phase: 'Phase 04',
    title: 'Testing & Launch',
    text: 'Rigorous cross-device testing, bug verification, and seamless handoff or deployment.',
  },
];

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal(containerRef);

  return (
    <div ref={containerRef} className="relative">
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeading
            as="h1"
            eyebrow="Professional Offerings"
            title={
              <>
                Full-Stack MERN &amp; <span className="serif-accent text-accent">frontend</span> services
              </>
            }
            description="Tailored engineering solutions for freelance clients, Fiverr customers, startups, and growing businesses looking to build, fix, or scale their web applications."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div data-reveal-group className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_LIST.map((service, index) => (
              <article key={service.id} data-reveal-item className="card card-hover spotlight group flex flex-col p-7">
                <div className="flex items-start justify-between">
                  <div className="icon-tile">{getServiceIcon(service.iconName)}</div>
                  <span className="font-mono text-[11px] text-slate-600">{String(index + 1).padStart(2, '0')}</span>
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{service.description}</p>

                <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-5">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] text-slate-300">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <Link
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="group/link inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                  >
                    <span className="link-u pb-0.5">Discuss This Project</span>
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-y border-t border-white/[0.05]">
        <div className="container-x">
          <SectionHeading
            eyebrow="Working Process"
            title={
              <>
                How we turn ideas into <span className="serif-accent text-accent">production</span> software
              </>
            }
          />

          <div className="relative mt-14">
          <div
            className="pointer-events-none absolute top-[27px] right-[12%] left-[3%] hidden h-px bg-gradient-to-r from-accent/40 via-accent/20 to-accent/0 lg:block"
            aria-hidden="true"
          />
          <ol data-reveal-group className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS.map((p, i) => (
              <li key={p.phase} data-reveal-item className="relative">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-ink-850 font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-6">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase">{p.phase}</span>
                  <h3 className="mt-2 text-base font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
          </div>

          <div data-reveal="up" className="card mt-16 flex flex-col items-start justify-between gap-6 p-7 sm:p-9 md:flex-row md:items-center">
            <p className="max-w-xl text-[15px] text-slate-300">
              Need a custom package or quick bug fix? Contact directly or place an order on Fiverr.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link to="/contact" className="btn btn-primary btn-sm">
                  <span>Get a Quote</span>
                  <ArrowRight className="icon-shift h-3.5 w-3.5" />
                </Link>
              </Magnetic>
              <a href={PERSONAL_INFO.fiverr} target="_blank" rel="noopener noreferrer" className="btn btn-fiverr btn-sm">
                <Briefcase className="h-3.5 w-3.5" />
                <span>Fiverr Gig</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
