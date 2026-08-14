'use client';

import { ArrowRight, Layers } from 'lucide-react';
import Modal from './Modal';
import GenuineRing from './GenuineRing';
import {
  articles,
  articleStance,
  computeGenuine,
  type StoryCluster,
  type OutletStance,
} from '@/data/mockData';

const STANCE_COLOR: Record<OutletStance, string> = {
  Factual: 'text-text-secondary border-border-strong',
  Amplifying: 'text-accent-green border-accent-green/40',
  Sceptical: 'text-accent-amber border-accent-amber/40',
  Critical: 'text-accent-red border-accent-red/40',
  'Wire copy': 'text-text-muted border-border-subtle',
};

const TONE_COLOR: Record<string, string> = {
  Positive: 'text-accent-green',
  Negative: 'text-accent-red',
  Mixed: 'text-accent-amber',
  Neutral: 'text-text-muted',
};

export default function StanceCompareModal({
  cluster,
  onClose,
  onOpenArticle,
}: {
  cluster: StoryCluster;
  onClose: () => void;
  onOpenArticle: (id: number) => void;
}) {
  const items = cluster.articleIds
    .map((id) => articles.find((a) => a.id === id))
    .filter((a): a is (typeof articles)[number] => Boolean(a));

  return (
    <Modal onClose={onClose} labelledBy="stance-compare-title">
      <div className="p-5 md:p-7 clear-both">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-4 h-4 text-text-muted" />
          <span className="text-[10px] uppercase tracking-wider text-text-muted">Story cluster</span>
        </div>
        <h2
          id="stance-compare-title"
          className="text-lg md:text-xl font-semibold text-text-primary leading-snug pr-8 mb-1"
        >
          {cluster.headline}
        </h2>
        <p className="text-xs text-text-secondary mb-5">
          {cluster.event} · {cluster.outlets} outlets · Genuine {cluster.genuineScore}. {cluster.note}
        </p>

        <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 snap-x">
          {items.map((a) => {
            const stance: OutletStance = articleStance(a.id) ?? 'Factual';
            const genuine = computeGenuine(a);
            return (
              <div
                key={a.id}
                className="min-w-[260px] w-[280px] shrink-0 snap-start glass-card p-4 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STANCE_COLOR[stance]}`}>
                    {stance}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider ${TONE_COLOR[a.sentiment] || 'text-text-muted'}`}>
                    {a.sentiment}
                  </span>
                </div>
                <p className="text-[11px] text-text-muted mb-1">{a.source} · {a.edition}</p>
                <p className="text-sm font-semibold text-text-primary leading-snug mb-2 line-clamp-3">
                  {a.headline}
                </p>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-5 mb-3">
                  {a.summary}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <GenuineRing data={genuine} size="sm" />
                  <button
                    type="button"
                    onClick={() => onOpenArticle(a.id)}
                    className="text-[11px] text-text-primary inline-flex items-center gap-1 hover:underline"
                  >
                    Open article <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 p-3 rounded-lg border border-border-subtle">
          <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Read across outlets</p>
          <p className="text-xs text-text-secondary leading-relaxed">
            {cluster.toneSplit.positive} positive · {cluster.toneSplit.neutral} neutral · {cluster.toneSplit.mixed} mixed · {cluster.toneSplit.negative} negative. Ministries: {cluster.ministries.join(', ')}. Regions: {cluster.regions.join(', ')}.
          </p>
        </div>
      </div>
    </Modal>
  );
}
