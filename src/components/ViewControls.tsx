'use client';

import { Sun, Moon, Rows3, Rows2 } from 'lucide-react';
import { useDensity, useTheme } from './Providers';

export default function ViewControls() {
  const { density, set } = useDensity();
  const { theme, toggle } = useTheme();

  return (
    <div
      className="inline-flex items-stretch h-9 rounded-md border border-border-subtle overflow-hidden bg-bg-card"
      role="group"
      aria-label="Display"
    >
      <button
        type="button"
        onClick={() => set('compact')}
        className={`inline-flex items-center gap-1.5 px-2.5 text-[11px] transition-colors ${
          density === 'compact'
            ? 'bg-bg-card-hover text-text-primary'
            : 'text-text-muted hover:text-text-primary'
        }`}
        aria-pressed={density === 'compact'}
        title="Compact cards"
      >
        <Rows3 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Compact</span>
      </button>
      <button
        type="button"
        onClick={() => set('comfortable')}
        className={`inline-flex items-center gap-1.5 px-2.5 text-[11px] border-l border-border-subtle transition-colors ${
          density === 'comfortable'
            ? 'bg-bg-card-hover text-text-primary'
            : 'text-text-muted hover:text-text-primary'
        }`}
        aria-pressed={density === 'comfortable'}
        title="Comfortable cards"
      >
        <Rows2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Comfort</span>
      </button>
      <button
        type="button"
        onClick={toggle}
        className="inline-flex items-center px-2.5 border-l border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-colors"
        aria-label="Toggle theme"
        title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
      >
        {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
