/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransition } from './components/motion/PageTransition';
import { SpotlightTracker } from './components/motion/Spotlight';

// Route-level code splitting keeps the first load small.
const pageLoaders = {
  Home: () => import('./pages/Home').then((m) => ({ default: m.Home })),
  About: () => import('./pages/About').then((m) => ({ default: m.About })),
  Skills: () => import('./pages/Skills').then((m) => ({ default: m.Skills })),
  Services: () => import('./pages/Services').then((m) => ({ default: m.Services })),
  Projects: () => import('./pages/Projects').then((m) => ({ default: m.Projects })),
  ProjectDetails: () => import('./pages/ProjectDetails').then((m) => ({ default: m.ProjectDetails })),
  Contact: () => import('./pages/Contact').then((m) => ({ default: m.Contact })),
  NotFound: () => import('./pages/NotFound').then((m) => ({ default: m.NotFound })),
};

const Home = lazy(pageLoaders.Home);
const About = lazy(pageLoaders.About);
const Skills = lazy(pageLoaders.Skills);
const Services = lazy(pageLoaders.Services);
const Projects = lazy(pageLoaders.Projects);
const ProjectDetails = lazy(pageLoaders.ProjectDetails);
const Contact = lazy(pageLoaders.Contact);
const NotFound = lazy(pageLoaders.NotFound);

/** Warm up every route chunk once the browser is idle, so navigation feels instant. */
const usePrefetchRoutes = () => {
  useEffect(() => {
    const run = () => Object.values(pageLoaders).forEach((load) => load().catch(() => undefined));
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(run, { timeout: 3000 });
    else window.setTimeout(run, 2000);
  }, []);
};

const RouteFallback = () => <div className="min-h-[100svh]" aria-busy="true" />;

export default function App() {
  usePrefetchRoutes();

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-[#06080c] text-slate-100">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
        >
          Skip to content
        </a>
        <ScrollToTop />
        <SpotlightTracker />
        <Navbar />
        <main id="main" className="flex-1">
          <PageTransition>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/tenant-management-system" element={<ProjectDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
