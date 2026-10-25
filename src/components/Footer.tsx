/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Briefcase, Mail, ArrowUpRight, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useReveal } from '../utils/gsapAnimations';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Me' },
  { to: '/skills', label: 'Technical Skills' },
  { to: '/services', label: 'Services Offered' },
  { to: '/projects', label: 'Projects & Case Studies' },
  { to: '/contact', label: 'Contact & Hire' },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const scrollTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? ('instant' as ScrollBehavior) : 'smooth' });
  };

  const socials = [
    { href: PERSONAL_INFO.github, label: 'GitHub Profile', Icon: Github, external: true },
    { href: PERSONAL_INFO.linkedin, label: 'LinkedIn Profile', Icon: Linkedin, external: true },
    { href: PERSONAL_INFO.fiverr, label: 'Fiverr Profile', Icon: Briefcase, external: true },
    { href: `mailto:${PERSONAL_INFO.email}`, label: 'Direct Email', Icon: Mail, external: false },
  ];

  return (
    <footer ref={ref} className="relative w-full overflow-hidden border-t border-white/[0.06] bg-ink-900 text-slate-400">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" aria-hidden="true" />

      <div className="container-x pt-20 pb-10">
        {/* Big sign-off */}
        <div data-reveal="up" className="flex flex-col items-start justify-between gap-8 border-b border-white/[0.06] pb-14 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Let’s work together</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group mt-5 block text-2xl font-semibold tracking-[-0.03em] break-all text-white sm:text-4xl lg:text-5xl"
            >
              <span className="link-u pb-1">{PERSONAL_INFO.email}</span>
              <ArrowUpRight className="ml-2 inline h-6 w-6 text-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-8 sm:w-8" />
            </a>
          </div>
          <button
            type="button"
            onClick={scrollTop}
            className="btn btn-secondary btn-sm shrink-0"
            aria-label="Back to top"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Back to top</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-12">
          {/* Identity */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 text-base font-semibold tracking-tight text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-mono text-[11px] text-white">
                HK
              </span>
              <span>{PERSONAL_INFO.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Full-Stack MERN Developer specializing in building modern, responsive, and user-friendly web applications using React,
              Node.js, Express, MongoDB, and Tailwind CSS.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">Navigation</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-u pb-0.5 text-slate-300 hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Freelance */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">Freelance &amp; Orders</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={PERSONAL_INFO.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-emerald-300 hover:text-emerald-200"
                >
                  <span>Order on Fiverr</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-300 hover:text-white">
                  <span>Explore GitHub Repos</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-300 hover:text-white">
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li className="pt-2 text-xs text-slate-500">
                Direct Email:
                <div className="mt-1 font-mono text-slate-300 select-all">{PERSONAL_INFO.email}</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>MERN Stack</span>
            <span aria-hidden="true">·</span>
            <span>React.js</span>
            <span aria-hidden="true">·</span>
            <span>Node.js</span>
            <span aria-hidden="true">·</span>
            <span>MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
