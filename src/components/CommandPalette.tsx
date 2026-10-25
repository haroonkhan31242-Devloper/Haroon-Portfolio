/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
  Server,
  Database,
  FileText,
  CornerDownLeft,
  Compass,
} from 'lucide-react';
import {
  PROJECTS_LIST,
  SERVICES_LIST,
  SKILLS_CATEGORIES,
} from '../data/portfolioData';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Project' | 'Service' | 'Skill' | 'Page';
  url: string;
  icon: React.ReactNode;
  tags?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Projects' | 'Services' | 'Skills'>('All');
  
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Compile searchable index from portfolioData
  const searchIndex: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Pages
    items.push(
      {
        id: 'page-home',
        title: 'Home',
        subtitle: 'Main portfolio overview, 3D MERN architecture & introduction',
        category: 'Page',
        url: '/',
        icon: <Compass className="w-4 h-4 text-cyan-400" />,
      },
      {
        id: 'page-about',
        title: 'About Haroon Khan',
        subtitle: 'Development journey, frontend & backend experience, philosophy',
        category: 'Page',
        url: '/about',
        icon: <FileText className="w-4 h-4 text-cyan-400" />,
      },
      {
        id: 'page-skills',
        title: 'Skills & Capabilities',
        subtitle: 'Frontend, backend, database and engineering tool proficiencies',
        category: 'Page',
        url: '/skills',
        icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      },
      {
        id: 'page-services',
        title: 'Services & Offerings',
        subtitle: '12 professional web development services for clients & startups',
        category: 'Page',
        url: '/services',
        icon: <Layers className="w-4 h-4 text-cyan-400" />,
      },
      {
        id: 'page-projects',
        title: 'Projects Portfolio',
        subtitle: 'Browse all MERN applications and full-stack projects',
        category: 'Page',
        url: '/projects',
        icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      },
      {
        id: 'page-contact',
        title: 'Contact & Hire',
        subtitle: 'Reach out for freelance inquiries, Fiverr gigs, and custom projects',
        category: 'Page',
        url: '/contact',
        icon: <CornerDownLeft className="w-4 h-4 text-cyan-400" />,
      }
    );

    // 2. Projects
    PROJECTS_LIST.forEach((proj) => {
      items.push({
        id: `proj-${proj.id}`,
        title: proj.title,
        subtitle: proj.shortDescription,
        category: 'Project',
        url: proj.slug === 'tenant-management-system' ? `/projects/${proj.slug}` : '/projects',
        icon: <Sparkles className="w-4 h-4 text-purple-400" />,
        tags: proj.technologies,
      });
    });

    // 3. Services
    SERVICES_LIST.forEach((srv) => {
      items.push({
        id: `srv-${srv.id}`,
        title: srv.title,
        subtitle: srv.description,
        category: 'Service',
        url: `/contact?service=${encodeURIComponent(srv.title)}`,
        icon: <Layers className="w-4 h-4 text-amber-400" />,
        tags: srv.deliverables,
      });
    });

    // 4. Skills
    SKILLS_CATEGORIES.frontend.forEach((sk) => {
      items.push({
        id: `sk-fe-${sk.name}`,
        title: sk.name,
        subtitle: sk.description,
        category: 'Skill',
        url: '/skills',
        icon: <Code2 className="w-4 h-4 text-cyan-400" />,
        tags: sk.tags,
      });
    });

    SKILLS_CATEGORIES.backend.forEach((sk) => {
      items.push({
        id: `sk-be-${sk.name}`,
        title: sk.name,
        subtitle: sk.description,
        category: 'Skill',
        url: '/skills',
        icon: <Server className="w-4 h-4 text-emerald-400" />,
        tags: sk.tags,
      });
    });

    SKILLS_CATEGORIES.database_tools.forEach((sk) => {
      items.push({
        id: `sk-db-${sk.name}`,
        title: sk.name,
        subtitle: sk.description,
        category: 'Skill',
        url: '/skills',
        icon: <Database className="w-4 h-4 text-blue-400" />,
        tags: sk.tags,
      });
    });

    return items;
  }, []);

  // Filtered results
  const filteredResults = useMemo(() => {
    let list = searchIndex;

    // Category filter tab
    if (activeFilter === 'Projects') list = list.filter((i) => i.category === 'Project');
    if (activeFilter === 'Services') list = list.filter((i) => i.category === 'Service');
    if (activeFilter === 'Skills') list = list.filter((i) => i.category === 'Skill');

    // Query filter
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return list.slice(0, 10); // Show top 10 recommended by default

    return list.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(cleanQuery);
      const matchSubtitle = item.subtitle.toLowerCase().includes(cleanQuery);
      const matchTags = item.tags?.some((t) => t.toLowerCase().includes(cleanQuery));
      return matchTitle || matchSubtitle || matchTags;
    }).slice(0, 12);
  }, [searchIndex, query, activeFilter]);

  // Focus input whenever opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Keyboard navigation inside command palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    }
  };

  const handleSelect = (item: SearchResultItem) => {
    onClose();
    navigate(item.url);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Global Search Palette"
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, services, skills, or pages (e.g. 'tenant', 'react', 'api')..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none"
            aria-autocomplete="list"
            aria-controls="search-results-list"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
              aria-label="Clear Search Input"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-800/80 bg-slate-900/40 text-xs overflow-x-auto">
          {(['All', 'Projects', 'Services', 'Skills'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 rounded-md transition-colors font-medium whitespace-nowrap cursor-pointer ${
                activeFilter === filter
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div
          ref={listRef}
          id="search-results-list"
          role="listbox"
          className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/30"
        >
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm text-slate-300 font-medium">No matches found for "{query}"</p>
              <p className="text-xs text-slate-500">
                Try searching for technologies like "React", "Node", "MongoDB", or services like "API".
              </p>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 text-left ${
                    isSelected
                      ? 'bg-slate-800/90 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-slate-950' : 'bg-slate-800'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate text-white">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Keyboard Helper Footer */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono">↵</kbd>
              <span>to select</span>
            </span>
          </div>
          <span>Haroon Khan Portfolio</span>
        </div>
      </div>
    </div>
  );
};
