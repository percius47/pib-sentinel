'use client';

import type { WorkspaceView } from '@/data/workspaces';

export default function SecondaryTabs({
  items,
  value,
  onChange,
}: {
  items: { id: WorkspaceView; label: string }[];
  value: WorkspaceView | null;
  onChange: (id: WorkspaceView) => void;
}) {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1" role="tablist">
      {items.map((item) => {
        const active = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={`text-xs px-3 py-1.5 rounded-full border shrink-0 transition-colors ${
              active
                ? 'border-border-strong text-text-primary bg-bg-card-hover'
                : 'border-border-subtle text-text-secondary hover:border-border-strong hover:text-text-primary'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
