'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Modal from './Modal';
import { articles, computeGenuine, narrativeDetails, type Narrative } from '@/data/mockData';
import { useTheme } from './Providers';
import GenuineRing from './GenuineRing';
import ClickableCard from './ClickableCard';
import ChartTooltip from './ChartTooltip';

export default function NarrativeModal({
  narrative,
  onClose,
  onOpenArticle,
}: {
  narrative: Narrative;
  onClose: () => void;
  onOpenArticle: (id: number) => void;
}) {
  const { theme } = useTheme();
  const d = narrativeDetails[narrative.id];
  const tick = theme === 'light' ? '#52525b' : '#a1a1aa';

  if (!d) return null;

  const sources = d.sourceArticleIds
    .map((id) => articles.find((a) => a.id === id))
    .filter(Boolean);

  return (
    <Modal onClose={onClose} labelledBy="narrative-modal-title">
      <div className="p-5 md:p-7 clear-both">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-border-strong text-text-secondary">
            {d.status}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-border-subtle text-text-muted">
            {narrative.tone} · {narrative.riskLevel} risk
          </span>
        </div>
        <h2 id="narrative-modal-title" className="text-lg md:text-xl font-semibold text-text-primary leading-snug mb-5 pr-8">
          {narrative.title}
        </h2>

        <div className="overflow-x-auto mb-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-text-muted border-b border-border-subtle">
                <th className="text-left py-2 pr-3">Outlet</th>
                <th className="text-left py-2 pr-3">Tone</th>
                <th className="text-left py-2">Reach</th>
              </tr>
            </thead>
            <tbody>
              {d.outletBreakdown.map((row) => (
                <tr key={row.outlet} className="border-b border-border-subtle">
                  <td className="py-2 pr-3 text-text-primary">{row.outlet}</td>
                  <td className="py-2 pr-3 text-text-secondary">{row.tone}</td>
                  <td className="py-2 text-text-muted font-mono text-xs">{row.reach}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Percolation</p>
        <div className="space-y-2 mb-5">
          {d.timeline.map((t, i) => (
            <div key={i} className="flex gap-3 text-xs">
              <span className="font-mono text-text-muted w-28 shrink-0">{t.day}</span>
              <span className="text-text-primary">{t.outlet}</span>
              <span className="text-text-muted">{t.type}</span>
            </div>
          ))}
        </div>

        <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Ministry impact</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {d.ministryImpact.map((m) => (
            <span key={m.name} className="text-[10px] px-2 py-0.5 rounded-full border border-border-subtle text-text-secondary">
              {m.name.replace('Ministry of ', '')} {m.confidence}%
            </span>
          ))}
        </div>

        <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Velocity (mentions)</p>
        <div className="h-40 mb-5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={d.velocitySeries}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: tick, fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: tick, fontSize: 11 }} width={32} />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--border-strong)', strokeWidth: 1 }} />
              <Line
                type="monotone"
                dataKey="mentions"
                stroke={narrative.tone === 'Critical' ? '#ef4444' : '#a1a1aa'}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 rounded-lg border border-border-subtle mb-4">
          <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Historical pattern</p>
          <p className="text-xs text-text-secondary">{d.historicalPattern}</p>
        </div>

        <div className="p-4 rounded-lg border border-border-subtle mb-4">
          <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Recommended response</p>
          <p className="text-sm text-text-primary mb-1">{d.response.priority} · {d.response.timeline}</p>
          <p className="text-xs text-text-secondary mb-1">Spokesperson: {d.response.spokesperson}</p>
          <p className="text-xs text-text-muted">{d.response.notes}</p>
        </div>

        {sources.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Source articles</p>
            <div className="space-y-2">
              {sources.map((a) => a && (
                <ClickableCard
                  key={a.id}
                  onActivate={() => onOpenArticle(a.id)}
                  label={a.headline}
                  className="w-full text-left text-sm p-3 rounded-lg border border-border-subtle hover:border-border-strong hover:bg-bg-card-hover text-text-primary"
                  contentClassName="flex items-center justify-between gap-3"
                >
                  <span className="min-w-0 truncate">{a.headline}</span>
                  <GenuineRing data={computeGenuine(a)} size="sm" />
                </ClickableCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
