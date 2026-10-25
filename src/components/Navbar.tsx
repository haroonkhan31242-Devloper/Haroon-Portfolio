/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Github, Linkedin, Briefcase, Search, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
// The command palette is only downloaded the first time it is opened.
const CommandPalette = lazy(() => import('./CommandPalette').then((m) => ({ default: m.CommandPalette })));
import { gsap, isReducedMotion, MOTION } from '../utils/gsapAnimations';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Skills', path: '/skills' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

const isPathActive = (linkPath: string, pathname: string) =>
  linkPath === '/' ? pathname === '/' : pathname.startsWith(linkPath);

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);
  useEffect(() => {
    if (isSearchOpen) setPaletteLoaded(true);
  }, [isSearchOpen]);
  const location = useLocation();

  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const openRef = useRef(isOpen);
  openRef.current = isOpen;

  const closeMenu = () => setIsOpen(false);

  // Cmd/Ctrl + K opens the command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close the drawer on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  // Scroll: background state, hide-on-scroll-down, reading progress
  useEffect(() => {
    const header = headerRef.current;
    const bar = progressRef.current;
    if (!header || !bar) return;

    let lastY = window.scrollY;
    let hidden = false;
    let frame = 0;
    const reduced = isReducedMotion();

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      setScrolled(y > 8);

      const shouldHide = y > 160 && y > lastY + 2 && !openRef.current;
      const shouldShow = y < lastY - 2 || y <= 160 || openRef.current;
      if (shouldHide && !hidden) {
        hidden = true;
        gsap.to(header, { yPercent: -100, duration: reduced ? 0 : 0.45, ease: MOTION.easeInOut, overwrite: true });
      } else if (shouldShow && hidden) {
        hidden = false;
        gsap.to(header, { yPercent: 0, duration: reduced ? 0 : 0.45, ease: MOTION.ease, overwrite: true });
      }
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      gsap.killTweensOf(header);
    };
  }, []);

  // Sliding active-route indicator
  const moveIndicator = useCallback(
    (target?: HTMLElement | null, instant = false) => {
      const indicator = indicatorRef.current;
      const nav = navRef.current;
      if (!indicator || !nav) return;
      const active =
        target ?? linkRefs.current[navLinks.find((l) => isPathActive(l.path, location.pathname))?.path ?? ''];
      if (!active) {
        gsap.to(indicator, { autoAlpha: 0, duration: 0.2 });
        return;
      }
      const navBox = nav.getBoundingClientRect();
      const box = active.getBoundingClientRect();
      gsap.to(indicator, {
        x: box.left - navBox.left,
        width: box.width,
        autoAlpha: 1,
        duration: instant || isReducedMotion() ? 0 : 0.5,
        ease: MOTION.ease,
      });
    },
    [location.pathname]
  );

  useLayoutEffect(() => {
    moveIndicator(undefined, true);
    const onResize = () => moveIndicator(undefined, true);
    window.addEventListener('resize', onResize);
    // Fonts can shift widths after load
    document.fonts?.ready.then(() => moveIndicator(undefined, true)).catch(() => undefined);
    return () => window.removeEventListener('resize', onResize);
  }, [moveIndicator]);

  // Mobile drawer animation
  useLayoutEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const reduced = isReducedMotion();
    if (isOpen) {
      gsap.set(drawer, { display: 'block' });
      const tl = gsap.timeline();
      tl.fromTo(drawer, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.35 });
      if (!reduced) {
        tl.from(drawer.querySelectorAll('[data-drawer-item]'), { autoAlpha: 0, y: 10, stagger: 0.04, duration: 0.35 }, 0.05);
      }
      return () => {
        tl.kill();
      };
    }
    const t = gsap.to(drawer, {
      autoAlpha: 0,
      y: -8,
      duration: reduced ? 0 : 0.25,
      ease: MOTION.easeInOut,
      onComplete: () => {
        gsap.set(drawer, { display: 'none' });
      },
    });
    return () => {
      t.kill();
    };
  }, [isOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || isOpen
            ? 'border-b border-white/[0.06] bg-[#06080c]/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-x">
          <div className="flex h-[72px] items-center justify-between gap-6">
            {/* Brand */}
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex shrink-0 items-center gap-3 rounded-md py-1 text-[15px] font-semibold tracking-tight whitespace-nowrap text-white"
              aria-label="Haroon Khan — Home"
            >
              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] font-mono text-[12px] font-semibold tracking-tighter text-white transition-colors duration-500 group-hover:border-accent/40">
                HK
                <span className="absolute inset-x-1 bottom-1 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
              </span>
              <span className="flex flex-col leading-none">
                <span>Haroon Khan</span>
                <span className="mt-1 hidden font-mono text-[10px] font-normal tracking-wider text-slate-500 sm:block">
                  MERN Developer
                </span>
              </span>
            </Link>

            {/* Desktop nav with sliding indicator */}
            <nav
              ref={navRef}
              aria-label="Primary"
              className="relative hidden items-center rounded-full border border-white/[0.07] bg-white/[0.025] p-1 md:flex"
              onMouseLeave={() => moveIndicator()}
            >
              <span
                ref={indicatorRef}
                className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-white/[0.08] ring-1 ring-white/[0.08] ring-inset"
                style={{ opacity: 0 }}
                aria-hidden="true"
              />
              {navLinks.map((link) => {
                const active = isPathActive(link.path, location.pathname);
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    ref={(el) => {
                      linkRefs.current[link.path] = el;
                    }}
                    onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                    onFocus={(e) => moveIndicator(e.currentTarget)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative z-10 rounded-full px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-300 lg:px-4 ${
                      active ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* Desktop actions */}
            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-slate-400 transition-colors hover:border-white/15 hover:text-white"
                title="Search portfolio (Cmd+K / Ctrl+K)"
                aria-label="Open global search palette"
              >
                <Search className="h-3.5 w-3.5" />
                <kbd className="font-mono text-[10px] text-slate-500">⌘K</kbd>
              </button>

              <div className="flex items-center text-slate-400">
                {[
                  { href: PERSONAL_INFO.github, label: 'Haroon Khan GitHub', Icon: Github },
                  { href: PERSONAL_INFO.linkedin, label: 'Haroon Khan LinkedIn', Icon: Linkedin },
                  { href: PERSONAL_INFO.fiverr, label: 'Order on Fiverr', Icon: Briefcase },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    aria-label={label}
                    className="rounded-full p-2 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <Link to="/contact" className="btn btn-primary btn-sm ml-1">
                <span>Hire Me</span>
                <ArrowUpRight className="icon-lift h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile / tablet controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="cursor-pointer rounded-full border border-white/[0.08] bg-white/[0.03] p-2.5 text-slate-300 hover:text-white"
                aria-label="Open Search"
              >
                <Search className="h-4 w-4" />
              </button>
              <Link to="/contact" onClick={closeMenu} className="btn btn-primary btn-sm hidden sm:inline-flex">
                Hire Me
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer rounded-full border border-white/[0.08] bg-white/[0.03] p-2.5 text-slate-200 hover:text-white md:hidden"
                aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-drawer"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Reading progress */}
        <div
          ref={progressRef}
          className="absolute right-0 bottom-0 left-0 h-px origin-left bg-gradient-to-r from-accent-strong/80 via-accent/60 to-accent-soft/60"
          style={{ transform: 'scaleX(0)' }}
          aria-hidden="true"
        />

        {/* Mobile drawer */}
        <div
          id="mobile-drawer"
          ref={drawerRef}
          className="border-t border-white/[0.06] bg-[#06080c]/95 backdrop-blur-xl md:hidden"
          style={{ display: 'none' }}
        >
          <nav className="container-x flex flex-col gap-1 pt-4 pb-6" aria-label="Mobile">
            {navLinks.map((link, i) => {
              const active = isPathActive(link.path, location.pathname);
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  data-drawer-item
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                    active ? 'bg-white/[0.05] text-white' : 'text-slate-300 hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className={`font-mono text-[11px] ${active ? 'text-accent' : 'text-slate-600'}`}>0{i + 1}</span>
                </NavLink>
              );
            })}

            <div data-drawer-item className="mt-4 grid grid-cols-2 gap-2">
              <Link to="/contact" onClick={closeMenu} className="btn btn-primary btn-sm">
                Hire Me
              </Link>
              <a href={PERSONAL_INFO.fiverr} target="_blank" rel="noopener noreferrer" className="btn btn-fiverr btn-sm">
                Fiverr
              </a>
            </div>

            <div data-drawer-item className="mt-4 flex items-center justify-between border-t border-white/[0.06] px-1 pt-4 text-xs text-slate-400">
              <span>Connect</span>
              <div className="flex items-center gap-1">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full p-2 hover:text-white">
                  <Github className="h-4 w-4" />
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full p-2 hover:text-white">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} aria-label="Email" className="rounded-full p-2 hover:text-white">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {paletteLoaded && (
        <Suspense fallback={null}>
          <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </Suspense>
      )}
    </>
  );
};
