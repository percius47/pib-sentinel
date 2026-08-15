'use client';

import { useState, useRef, useEffect, useLayoutEffect, CSSProperties } from 'react';
import type { GenuineData } from '@/data/mockData';
import { genuineAxes } from '@/data/mockData';

type Size = 'sm' | 'md' | 'lg';

const SIZE = { sm: 32, md: 44, lg: 72 } as const;
const STROKE = { sm: 4, md: 5, lg: 8 } as const;
const FONT = { sm: 10, md: 12, lg: 18 } as const;
const PAD = 10;
const MIN_PANEL = 96;

function scoreColor(v: number): string {
  if (v >= 80) return '#10b981';
  if (v >= 60) return '#84cc16';
  if (v >= 40) return '#f59e0b';
  return '#ef4444';
}

const FACTOR_LABEL: Record<string, string> = {
  sourceCred: 'Source credibility',
  corroboration: 'Cross-corroboration',
  languageBias: 'Language markers',
  factCheckHistory: 'Fact-check history',
  deepfakeLikelihood: 'Deepfake likelihood',
};

function hostRect(wrap: HTMLElement): DOMRect {
  const host = wrap.closest('.glass-card, .modal-content') as HTMLElement | null;
  return (host ?? wrap).getBoundingClientRect();
}

function placePanel(wrap: HTMLElement, pop: HTMLElement): CSSProperties {
  const cr = hostRect(wrap);
  const wr = wrap.getBoundingClientRect();
  const left = cr.left + PAD;
  const width = Math.max(168, cr.width - PAD * 2);
  const natural = pop.scrollHeight || 200;
  const below = cr.bottom - wr.bottom - PAD;
  const above = wr.top - cr.top - PAD;
  const innerH = Math.max(MIN_PANEL, cr.height - PAD * 2);

  let top: number;
  let maxHeight: number;

  const openDown = below >= Math.min(natural, MIN_PANEL) || below >= above;
  if (openDown) {
    top = wr.bottom + 6;
    maxHeight = cr.bottom - PAD - top;
    if (maxHeight < MIN_PANEL) {
      top = cr.top + PAD;
      maxHeight = innerH;
    }
  } else {
    maxHeight = Math.min(natural, Math.max(above - 6, innerH));
    top = wr.top - 6 - Math.min(natural, maxHeight);
    if (top < cr.top + PAD) {
      top = cr.top + PAD;
      maxHeight = wr.top - 6 - top;
      if (maxHeight < MIN_PANEL) {
        top = cr.top + PAD;
        maxHeight = innerH;
      }
    }
  }

  return {
    position: 'fixed',
    top,
    left,
    width,
    maxHeight,
    overflowY: 'auto',
    zIndex: 80,
  };
}

