'use client';

import { useState, useEffect } from 'react';
import {
  Activity, TrendingUp, AlertTriangle, Brain, ArrowUpRight, ArrowDownRight,
  Newspaper, Filter, Search, ExternalLink, Clock, CheckCircle2, XCircle,
  AlertCircle, ChevronRight, BarChart3, Globe, Tv, Smartphone, Hash,
  FileText, Download, Mail, Zap, Eye, MessageSquare, Share2,
  ShieldCheck, ShieldAlert, Radio, GitBranch, MapPin, Flame,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line,
} from 'recharts';
import {
  kpiData, sentimentBreakdown, coverageTrend, narratives, articles,
  alerts, regionData, messagePenetration, misinfoItems,
  crossPlatformData, ministryBriefing, percolationData,
} from '@/data/mockData';

function SectionHeader({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: string }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="section-title flex items-center gap-3">
          {title}
          {badge && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-red/15 text-accent-red border border-accent-red/20 animate-pulse-red">
              {badge}
            </span>
          )}
        </h2>
        {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
      </div>
      <p className="text-xs text-text-muted">Aug 13, 2026 • 14:30 IST</p>
    </div>
  );
}

function ThreatLevelBanner() {
  const level = kpiData.threatLevel;
  const config = {
    STABLE: { color: 'accent-green', bg: 'accent-green/10', border: 'accent-green/30', label: 'STABLE — No significant threats detected' },
    ELEVATED: { color: 'accent-amber', bg: 'accent-amber/10', border: 'accent-amber/30', label: 'ELEVATED — Active narratives require monitoring' },
    CRITICAL: { color: 'accent-red', bg: 'accent-red/10', border: 'accent-red/30', label: 'CRITICAL — Immediate response required' },
  }[level];

  return (
    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl bg-${config.bg} border border-${config.border} ${level === 'CRITICAL' ? 'animate-pulse-red' : level === 'ELEVATED' ? 'animate-pulse-amber' : ''}`}>
      <div className={`w-3 h-3 rounded-full bg-${config.color} animate-pulse`} />
      <span className={`text-sm font-semibold tracking-wider text-${config.color}`}>
        THREAT LEVEL: {config.label}
      </span>
    </div>
  );
}

function KPICard({ title, value, delta, icon: Icon, positive }: {
  title: string; value: string | number; delta: string;
  icon: React.ElementType; positive?: boolean;
}) {
  return (
    <div className="glass-card p-5 gradient-border">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent-blue" />
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
  return (
    <div className="glass-card p-5 gradient-border">
      <h3 className="text-sm font-semibold text-text-secondary mb-4 uppercase tracking-wider">Sentiment Distribution</h3>
      <div className="flex items-center gap-6">
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
        <div className="flex-1 space-y-2.5">
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
              <span className="text-xs font-semibold text-text-primary">{kpiData.coverageVolume.toLocaleString()} items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoverageTrendChart() {
  return (
    <div className="glass-card p-5 gradient-border">
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
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f1f5f9' }}
            />
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

function NarrativeRow({ n, rank }: { n: typeof narratives[0]; rank: number }) {
  const toneColor = {
    Positive: 'accent-green',
    Critical: 'accent-red',
    Mixed: 'accent-amber',
    Neutral: 'text-muted',
  }[n.tone] || 'text-muted';

  const riskColor = {
    Low: 'accent-green',
    Medium: 'accent-amber',
    High: 'accent-red',
  }[n.riskLevel] || 'text-muted';

  return (
    <tr className="border-b border-border-subtle hover:bg-white/2 transition-colors">
      <td className="py-3 px-3 text-center text-text-muted text-sm">{rank}</td>
      <td className="py-3 px-3">
        <p className="text-sm text-text-primary font-medium leading-snug">{n.title}</p>
        <div className="flex items-center gap-2 mt-1.5">
          {n.ministries.map((m) => (
            <span key={m} className="text-[10px] px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
              {m.replace('Ministry of ', '')}
            </span>
          ))}
        </div>
      </td>
      <td className="py-3 px-3">
        <span className={`text-xs font-semibold text-${toneColor}`}>{n.tone}</span>
      </td>
      <td className="py-3 px-3 text-sm text-text-secondary">{n.spread}</td>
      <td className="py-3 px-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-${riskColor}/10 text-${riskColor} border border-${riskColor}/20`}>
          {n.riskLevel}
        </span>
      </td>
      <td className="py-3 px-3">
        <div className="w-20 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={n.trendData.map((v, i) => ({ v, i }))}>
              <Line type="monotone" dataKey="v" stroke={n.tone === 'Critical' ? '#ef4444' : '#10b981'} strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </td>
      <td className="py-3 px-3 text-xs text-text-secondary max-w-[200px]">{n.suggestedAction}</td>
    </tr>
  );
}

