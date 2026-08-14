'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  Activity, TrendingUp, AlertTriangle, BarChart3,
  ArrowUpRight, ArrowDownRight, Newspaper, Filter, Clock,
  CheckCircle2, XCircle, AlertCircle, ChevronRight,
  Globe, Tv, Smartphone, Download, Mail, Zap, Eye,
  MessageSquare, Share2, ShieldAlert, Radio, MapPin, Flame,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line,
} from 'recharts';
import {
  kpiData, sentimentBreakdown, coverageTrend, narratives, articles,
  alerts, regionData, messagePenetration, misinfoItems,
  crossPlatformData, ministryBriefing, percolationData,
  mediaFilterKey, type Article, type Narrative,
} from '@/data/mockData';
import { useFilters, useTheme } from '@/components/Providers';
import ArticleModal from '@/components/ArticleModal';
import NarrativeModal from '@/components/NarrativeModal';

const DetailCtx = createContext<{
  openArticle: (id: number) => void;
  openNarrative: (id: number) => void;
}>({ openArticle: () => {}, openNarrative: () => {} });

function useDetail() {
  return useContext(DetailCtx);
}

function useChartTheme() {
  const { theme } = useTheme();
  const light = theme === 'light';
  return {
    tick: light ? '#52525b' : '#a1a1aa',
    tooltip: {
      background: light ? '#ffffff' : '#0f0f0f',
      border: '1px solid var(--border-subtle)',
      borderRadius: 8,
      color: light ? '#09090b' : '#f5f5f5',
      fontSize: 12,
    },
  };
}

function SectionHeader({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
      <div>
        <h2 className="section-title flex items-center gap-3 flex-wrap">
          {title}
          {badge && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-red/15 text-accent-red border border-accent-red/20">
              {badge}
            </span>
          )}
        </h2>
        {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
      </div>
      <p className="text-xs text-text-muted shrink-0">Aug 13, 2026 • 14:30 IST</p>
    </div>
  );
}

function EmptyFilter() {
  const { clear } = useFilters();
  return (
    <div className="glass-card p-10 text-center">
      <p className="text-text-muted mb-3">No items match current filters</p>
      <button onClick={clear} className="text-sm border border-border-strong rounded-lg px-3 py-1.5 hover:bg-bg-card-hover">
        Clear filters
      </button>
    </div>
  );
}

function ThreatLevelBanner() {
  const level = kpiData.threatLevel;
  const map = {
    STABLE: { color: '#10b981', label: 'STABLE — No significant threats detected' },
    ELEVATED: { color: '#f59e0b', label: 'ELEVATED — Active narratives require monitoring' },
    CRITICAL: { color: '#ef4444', label: 'CRITICAL — Immediate response required' },
  }[level];

  return (
    <div
      className="flex items-center gap-3 px-5 py-3 rounded-xl border"
      style={{ borderColor: `${map.color}4d`, background: `${map.color}14` }}
    >
      <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: map.color }} />
      <span className="text-sm font-semibold tracking-wider" style={{ color: map.color }}>
        THREAT LEVEL: {map.label}
      </span>
    </div>
  );
}

