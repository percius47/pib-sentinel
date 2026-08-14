'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Newspaper, GitBranch, Map, AlertTriangle,
  Monitor, Radio, ShieldAlert, FileText, Shield, PanelLeftClose, PanelLeftOpen, X,
} from 'lucide-react';
import { sidebarItems } from '@/data/mockData';
import { useSidebar } from './Providers';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Newspaper, GitBranch, Map, AlertTriangle,
  Monitor, Radio, ShieldAlert, FileText,
};

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('command-center');
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  useEffect(() => {
    const onScroll = () => {
      const marker = 140;
      let current = sidebarItems[0]?.id ?? 'command-center';
      for (const item of sidebarItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= marker) current = item.id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setMobileOpen(false);
    }
  };

  const width = collapsed ? 'md:w-16' : 'md:w-60';

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-50 bg-bg-sidebar border-r border-border-subtle flex flex-col
          transition-all duration-200
          ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
          md:translate-x-0 ${width}
        `}
      >
        <div className={`p-4 border-b border-border-subtle ${collapsed ? 'md:px-3' : ''}`}>
          <div className={`tricolor-bar mb-3 rounded-full ${collapsed ? 'md:mb-2' : ''}`} />
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-lg border border-border-strong flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-text-primary" />
              </div>
              {(!collapsed || mobileOpen) && (
                <div className={`overflow-hidden ${collapsed ? 'md:hidden' : ''}`}>
                  <h1 className="text-sm font-bold tracking-wider text-text-primary whitespace-nowrap">
                    PIB SENTINEL
                  </h1>
                  <p className="text-[10px] tracking-[0.15em] text-text-muted uppercase whitespace-nowrap">
                    Media Intelligence
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-text-muted hover:text-text-primary p-1"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <nav className="flex-1 py-2 overflow-y-auto no-scrollbar">
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors relative
                  ${isActive
                    ? 'text-text-primary bg-bg-card-hover'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'}
                  ${collapsed ? 'md:justify-center md:px-2' : ''}
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-text-primary rounded-r-full" />
                )}
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-text-primary' : 'text-text-muted'}`} />
                {(!collapsed || mobileOpen) && (
                  <span className={`truncate ${collapsed ? 'md:hidden' : ''}`}>{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className={`border-t border-border-subtle ${collapsed ? 'md:p-2' : 'p-3'}`}>
          {(!collapsed || mobileOpen) && (
            <div className={`glass-card p-3 mb-3 ${collapsed ? 'md:hidden' : ''}`}>
              <p className="text-[10px] tracking-wider text-text-muted uppercase mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="text-xs text-accent-green">All Systems Operational</span>
              </div>
              <p className="text-[10px] text-text-muted mt-1">Last sync: 2 min ago</p>
            </div>
          )}
          <button
            onClick={toggleCollapsed}
            className="hidden md:flex w-full items-center justify-center gap-2 p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-card-hover text-xs"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <><PanelLeftClose className="w-4 h-4" /> <span>Collapse</span></>}
          </button>
          {(!collapsed || mobileOpen) && (
            <p className={`text-[9px] text-text-muted text-center mt-3 tracking-wider ${collapsed ? 'md:hidden' : ''}`}>
              RESTRICTED • GOVT OF INDIA
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
