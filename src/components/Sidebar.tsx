'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Newspaper, GitBranch, Map, AlertTriangle,
  Monitor, Radio, ShieldAlert, FileText, Shield, ChevronRight,
} from 'lucide-react';
import { sidebarItems } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Newspaper, GitBranch, Map, AlertTriangle,
  Monitor, Radio, ShieldAlert, FileText,
};

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('command-center');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const sorted = visible.sort((a, b) => {
            const aRect = a.boundingClientRect;
            const bRect = b.boundingClientRect;
            return Math.abs(aRect.top) - Math.abs(bRect.top);
          });
          setActiveSection(sorted[0].target.id);
        }
      },
      { threshold: 0.2, rootMargin: '-80px 0px -40% 0px' }
    );

    sidebarItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-bg-sidebar border-r border-border-subtle flex flex-col z-50">
      <div className="p-5 border-b border-border-subtle">
        <div className="tricolor-bar mb-3 rounded-full" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wider text-text-primary">
              PIB SENTINEL
            </h1>
            <p className="text-[10px] tracking-[0.2em] text-text-muted uppercase">
              Media Intelligence
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-all group relative ${
                isActive
                  ? 'text-accent-blue bg-accent-blue/8'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/3'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-accent-blue rounded-r-full" />
              )}
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-accent-blue' : 'text-text-muted group-hover:text-text-secondary'}`} />
              <span className="truncate">{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 ml-auto text-accent-blue/50" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border-subtle">
        <div className="glass-card p-3">
          <p className="text-[10px] tracking-wider text-text-muted uppercase mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-xs text-accent-green">All Systems Operational</span>
          </div>
          <p className="text-[10px] text-text-muted mt-1.5">Last sync: 2 min ago</p>
        </div>
        <p className="text-[9px] text-text-muted text-center mt-3 tracking-wider">
          RESTRICTED • GOVT OF INDIA
        </p>
      </div>
    </aside>
  );
}