function KPICard({ title, value, delta, icon: Icon, positive }: {
  title: string; value: string | number; delta: string;
  icon: React.ElementType; positive?: boolean;
}) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg border border-border-strong flex items-center justify-center">
          <Icon className="w-5 h-5 text-text-primary" />
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium ${positive !== false ? 'text-accent-green' : 'text-accent-red'}`}>
          {positive !== false ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {delta}
        </span>
      </div>
      <p className="text-2xl font-bold text-text-primary">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">{title}</p>
    </div>
  );
}

function SentimentDonut() {
  const { tick } = useChartTheme();
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Sentiment Distribution</h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={sentimentBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" strokeWidth={0}>
                {sentimentBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2.5 w-full">
          {sentimentBreakdown.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                <span className="text-sm text-text-secondary">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-text-primary">{item.value}%</span>
            </div>
          ))}
          <div className="pt-2 border-t border-border-subtle">
            <div className="flex justify-between">
              <span className="text-xs text-text-muted">Total Coverage</span>
              <span className="text-xs font-semibold text-text-primary" style={{ color: tick }}>
                {kpiData.coverageVolume.toLocaleString()} items
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoverageTrendChart() {
  const { tick, tooltip } = useChartTheme();
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">7-Day Sentiment Trend</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={coverageTrend}>
            <defs>
              <linearGradient id="gradPos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradNeg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: tick, fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: tick, fontSize: 11 }} />
            <Tooltip contentStyle={tooltip} />
            <Area type="monotone" dataKey="positive" stackId="1" stroke="#10b981" fill="url(#gradPos)" strokeWidth={2} />
            <Area type="monotone" dataKey="neutral" stackId="1" stroke="#6b7280" fill="rgba(107,114,128,0.1)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="mixed" stackId="1" stroke="#f59e0b" fill="rgba(245,158,11,0.1)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="url(#gradNeg)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function toneColor(tone: string) {
  if (tone === 'Positive') return '#10b981';
  if (tone === 'Critical' || tone === 'Negative') return '#ef4444';
  if (tone === 'Mixed') return '#f59e0b';
  return '#a1a1aa';
}

function NarrativeRow({ n, rank }: { n: Narrative; rank: number }) {
  const { openNarrative } = useDetail();
  return (
    <tr
      className="border-b border-border-subtle hover:bg-bg-card-hover transition-colors cursor-pointer"
      onClick={() => openNarrative(n.id)}
    >
      <td className="py-3 px-3 text-center text-text-muted text-sm">{rank}</td>
      <td className="py-3 px-3 min-w-[220px]">
        <p className="text-sm text-text-primary font-medium leading-snug">{n.title}</p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          {n.ministries.map((m) => (
            <span key={m} className="text-[10px] px-2 py-0.5 rounded-full border border-border-subtle text-text-secondary">
              {m.replace('Ministry of ', '')}
            </span>
          ))}
        </div>
      </td>
      <td className="py-3 px-3">
        <span className="text-xs font-semibold" style={{ color: toneColor(n.tone) }}>{n.tone}</span>
      </td>
      <td className="py-3 px-3 text-sm text-text-secondary">{n.spread}</td>
      <td className="py-3 px-3">
        <span className="text-xs font-semibold px-2 py-1 rounded-full border border-border-subtle text-text-secondary">
          {n.riskLevel}
        </span>
      </td>
      <td className="py-3 px-3">
        <div className="w-20 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={n.trendData.map((v, i) => ({ v, i }))}>
              <Line type="monotone" dataKey="v" stroke={n.tone === 'Critical' ? '#ef4444' : '#a1a1aa'} strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </td>
      <td className="py-3 px-3 text-xs text-text-secondary max-w-[200px]">{n.suggestedAction}</td>
    </tr>
  );
}

function CommandCenter({ filteredNarratives }: { filteredNarratives: Narrative[] }) {
  return (
    <section id="command-center" className="px-4 md:px-8 py-8 scroll-mt-20">
      <SectionHeader title="Command Center" subtitle="Overview" />
      <ThreatLevelBanner />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <KPICard title="Coverage Volume" value={kpiData.coverageVolume} delta={kpiData.coverageDelta} icon={Activity} />
        <KPICard title="Active Narratives" value={filteredNarratives.length} delta={kpiData.narrativeDelta} icon={TrendingUp} />
        <KPICard title="Pending Alerts" value={kpiData.pendingAlerts} delta={kpiData.alertsDelta} icon={AlertTriangle} positive={false} />
        <KPICard title="Confidence Score" value={`${kpiData.aiConfidence}%`} delta={kpiData.confidenceDelta} icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <SentimentDonut />
        <CoverageTrendChart />
      </div>

      <div className="glass-card mt-4 overflow-hidden">
        <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Top Media Narratives</h3>
          <span className="text-xs text-text-muted">{filteredNarratives.length} tracked</span>
        </div>
        {filteredNarratives.length === 0 ? (
          <div className="p-6"><EmptyFilter /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-border-subtle text-xs text-text-muted uppercase tracking-wider">
                  <th className="py-2.5 px-3 text-center">#</th>
                  <th className="py-2.5 px-3 text-left">Narrative</th>
                  <th className="py-2.5 px-3 text-left">Tone</th>
                  <th className="py-2.5 px-3 text-left">Spread</th>
                  <th className="py-2.5 px-3 text-left">Risk</th>
                  <th className="py-2.5 px-3 text-left">Trend</th>
                  <th className="py-2.5 px-3 text-left">Suggested Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNarratives.map((n, i) => (
                  <NarrativeRow key={n.id} n={n} rank={i + 1} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const { openArticle } = useDetail();
  const sent = article.sentiment;
  const sentColor = toneColor(sent === 'Negative' ? 'Critical' : sent);

  return (
    <button
      type="button"
      onClick={() => openArticle(article.id)}
      className="glass-card clickable p-5 animate-slide-in text-left w-full"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border"
              style={{ color: sentColor, borderColor: `${sentColor}55`, background: `${sentColor}18` }}
            >
              {article.sentiment}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-border-subtle text-text-secondary">
              RELEVANCE: {article.relevanceScore}%
            </span>
            {article.mediaType !== 'Print' && (
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-border-subtle text-text-muted">
                {article.mediaType}
              </span>
            )}
            {article.crossReferences > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-border-subtle text-text-muted flex items-center gap-1">
                <Share2 className="w-2.5 h-2.5" /> {article.crossReferences} outlets
              </span>
            )}
          </div>

          <h4 className="text-sm font-semibold text-text-primary leading-snug mb-1.5">{article.headline}</h4>
          <p className="text-xs text-text-secondary leading-relaxed mb-3">{article.summary}</p>

          <div className="flex items-center gap-4 text-[11px] text-text-muted mb-2.5 flex-wrap">
            <span className="flex items-center gap-1"><Newspaper className="w-3 h-3" /> {article.source}</span>
            <span>{article.edition}</span>
            <span>{article.page}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.date}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
            {article.ministryTags.map((tag) => (
              <span key={tag.name} className="text-[10px] px-2 py-0.5 rounded-full border border-border-subtle text-text-secondary">
                {tag.name.replace('Ministry of ', '')} <span className="text-text-muted">{tag.confidence}%</span>
              </span>
            ))}
          </div>

          <div className="text-[11px] px-3 py-2 rounded-lg bg-bg-surface border border-border-subtle">
            <span className="font-semibold text-text-secondary">Analysis: </span>
            <span className="text-text-secondary">{article.sentimentReason}</span>
          </div>

          {'aiFlag' in article && article.aiFlag ? (
            <div className="mt-2 text-[11px] px-3 py-2 rounded-lg border border-accent-amber/30 bg-accent-amber/8">
              <span className="font-semibold text-accent-amber">Filter note: </span>
              <span className="text-accent-amber/90">{article.aiFlag}</span>
            </div>
          ) : null}
        </div>

        <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-lg bg-[#f4f1ea] border border-border-subtle flex items-center justify-center shrink-0 overflow-hidden">
          <div className="p-2 text-center">
            <Newspaper className="w-5 h-5 text-[#666] mx-auto mb-1" />
            <p className="text-[8px] text-[#444] font-serif leading-tight line-clamp-4">{article.headline}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function MediaFeed({ filteredArticles }: { filteredArticles: Article[] }) {
  const [selectedSentiment, setSelectedSentiment] = useState('All');
  const [minRelevance, setMinRelevance] = useState(0);

  const filtered = filteredArticles.filter((a) => {
    if (selectedSentiment !== 'All' && a.sentiment !== selectedSentiment) return false;
    if (a.relevanceScore < minRelevance) return false;
    return true;
  });

  return (
    <section id="media-feed" className="px-4 md:px-8 py-8 scroll-mt-20 border-t border-border-subtle">
      <SectionHeader title="Media Coverage" subtitle="Filtered coverage across print, digital, and broadcast" />

      <div className="glass-card p-4 mb-5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-text-muted" />
          <span className="text-xs text-text-muted uppercase tracking-wider">Sentiment:</span>
        </div>
        {['All', 'Positive', 'Negative', 'Mixed', 'Neutral'].map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSentiment(s)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              selectedSentiment === s
                ? 'border-border-strong text-text-primary bg-bg-card-hover'
                : 'text-text-secondary border-border-subtle hover:border-border-strong'
            }`}
          >
            {s}
          </button>
        ))}
        <div className="flex items-center gap-2 sm:ml-auto w-full sm:w-auto">
          <span className="text-xs text-text-muted">Min relevance:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={minRelevance}
            onChange={(e) => setMinRelevance(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-xs font-mono w-8">{minRelevance}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        {filtered.length === 0 && <EmptyFilter />}
      </div>
    </section>
  );
}

