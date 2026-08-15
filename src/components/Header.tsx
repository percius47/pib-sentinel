'use client';

import { MessageCircle } from 'lucide-react';
import { useAskSentinel, useFilters, useWorkspace } from './Providers';
import FilterSelect from './FilterSelect';
import FilterFab from './FilterFab';
import ViewControls from './ViewControls';
import PibLogo from './PibLogo';
import { MINISTRIES, REGIONS, MEDIA } from '@/data/filterOptions';
import { viewLabel, workspaceMeta } from '@/data/workspaces';

export default function Header() {
  const { filters, setMinistry, setRegion, setMedia, clear, activeCount } = useFilters();
  const { openPanel } = useAskSentinel();
  const { workspace, view } = useWorkspace();
  const crumb = viewLabel(workspace, view);

  return (
    <header className="app-chrome sticky top-0 z-40 bg-bg-primary border-b border-border-subtle px-4 md:px-6 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <PibLogo className="w-8 h-8 shrink-0 md:hidden" />
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-semibold text-text-primary truncate">
              PIB Sentinel
            </h1>
            <p className="text-[10px] md:text-xs text-text-muted truncate">
              Sentinel / {workspaceMeta[workspace].title}
              {crumb ? ` / ${crumb}` : ''}
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <FilterSelect value={filters.ministry} onChange={setMinistry} options={MINISTRIES} label="Ministry" />
          <FilterSelect value={filters.region} onChange={setRegion} options={REGIONS} label="Region" />
          <FilterSelect value={filters.media} onChange={setMedia} options={MEDIA} label="Media" />
          {activeCount > 0 && (
            <button
              onClick={clear}
              className="text-[11px] text-text-muted hover:text-text-primary px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => openPanel()}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-border-subtle bg-bg-card text-text-secondary hover:text-text-primary hover:border-border-strong"
            aria-label="Ask Sentinel"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <FilterFab />
          <ViewControls />
        </div>
      </div>

      {activeCount > 0 && (
        <div className="flex items-center gap-2 mt-2.5 flex-wrap lg:hidden">
          {filters.ministry !== 'All Ministries' && (
            <span className="text-[11px] px-2 py-0.5 rounded-full border border-border-strong text-text-secondary">
              {filters.ministry.replace('Ministry of ', '')}
            </span>
          )}
          {filters.region !== 'All Regions' && (
            <span className="text-[11px] px-2 py-0.5 rounded-full border border-border-strong text-text-secondary">
              {filters.region}
            </span>
          )}
          {filters.media !== 'All Media' && (
            <span className="text-[11px] px-2 py-0.5 rounded-full border border-border-strong text-text-secondary">
              {filters.media}
            </span>
          )}
        </div>
      )}
    </header>
  );
}