export default function GenuineRing({
  data,
  size = 'sm',
  label = false,
}: {
  data: GenuineData;
  size?: Size;
  label?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [box, setBox] = useState<CSSProperties>({ visibility: 'hidden' });
  const wrapRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !wrapRef.current || !popRef.current) return;
    const wrap = wrapRef.current;
    const pop = popRef.current;
    const apply = () => setBox(placePanel(wrap, pop));
    apply();
    window.addEventListener('scroll', apply, true);
    window.addEventListener('resize', apply);
    return () => {
      window.removeEventListener('scroll', apply, true);
      window.removeEventListener('resize', apply);
    };
  }, [open, data.score]);

  const axes = genuineAxes(data);
  const px = SIZE[size];
  const stroke = STROKE[size];
  const radius = (px - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const factors = [
    { key: 'sourceCred', value: data.factors.sourceCred },
    { key: 'corroboration', value: data.factors.corroboration },
    { key: 'languageBias', value: data.factors.languageBias },
    { key: 'factCheckHistory', value: data.factors.factCheckHistory },
    ...(data.factors.deepfakeLikelihood !== null
      ? [{ key: 'deepfakeLikelihood', value: 100 - data.factors.deepfakeLikelihood }]
      : []),
  ];
  const segLen = circumference / factors.length;
  const gap = Math.min(2, segLen * 0.06);

  return (
    <div
      ref={wrapRef}
      className="relative z-10 inline-flex items-center gap-2 pointer-events-auto"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        aria-label={`Genuine Score ${data.score}%`}
        aria-expanded={open}
        className="relative inline-flex items-center justify-center focus:outline-none"
        style={{ width: px, height: px }}
      >
        <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`}>
          <circle
            cx={px / 2}
            cy={px / 2}
            r={radius}
            fill="none"
            stroke="var(--color-border-subtle)"
            strokeWidth={stroke}
          />
          {factors.map((f, i) => {
            const offset = i * segLen;
            const strokeVal = Math.max(0, segLen - gap);
            return (
              <circle
                key={f.key}
                cx={px / 2}
                cy={px / 2}
                r={radius}
                fill="none"
                stroke={scoreColor(f.value)}
                strokeOpacity={0.35 + (f.value / 100) * 0.55}
                strokeWidth={stroke}
                strokeDasharray={`${strokeVal} ${circumference - strokeVal}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${px / 2} ${px / 2})`}
                strokeLinecap="butt"
              />
            );
          })}
        </svg>
        <span
          className="absolute font-semibold"
          style={{ fontSize: FONT[size], color: scoreColor(data.score) }}
        >
          {data.score}
        </span>
      </button>
      {label && (
        <span className="text-[10px] uppercase tracking-wider text-text-muted">Genuine</span>
      )}

      {open && (
        <div
          ref={popRef}
          className="genuine-popover p-3 rounded-lg border border-border-strong bg-bg-card shadow-lg text-left"
          style={box}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-wider text-text-muted">Genuine · two axes</p>
            <span className="text-sm font-semibold" style={{ color: scoreColor(data.score) }}>{data.score}</span>
          </div>
          <p className="text-[11px] uppercase tracking-wider text-text-muted mb-1">{data.marker}</p>
          <p className="text-xs text-text-secondary leading-snug mb-3">{data.note}</p>
          <div className="grid grid-cols-2 gap-1.5 mb-3 text-[10px] leading-snug">
            <div className={`rounded-md border p-2 ${axes.quadrant === 'genuine-organic' ? 'border-accent-green/50 bg-accent-green/10' : 'border-border-subtle'}`}>
              <p className="font-semibold text-text-primary">Genuine + Organic</p>
            </div>
            <div className={`rounded-md border p-2 ${axes.quadrant === 'genuine-manufactured' ? 'border-accent-amber/50 bg-accent-amber/10' : 'border-border-subtle'}`}>
              <p className="font-semibold text-text-primary">Genuine + Manufactured</p>
            </div>
            <div className={`rounded-md border p-2 ${axes.quadrant === 'fabricated-organic' ? 'border-accent-amber/40 bg-accent-amber/5' : 'border-border-subtle'}`}>
              <p className="font-semibold text-text-primary">Fabricated + Organic</p>
            </div>
            <div className={`rounded-md border p-2 ${axes.quadrant === 'fabricated-manufactured' ? 'border-accent-red/50 bg-accent-red/10' : 'border-border-subtle'}`}>
              <p className="font-semibold text-text-primary">Fabricated + Manufactured</p>
            </div>
          </div>
          <p className="text-[10px] text-text-muted mb-1">Content {axes.content} genuine · Spread {axes.spread} manufactured</p>
          <p className="text-xs text-text-secondary leading-snug mb-3">{axes.action}</p>
          <dl className="space-y-1.5">
            {factors.map((f) => (
              <div key={f.key} className="flex items-center gap-2">
                <dt className="text-[11px] text-text-muted w-28 shrink-0">{FACTOR_LABEL[f.key]}</dt>
                <div className="flex-1 h-1 rounded-full bg-bg-surface overflow-hidden">
                  <div
                    className="h-full"
                    style={{ width: `${f.value}%`, background: scoreColor(f.value) }}
                  />
                </div>
                <dd className="text-[11px] font-mono text-text-secondary w-8 text-right">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
