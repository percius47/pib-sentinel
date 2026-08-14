'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useFilters } from './Providers';
import FilterSelect from './FilterSelect';
import { MINISTRIES, REGIONS, MEDIA } from '@/data/filterOptions';

export default function FilterFab() {
  const { filters, setMinistry, setRegion, setMedia, clear, activeCount } = useFilters();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden relative inline-flex items-center justify-center h-9 w-9 rounded-md border border-border-subtle bg-bg-card text-text-secondary hover:text-text-primary hover:border-border-strong"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="w-4 h-4" />
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-sm bg-saffron text-[#1a1208] text-[9px] font-semibold flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="lg:hidden modal-overlay animate-fade-in"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-modal-title"
        >
          <div
            className="w-full max-w-sm bg-bg-card border border-border-subtle rounded-2xl p-5 animate-scale-in shadow-xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 id="filter-modal-title" className="text-sm font-semibold text-text-primary">Filters</h3>
              <button onClick={() => setOpen(false)} className="p-1 text-text-muted hover:text-text-primary" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">Ministry</p>
                <FilterSelect value={filters.ministry} onChange={setMinistry} options={MINISTRIES} label="Ministry" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">Region</p>
                <FilterSelect value={filters.region} onChange={setRegion} options={REGIONS} label="Region" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">Media type</p>
                <FilterSelect value={filters.media} onChange={setMedia} options={MEDIA} label="Media" />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              {activeCount > 0 && (
                <button
                  onClick={clear}
                  className="flex-1 text-xs py-2.5 rounded-lg border border-border-subtle text-text-secondary hover:border-border-strong"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="flex-1 text-xs py-2.5 rounded-lg border border-border-strong text-text-primary hover:bg-bg-card-hover"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
