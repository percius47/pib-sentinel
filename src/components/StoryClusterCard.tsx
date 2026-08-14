'use client';

import { ArrowRight, Layers } from 'lucide-react';
import type { StoryCluster } from '@/data/mockData';
import GenuineRing from './GenuineRing';
import ClickableCard from './ClickableCard';

function ToneBar({ split }: { split: StoryCluster['toneSplit'] }) {
  const total = split.positive + split.neutral + split.mixed + split.negative || 1;
  const segs = [
    { key: 'positive', v: split.positive, c: '#10b981' },
    { key: 'neutral', v: split.neutral, c: '#71717a' },
    { key: 'mixed', v: split.mixed, c: '#f59e0b' },
    { key: 'negative', v: split.negative, c: '#ef4444' },
  ];
  return (
    <div className="flex h-1.5 rounded-full overflow-hidden bg-bg-surface w-full">
      {segs.map((s) => (
        <div key={s.key} style={{ width: `${(s.v / total) * 100}%`, background: s.c }} />
      ))}
    </div>
  );
}

export default function StoryClusterCard({
  cluster,
  onOpen,
}: {
  cluster: StoryCluster;
  onOpen: (id: number) => void;
}) {
  const clusterGenuine = {
    score: cluster.genuineScore,
    factors: { sourceCred: 82, corroboration: Math.min(100, cluster.outlets * 7), languageBias: 78, factCheckHistory: 82, deepfakeLikelihood: null },
    marker: 'Analytical' as const,
    note: `${cluster.outlets} outlets on this cluster with mixed stances. Composite Genuine averaged across sources.`,
  };
  const negatives = cluster.toneSplit.negative;
  const positives = cluster.toneSplit.positive;
  return (
    <ClickableCard
      onActivate={() => onOpen(cluster.id)}
      label={`Compare stances: ${cluster.headline}`}
      className="glass-card clickable p-4 text-left w-full"
      contentClassName="flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <Layers className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Cluster</p>
            <p className="text-sm font-semibold text-text-primary leading-snug line-clamp-2">
              {cluster.headline}
            </p>
          </div>
        </div>
        <GenuineRing data={clusterGenuine} size="md" />
      </div>

      <ToneBar split={cluster.toneSplit} />

      <div className="flex items-center gap-2 text-[11px] text-text-muted flex-wrap">
        <span className="text-text-secondary font-semibold">{cluster.outlets}</span>
        <span>outlets</span>
        <span>·</span>
        <span className="text-accent-green">{positives} positive</span>
        <span>·</span>
        <span className="text-accent-red">{negatives} negative</span>
      </div>

      <div className="flex items-center gap-1 flex-wrap">
        {cluster.outletsSummary.slice(0, 5).map((o) => (
          <span key={o} className="text-[10px] px-1.5 py-0.5 rounded border border-border-subtle text-text-muted">
            {o}
          </span>
        ))}
        {cluster.outletsSummary.length > 5 && (
          <span className="text-[10px] text-text-muted">
            +{cluster.outletsSummary.length - 5} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-[11px] text-text-muted">{cluster.event}</span>
        <span className="inline-flex items-center gap-1 text-[11px] text-text-primary">
          Compare stances <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </ClickableCard>
  );
}
