'use client';

import {
  LayoutDashboard, Newspaper, GitBranch, AlertTriangle, FileText,
  PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import { workspaces, type WorkspaceId } from '@/data/workspaces';
import { useSidebar, useWorkspace } from './Providers';
import { useWatchBadge } from './useWatchBadge';
import PibLogo from './PibLogo';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Newspaper, GitBranch, AlertTriangle, FileText,
};

export default function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();
  const { workspace, setWorkspace } = useWorkspace();
  const badge = useWatchBadge();
  const width = collapsed ? 'md:w-16' : 'md:w-60';
  const mainItems = workspaces.filter((w) => w.id !== 'brief');
  const brief = workspaces.find((w) => w.id === 'brief')!;

  function NavButton({ item }: { item: (typeof workspaces)[number] }) {
    const Icon = iconMap[item.icon] || LayoutDashboard;
    const isActive = workspace === item.id;
    return (
      <button
        type="button"
        onClick={() => setWorkspace(item.id as WorkspaceId)}
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
        <span className="relative shrink-0">
          <Icon className={`w-4 h-4 ${isActive ? 'text-text-primary' : 'text-text-muted'}`} />
          {item.id === 'watch' && badge > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-3.5 px-0.5 rounded-sm bg-accent-red text-white text-[8px] font-semibold flex items-center justify-center">
              {badge}
            </span>
          )}
        </span>
        {!collapsed && <span className="truncate">{item.label}</span>}
      </button>
    );
  }

  return (
    <aside
      className={`
        app-chrome hidden md:flex fixed left-0 top-0 bottom-0 z-50 bg-bg-sidebar border-r border-border-subtle flex-col
        transition-all duration-200 ${width}
      `}
    >
      <div className={`border-b border-border-subtle ${collapsed ? 'md:px-3 p-3' : 'p-4'}`}>
        {collapsed ? (
          <button
            type="button"
            onClick={toggleCollapsed}
            className="w-full flex items-center justify-center rounded-lg hover:bg-bg-card-hover p-0.5"
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <PibLogo className="w-9 h-9 shrink-0" />
          </button>
        ) : (
          <div className="flex items-center gap-3 overflow-hidden">
            <PibLogo className="w-9 h-9 shrink-0" />
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold tracking-wider text-text-primary whitespace-nowrap">
                PIB SENTINEL
              </h1>
              <p className="text-[10px] tracking-[0.15em] text-text-muted uppercase whitespace-nowrap">
                Media Intelligence
              </p>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-2 overflow-y-auto no-scrollbar">
        {mainItems.map((item) => (
          <NavButton key={item.id} item={item} />
        ))}
        <div className="my-2 mx-4 border-t border-border-subtle" />
        <NavButton item={brief} />
      </nav>

      <div className={`border-t border-border-subtle ${collapsed ? 'md:p-2' : 'p-3'}`}>
        {!collapsed && (
          <div className="glass-card p-3 mb-3">
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
        {!collapsed && (
          <p className="text-[9px] text-text-muted text-center mt-3 tracking-wider">
            RESTRICTED • GOVT OF INDIA
          </p>
        )}
      </div>
    </aside>
  );
}
