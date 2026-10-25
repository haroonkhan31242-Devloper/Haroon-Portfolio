import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Layers, Target, Compass, Check } from 'lucide-react';
import { PERSONAL_INFO, PORTFOLIO_IMAGES } from '../data/portfolioData';
import { SafeImage } from '../components/SafeImage';
import { SectionHeading } from '../components/motion/SectionHeading';
import { Magnetic } from '../components/motion/Magnetic';
import { useReveal } from '../utils/gsapAnimations';

const strengths = [
  {
    title: 'Full-Stack Holistic Perspective',
    description:
      'Understanding both the micro-details of client-side React rendering and the architectural requirements of Node/Express server routing and MongoDB schemas.',
  },
  {
    title: 'Clean Code & Maintainability',
    description:
      'Writing structured, readable, and modular code with consistent naming conventions, clear component boundaries, and reusable custom hooks.',
  },
  {
    title: 'User-First Usability & UI Polish',
    description:
      'Prioritizing intuitive user workflows, accessible touch targets, responsive breakpoints, and purposeful micro-interactions with Tailwind CSS.',
  },
  {
    title: 'Pragmatic Problem Solving',
    description:
      'Deconstructing complex product requirements into reliable iterative deliverables without unnecessary bloat or premature optimization.',
  },
];

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal(containerRef);

  return (
    <div ref={containerRef} className="relative">
      {/* Header */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeading
            as="h1"
            eyebrow="About Me"
            title={
              <>
                Crafting reliable, modern web experiences with the{' '}
                <span className="serif-accent text-accent">MERN</span> stack
              </>
            }
            description="I am a dedicated Full-Stack MERN Developer driven by the desire to turn complex problems into clean, intuitive, and practical web applications."
            className="max-w-4xl"
          />
        </div>
      </section>

      {/* Narrative + visual */}
      <section className="pb-24">
        <div className="container-x grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-5 lg:col-span-7">
            {[
              {
                Icon: Terminal,
                title: 'The Development Journey',
                body: (
                  <>
                    <p>
                      My passion for web development began with a genuine curiosity about how interconnected systems power modern digital
                      life. What began with mastering semantic HTML, modern CSS styling, and JavaScript logic soon evolved into building
                      complete, full-stack applications with the MERN (MongoDB, Express, React, Node.js) ecosystem.
                    </p>
                    <p>
                      I enjoy every stage of the development process—from architecting clean REST API endpoints and designing NoSQL document
                      relationships to refining responsive layouts and fluid interactions in React.
                    </p>
                  </>
                ),
              },
              {
                Icon: Layers,
                title: 'Frontend & Backend Discipline',
                body: (
                  <>
                    <p>
                      On the <strong className="font-semibold text-white">Frontend</strong>, I leverage React.js and Tailwind CSS to construct
                      fast, responsive single-page applications. I emphasize clean component decomposition, strict state management, and
                      accessible UI patterns that feel natural on any device.
                    </p>
                    <p>
                      On the <strong className="font-semibold text-white">Backend</strong>, I focus on building resilient Node.js and
                      Express.js servers. I structure RESTful API endpoints with validation layers, secure JWT authentication, and
                      fine-grained Role-Based Access Control (RBAC), backed by MongoDB and Mongoose schemas designed for data integrity.
                    </p>
                  </>
                ),
              },
              {
                Icon: Target,
                title: 'Focus & Core Philosophy',
                body: (
                  <>
                    <p>
                      I believe that software should be{' '}
                      <span className="font-medium text-white">functional, performant, and delightful to use</span>. A beautiful interface
                      means nothing if the underlying API is slow or prone to errors, just as a powerful database is useless without an
                      intuitive user experience.
                    </p>
                    <p>My goal is to deliver balanced software where thoughtful design meets dependable engineering.</p>
                  </>
                ),
              },
            ].map(({ Icon, title, body }, i) => (
              <article key={title} data-reveal="up" data-delay={String(i * 0.05)} className="card card-hover spotlight p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="icon-tile">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-slate-500">0{i + 1}</span>
                    <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{title}</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-300/90">{body}</div>
              </article>
            ))}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:col-span-5">
            <figure data-reveal="clip" className="card overflow-hidden p-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-ink-950">
                <div data-parallax="10" className="absolute -inset-y-8 inset-x-0">
                  <SafeImage
                    src={PORTFOLIO_IMAGES.aboutWorkspace}
                    alt="Modern developer workspace setup"
                    fallbackTitle="Haroon Khan Development Setup"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              </div>
              <figcaption className="px-4 pt-4 pb-3">
                <span className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">Engineering Philosophy</span>
                <p className="mt-1.5 text-sm font-medium text-white">Clean Architecture · Predictable State · Scalable Models</p>
              </figcaption>
            </figure>

            <div data-reveal="up" className="card p-6 sm:p-7">
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">Quick Facts</h3>
              <dl className="mt-4 divide-y divide-white/[0.06] text-sm">
                {[
                  ['Name', PERSONAL_INFO.name, 'text-white'],
                  ['Specialization', 'Full-Stack MERN', 'text-accent'],
                  ['Services', 'Freelance, Startups & Contracts', 'text-white'],
                ].map(([k, v, c]) => (
                  <div key={k} className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-slate-400">{k}</dt>
                    <dd className={`text-right font-medium ${c}`}>{v}</dd>
                  </div>
                ))}
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="text-slate-400">Direct Contact</dt>
                  <dd>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="link-u font-mono text-[13px] break-all text-accent">
                      {PERSONAL_INFO.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* Strengths */}
      <section className="section-y border-t border-white/[0.05]">
        <div className="container-x">
          <SectionHeading
            eyebrow="Value Proposition"
            title={
              <>
                Core strengths I bring to your <span className="serif-accent text-accent">team</span> &amp; project
              </>
            }
          />
          <div data-reveal-group className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {strengths.map((s, i) => (
              <div key={s.title} data-reveal-item className="card card-hover spotlight p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="font-mono text-[11px] text-slate-600">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career goals */}
      <section className="pb-24 sm:pb-28">
        <div className="container-x">
          <div data-reveal="scale" className="card relative overflow-hidden p-8 sm:p-12">
            <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-[90px]" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                  <Compass className="h-4 w-4" />
                  <span>Future Vision</span>
                </div>
                <h2 className="heading-md mt-4">Career Goals &amp; Ongoing Growth</h2>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-300/90">
                  My objective is to collaborate with forward-thinking clients, engineering teams, and startups to build meaningful products
                  that people use every day. I continuously refine my skills in scalable full-stack system architecture, API security
                  protocols, modern React rendering patterns, and developer ergonomics.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                <Magnetic>
                  <Link to="/projects" className="btn btn-primary">
                    <span>Explore My Work</span>
                    <ArrowRight className="icon-shift h-4 w-4" />
                  </Link>
                </Magnetic>
                <Link to="/contact" className="btn btn-secondary">
                  Let’s Talk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