function CommandCenter() {
  return (
    <section id="command-center" className="p-8 scroll-mt-4">
      <SectionHeader title="Command Center" subtitle="Real-time media intelligence overview" />
      <ThreatLevelBanner />

      <div className="grid grid-cols-4 gap-4 mt-6">
        <KPICard title="Coverage Volume" value={kpiData.coverageVolume} delta={kpiData.coverageDelta} icon={Activity} />
        <KPICard title="Active Narratives" value={kpiData.activeNarratives} delta={kpiData.narrativeDelta} icon={TrendingUp} />
        <KPICard title="Pending Alerts" value={kpiData.pendingAlerts} delta={kpiData.alertsDelta} icon={AlertTriangle} positive={false} />
        <KPICard title="AI Confidence" value={`${kpiData.aiConfidence}%`} delta={kpiData.confidenceDelta} icon={Brain} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <SentimentDonut />
        <CoverageTrendChart />
      </div>

      <div className="glass-card mt-4 overflow-hidden">
        <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Top Media Narratives</h3>
          <span className="text-xs text-text-muted">{narratives.length} active narratives tracked</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
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
              {narratives.map((n, i) => (
                <NarrativeRow key={n.id} n={n} rank={i + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: typeof articles[0] }) {
  const sentimentConfig = {
    Positive: { color: 'accent-green', bg: 'accent-green/10', border: 'accent-green/20' },
    Negative: { color: 'accent-red', bg: 'accent-red/10', border: 'accent-red/20' },
    Neutral: { color: 'text-muted', bg: 'white/5', border: 'white/10' },
    Mixed: { color: 'accent-amber', bg: 'accent-amber/10', border: 'accent-amber/20' },
  }[article.sentiment];

  return (
    <div className="glass-card p-5 animate-slide-in">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-${sentimentConfig.bg} text-${sentimentConfig.color} border border-${sentimentConfig.border} uppercase tracking-wider`}>
              {article.sentiment}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${article.relevanceScore >= 80 ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20' : article.relevanceScore >= 40 ? 'bg-accent-amber/10 text-accent-amber border border-accent-amber/20' : 'bg-white/5 text-text-muted border border-white/10'}`}>
              AI RELEVANCE: {article.relevanceScore}%
            </span>
            {article.mediaType !== 'Print' && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                {article.mediaType}
              </span>
            )}
            {article.crossReferences > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 flex items-center gap-1">
                <Share2 className="w-2.5 h-2.5" /> {article.crossReferences} outlets
              </span>
            )}
          </div>

          <h4 className="text-sm font-semibold text-text-primary leading-snug mb-1.5">{article.headline}</h4>
          <p className="text-xs text-text-secondary leading-relaxed mb-3">{article.summary}</p>

          <div className="flex items-center gap-4 text-[11px] text-text-muted mb-2.5">
            <span className="flex items-center gap-1"><Newspaper className="w-3 h-3" /> {article.source}</span>
            <span>{article.edition}</span>
            <span>{article.page}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.date}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
            {article.ministryTags.map((tag) => (
              <span key={tag.name} className="text-[10px] px-2 py-0.5 rounded-full bg-accent-blue/8 text-accent-blue border border-accent-blue/15">
                {tag.name.replace('Ministry of ', '')} <span className="text-accent-blue/60">{tag.confidence}%</span>
              </span>
            ))}
          </div>

          <div className={`text-[11px] px-3 py-2 rounded-lg bg-${sentimentConfig.bg} border border-${sentimentConfig.border}`}>
            <span className="font-semibold text-text-secondary">AI Analysis: </span>
            <span className="text-text-secondary">{article.sentimentReason}</span>
          </div>

          {article.aiFlag && (
            <div className="mt-2 text-[11px] px-3 py-2 rounded-lg bg-accent-amber/8 border border-accent-amber/15">
              <span className="font-semibold text-accent-amber">⚡ Smart Filter: </span>
              <span className="text-accent-amber/80">{article.aiFlag}</span>
            </div>
          )}
        </div>

        <div className="w-28 h-36 rounded-lg bg-bg-surface border border-border-subtle flex items-center justify-center shrink-0">
          <div className="text-center">
            <Newspaper className="w-6 h-6 text-text-muted mx-auto mb-1" />
            <p className="text-[9px] text-text-muted">Clipping</p>
            <p className="text-[9px] text-text-muted">Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaFeed() {
  const [selectedSentiment, setSelectedSentiment] = useState<string>('All');
  const [minRelevance, setMinRelevance] = useState(0);

  const filtered = articles.filter((a) => {
    if (selectedSentiment !== 'All' && a.sentiment !== selectedSentiment) return false;
    if (a.relevanceScore < minRelevance) return false;
    return true;
  });

  return (
    <section id="media-feed" className="p-8 scroll-mt-4 border-t border-border-subtle">
      <SectionHeader title="AI Media Feed" subtitle="Contextually filtered articles with AI relevance scoring — not keyword matching" />

      <div className="glass-card p-4 mb-5 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-text-muted" />
          <span className="text-xs text-text-muted uppercase tracking-wider">Filters:</span>
        </div>
        {['All', 'Positive', 'Negative', 'Mixed', 'Neutral'].map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSentiment(s)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              selectedSentiment === s
                ? 'bg-accent-blue/15 text-accent-blue border-accent-blue/30'
                : 'bg-white/3 text-text-secondary border-border-subtle hover:border-white/15'
            }`}
          >
            {s}
          </button>
        ))}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-text-muted">Min Relevance:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={minRelevance}
            onChange={(e) => setMinRelevance(Number(e.target.value))}
            className="w-24 accent-accent-blue"
          />
          <span className="text-xs text-accent-blue font-mono w-8">{minRelevance}%</span>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        {filtered.length === 0 && (
          <div className="glass-card p-10 text-center">
            <p className="text-text-muted">No articles match current filters</p>
          </div>
        )}
      </div>
    </section>
  );
}

function NarrativeIntelligence() {
  return (
    <section id="narratives" className="p-8 scroll-mt-4 border-t border-border-subtle">
      <SectionHeader title="Narrative Intelligence" subtitle="Story clustering, cross-outlet percolation tracking, and risk trajectory analysis" />

      <div className="space-y-4">
        {percolationData.map((p, idx) => (
          <div key={idx} className="glass-card p-5 gradient-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-sm font-semibold text-text-primary">{p.narrative}</h4>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    p.status === 'ESCALATING' ? 'bg-accent-red/10 text-accent-red border border-accent-red/20' : 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                  }`}>
                    {p.status}
                  </span>
                  <span className="text-xs text-text-muted">Velocity: <span className={p.velocity === 'High' ? 'text-accent-red' : 'text-accent-green'}>{p.velocity}</span></span>
                </div>
              </div>
              <GitBranch className="w-5 h-5 text-accent-blue/50" />
            </div>

            <div className="relative pl-6 space-y-0">
              {p.timeline.map((t, i) => (
                <div key={i} className="relative pb-4 last:pb-0">
                  <div className="absolute left-[-18px] top-1 w-3 h-3 rounded-full bg-bg-card border-2 border-accent-blue z-10" />
                  {i < p.timeline.length - 1 && <div className="absolute left-[-13px] top-4 bottom-0 w-px bg-accent-blue/20" />}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-accent-blue font-mono w-14 shrink-0">{t.day}</span>
                    <span className="text-xs text-text-primary">{t.outlet}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-muted border border-white/8">{t.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="glass-card p-5">
          <h4 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">Narrative Cross-Reference Matrix</h4>
          <div className="grid grid-cols-3 gap-3">
            {narratives.slice(0, 3).map((n) => (
              <div key={n.id} className="p-3 rounded-lg bg-bg-surface border border-border-subtle">
                <p className="text-xs text-text-primary font-medium mb-2 line-clamp-2">{n.title}</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={n.trendData.map((v, i) => ({ v, i }))}>
                        <Line type="monotone" dataKey="v" stroke={n.tone === 'Critical' ? '#ef4444' : '#10b981'} strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-text-muted">{n.outlets} outlets</span>
                  <span className={`text-[10px] font-semibold ${n.tone === 'Critical' ? 'text-accent-red' : n.tone === 'Positive' ? 'text-accent-green' : 'text-accent-amber'}`}>{n.tone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RegionalIntelligence() {
  return (
    <section id="regional" className="p-8 scroll-mt-4 border-t border-border-subtle">
      <SectionHeader title="Regional Intelligence" subtitle="State and region-wise media landscape with sentiment mapping and coverage gap detection" />

      <div className="grid grid-cols-3 gap-4 mb-5">
        {regionData.map((r) => {
          const sentColor = r.sentimentScore >= 65 ? '#10b981' : r.sentimentScore >= 45 ? '#f59e0b' : '#ef4444';
          return (
            <div key={r.name} className={`glass-card p-4 ${r.coverageGap ? 'border-accent-amber/30' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-accent-blue" />
                    {r.name}
                  </h4>
                  <p className="text-[10px] text-text-muted mt-0.5">{r.states}</p>
                </div>
                {r.coverageGap && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-accent-amber/10 text-accent-amber border border-accent-amber/20 flex items-center gap-1">
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
                    <div className="h-full rounded-full transition-all" style={{ width: `${r.sentimentScore}%`, background: sentColor }} />
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
                  <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-text-muted">{s}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-5">
        <h4 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wider">Regional Sentiment Overview</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={130} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f1f5f9' }} />
              <Bar dataKey="sentimentScore" radius={[0, 4, 4, 0]}>
                {regionData.map((r, i) => (
                  <Cell key={i} fill={r.sentimentScore >= 65 ? '#10b981' : r.sentimentScore >= 45 ? '#f59e0b' : '#ef4444'} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function EarlyWarningSection() {
  const severityConfig = {
    HIGH: { color: 'accent-red', bg: 'accent-red/10', border: 'accent-red/20', icon: Flame },
    MEDIUM: { color: 'accent-amber', bg: 'accent-amber/10', border: 'accent-amber/20', icon: AlertTriangle },
    LOW: { color: 'accent-blue', bg: 'accent-blue/10', border: 'accent-blue/20', icon: Eye },
    CRITICAL: { color: 'accent-red', bg: 'accent-red/10', border: 'accent-red/20', icon: Flame },
  };

  return (
    <section id="early-warning" className="p-8 scroll-mt-4 border-t border-border-subtle">
      <SectionHeader title="Early Warning System" subtitle="Predictive alerts with escalation probability and historical pattern matching" badge={`${alerts.filter(a => a.severity === 'HIGH').length} HIGH`} />

      <div className="space-y-4">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity];
          const SevIcon = config.icon;
          return (
            <div key={alert.id} className={`glass-card p-5 border-${config.border} ${alert.severity === 'HIGH' ? 'gradient-border' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-${config.bg} border border-${config.border} flex items-center justify-center shrink-0`}>
                  <SevIcon className={`w-5 h-5 text-${config.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-text-primary">{alert.title}</h4>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-${config.bg} text-${config.color} border border-${config.border} uppercase tracking-wider shrink-0`}>
                      {alert.severity} RISK
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">{alert.description}</p>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-bg-surface border border-border-subtle">
                      <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Escalation Probability</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold text-${alert.escalationProbability >= 70 ? 'accent-red' : alert.escalationProbability >= 45 ? 'accent-amber' : 'accent-green'}`}>
                          {alert.escalationProbability}%
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-bg-card">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${alert.escalationProbability}%`,
                              background: alert.escalationProbability >= 70 ? '#ef4444' : alert.escalationProbability >= 45 ? '#f59e0b' : '#10b981'
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

                  <div className="p-3 rounded-lg bg-accent-purple/5 border border-accent-purple/15 mb-3">
                    <p className="text-[10px] text-accent-purple uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
                      <Brain className="w-3 h-3" /> Historical Pattern Match
                    </p>
                    <p className="text-xs text-text-secondary">{alert.historicalMatch}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-accent-blue/5 border border-accent-blue/15">
                    <p className="text-[10px] text-accent-blue uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
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
      </div>
    </section>
  );
}

function CrossPlatformSection() {
  const [activeTab, setActiveTab] = useState<'print' | 'television' | 'digital' | 'social'>('print');
  const tabs = [
    { key: 'print' as const, label: 'Print', icon: Newspaper, count: crossPlatformData.print.totalArticles },
    { key: 'television' as const, label: 'Television', icon: Tv, count: crossPlatformData.television.totalMentions },
    { key: 'digital' as const, label: 'Digital', icon: Globe, count: crossPlatformData.digital.totalArticles },
    { key: 'social' as const, label: 'Social Media', icon: Smartphone, count: crossPlatformData.social.totalMentions },
  ];

  const data = crossPlatformData[activeTab];
  const items = activeTab === 'print' ? crossPlatformData.print.topSources
    : activeTab === 'television' ? crossPlatformData.television.topChannels
    : activeTab === 'digital' ? crossPlatformData.digital.topPortals
    : crossPlatformData.social.topPlatforms;

  return (
    <section id="cross-platform" className="p-8 scroll-mt-4 border-t border-border-subtle">
      <SectionHeader title="Cross-Platform Monitor" subtitle="Unified media intelligence across print, television, digital, and social platforms" />

      <div className="flex gap-2 mb-5">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === tab.key
                  ? 'bg-accent-blue/15 text-accent-blue border border-accent-blue/30'
                  : 'bg-white/3 text-text-secondary border border-border-subtle hover:border-white/15'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              {tab.label}
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5">{typeof tab.count === 'number' ? tab.count.toLocaleString() : tab.count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Positive', value: data.positive, color: '#10b981' },
          { label: 'Neutral', value: data.neutral, color: '#6b7280' },
          { label: activeTab === 'social' ? 'Negative' : 'Mixed', value: activeTab === 'social' ? data.negative : data.mixed, color: '#f59e0b' },
          { label: activeTab === 'social' ? 'Mixed' : 'Negative', value: activeTab === 'social' ? data.mixed : data.negative, color: '#ef4444' },
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
            Top {activeTab === 'print' ? 'Publications' : activeTab === 'television' ? 'Channels' : activeTab === 'digital' ? 'Portals' : 'Platforms'}
          </h4>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle text-[10px] text-text-muted uppercase tracking-wider">
              <th className="py-2.5 px-5 text-left">Source</th>
              <th className="py-2.5 px-5 text-left">{activeTab === 'social' ? 'Mentions' : activeTab === 'television' ? 'Mentions' : 'Articles'}</th>
              <th className="py-2.5 px-5 text-left">Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any, i: number) => (
              <tr key={i} className="border-b border-border-subtle hover:bg-white/2">
                <td className="py-3 px-5 text-sm text-text-primary font-medium">{item.name}</td>
                <td className="py-3 px-5 text-sm text-text-secondary font-mono">{typeof item.articles === 'number' ? item.articles.toLocaleString() : item.mentions?.toLocaleString?.() ?? item.mentions}</td>
                <td className="py-3 px-5">
                  <span className={`text-xs font-semibold ${
                    item.sentiment === 'Positive' ? 'text-accent-green' : item.sentiment === 'Critical' ? 'text-accent-red' : item.sentiment === 'Mixed' ? 'text-accent-amber' : 'text-text-muted'
                  }`}>
                    {item.sentiment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MessagePenetrationSection() {
  return (
    <section id="penetration" className="p-8 scroll-mt-4 border-t border-border-subtle">
      <SectionHeader title="Message Penetration Analysis" subtitle="Government communication effectiveness — intended message vs actual media pickup" />

      <div className="space-y-4">
        {messagePenetration.map((mp, idx) => {
          const priorityConfig = {
            CRITICAL: { color: 'accent-red', bg: 'accent-red/10', border: 'accent-red/20' },
            HIGH: { color: 'accent-amber', bg: 'accent-amber/10', border: 'accent-amber/20' },
            MEDIUM: { color: 'accent-blue', bg: 'accent-blue/10', border: 'accent-blue/20' },
          }[mp.priority];

          return (
            <div key={idx} className="glass-card p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                    <Radio className="w-4 h-4 text-accent-blue" />
                    {mp.message}
                  </h4>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-${priorityConfig.bg} text-${priorityConfig.color} border border-${priorityConfig.border} uppercase tracking-wider`}>
                  {mp.priority}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
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
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${channel.value}%`,
                          background: channel.value >= 75 ? '#10b981' : channel.value >= 50 ? '#f59e0b' : '#ef4444',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <div className="flex-1 p-2.5 rounded-lg bg-accent-amber/5 border border-accent-amber/15">
                  <p className="text-[10px] text-accent-amber font-semibold uppercase tracking-wider mb-1">Gap Identified</p>
                  <p className="text-xs text-text-secondary">{mp.gap}</p>
                </div>
                <div className="flex-1 p-2.5 rounded-lg bg-accent-blue/5 border border-accent-blue/15">
                  <p className="text-[10px] text-accent-blue font-semibold uppercase tracking-wider mb-1">Recommended Action</p>
                  <p className="text-xs text-text-secondary">{mp.action}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MisinfoWatchSection() {
  return (
    <section id="misinfo" className="p-8 scroll-mt-4 border-t border-border-subtle">
      <SectionHeader title="Misinformation Watch" subtitle="Real-time tracking of false claims, verification pipeline, and counter-narrative recommendations" badge={`${misinfoItems.length} Active`} />

      <div className="glass-card p-4 mb-5 flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-red" />
            <span className="text-xs text-text-secondary">FALSE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-amber" />
            <span className="text-xs text-text-secondary">MISLEADING</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-text-muted" />
            <span className="text-xs text-text-secondary">PENDING</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-green" />
            <span className="text-xs text-text-secondary">VERIFIED TRUE</span>
          </div>
        </div>
        <div className="ml-auto text-xs text-text-muted">
          Powered by PIB Fact Check Unit + AI Verification
        </div>
      </div>

      <div className="space-y-4">
        {misinfoItems.map((item) => {
          const statusColor = item.verificationStatus.startsWith('FALSE') ? 'accent-red'
            : item.verificationStatus.startsWith('MISLEADING') ? 'accent-amber' : 'text-muted';

          return (
            <div key={item.id} className="glass-card p-5">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-${statusColor}/10 border border-${statusColor}/20 flex items-center justify-center shrink-0`}>
                  <ShieldAlert className={`w-5 h-5 text-${statusColor}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-text-primary mb-1.5">{item.claim}</h4>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <Globe className="w-3 h-3" /> {item.sourceType}
                    </span>
                    <span className={`text-xs font-semibold ${item.spreadLevel === 'high' ? 'text-accent-red' : item.spreadLevel === 'medium' ? 'text-accent-amber' : 'text-text-muted'}`}>
                      Spread: {item.spread}
                    </span>
                    <span className="text-[10px] text-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.detectedAt}
                    </span>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-${statusColor}/10 border border-${statusColor}/20 mb-3`}>
                    {item.verificationStatus.startsWith('FALSE') ? <XCircle className={`w-3.5 h-3.5 text-${statusColor}`} /> : <AlertCircle className={`w-3.5 h-3.5 text-${statusColor}`} />}
                    <span className={`text-xs font-semibold text-${statusColor}`}>{item.verificationStatus}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-accent-blue/5 border border-accent-blue/15">
                    <p className="text-[10px] text-accent-blue font-semibold uppercase tracking-wider mb-1">Recommended Action</p>
                    <p className="text-xs text-text-secondary">{item.action}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MinistryBriefingSection() {
  const b = ministryBriefing;
  return (
    <section id="briefing" className="p-8 scroll-mt-4 border-t border-border-subtle">
      <SectionHeader title="Ministry Briefing" subtitle="AI-generated daily intelligence brief for ministry officers" />

      <div className="glass-card overflow-hidden gradient-border">
        <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-text-primary">{b.ministry}</h3>
            <p className="text-xs text-text-muted mt-0.5">Daily Intelligence Brief • {b.date} • Generated at {b.generatedAt}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-border-subtle text-xs text-text-secondary hover:bg-white/8 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-border-subtle text-xs text-text-secondary hover:bg-white/8 transition-colors">
              <Mail className="w-3.5 h-3.5" /> Email Brief
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-lg bg-accent-blue/10 border border-accent-blue/20">
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Overall Sentiment</p>
              <p className="text-sm font-semibold text-accent-blue">{b.overallSentiment}</p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-border-subtle">
              <p className="text-[10px] text-text-muted uppercase tracking-wider">Coverage Volume</p>
              <p className="text-sm font-semibold text-text-primary">{b.coverageVolume.toLocaleString()} items</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-accent-blue uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" /> Key Highlights
            </h4>
            <ul className="space-y-2">
              {b.keyHighlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                  <ChevronRight className="w-3 h-3 text-accent-blue shrink-0 mt-0.5" />
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

          <div className="p-3 rounded-lg bg-accent-red/5 border border-accent-red/15">
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

        <div className="px-6 py-3 border-t border-border-subtle bg-white/2 flex items-center justify-between">
          <p className="text-[9px] text-text-muted uppercase tracking-wider">
            Generated by PIB Sentinel AI • Confidence: {kpiData.aiConfidence}%
          </p>
          <p className="text-[9px] text-text-muted uppercase tracking-wider">
            Restricted • Government of India
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-bg-primary" />;
  return (
    <div>
      <header className="sticky top-0 z-40 glass border-b border-border-subtle px-8 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-wide text-text-primary">
              AI-Enabled 360° Media Intelligence System
            </h1>
            <p className="text-xs text-text-muted">
              Press Information Bureau • Government of India
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select className="text-xs bg-bg-card border border-border-subtle rounded-lg px-3 py-1.5 text-text-secondary focus:outline-none focus:border-accent-blue/30">
              <option>All Ministries</option>
              <option>Ministry of Finance</option>
              <option>Ministry of Defence</option>
              <option>Ministry of External Affairs</option>
              <option>Ministry of Health & Family Welfare</option>
              <option>Ministry of Agriculture</option>
              <option>Ministry of Electronics & IT</option>
              <option>Ministry of Labour</option>
            </select>
            <select className="text-xs bg-bg-card border border-border-subtle rounded-lg px-3 py-1.5 text-text-secondary focus:outline-none focus:border-accent-blue/30">
              <option>All Regions</option>
              <option>Hindi Belt</option>
              <option>Maharashtra & Gujarat</option>
              <option>South India</option>
              <option>Northeast</option>
              <option>Punjab & Haryana</option>
              <option>Eastern India</option>
            </select>
            <select className="text-xs bg-bg-card border border-border-subtle rounded-lg px-3 py-1.5 text-text-secondary focus:outline-none focus:border-accent-blue/30">
              <option>All Media</option>
              <option>Print</option>
              <option>Television</option>
              <option>Digital</option>
              <option>Social Media</option>
            </select>
            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-accent-blue/15 border border-accent-blue/30 text-xs text-accent-blue font-semibold hover:bg-accent-blue/25 transition-colors">
              <Download className="w-3.5 h-3.5" /> EXPORT BRIEF
            </button>
          </div>
        </div>
      </header>

      <CommandCenter />
      <MediaFeed />
      <NarrativeIntelligence />
      <RegionalIntelligence />
      <EarlyWarningSection />
      <CrossPlatformSection />
      <MessagePenetrationSection />
      <MisinfoWatchSection />
      <MinistryBriefingSection />

      <footer className="p-6 border-t border-border-subtle text-center">
        <div className="tricolor-bar mb-4 rounded-full max-w-xs mx-auto" />
        <p className="text-xs text-text-muted uppercase tracking-widest">
          Confidential & Restricted • Press Information Bureau • Government of India
        </p>
        <p className="text-[10px] text-text-muted/50 mt-1">
          PIB Sentinel v1.0 • AI-Enabled Media Intelligence Platform
        </p>
      </footer>
    </div>
  );
}
