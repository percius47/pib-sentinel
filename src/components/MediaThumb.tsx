'use client';

import { Clapperboard, Globe, Newspaper, Smartphone } from 'lucide-react';
import type { Article } from '@/data/mockData';

export default function MediaThumb({
  article,
  compact,
}: {
  article: Article;
  compact?: boolean;
}) {
  const box = compact
    ? 'w-24 h-32 sm:w-28 sm:h-36'
    : 'w-full aspect-[3/4]';

  if (article.mediaType === 'Television') {
    return (
      <div className={`${box} rounded-lg bg-[#0c0c0e] border border-border-strong overflow-hidden flex flex-col`}>
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.04)_3px)]" />
          <Clapperboard className="w-7 h-7 text-zinc-400 relative z-[1]" />
        </div>
        <p className="text-[8px] uppercase tracking-wider text-zinc-500 px-2 py-1.5 border-t border-white/10 truncate">
          {article.source} · TV
        </p>
      </div>
    );
  }

  if (article.mediaType === 'Social Media') {
    return (
      <div className={`${box} rounded-lg bg-[#111] border border-border-strong overflow-hidden p-2 flex flex-col`}>
        <p className="text-[8px] text-zinc-500 truncate">@{article.source.replace(/[^a-z0-9]+/gi, '').slice(0, 12)}</p>
        <Smartphone className="w-5 h-5 text-zinc-400 mx-auto my-auto" />
        <p className="text-[8px] text-zinc-300 leading-tight line-clamp-4">{article.headline}</p>
      </div>
    );
  }

  if (article.mediaType === 'Digital') {
    return (
      <div className={`${box} rounded-lg bg-bg-surface border border-border-strong overflow-hidden flex flex-col`}>
        <div className="h-4 bg-bg-card-hover border-b border-border-subtle flex items-center gap-1 px-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-red/70" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent-amber/70" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green/70" />
        </div>
        <div className="flex-1 p-2 flex flex-col items-center justify-center">
          <Globe className="w-5 h-5 text-text-muted mb-1" />
          <p className="text-[8px] text-text-secondary leading-tight line-clamp-4 text-center">{article.headline}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${box} rounded-lg bg-[#f4f1ea] border border-border-subtle flex items-center justify-center overflow-hidden`}>
      <div className="p-2 text-center">
        <Newspaper className="w-5 h-5 text-[#666] mx-auto mb-1" />
        <p className="text-[8px] text-[#444] font-serif leading-tight line-clamp-4">{article.headline}</p>
      </div>
    </div>
  );
}
