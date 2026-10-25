import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Briefcase, Github, Linkedin, Clock, Copy, Check, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactForm } from '../components/ContactForm';
import { SectionHeading } from '../components/motion/SectionHeading';
import { useReveal } from '../utils/gsapAnimations';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefillService = searchParams.get('service');
  const initialSubject = prefillService ? `Inquiry regarding ${prefillService}` : '';

  const [copiedEmail, setCopiedEmail] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal(containerRef);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };

  const channels = [
    {
      href: PERSONAL_INFO.fiverr,
      label: 'Freelance Orders',
      title: 'Order on Fiverr',
      meta: 'mrashid170',
      Icon: Briefcase,
      tone: 'text-emerald-300',
    },
    {
      href: PERSONAL_INFO.github,
      label: 'Source Repositories',
      title: 'GitHub Profile',
      meta: 'haroonkhan31242',
      Icon: Github,
      tone: 'text-slate-200',
    },
    {
      href: PERSONAL_INFO.linkedin,
      label: 'Professional Network',
      title: 'LinkedIn Profile',
      meta: 'Connect',
      Icon: Linkedin,
      tone: 'text-sky-300',
    },
  ];

  return (
    <div ref={containerRef} className="relative">
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="pointer-events-none absolute top-0 right-0 h-[380px] w-[520px] rounded-full bg-cyan-400/[0.06] blur-[120px]" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHeading
            as="h1"
            eyebrow="Get In Touch"
            title={
              <>
                Let’s build something <span className="serif-accent text-accent">exceptional</span>
              </>
            }
            description={PERSONAL_INFO.contactCta}
          />
        </div>
      </section>

      <section className="pb-24 sm:pb-28">
        <div className="container-x grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Channels */}
          <div className="space-y-4 lg:col-span-5">
            <div data-reveal="left" className="card p-6 sm:p-7">
              <h2 className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">Direct Contact Channels</h2>

              <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="icon-tile !h-10 !w-10">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[11px] text-slate-500">Direct Email</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="block truncate text-sm font-medium text-white hover:text-accent">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="shrink-0 cursor-pointer rounded-full border border-white/10 p-2.5 text-slate-400 transition-colors hover:border-white/20 hover:text-white"
                  title="Copy Email"
                  aria-label={copiedEmail ? 'Email copied' : 'Copy Email'}
                >
                  {copiedEmail ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div data-reveal-group className="mt-3 space-y-3">
                {channels.map(({ href, label, title, meta, Icon, tone }) => (
                  <a
                    key={title}
                    data-reveal-item
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <Icon className={`h-4 w-4 ${tone}`} />
                      </div>
                      <div className="min-w-0">
                        <span className="block font-mono text-[11px] text-slate-500">{label}</span>
                        <span className="block text-sm font-medium text-white">{title}</span>
                      </div>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-slate-500 transition-colors group-hover:text-white">
                      <span className="hidden sm:inline">{meta}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                ))}
              </div>

              <a href={`mailto:${PERSONAL_INFO.email}`} className="btn btn-secondary mt-5 w-full">
                <Mail className="h-4 w-4 text-accent" />
                <span>Email Me Directly</span>
                <ArrowUpRight className="icon-lift h-4 w-4 text-slate-400" />
              </a>
            </div>

            <div data-reveal="left" data-delay="0.08" className="card p-6">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-emerald-300 uppercase">
                <Clock className="h-3.5 w-3.5" />
                <span>Current Status</span>
              </div>
              <h3 className="mt-3 flex items-center gap-2.5 text-sm font-semibold text-white">
                <span className="status-dot" aria-hidden="true" />
                Open for Freelance &amp; Custom Projects
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Prompt response times across email, Fiverr messaging, and LinkedIn. Available for both quick single-component tasks and
                full-stack MERN builds.
              </p>
            </div>
          </div>

          {/* Form */}
          <div data-reveal="right" className="lg:col-span-7">
            <div className="card p-6 sm:p-10">
              <div className="mb-8">
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">Send a Message</h2>
                <p className="mt-1.5 text-sm text-slate-400">
                  Fill in the details below to dispatch a message directly to my inbox via EmailJS.
                </p>
              </div>
              <ContactForm initialSubject={initialSubject} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
