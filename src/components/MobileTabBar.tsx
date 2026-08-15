'use client';

import {
  LayoutDashboard, Newspaper, GitBranch, AlertTriangle, FileText,
} from 'lucide-react';
import { workspaces, type WorkspaceId } from '@/data/workspaces';
import { useWorkspace } from './Providers';
import { useWatchBadge } from './useWatchBadge';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Newspaper, GitBranch, AlertTriangle, FileText,
};

export default function MobileTabBar() {
  const { workspace, setWorkspace } = useWorkspace();
  const badge = useWatchBadge();

  return (
    <nav
      className="app-chrome md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg-sidebar border-t border-border-subtle"
      style={{ paddingBottom: 'max(0.35rem, env(safe-area-inset-bottom))' }}
      aria-label="Workspaces"
    >
      <div className="grid grid-cols-5">
        {workspaces.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const active = workspace === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setWorkspace(item.id as WorkspaceId)}
              className={`relative flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] ${
                active ? 'text-text-primary' : 'text-text-muted'
              }`}
            >
              <span className="relative">
                <Icon className="w-4 h-4" />
                {item.id === 'watch' && badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[14px] h-3.5 px-0.5 rounded-sm bg-accent-red text-white text-[8px] font-semibold flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
