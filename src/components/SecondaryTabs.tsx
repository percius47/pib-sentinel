'use client';

import { useRef, type KeyboardEvent } from 'react';
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
  const listRef = useRef<HTMLDivElement>(null);

  function focusTab(index: number) {
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    const next = buttons?.[index];
    next?.focus();
    const id = items[index]?.id;
    if (id) onChange(id);
  }

  function onKeyDown(e: KeyboardEvent) {
    const i = items.findIndex((item) => item.id === value);
    if (i < 0) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusTab((i + 1) % items.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusTab((i - 1 + items.length) % items.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusTab(items.length - 1);
    }
  }

  return (
    <div className="workspace-tabs mb-6 -mx-4 md:-mx-8 px-4 md:px-8">
      <div
        ref={listRef}
        className="flex overflow-x-auto no-scrollbar"
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
      >
        {items.map((item) => {
          const active = value === item.id;
          return (
            <button
              key={item.id}
              id={`ws-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
