'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './Providers';

export default function ViewControls() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border-subtle bg-bg-card text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
    >
      {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
    </button>
  );
}
