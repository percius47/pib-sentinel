'use client';

import { useState } from 'react';
import { Mic, Newspaper, Scissors } from 'lucide-react';
import {
  handoverExtra,
  immuneStrains,
  mitraReports,
  officerTrust,
  pastResponses,
  preMortem,
  radarPitches,
  rehearsalPersonas,
  rehearsalSeed,
  schemeHistory,
  storyTrees,
} from '@/data/prahariAddons';
import type { StoryCluster } from '@/data/mockData';

export function TrustStrip() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
      <div className="glass-card p-4">
        <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Authority band</p>
        <p className="text-sm text-text-primary leading-snug">{officerTrust.band}</p>
      </div>
      <div className="glass-card p-4">
        <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Officer trust</p>
        <p className="text-2xl font-bold text-text-primary">{officerTrust.score}</p>
        <p className="text-[11px] text-text-muted mt-1">{officerTrust.note}</p>
      </div>
      <div className="glass-card p-4">
        <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Joint ownership</p>
        <p className="text-sm text-text-primary leading-snug">{officerTrust.joint}</p>
      </div>
    </div>
  );
}

export function HistorySnippet() {
  return (
    <div className="glass-card p-4 mb-4">
      <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Historical intelligence · {schemeHistory.scheme}</p>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {schemeHistory.series.map((s) => (
          <div key={s.period} className="min-w-[88px] shrink-0">
            <p className="text-[10px] text-text-muted">{s.period}</p>
            <p className="text-sm font-semibold text-text-primary">{s.volume}</p>
            <p className="text-[10px] text-text-secondary">sent. {s.sentiment}</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-text-muted mt-2">{schemeHistory.note}</p>
    </div>
  );
}

export function StoryTreeStrip({ cluster }: { cluster: StoryCluster }) {
  const tree = storyTrees[cluster.id];
  if (!tree) return null;
  return (
    <div className="w-full">
      <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">Story tree</p>
      <div className="space-y-1">
        {tree.map((n) => (
          <p key={n.hour} className="text-[11px] text-text-secondary leading-snug">
            <span className="font-mono text-text-muted">{n.hour}</span>
            {' · '}
            <span className="text-text-primary">{n.outlet}</span>
            {' · '}
            {n.language}: {n.variant}
          </p>
        ))}
      </div>
    </div>
  );
}

export function ImmuneBlock({ misinfoId }: { misinfoId: number }) {
  const hit = immuneStrains.find((s) => s.misinfoId === misinfoId);
  if (!hit) return null;
  const past = pastResponses.find((p) => p.id === hit.rebuttalId);
  return (
    <div className="p-2.5 rounded-lg border border-accent-green/25 bg-accent-green/5 mt-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-green mb-1">Strain match · Immune</p>
      <p className="text-[11px] text-text-primary">{hit.strain}</p>
      <p className="text-[11px] text-text-muted mt-1">Last seen {hit.lastSeen}</p>
      <p className="text-xs text-text-secondary mt-1.5">{hit.rebuttal}</p>
      {past && <p className="text-[10px] text-text-muted mt-1">Graph: {past.label}</p>}
    </div>
  );
}

export function RadarPitch({ message }: { message: string }) {
  const hit = radarPitches.find((p) => p.messageMatch.test(message)) ?? radarPitches[0];
  return (
    <div className="mt-3 p-2.5 rounded-lg border border-border-subtle">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1">Share-of-voice radar</p>
      <p className="text-xs text-text-primary">{hit.district} · {hit.scheme}</p>
      <p className="text-[11px] text-text-muted mt-1">{hit.coverage}</p>
      <p className="text-xs text-text-secondary mt-1.5">Pitch {hit.journalist}: {hit.pitch}</p>
    </div>
  );
}

export function MitraQueue() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-text-muted leading-relaxed">
        End-to-end encrypted chat is a permanent blind spot. Mitra is a human channel — not an AI workaround.
      </p>
      {mitraReports.map((r) => (
        <div key={r.id} className="glass-card p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm text-text-primary leading-snug">{r.rumour}</p>
            <span className="text-[10px] font-mono text-text-secondary shrink-0">{r.reputation}</span>
          </div>
          <p className="text-[11px] text-text-muted">{r.reporter} · {r.region} · {r.status}</p>
          <p className="text-xs text-text-secondary mt-2">{r.note}</p>
        </div>
      ))}
    </div>
  );
}

export function HandoverBlock() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Recurred / still smouldering</p>
        <ul className="space-y-1.5">
          {handoverExtra.recurred.map((x) => (
            <li key={x} className="text-xs text-text-secondary leading-relaxed">{x}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-accent-green mb-2">What worked</p>
        <ul className="space-y-1.5">
          {handoverExtra.worked.map((x) => (
            <li key={x} className="text-xs text-text-secondary leading-relaxed">{x}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-accent-amber mb-2">What backfired</p>
        <ul className="space-y-1.5">
          {handoverExtra.backfired.map((x) => (
            <li key={x} className="text-xs text-text-secondary leading-relaxed">{x}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">People on this beat</p>
        <ul className="space-y-1.5">
          {handoverExtra.people.map((x) => (
            <li key={x} className="text-xs text-text-secondary">{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RehearsalBlock() {
  const [draft, setDraft] = useState(rehearsalSeed);
  const [ran, setRan] = useState(false);
  const icons = { hostile: Mic, sceptical: Newspaper, badfaith: Scissors } as const;
  const rail = { hostile: '#ef4444', sceptical: '#f59e0b', badfaith: '#a1a1aa' } as const;

  return (
    <div className="rounded-xl border border-border-strong bg-bg-surface p-4 md:p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-saffron">Respond better</p>
          <h4 className="text-sm md:text-base font-bold tracking-wide uppercase text-text-primary mt-1">
            Rehearsal room
          </h4>
          <p className="text-xs text-text-muted mt-1 leading-relaxed max-w-xl">
            Three adversarial reads of the line you are about to send. Fix it here. You still decide whether it goes out.
          </p>
        </div>
      </div>

      <label className="block text-[10px] uppercase tracking-wider text-text-muted mb-1.5">Draft statement</label>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={4}
        className="w-full text-sm leading-relaxed p-3 rounded-lg border border-border-subtle bg-bg-card text-text-primary mb-3"
      />
      <button
        type="button"
        onClick={() => setRan(true)}
        className="text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-lg border border-border-strong bg-bg-card hover:bg-bg-card-hover"
      >
        {ran ? 'Run again' : 'Stress-test this line'}
      </button>

      {ran && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-5">
          {rehearsalPersonas.map((p, i) => {
            const Icon = icons[p.id];
            const color = rail[p.id];
            return (
              <article
                key={p.id}
                className="relative bg-bg-card rounded-lg border border-border-subtle p-4 pl-5 min-h-[168px] flex flex-col"
                style={{ boxShadow: `inset 3px 0 0 ${color}` }}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono text-text-muted">0{i + 1}</span>
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border"
                    style={{ color, borderColor: `${color}66` }}
                  >
                    {p.kind}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                  <h5 className="text-[11px] font-semibold uppercase tracking-wider text-text-primary leading-tight">
                    {p.name}
                  </h5>
                </div>
                <blockquote className="text-sm text-text-primary leading-relaxed flex-1">
                  <span className="text-text-muted text-lg leading-none mr-1">“</span>
                  {p.line}
                </blockquote>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function PreMortemBlock() {
  return (
    <div className="border-t border-border-subtle pt-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider mb-2">Policy pre-mortem</h4>
      <p className="text-xs text-text-primary mb-3">{preMortem.announcement}</p>
      <div className="space-y-2">
        {preMortem.regions.map((r) => (
          <div key={r.region} className="p-2.5 rounded-lg border border-border-subtle">
            <p className="text-[11px] font-semibold text-text-primary">{r.region} · {r.risk}</p>
            <p className="text-[11px] text-text-secondary mt-0.5">{r.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
