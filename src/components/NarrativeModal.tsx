'use client';

import { GitBranch, TrendingUp, History, Zap, Users, Map, ArrowRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import type { Narrative } from '@/data/mockData';
import { percolationData, articles } from '@/data/mockData';
import Modal from './Modal';

const toneColor: Record<string, string> = {
  Positive: 'text-accent-green',
  Critical: 'text-accent-red',
  Negative: 'text-accent-red',
  Mixed: 'text-accent-amber',
  Neutral: 'text-text-muted',
};
const toneStroke: Record<string, string> = {
  Positive: '#10b981',
  Critical: '#ef4444',
  Mixed: '#f59e0b',
  Neutral: '#a1a1aa',
};

export default function NarrativeModal({
  narrative, onClose, onOpenArticle,
}: {
  narrative: Narrative;
  onClose: () => void;
  onOpenArticle?: (id: number) => void;
}) {
  const percolation = percolationData.find((p) => p.id === narrative.id);
  const relatedArticles = articles.filter((a) =>
    a.ministryTags.some((t) => narrative.ministries.includes(t.name))
  ).slice(0, 5);

  const days = ['Aug 7', 'Aug 8', 'Aug 9', 'Aug 10', 'Aug 11', 'Aug 12', 'Aug 13'];
  const chartData = narrative.trendData.map((v, i) => ({ day: days[i], mentions: v }));
  const stroke = toneStroke[narrative.tone] || '#a1a1aa';

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={narrative.title}
      subtitle={`${narrative.outlets} outlets • Spread: ${narrative.spread} • Risk: ${narrative.riskLevel}`}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border border-border-strong uppercase tracking-wider ${toneColor[narrative.tone]}`}>
            {narrative.tone}
          </span>
          {percolation && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${
              percolation.status === 'ESCALATING'
                ? 'border-accent-red/40 text-accent-red'
                : percolation.status === 'SATURATED'
                ? 'border-accent-amber/40 text-accent-amber'
                : 'border-accent-green/40 text-accent-green'
            }`}>
              {percolation.status}
            </span>
          )}
          {narrative.ministries.map((m) => (
            <span key={m} className="text-[11px] px-2 py-0.5 rounded-full border border-border-subtle text-text-secondary">
              {m.replace('Ministry of ', '')}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="glass-card p-3">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Outlets</p>
            <p className="text-xl font-bold text-text-primary">{narrative.outlets}</p>
          </div>
          <div className="glass-card p-3">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Risk level</p>
            <p className={`text-xl font-bold ${narrative.riskLevel === 'High' ? 'text-accent-red' : narrative.riskLevel === 'Medium' ? 'text-accent-amber' : 'text-accent-green'}`}>
              {narrative.riskLevel}
            </p>
          </div>
          <div className="glass-card p-3">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Velocity</p>
            <p className={`text-xl font-bold ${percolation?.velocity === 'High' ? 'text-accent-red' : percolation?.velocity === 'Peaked' ? 'text-accent-amber' : 'text-text-secondary'}`}>
              {percolation?.velocity || 'Steady'}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" /> Coverage trend (7 days)
          </h4>
          <div className="glass-card p-3 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 12 }} />
                <Line type="monotone" dataKey="mentions" stroke={stroke} strokeWidth={2} dot={{ fill: stroke, r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {percolation && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
              <GitBranch className="w-3 h-3" /> Percolation timeline
            </h4>
            <div className="relative pl-5">
              {percolation.timeline.map((t, i) => (
                <div key={i} className="relative pb-2.5 last:pb-0">
                  <div className="absolute left-[-15px] top-1 w-2 h-2 rounded-full bg-text-secondary" />
                  {i < percolation.timeline.length - 1 && (
                    <div className="absolute left-[-11px] top-3 bottom-0 w-px bg-border-subtle" />
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] text-text-muted font-mono w-14 shrink-0">{t.day}</span>
                    <span className="text-xs text-text-primary">{t.outlet}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded border border-border-subtle text-text-muted">{t.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass-card p-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5 flex items-center gap-1.5">
              <Users className="w-3 h-3" /> Ministries affected
            </h4>
            <ul className="space-y-1">
              {narrative.ministries.map((m) => (
                <li key={m} className="text-xs text-text-secondary">{m}</li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5 flex items-center gap-1.5">
              <Map className="w-3 h-3" /> Active regions
            </h4>
            <ul className="space-y-1">
              {narrative.regions.map((r) => (
                <li key={r} className="text-xs text-text-secondary">{r}</li>
              ))}
            </ul>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Source coverage</h4>
            <ul className="space-y-1.5">
              {relatedArticles.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => onOpenArticle?.(r.id)}
                    className="w-full text-left text-xs p-2 rounded-lg border border-border-subtle hover:border-border-strong hover:bg-bg-card-hover flex items-start gap-2"
                  >
                    <ArrowRight className="w-3 h-3 text-text-muted mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-text-primary leading-snug">{r.headline}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">
                        {r.source} • {r.date} <span className={`ml-2 ${toneColor[r.sentiment]}`}>• {r.sentiment}</span>
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="glass-card p-3">
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5 flex items-center gap-1.5">
            <History className="w-3 h-3" /> Historical pattern
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">
            {narrative.tone === 'Critical'
              ? 'Similar critical narratives have historically sustained 2-3 weeks when unaddressed. Early factual response reduces cycle length by ~40%.'
              : 'Positive narratives of this scale typically peak within 5-7 days. Sustained coverage benefits from regional and vernacular amplification.'}
          </p>
        </div>

        <div className="rounded-lg border border-border-strong p-3">
          <h4 className="text-[10px] font-semibold uppercase tracking-wider text-text-primary mb-2 flex items-center gap-1.5">
            <Zap className="w-3 h-3" /> Recommended response
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed">{narrative.suggestedAction}</p>
        </div>
      </div>
    </Modal>
  );
}
