'use client';

import { useMemo, useState, type ElementType } from 'react';
import { AudioLines, Clapperboard, Image as ImageIcon, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useFilters, useFocus } from './Providers';
import { deepfakeCases, type DeepfakeCase, type DeepfakeModality } from '@/data/deepfakeWatch';
import { articles } from '@/data/mockData';

const MODALITY_ICON: Record<DeepfakeModality, ElementType> = {
  video: Clapperboard,
  image: ImageIcon,
  audio: AudioLines,
};

export default function DeepfakeWatch() {
  const { filters } = useFilters();
  const { requestFocus } = useFocus();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [packaged, setPackaged] = useState<string | null>(null);

  const visible = useMemo(() => deepfakeCases.filter((c) => {
    if (filters.ministry !== 'All Ministries' && !c.ministries.includes(filters.ministry)) return false;
    if (filters.region !== 'All Regions' && c.region !== filters.region) return false;
    const art = articles.find((a) => a.id === c.articleId);
    if (filters.media !== 'All Media' && art && art.mediaType !== filters.media) return false;
    return true;
  }), [filters]);

  const active = visible.find((c) => c.id === activeId) ?? visible[0] ?? null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.15fr] gap-3">
      <div className="space-y-2">
        {visible.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveId(c.id)}
            className={`w-full text-left glass-card p-4 hover:bg-bg-card-hover ${
              active?.id === c.id ? 'border-border-strong' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <ModalityMark item={c} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    c.severity === 'HIGH' ? 'text-accent-red' : c.severity === 'MEDIUM' ? 'text-accent-amber' : 'text-text-muted'
                  }`}>{c.severity}</span>
                  <span className="text-[10px] text-text-muted">{c.verdict}</span>
                  <span className="text-[10px] font-mono text-text-secondary">{c.authenticity}%</span>
                </div>
                <p className="text-sm text-text-primary leading-snug">{c.title}</p>
                <p className="text-[11px] text-text-muted mt-1">{c.region} · {c.ministries[0]?.replace('Ministry of ', '')}</p>
              </div>
            </div>
          </button>
        ))}
        {visible.length === 0 && (
          <div className="glass-card p-8 text-center text-sm text-text-muted">No flagged media matches current filters.</div>
        )}
      </div>

      {active && (
        <ForensicsPane
          item={active}
          packaged={packaged === active.id}
          onPackage={() => setPackaged(active.id)}
          onOpen={() => requestFocus({ articleId: active.articleId, stay: true })}
        />
      )}
    </div>
  );
}

function ModalityMark({ item }: { item: DeepfakeCase }) {
  const Icon = MODALITY_ICON[item.modality];
  const color = item.authenticity < 30 ? '#ef4444' : item.authenticity < 70 ? '#f59e0b' : '#10b981';
  return (
    <div className="w-10 h-10 rounded-lg border border-border-strong flex items-center justify-center shrink-0" style={{ color }}>
      <Icon className="w-4 h-4" />
    </div>
  );
}

function ForensicsPane({
  item,
  packaged,
  onPackage,
  onOpen,
}: {
  item: DeepfakeCase;
  packaged: boolean;
  onPackage: () => void;
  onOpen: () => void;
}) {
  const article = articles.find((a) => a.id === item.articleId);
  return (
    <div className="glass-card overflow-hidden">
      <div className="relative h-36 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-80">
          <svg viewBox="0 0 400 140" className="w-full h-full" preserveAspectRatio="none">
            {item.scan.map((v, i) => (
              <rect
                key={i}
                x={i * 33 + 8}
                y={140 - v * 1.2}
                width="18"
                height={v * 1.2}
                rx="2"
                fill={item.authenticity < 40 ? '#ef4444' : '#10b981'}
                opacity={0.35 + (i % 3) * 0.15}
              />
            ))}
          </svg>
        </div>
        <div className="deepfake-scan" />
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
            {item.modality} · forensic pass
          </span>
          <span className="text-[10px] font-mono text-zinc-300">auth {item.authenticity}%</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-red">{item.verdict}</span>
            {item.provenance === 'pib' ? (
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-accent-green/40 text-accent-green">
                <ShieldCheck className="w-3 h-3" /> PIB content credential
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-accent-red/40 text-accent-red">
                <ShieldAlert className="w-3 h-3" /> No C2PA credential
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-text-primary leading-snug">{item.title}</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Authenticity</p>
            <div className="h-1.5 rounded-full bg-bg-surface">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.authenticity}%`,
                  background: item.authenticity < 40 ? '#ef4444' : item.authenticity < 70 ? '#f59e0b' : '#10b981',
                }}
              />
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Provenance</p>
            <p className="text-xs text-text-secondary">{item.provenance === 'pib' ? 'Signed pool camera' : 'Unsigned / stripped'}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-text-muted">Reverse match</p>
          <div className="relative pl-4">
            <div className="absolute left-[5px] top-1 bottom-1 w-px bg-border-strong" />
            <div className="relative pb-3">
              <div className="absolute -left-[11px] top-1 w-2.5 h-2.5 rounded-full bg-bg-card border-2 border-text-muted" />
              <p className="text-[10px] font-mono text-text-muted">{item.originalDate}</p>
              <p className="text-xs text-text-primary">{item.originalSource}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[11px] top-1 w-2.5 h-2.5 rounded-full bg-bg-card border-2 border-accent-red" />
              <p className="text-[10px] font-mono text-text-muted">{item.viralDate}</p>
              <p className="text-xs text-text-primary">Viral caption cycle</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed">{item.finding}</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-accent-red/30 p-2.5">
            <p className="text-[9px] uppercase tracking-wider text-accent-red mb-1">Flagged</p>
            <p className="text-[11px] text-text-primary leading-snug">{item.title}</p>
            <p className="text-[10px] text-text-muted mt-1">{item.viralDate}</p>
          </div>
          <div className="rounded-lg border border-accent-green/30 p-2.5">
            <p className="text-[9px] uppercase tracking-wider text-accent-green mb-1">Provably real</p>
            <p className="text-[11px] text-text-primary leading-snug">{item.realTitle}</p>
            <p className="text-[10px] text-text-muted mt-1">{item.realDate}</p>
          </div>
        </div>
        <p className="text-[11px] text-text-muted">Fingerprint index is mock — reverse-match against seed, not a live crawler.</p>
        <p className="text-xs text-text-primary leading-relaxed border border-border-subtle rounded-lg p-3 bg-bg-surface">
          {item.action}
        </p>
        {article && (
          <p className="text-[11px] text-text-muted">Linked coverage: {article.source} — {article.headline}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onOpen}
            className="text-xs px-3 py-1.5 rounded-lg border border-border-strong text-text-primary hover:bg-bg-card-hover"
          >
            Open source article
          </button>
          <button
            type="button"
            onClick={onPackage}
            className="text-xs px-3 py-1.5 rounded-lg border border-border-subtle text-text-secondary hover:border-border-strong"
          >
            {packaged ? 'Package queued' : 'Prepare evidence package'}
          </button>
        </div>
        {packaged && (
          <p className="text-[11px] text-accent-green">Mock package staged for PIB Fact Check Unit. No file left this browser.</p>
        )}
      </div>
    </div>
  );
}
