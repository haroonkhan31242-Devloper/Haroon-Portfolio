/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Database,
  Layout,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Activity,
  Server,
  Lock,
} from 'lucide-react';

type ArchitectureTier = 'all' | 'frontend' | 'api' | 'backend' | 'database';

export const MernArchitectureHub: React.FC = () => {
  const [activeTier, setActiveTier] = useState<ArchitectureTier>('all');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isTracing, setIsTracing] = useState<boolean>(false);

  const requestFlowSteps = [
    {
      step: 1,
      layer: 'React Frontend',
      action: 'Client Dispatches Request',
      detail: 'Form validation passed, payload serialized into JSON with Bearer JWT Authorization header.',
      badge: 'Client',
      badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
    },
    {
      step: 2,
      layer: 'Express Middleware',
      action: 'Authentication & RBAC Guard',
      detail: 'JWT verified, token expiry validated, user claims checked for Owner or Admin privileges.',
      badge: 'Security',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800/60',
    },
    {
      step: 3,
      layer: 'Node.js Controller',
      action: 'Business Logic & Sanitization',
      detail: 'Processes tenant invitation token, enforces unit assignment constraints, handles error edge cases.',
      badge: 'Runtime',
      badgeColor: 'text-purple-400 bg-purple-950/60 border-purple-800/60',
    },
    {
      step: 4,
      layer: 'MongoDB Database',
      action: 'Atomic Document Write',
      detail: 'Mongoose schema validation triggered; record written with indexed compound lookup keys.',
      badge: 'Storage',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60',
    },
  ];

  const handleTraceFlow = () => {
    if (isTracing) return;
    setIsTracing(true);
    setActiveStep(0);

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < requestFlowSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsTracing(false);
          return prev;
        }
      });
    }, 900);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-2xl">
      {/* Top Console Bar */}
      <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-300 font-mono">
            Full-Stack MERN Architecture Pipeline
          </span>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTier('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTier === 'all'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Full System</span>
          </button>

          <button
            onClick={() => setActiveTier('frontend')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTier === 'frontend'
                ? 'bg-slate-800 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>React UI</span>
          </button>

          <button
            onClick={() => setActiveTier('api')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTier === 'api'
                ? 'bg-slate-800 text-amber-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Express API</span>
          </button>

          <button
            onClick={() => setActiveTier('backend')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTier === 'backend'
                ? 'bg-slate-800 text-purple-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Node.js</span>
          </button>

          <button
            onClick={() => setActiveTier('database')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
              activeTier === 'database'
                ? 'bg-slate-800 text-emerald-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>MongoDB</span>
          </button>
        </div>
      </div>

      {/* Main Architecture Diagram / Content Grid */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Tier Cards Grid - All boxes clearly visible with crisp borders and selective radiant highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tier 1: Frontend */}
          <div
            onClick={() => setActiveTier('frontend')}
            className={`relative p-5 rounded-2xl border transition-all duration-300 space-y-3 cursor-pointer overflow-hidden ${
              activeTier === 'frontend'
                ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-400/50 shadow-xl shadow-cyan-500/15 scale-[1.02]'
                : 'bg-slate-900/90 border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-900 shadow-md'
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-sky-400" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">01 · Client Tier</span>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Layout className="w-4 h-4" />
              </div>
            </div>
            <h4 className="text-base font-bold text-white">React.js Frontend</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Component-driven SPA with Tailwind CSS, custom state hooks, and client-side route caching.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-cyan-300">Custom Hooks</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-slate-300">Tailwind CSS</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-slate-300">SPA Architecture</span>
            </div>
          </div>

          {/* Tier 2: API Gateway */}
          <div
            onClick={() => setActiveTier('api')}
            className={`relative p-5 rounded-2xl border transition-all duration-300 space-y-3 cursor-pointer overflow-hidden ${
              activeTier === 'api'
                ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/50 shadow-xl shadow-amber-500/15 scale-[1.02]'
                : 'bg-slate-900/90 border-slate-700/80 hover:border-amber-500/50 hover:bg-slate-900 shadow-md'
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-400" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">02 · API Gateway</span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Server className="w-4 h-4" />
              </div>
            </div>
            <h4 className="text-base font-bold text-white">Express.js REST API</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Middleware pipelines enforcing token validation, CORS rules, rate-limiting, and error interception.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-amber-300">JWT Auth</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-slate-300">RBAC Guards</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-slate-300">REST Contracts</span>
            </div>
          </div>

          {/* Tier 3: Node Runtime */}
          <div
            onClick={() => setActiveTier('backend')}
            className={`relative p-5 rounded-2xl border transition-all duration-300 space-y-3 cursor-pointer overflow-hidden ${
              activeTier === 'backend'
                ? 'bg-slate-900 border-purple-400 ring-2 ring-purple-400/50 shadow-xl shadow-purple-500/15 scale-[1.02]'
                : 'bg-slate-900/90 border-slate-700/80 hover:border-purple-500/50 hover:bg-slate-900 shadow-md'
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-400" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400">03 · Server Runtime</span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <h4 className="text-base font-bold text-white">Node.js Runtime</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Non-blocking asynchronous event loop handling concurrent tenant requests and transaction controllers.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-purple-300">Async/Await</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-slate-300">Event Loop</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-slate-300">Controllers</span>
            </div>
          </div>

          {/* Tier 4: Database */}
          <div
            onClick={() => setActiveTier('database')}
            className={`relative p-5 rounded-2xl border transition-all duration-300 space-y-3 cursor-pointer overflow-hidden ${
              activeTier === 'database'
                ? 'bg-slate-900 border-emerald-400 ring-2 ring-emerald-400/50 shadow-xl shadow-emerald-500/15 scale-[1.02]'
                : 'bg-slate-900/90 border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-900 shadow-md'
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">04 · Data Storage</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Database className="w-4 h-4" />
              </div>
            </div>
            <h4 className="text-base font-bold text-white">MongoDB & Mongoose</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multi-tenant isolated document models with relational references, indexes, and immutable audit logs.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-emerald-300">BSON Indexes</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-slate-300">Mongoose</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/80 text-slate-300">Audit Logs</span>
            </div>
          </div>
        </div>

        {/* Live Request Flow Trace Simulator */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-700/80 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">Lifecycle Simulation: Tenant Invitation Pipeline</h4>
              </div>
              <p className="text-xs text-slate-300">
                Trace how a single secure transaction flows through all four tiers of Haroon's full-stack architecture.
              </p>
            </div>

            <button
              onClick={handleTraceFlow}
              disabled={isTracing}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                isTracing
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                  : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-md shadow-cyan-500/20'
              }`}
            >
              <span>{isTracing ? 'Tracing Lifecycle...' : 'Trace Request Flow'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stepper Display - Every step box is crisp, readable and clearly visible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {requestFlowSteps.map((stepItem, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <div
                  key={stepItem.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/10'
                      : isPast
                      ? 'bg-slate-900/90 border-slate-600/80 text-slate-200 hover:border-slate-500'
                      : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-slate-600 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                      isActive 
                        ? 'bg-cyan-950 border-cyan-700 text-cyan-300' 
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}>
                      Step 0{stepItem.step}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${stepItem.badgeColor}`}
                    >
                      {stepItem.badge}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-white mb-1.5">{stepItem.action}</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                    {stepItem.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Step Detail Callout */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-white">
                {requestFlowSteps[activeStep].layer} · {requestFlowSteps[activeStep].action}
              </span>
              <p className="text-slate-400 text-xs">
                {requestFlowSteps[activeStep].detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
