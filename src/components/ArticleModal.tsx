'use client';

import { Newspaper, Clock, TrendingUp, Users, Zap, GitBranch, History, ArrowRight, ExternalLink } from 'lucide-react';
import type { Article } from '@/data/mockData';
import Modal from './Modal';

const toneColor: Record<string, string> = {
  Positive: 'text-accent-green',
  Negative: 'text-accent-red',
  Critical: 'text-accent-red',
  Mixed: 'text-accent-amber',
  Neutral: 'text-text-muted',
};

export default function ArticleModal({
  article, onClose, onOpenArticle,
}: {
  article: Article;
  onClose: () => void;
  onOpenArticle?: (id: number) => void;
}) {
  const sentClass = toneColor[article.sentiment] || 'text-text-muted';

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={article.headline}
      subtitle={`${article.source} • ${article.edition} • ${article.page} • ${article.date}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-1 space-y-3">
          <div className="aspect-[3/4] rounded-lg bg-[#f4f1ea] border border-border-subtle flex flex-col items-center justify-center p-4">
            <Newspaper className="w-10 h-10 text-[#666] mb-3" />
            <p className="text-[10px] text-[#666] text-center font-serif">Clipping preview</p>
            <p className="text-[10px] text-[#444] text-center mt-2 font-serif line-clamp-5">{article.headline}</p>
            <p className="text-[9px] text-[#666] text-center mt-2 font-serif">{article.source} • {article.page}</p>
          </div>
          <div className="glass-card p-3">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Metadata</p>
            <dl className="space-y-1.5 text-[11px]">
              <div className="flex justify-between"><dt className="text-text-muted">Sentiment</dt><dd className={`font-semibold ${sentClass}`}>{article.sentiment}</dd></div>
              <div className="flex justify-between"><dt className="text-text-muted">Relevance</dt><dd className="font-semibold text-text-primary">{article.relevanceScore}%</dd></div>
              <div className="flex justify-between"><dt className="text-text-muted">Media</dt><dd className="text-text-secondary">{article.mediaType}</dd></div>
              <div className="flex justify-between"><dt className="text-text-muted">Region</dt><dd className="text-text-secondary">{article.region}</dd></div>
              <div className="flex justify-between"><dt className="text-text-muted">Outlets</dt><dd className="text-text-secondary">{article.crossReferences}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-text-muted">Reach</dt><dd className="text-text-secondary text-right">{article.estimatedReach}</dd></div>
            </dl>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">Full text</h4>
            <p className="text-sm text-text-secondary leading-relaxed">{article.fullBody}</p>
          </div>

          <div className="glass-card p-3">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1.5">Analysis</p>
            <p className="text-xs text-text-secondary leading-relaxed">{article.sentimentReason}</p>
            {article.aiFlag && (
              <p className="text-[11px] text-accent-amber mt-2 pt-2 border-t border-border-subtle">
                ⚡ {article.aiFlag}
              </p>
            )}
          </div>

          {article.ministryTags.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
                <Users className="w-3 h-3" /> Ministry tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {article.ministryTags.map((t) => (
                  <span key={t.name} className="text-[11px] px-2 py-1 rounded-lg border border-border-subtle text-text-secondary">
                    {t.name.replace('Ministry of ', '')} <span className="text-text-muted">{t.confidence}%</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3" /> Impact
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">{article.impact}</p>
            {article.audienceSegments.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {article.audienceSegments.map((s) => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded border border-border-subtle text-text-muted">{s}</span>
                ))}
              </div>
            )}
          </div>

          {article.spreadTimeline.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
                <GitBranch className="w-3 h-3" /> Spread timeline
              </h4>
              <div className="relative pl-5">
                {article.spreadTimeline.map((t, i) => (
                  <div key={i} className="relative pb-2.5 last:pb-0">
                    <div className="absolute left-[-15px] top-1 w-2 h-2 rounded-full bg-text-secondary" />
                    {i < article.spreadTimeline.length - 1 && (
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

          {article.relatedArticles.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3" /> Related coverage
              </h4>
              <ul className="space-y-1.5">
                {article.relatedArticles.map((r, i) => {
                  const clickable = typeof r.id === 'number' && onOpenArticle;
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        disabled={!clickable}
                        onClick={() => clickable && onOpenArticle!(r.id!)}
                        className={`w-full text-left text-xs flex items-start gap-2 p-2 rounded-lg border border-border-subtle
                          ${clickable ? 'hover:border-border-strong hover:bg-bg-card-hover' : 'opacity-90 cursor-default'}`}
                      >
                        <ArrowRight className="w-3 h-3 text-text-muted mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-text-primary leading-snug">{r.headline}</p>
                          <p className="text-[10px] text-text-muted mt-0.5">
                            {r.source} <span className={`ml-2 ${toneColor[r.tone] || 'text-text-muted'}`}>• {r.tone}</span>
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="glass-card p-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-1.5 flex items-center gap-1.5">
              <History className="w-3 h-3" /> Historical context
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">{article.historicalContext}</p>
          </div>

          <div className="rounded-lg border border-border-strong p-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-text-primary mb-2 flex items-center gap-1.5">
              <Zap className="w-3 h-3" /> Recommended actions
            </h4>
            <ul className="space-y-1.5">
              {article.detailedActions.map((a, i) => (
                <li key={i} className="text-xs text-text-secondary flex gap-2">
                  <span className="text-text-muted">{i + 1}.</span>
                  <span className="flex-1">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[10px] text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" /> {article.date}</p>
        </div>
      </div>
    </Modal>
  );
}
