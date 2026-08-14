'use client';

import { ChevronDown } from 'lucide-react';

export default function FilterSelect({ value, onChange, options, label }: {
  value: string; onChange: (v: string) => void; options: string[]; label: string;
}) {
  const active = !value.startsWith('All');
  return (
    <div className="relative">
      <label className="sr-only">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none text-xs bg-bg-card border rounded-lg pl-3 pr-8 py-2 text-text-secondary focus:outline-none cursor-pointer transition-colors w-full lg:w-auto
          ${active ? 'border-border-strong text-text-primary' : 'border-border-subtle hover:border-border-strong'}
        `}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
    </div>
  );
}
