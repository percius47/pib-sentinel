'use client';

import { Pin, ArrowRight, Clock, Zap } from 'lucide-react';
import { articles, alerts, storyClusters, topPriority, computeGenuine } from '@/data/mockData';
import GenuineRing from './GenuineRing';
import { useFocus } from './Providers';

export default function PriorityPin() {
  const { requestFocus } = useFocus();
  const article = articles.find((a) => a.id === topPriority.articleId);
  const alert = alerts.find((a) => a.id === topPriority.alertId);
  const cluster = storyClusters.find((c) => c.id === topPriority.clusterId);
  if (!article || !alert) return null;
  const genuine = computeGenuine(article);

  return (
    <div className="priority-pin relative rounded-xl border border-accent-amber/40 bg-accent-amber/5 p-4 md:p-5 mb-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg border border-accent-amber/40 bg-accent-amber/10 flex items-center justify-center shrink-0">
          <Pin className="w-4 h-4 text-accent-amber" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-amber">Attend first</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-accent-red/40 text-accent-red uppercase tracking-wider">
              {alert.severity} · {alert.escalationProbability}% escalation
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-border-subtle text-text-muted flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" /> {alert.timeToCritical}
            </span>
          </div>
          <h3 className="text-sm md:text-base font-semibold text-text-primary leading-snug mb-1">
            {alert.title}
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed mb-3">
            {topPriority.reason}
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <GenuineRing data={genuine} size="md" />
              <span className="text-[11px] text-text-muted">Cluster {cluster ? cluster.outlets : '—'} outlets · {cluster?.toneSplit.negative ?? 0} negative</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => requestFocus({ articleId: article.id })}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border-strong text-text-primary hover:bg-bg-card-hover"
            >
              <Zap className="w-3.5 h-3.5" /> {topPriority.action}
            </button>
            <button
              type="button"
              onClick={() => requestFocus({ articleId: article.id })}
              className="inline-flex items-center gap-1 text-[11px] text-text-muted hover:text-text-primary"
            >
              Open source article <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
