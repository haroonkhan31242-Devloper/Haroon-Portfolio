/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Github, Linkedin, Search, Mail, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { gsap, isReducedMotion, MOTION } from '../utils/gsapAnimations';
import { useTheme } from '../utils/theme';
// The command palette is only downloaded the first time it is opened.
const CommandPalette = lazy(() => import('./CommandPalette').then((m) => ({ default: m.CommandPalette })));

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

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="icon-btn relative overflow-hidden"
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Dark mode' : 'Light mode'}
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-500 ${isLight ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-500 ${isLight ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
        aria-hidden="true"
      />
    </button>
  );
};

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [paletteLoaded, setPaletteLoaded] = useState(false);
  useEffect(() => {
    if (isSearchOpen) setPaletteLoaded(true);
  }, [isSearchOpen]);
  const location = useLocation();

  const progressRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

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

  // Close the drawer when the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setIsOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Scroll: background state + reading progress
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      setScrolled(y > 8);
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
    };
  }, []);

  // Mobile drawer animation
  useLayoutEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const reduced = isReducedMotion();
    if (isOpen) {
      gsap.set(drawer, { display: 'block' });
      const tl = gsap.timeline();
      tl.fromTo(drawer, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.3 });
      if (!reduced) {
        tl.from(drawer.querySelectorAll('[data-drawer-item]'), { autoAlpha: 0, y: 8, stagger: 0.035, duration: 0.3 }, 0.05);
      }
      return () => {
        tl.kill();
      };
    }
    const t = gsap.to(drawer, {
      autoAlpha: 0,
      y: -8,
      duration: reduced ? 0 : 0.2,
      ease: MOTION.easeInOut,
      onComplete: () => {
        gsap.set(drawer, { display: 'none' });
      },
    });
    return () => {
      t.kill();
    };
  }, [isOpen]);

  const solid = scrolled || isOpen;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          solid
            ? 'border-white/[0.08] bg-ink-950/85 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl'
            : 'border-transparent bg-ink-950/40 backdrop-blur-sm'
        }`}
      >
        <div className="container-x">
          <div className="flex h-[72px] items-center justify-between gap-4">
            {/* Brand */}
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex shrink-0 items-center gap-3 rounded-md py-1 text-[15px] font-semibold tracking-tight whitespace-nowrap text-white"
              aria-label="Haroon Khan — Home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-mono text-[12px] font-semibold tracking-tighter text-[var(--on-accent)] transition-transform duration-500 group-hover:-rotate-6">
                HK
              </span>
              <span className="flex flex-col leading-none">
                <span>Haroon Khan</span>
                <span className="mt-1 font-mono text-[10px] font-normal tracking-wider text-slate-400">MERN Developer</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden items-center lg:flex">
              {navLinks.map((link) => {
                const active = isPathActive(link.path, location.pathname);
                return (
                  <NavLink key={link.path} to={link.path} aria-current={active ? 'page' : undefined} className="nav-link">
                    {link.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="icon-btn xl:w-auto xl:gap-2 xl:px-3"
                title="Search portfolio (Ctrl+K)"
                aria-label="Open search"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <kbd className="hidden font-mono text-[10px] text-slate-500 xl:inline">Ctrl K</kbd>
              </button>
              <ThemeToggle />
              <Link to="/contact" onClick={closeMenu} className="btn btn-primary btn-sm ml-1 hidden sm:inline-flex">
                <span>Hire Me</span>
                <ArrowUpRight className="icon-lift h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="icon-btn lg:hidden"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
          className="absolute right-0 bottom-0 left-0 h-[2px] origin-left bg-accent/70"
          style={{ transform: 'scaleX(0)' }}
          aria-hidden="true"
        />

        {/* Mobile drawer */}
        <div
          id="mobile-drawer"
          ref={drawerRef}
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/[0.08] bg-ink-950 lg:hidden"
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
                  className={`flex min-h-12 items-center justify-between rounded-xl border-l-2 px-4 py-3 text-base font-medium transition-colors ${
                    active
                      ? 'border-accent bg-white/[0.05] text-white'
                      : 'border-transparent text-slate-300 hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className={`font-mono text-[11px] ${active ? 'text-accent' : 'text-slate-500'}`}>0{i + 1}</span>
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

            <div data-drawer-item className="mt-4 flex items-center justify-between border-t border-white/[0.08] px-1 pt-4 text-sm text-slate-400">
              <span>Connect</span>
              <div className="flex items-center gap-2">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-btn">
                  <Github className="h-4 w-4" />
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-btn">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} aria-label="Email" className="icon-btn">
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
