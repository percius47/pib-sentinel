'use client';

const NAME: Record<string, string> = {
  sentimentScore: 'Sentiment',
  positive: 'Positive',
  negative: 'Negative',
  mixed: 'Mixed',
  neutral: 'Neutral',
  mentions: 'Mentions',
  v: 'Mentions',
};

function labelFor(name: unknown, dataKey: unknown) {
  const key = String(dataKey ?? name ?? '');
  return NAME[key] ?? key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
}

function formatValue(name: unknown, dataKey: unknown, value: unknown) {
  if (value == null) return '—';
  const key = String(dataKey ?? name ?? '');
  if (typeof value === 'number') {
    if (key === 'sentimentScore') return `${value}/100`;
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }
  return String(value);
}

export default function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    color?: string;
    dataKey?: string | number;
  }>;
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border-strong bg-bg-card px-3 py-2 shadow-lg min-w-[140px]">
      {label != null && label !== '' && (
        <p className="text-[11px] font-medium text-text-primary mb-1.5">{String(label)}</p>
      )}
      <ul className="space-y-1">
        {payload.map((p, i) => (
          <li key={i} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: p.color || 'var(--text-muted)' }}
              />
              {labelFor(p.name, p.dataKey)}
            </span>
            <span className="font-semibold tabular-nums text-text-primary">
              {formatValue(p.name, p.dataKey, p.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
