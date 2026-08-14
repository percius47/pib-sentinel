'use client';

import { Clock, X } from 'lucide-react';
import { useSnooze } from './Providers';

export default function SnoozeButton({ id }: { id: string }) {
  const { snooze } = useSnooze();
  return (
    <span className="relative z-10 inline-flex items-center gap-0.5 shrink-0 pointer-events-auto">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); snooze(id); }}
        title="Snooze until tomorrow"
        aria-label="Snooze until tomorrow"
        className="p-1 rounded text-text-muted hover:text-text-primary"
      >
        <Clock className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); snooze(id); }}
        title="Dismiss for today"
        aria-label="Dismiss for today"
        className="p-1 rounded text-text-muted hover:text-text-primary"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </span>
  );
}
