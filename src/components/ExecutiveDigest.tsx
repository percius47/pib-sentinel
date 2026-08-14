'use client';

import { Sparkles } from 'lucide-react';
import { executiveDigest } from '@/data/mockData';

export default function ExecutiveDigest({ section }: { section: string }) {
  const text = executiveDigest[section];
  if (!text) return null;
  return (
    <div className="flex items-start gap-2 mb-4 px-3 py-2 rounded-lg border border-border-subtle bg-bg-surface">
      <Sparkles className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
      <p className="text-xs md:text-[13px] text-text-secondary leading-relaxed">{text}</p>
    </div>
  );
}