function NarrativeIntelligence({
  filteredNarratives,
  filteredPercolation,
}: {
  filteredNarratives: Narrative[];
  filteredPercolation: typeof percolationData;
}) {
  const { openNarrative } = useDetail();
  return (
    <section id="narratives" className="px-4 md:px-8 py-8 scroll-mt-20 border-t border-border-subtle">
      <SectionHeader title="Narratives" subtitle="Story clusters and cross-outlet spread" />

      <div className="space-y-4">
      {filteredPercolation.length === 0 ? (
        <EmptyFilter />
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPercolation.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => openNarrative(p.id)}
            className="glass-card clickable p-4 text-left flex flex-col min-h-0"
          >
            <h4 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2">{p.narrative}</h4>
            <div className="flex items-center gap-2 mt-2 mb-3 flex-wrap">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                p.status === 'ESCALATING'
                  ? 'border-accent-red/30 text-accent-red'
                  : p.status === 'SATURATED'
                    ? 'border-accent-green/30 text-accent-green'
                    : 'border-border-strong text-text-secondary'
              }`}>
                {p.status}
              </span>
              <span className="text-[11px] text-text-muted">
                Velocity: <span className={p.velocity === 'High' ? 'text-accent-red' : 'text-text-secondary'}>{p.velocity}</span>
              </span>
            </div>
            <div className="relative pl-5 flex-1">
              {p.timeline.slice(0, 4).map((t, i, arr) => (
                <div key={i} className="relative pb-3 last:pb-0">
                  <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-bg-card border-2 border-text-muted" />
                  {i < arr.length - 1 && <div className="absolute -left-[12px] top-3.5 bottom-0 w-px bg-border-strong" />}
                  <p className="text-[10px] font-mono text-text-muted">{t.day}</p>
                  <p className="text-xs text-text-primary leading-snug">{t.outlet}</p>
                  <p className="text-[10px] text-text-muted">{t.type}</p>
                </div>
              ))}
              {p.timeline.length > 4 && (
                <p className="text-[10px] text-text-muted mt-1">+{p.timeline.length - 4} more</p>
              )}
            </div>
          </button>
        ))}
      </div>
      )}

        <div className="glass-card p-5">
          <h4 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">Narrative Cross-Reference Matrix</h4>
          {filteredNarratives.length === 0 ? (
            <EmptyFilter />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredNarratives.slice(0, 6).map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => openNarrative(n.id)}
                  className="p-3 rounded-lg bg-bg-surface border border-border-subtle hover:border-border-strong hover:bg-bg-card-hover text-left"
                >
                  <p className="text-xs text-text-primary font-medium mb-2 line-clamp-2">{n.title}</p>
                  <div className="h-6 mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={n.trendData.map((v, i) => ({ v, i }))}>
                        <Line type="monotone" dataKey="v" stroke={n.tone === 'Critical' ? '#ef4444' : '#a1a1aa'} strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-text-muted">{n.outlets} outlets</span>
                    <span className="text-[10px] font-semibold" style={{ color: toneColor(n.tone) }}>{n.tone}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RegionalIntelligence({ filteredRegions }: { filteredRegions: typeof regionData }) {
  const { tick, tooltip } = useChartTheme();
  return (
    <section id="regional" className="px-4 md:px-8 py-8 scroll-mt-20 border-t border-border-subtle">
      <SectionHeader title="Regional Coverage" subtitle="Regional coverage and gaps" />

      {filteredRegions.length === 0 ? (
        <EmptyFilter />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            {filteredRegions.map((r) => {
              const sentColor = r.sentimentScore >= 65 ? '#10b981' : r.sentimentScore >= 45 ? '#f59e0b' : '#ef4444';
              return (
                <div key={r.name} className={`glass-card p-4 ${r.coverageGap ? 'border-accent-amber/30' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-text-muted" />
                        {r.name}
                      </h4>
                      <p className="text-[10px] text-text-muted mt-0.5">{r.states}</p>
                    </div>
                    {r.coverageGap && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full border border-accent-amber/30 text-accent-amber flex items-center gap-1">
                        <AlertCircle className="w-2.5 h-2.5" /> GAP
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-text-muted">Sentiment</span>
                        <span style={{ color: sentColor }}>{r.sentimentScore}/100</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-bg-surface">
                        <div className="h-full rounded-full" style={{ width: `${r.sentimentScore}%`, background: sentColor }} />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-primary">{r.volume.toLocaleString()}</p>
                      <p className="text-[10px] text-text-muted">{r.volumeLabel}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">{r.keyInsight}</p>
                  <div className="mt-2.5 flex gap-1 flex-wrap">
                    {r.topSources.slice(0, 3).map((s) => (
                      <span key={s} className="text-[9px] px-1.5 py-0.5 rounded border border-border-subtle text-text-muted">{s}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-card p-5 overflow-x-auto">
            <h4 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">Regional Sentiment Overview</h4>
            <div className="h-48 min-w-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredRegions} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: tick, fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={130} axisLine={false} tickLine={false} tick={{ fill: tick, fontSize: 11 }} />
                  <Tooltip contentStyle={tooltip} />
                  <Bar dataKey="sentimentScore" radius={[0, 4, 4, 0]}>
                    {filteredRegions.map((r, i) => (
                      <Cell key={i} fill={r.sentimentScore >= 65 ? '#10b981' : r.sentimentScore >= 45 ? '#f59e0b' : '#ef4444'} fillOpacity={0.7} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function EarlyWarningSection({ filteredAlerts }: { filteredAlerts: typeof alerts }) {
  const iconFor = (sev: string) => (sev === 'HIGH' ? Flame : sev === 'MEDIUM' ? AlertTriangle : Eye);

  return (
    <section id="early-warning" className="px-4 md:px-8 py-8 scroll-mt-20 border-t border-border-subtle">
      <SectionHeader
        title="Alerts"
        subtitle="Active alerts and predicted escalations"
        badge={`${filteredAlerts.filter((a) => a.severity === 'HIGH').length} HIGH`}
      />

      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const SevIcon = iconFor(alert.severity);
          const color = alert.severity === 'HIGH' ? '#ef4444' : alert.severity === 'MEDIUM' ? '#f59e0b' : '#a1a1aa';
          return (
            <div key={alert.id} className="glass-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg border border-border-strong flex items-center justify-center shrink-0">
                  <SevIcon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-sm font-semibold text-text-primary">{alert.title}</h4>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-border-subtle uppercase tracking-wider shrink-0" style={{ color }}>
                      {alert.severity} RISK
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">{alert.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-bg-surface border border-border-subtle">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Escalation Probability</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold" style={{ color: alert.escalationProbability >= 70 ? '#ef4444' : alert.escalationProbability >= 45 ? '#f59e0b' : '#10b981' }}>
                          {alert.escalationProbability}%
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-bg-card">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${alert.escalationProbability}%`,
                              background: alert.escalationProbability >= 70 ? '#ef4444' : alert.escalationProbability >= 45 ? '#f59e0b' : '#10b981',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-bg-surface border border-border-subtle">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Time to Critical</p>
                      <p className="text-sm font-semibold text-text-primary">{alert.timeToCritical}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-bg-surface border border-border-subtle">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Source</p>
                      <p className="text-xs text-text-secondary">{alert.source}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-bg-surface border border-border-subtle mb-3">
                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-1">Historical Pattern Match</p>
                    <p className="text-xs text-text-secondary">{alert.historicalMatch}</p>
                  </div>
                  <div className="p-3 rounded-lg border border-border-subtle">
                    <p className="text-[10px] uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
                      <Zap className="w-3 h-3" /> Recommended Response
                    </p>
                    <p className="text-xs text-text-secondary">{alert.recommendation}</p>
                  </div>
                  <p className="text-[10px] text-text-muted mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {alert.timestamp}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {filteredAlerts.length === 0 && <EmptyFilter />}
      </div>
    </section>
  );
}

function CrossPlatformSection() {
  const { filters } = useFilters();
  const locked = mediaFilterKey(filters.media);
  const [activeTab, setActiveTab] = useState<'print' | 'television' | 'digital' | 'social'>('print');

  useEffect(() => {
    if (locked) setActiveTab(locked);
  }, [locked]);

  const tab = locked ?? activeTab;
  const tabs = [
    { key: 'print' as const, label: 'Print', icon: Newspaper, count: crossPlatformData.print.totalArticles },
    { key: 'television' as const, label: 'Television', icon: Tv, count: crossPlatformData.television.totalMentions },
    { key: 'digital' as const, label: 'Digital', icon: Globe, count: crossPlatformData.digital.totalArticles },
    { key: 'social' as const, label: 'Social Media', icon: Smartphone, count: crossPlatformData.social.totalMentions },
  ];

  const data = crossPlatformData[tab];
  const items = tab === 'print' ? crossPlatformData.print.topSources
    : tab === 'television' ? crossPlatformData.television.topChannels
    : tab === 'digital' ? crossPlatformData.digital.topPortals
    : crossPlatformData.social.topPlatforms;

  return (
    <section id="cross-platform" className="px-4 md:px-8 py-8 scroll-mt-20 border-t border-border-subtle">
      <SectionHeader title="Cross-Platform" subtitle="Coverage across print, TV, digital, social" />

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {tabs.map((t) => {
          const TabIcon = t.icon;
          const disabled = Boolean(locked && locked !== t.key);
          return (
            <button
              key={t.key}
              onClick={() => !disabled && setActiveTab(t.key)}
              disabled={disabled}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border shrink-0 ${
                tab === t.key
                  ? 'border-border-strong text-text-primary bg-bg-card-hover'
                  : disabled
                    ? 'border-border-subtle text-text-muted opacity-40 cursor-not-allowed'
                    : 'border-border-subtle text-text-secondary hover:border-border-strong'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              {t.label}
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border-subtle">
                {typeof t.count === 'number' ? t.count.toLocaleString() : t.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Positive', value: data.positive, color: '#10b981' },
          { label: 'Neutral', value: data.neutral, color: '#6b7280' },
          { label: tab === 'social' ? 'Negative' : 'Mixed', value: tab === 'social' ? data.negative : data.mixed, color: '#f59e0b' },
          { label: tab === 'social' ? 'Mixed' : 'Negative', value: tab === 'social' ? data.mixed : data.negative, color: '#ef4444' },
        ].map((item) => (
          <div key={item.label} className="glass-card p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}%</p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border-subtle">
          <h4 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Top {tab === 'print' ? 'Publications' : tab === 'television' ? 'Channels' : tab === 'digital' ? 'Portals' : 'Platforms'}
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle text-[10px] text-text-muted uppercase tracking-wider">
                <th className="py-2.5 px-5 text-left">Source</th>
                <th className="py-2.5 px-5 text-left">{tab === 'print' || tab === 'digital' ? 'Articles' : 'Mentions'}</th>
                <th className="py-2.5 px-5 text-left">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-border-subtle hover:bg-bg-card-hover">
                  <td className="py-3 px-5 text-sm text-text-primary font-medium">{item.name}</td>
                  <td className="py-3 px-5 text-sm text-text-secondary font-mono">
                    {'articles' in item
                      ? item.articles.toLocaleString()
                      : String(item.mentions)}
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-xs font-semibold" style={{ color: toneColor(item.sentiment) }}>{item.sentiment}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function MessagePenetrationSection({ filtered }: { filtered: typeof messagePenetration }) {
  return (
    <section id="penetration" className="px-4 md:px-8 py-8 scroll-mt-20 border-t border-border-subtle">
      <SectionHeader title="Message Penetration" subtitle="Intended message vs actual media pickup" />

      <div className="space-y-4">
        {filtered.map((mp, idx) => (
          <div key={idx} className="glass-card p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <h4 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Radio className="w-4 h-4 text-text-muted" />
                {mp.message}
              </h4>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-border-subtle uppercase tracking-wider shrink-0">
                {mp.priority}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {[
                { label: 'National Pickup', value: mp.pickupNational },
                { label: 'Regional Pickup', value: mp.pickupRegional },
                { label: 'Digital Pickup', value: mp.pickupDigital },
              ].map((channel) => (
                <div key={channel.label}>
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className="text-text-muted uppercase tracking-wider">{channel.label}</span>
                    <span className={channel.value >= 75 ? 'text-accent-green' : channel.value >= 50 ? 'text-accent-amber' : 'text-accent-red'}>{channel.value}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-bg-surface">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${channel.value}%`,
                        background: channel.value >= 75 ? '#10b981' : channel.value >= 50 ? '#f59e0b' : '#ef4444',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 p-2.5 rounded-lg border border-accent-amber/20 bg-accent-amber/5">
                <p className="text-[10px] text-accent-amber font-semibold uppercase tracking-wider mb-1">Gap Identified</p>
                <p className="text-xs text-text-secondary">{mp.gap}</p>
              </div>
              <div className="flex-1 p-2.5 rounded-lg border border-border-subtle">
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1">Recommended Action</p>
                <p className="text-xs text-text-secondary">{mp.action}</p>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <EmptyFilter />}
      </div>
    </section>
  );
}

function MisinfoWatchSection({ filtered }: { filtered: typeof misinfoItems }) {
  return (
    <section id="misinfo" className="px-4 md:px-8 py-8 scroll-mt-20 border-t border-border-subtle">
      <SectionHeader title="Misinformation Watch" subtitle="False claims tracker with verification status" badge={`${filtered.length} Active`} />

      <div className="glass-card p-4 mb-5 flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent-red" /><span className="text-xs text-text-secondary">FALSE</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent-amber" /><span className="text-xs text-text-secondary">MISLEADING</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-text-muted" /><span className="text-xs text-text-secondary">PENDING</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent-green" /><span className="text-xs text-text-secondary">VERIFIED TRUE</span></div>
        </div>
        <div className="sm:ml-auto text-xs text-text-muted">PIB Fact Check Unit</div>
      </div>

      <div className="space-y-4">
        {filtered.map((item) => {
          const isFalse = item.verificationStatus.startsWith('FALSE');
          const color = isFalse ? '#ef4444' : item.verificationStatus.startsWith('MISLEADING') ? '#f59e0b' : '#a1a1aa';
          return (
            <div key={item.id} className="glass-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg border border-border-strong flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" style={{ color }} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-text-primary mb-1.5">{item.claim}</h4>
                  <div className="flex items-center gap-4 mb-3 flex-wrap">
                    <span className="text-xs text-text-muted flex items-center gap-1"><Globe className="w-3 h-3" /> {item.sourceType}</span>
                    <span className="text-xs font-semibold" style={{ color: item.spreadLevel === 'high' ? '#ef4444' : item.spreadLevel === 'medium' ? '#f59e0b' : '#a1a1aa' }}>
                      Spread: {item.spread}
                    </span>
                    <span className="text-[10px] text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" /> {item.detectedAt}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-subtle mb-3">
                    {isFalse ? <XCircle className="w-3.5 h-3.5" style={{ color }} /> : <AlertCircle className="w-3.5 h-3.5" style={{ color }} />}
                    <span className="text-xs font-semibold" style={{ color }}>{item.verificationStatus}</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-border-subtle">
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-1">Recommended Action</p>
                    <p className="text-xs text-text-secondary">{item.action}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <EmptyFilter />}
      </div>
    </section>
  );
}

function MinistryBriefingSection() {
  const { filters } = useFilters();
  const b = ministryBriefing;
  const show = filters.ministry === 'All Ministries' || filters.ministry === b.ministry;

  return (
    <section id="briefing" className="px-4 md:px-8 py-8 scroll-mt-20 border-t border-border-subtle">
      <SectionHeader title="Ministry Briefing" subtitle="Daily brief for ministry officers" />
      {!show ? (
        <EmptyFilter />
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-text-primary">{b.ministry}</h3>
              <p className="text-xs text-text-muted mt-0.5">Daily brief • {b.date} • {b.generatedAt}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle text-xs text-text-secondary hover:bg-bg-card-hover">
                <Download className="w-3.5 h-3.5" /> Export PDF
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle text-xs text-text-secondary hover:bg-bg-card-hover">
                <Mail className="w-3.5 h-3.5" /> Email Brief
              </button>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="px-3 py-1.5 rounded-lg border border-border-subtle">
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Overall Sentiment</p>
                <p className="text-sm font-semibold text-text-primary">{b.overallSentiment}</p>
              </div>
              <div className="px-3 py-1.5 rounded-lg border border-border-subtle">
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Coverage Volume</p>
                <p className="text-sm font-semibold text-text-primary">{b.coverageVolume.toLocaleString()} items</p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" /> Key Highlights
              </h4>
              <ul className="space-y-2">
                {b.keyHighlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                    <ChevronRight className="w-3 h-3 text-text-muted shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-accent-green uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Talking Points
              </h4>
              <ul className="space-y-2">
                {b.talkingPoints.map((tp, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                    <CheckCircle2 className="w-3 h-3 text-accent-green shrink-0 mt-0.5" />
                    {tp}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-accent-amber uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Media Advisory
              </h4>
              <ul className="space-y-2">
                {b.mediaAdvisory.map((ma, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                    <Zap className="w-3 h-3 text-accent-amber shrink-0 mt-0.5" />
                    {ma}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-lg border border-accent-red/20 bg-accent-red/5">
              <h4 className="text-xs font-semibold text-accent-red uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> Risk Items
              </h4>
              <ul className="space-y-1.5">
                {b.riskItems.map((ri, i) => (
                  <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
                    <AlertCircle className="w-3 h-3 text-accent-red shrink-0 mt-0.5" />
                    {ri}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="px-6 py-3 border-t border-border-subtle flex items-center justify-between">
            <p className="text-[9px] text-text-muted uppercase tracking-wider">
              PIB Sentinel • Confidence: {kpiData.aiConfidence}%
            </p>
            <p className="text-[9px] text-text-muted uppercase tracking-wider">
              Restricted • Government of India
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [articleId, setArticleId] = useState<number | null>(null);
  const [narrativeId, setNarrativeId] = useState<number | null>(null);
  const { filters } = useFilters();

  useEffect(() => setMounted(true), []);

  const openArticle = useCallback((id: number) => {
    setNarrativeId(null);
    setArticleId(id);
  }, []);
  const openNarrative = useCallback((id: number) => {
    setArticleId(null);
    setNarrativeId(id);
  }, []);

  const filteredArticles = useMemo(() => articles.filter((a) => {
    if (filters.ministry !== 'All Ministries' && !a.ministryTags.some((t) => t.name === filters.ministry)) return false;
    if (filters.region !== 'All Regions' && a.region !== filters.region) return false;
    if (filters.media !== 'All Media' && a.mediaType !== filters.media) return false;
    return true;
  }), [filters]);

  const filteredNarratives = useMemo(() => narratives.filter((n) => {
    if (filters.ministry !== 'All Ministries' && !n.ministries.includes(filters.ministry)) return false;
    if (filters.region !== 'All Regions' && !(n.regions || []).includes(filters.region)) return false;
    return true;
  }), [filters]);

  const filteredPercolation = useMemo(() => percolationData.filter((p) => {
    if (filters.ministry !== 'All Ministries' && !p.ministries.includes(filters.ministry)) return false;
    if (filters.region !== 'All Regions' && !p.regions.includes(filters.region)) return false;
    if (filters.media !== 'All Media' && !p.media.includes(filters.media)) return false;
    return true;
  }), [filters]);

  const filteredRegions = useMemo(() => (
    filters.region === 'All Regions' ? regionData : regionData.filter((r) => r.name === filters.region)
  ), [filters.region]);

  const filteredAlerts = useMemo(() => alerts.filter((a) => {
    if (filters.ministry !== 'All Ministries' && !(a.ministries || []).includes(filters.ministry)) return false;
    if (filters.region !== 'All Regions' && a.region !== filters.region) return false;
    return true;
  }), [filters]);

  const filteredPenetration = useMemo(() => messagePenetration.filter((m) => {
    if (filters.ministry !== 'All Ministries' && m.ministry !== filters.ministry) return false;
    if (filters.region !== 'All Regions' && m.region !== filters.region) return false;
    return true;
  }), [filters]);

  const filteredMisinfo = useMemo(() => misinfoItems.filter((m) => {
    if (filters.ministry !== 'All Ministries' && !(m.ministries || []).includes(filters.ministry)) return false;
    if (filters.region !== 'All Regions' && m.region !== filters.region) return false;
    return true;
  }), [filters]);

  const article = articles.find((a) => a.id === articleId) ?? null;
  const narrative = narratives.find((n) => n.id === narrativeId) ?? null;

  if (!mounted) return <div className="min-h-screen bg-bg-primary" />;

  return (
    <DetailCtx.Provider value={{ openArticle, openNarrative }}>
      <CommandCenter filteredNarratives={filteredNarratives} />
      <MediaFeed filteredArticles={filteredArticles} />
      <NarrativeIntelligence filteredNarratives={filteredNarratives} filteredPercolation={filteredPercolation} />
      <RegionalIntelligence filteredRegions={filteredRegions} />
      <EarlyWarningSection filteredAlerts={filteredAlerts} />
      <CrossPlatformSection />
      <MessagePenetrationSection filtered={filteredPenetration} />
      <MisinfoWatchSection filtered={filteredMisinfo} />
      <MinistryBriefingSection />

      <footer className="p-6 border-t border-border-subtle text-center">
        <div className="tricolor-bar mb-4 rounded-full max-w-xs mx-auto" />
        <p className="text-xs text-text-muted uppercase tracking-widest">
          Confidential & Restricted • Press Information Bureau • Government of India
        </p>
        <p className="text-[10px] text-text-muted mt-1">PIB Sentinel v1.0</p>
      </footer>

      {article && (
        <ArticleModal article={article} onClose={() => setArticleId(null)} onOpenArticle={openArticle} />
      )}
      {narrative && (
        <NarrativeModal narrative={narrative} onClose={() => setNarrativeId(null)} onOpenArticle={openArticle} />
      )}
    </DetailCtx.Provider>
  );
}
