'use client';

import { ReactNode } from 'react';

type Tone = 'neutral' | 'positive' | 'critical' | 'mixed' | 'muted' | 'accent';

const TONE: Record<Tone, string> = {
  neutral: 'border-border-subtle text-text-secondary',
  positive: 'border-accent-green/40 text-accent-green',
  critical: 'border-accent-red/40 text-accent-red',
  mixed: 'border-accent-amber/40 text-accent-amber',
  muted: 'border-border-subtle text-text-muted',
  accent: 'border-border-strong text-text-primary',
};

export default function MetricChip({
  icon,
  label,
  value,
  tone = 'neutral',
  title,
}: {
  icon?: ReactNode;
  label?: string;
  value: ReactNode;
  tone?: Tone;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${TONE[tone]}`}
    >
      {icon && <span className="inline-flex items-center">{icon}</span>}
      {label && <span className="uppercase tracking-wider text-text-muted">{label}</span>}
      <span className="font-semibold">{value}</span>
    </span>
  );
}
