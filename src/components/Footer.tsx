/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Briefcase, Mail, ArrowUpRight, ArrowUp, MapPin } from 'lucide-react';
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

const WORK = [
  { to: '/projects/tenant-management-system', label: 'Tenant Management System' },
  { to: '/services', label: 'MERN Application Development' },
  { to: '/services', label: 'React.js Frontend Development' },
  { to: '/services', label: 'REST API Development' },
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
    { href: `mailto:${PERSONAL_INFO.email}`, label: 'Send an email', Icon: Mail, external: false },
  ];

  return (
    <footer ref={ref} className="relative w-full border-t border-white/[0.08] bg-ink-900 text-slate-400">
      <div className="container-x pt-16 pb-8 sm:pt-20">
        {/* Sign-off */}
        <div
          data-reveal="up"
          className="flex flex-col items-start justify-between gap-8 border-b border-white/[0.08] pb-12 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <span className="eyebrow">Let’s work together</span>
            <p className="mt-5 text-2xl leading-tight font-semibold tracking-[-0.025em] text-white sm:text-3xl lg:text-4xl">
              Have a project in mind? <span className="serif-accent text-accent">Let’s talk.</span>
            </p>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group mt-4 inline-flex max-w-full items-center gap-2 text-base font-medium break-all text-slate-300 transition-colors hover:text-white sm:text-lg"
            >
              <span className="link-u pb-0.5">{PERSONAL_INFO.email}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary">
              <span>Start a project</span>
              <ArrowUpRight className="icon-lift h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={PERSONAL_INFO.fiverr} target="_blank" rel="noopener noreferrer" className="btn btn-fiverr">
              <Briefcase className="h-4 w-4" aria-hidden="true" />
              <span>Hire on Fiverr</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 text-base font-semibold tracking-tight text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-mono text-[12px] text-[var(--on-accent)]">
                HK
              </span>
              <span>{PERSONAL_INFO.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Full-Stack MERN Developer building modern, responsive, and user-friendly web applications with React, Node.js,
              Express, MongoDB, and Tailwind CSS.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              {PERSONAL_INFO.location}
            </p>
            <ul className="mt-6 flex items-center gap-2" aria-label="Social profiles">
              {socials.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={label}
                    title={label}
                    className="icon-btn hover:-translate-y-0.5 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">Navigation</h2>
            <ul className="mt-5 space-y-1.5">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="footer-link">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Work */}
          <div className="order-last col-span-2 lg:order-none lg:col-span-3">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">Work</h2>
            <ul className="mt-5 space-y-1.5">
              {WORK.map((n) => (
                <li key={n.label}>
                  <Link to={n.to} className="footer-link">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2 lg:col-start-11">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">Connect</h2>
            <ul className="mt-5 space-y-1.5">
              <li>
                <a href={PERSONAL_INFO.fiverr} target="_blank" rel="noopener noreferrer" className="footer-link font-medium !text-emerald-300 hover:!text-emerald-200">
                  Order on Fiverr <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="footer-link">
                  GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
                  LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="footer-link">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-xs text-slate-500 sm:flex-row">
          <p className="text-center sm:text-left">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="group inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full px-3 font-medium text-slate-400 transition-colors hover:text-white"
          >
            Back to top
            <span className="icon-btn h-8 w-8 group-hover:-translate-y-0.5 group-hover:text-accent">
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
