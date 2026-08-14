'use client';

import { Menu } from 'lucide-react';
import { useFilters, useSidebar } from './Providers';
import FilterSelect from './FilterSelect';
import FilterFab from './FilterFab';
import ViewControls from './ViewControls';
import { MINISTRIES, REGIONS, MEDIA } from '@/data/filterOptions';

export default function Header() {
  const { filters, setMinistry, setRegion, setMedia, clear, activeCount } = useFilters();
  const { setMobileOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-40 glass px-4 md:px-6 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-text-secondary hover:text-text-primary p-1"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-sm md:text-base font-semibold text-text-primary truncate">
              PIB Sentinel
            </h1>
            <p className="text-[10px] md:text-xs text-text-muted truncate">
              Press Information Bureau • Government of India
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
