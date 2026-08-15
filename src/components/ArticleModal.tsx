'use client';

import { Clock, Newspaper } from 'lucide-react';
import Modal from './Modal';
import { articles, computeGenuine, articleCluster, type Article } from '@/data/mockData';
import GenuineRing from './GenuineRing';
import { ArticleChatButton } from './ArticleChat';
import MediaThumb from './MediaThumb';

function Clipping({ article }: { article: Article }) {
  return <MediaThumb article={article} />;
}

export default function ArticleModal({
  article,
  onClose,
  onOpenArticle,
}: {
  article: Article;
  onClose: () => void;
  onOpenArticle: (id: number) => void;
}) {
  const genuine = computeGenuine(article);
  const cluster = articleCluster(article.id);
  const related = (article.relatedArticleIds || [])
    .map((id) => articles.find((a) => a.id === id))
    .filter(Boolean) as Article[];

  return (
    <Modal onClose={onClose} labelledBy="article-modal-title">
      <div className="p-5 md:p-7 clear-both">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-border-strong text-text-secondary">
              {article.sentiment}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-border-strong text-text-secondary">
              Relevance {article.relevanceScore}%
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-border-subtle text-text-muted">
              {article.mediaType}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-border-subtle text-text-muted">
              {genuine.marker}
            </span>
          </div>
          <GenuineRing data={genuine} size="lg" label />
        </div>

        <h2 id="article-modal-title" className="text-lg md:text-xl font-semibold text-text-primary leading-snug mb-3 pr-8">
          {article.headline}
        </h2>
        <div className="mb-4">
          <ArticleChatButton articleId={article.id} />
        </div>

        <div className="grid md:grid-cols-[220px_1fr] gap-6">
          <Clipping article={article} />
          <div>
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {article.fullBody || article.summary}
            </p>
            <div className="flex flex-wrap gap-3 text-[11px] text-text-muted mt-4">
              <span className="flex items-center gap-1"><Newspaper className="w-3 h-3" /> {article.source}</span>
              <span>{article.edition}</span>
              <span>{article.page}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.date}</span>
            </div>
            <p className="text-[11px] text-text-muted mt-2 break-all">{article.sourceUrl}</p>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-bg-surface border border-border-subtle">
          <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Analysis</p>
          <p className="text-sm text-text-secondary">{article.sentimentReason}</p>
          <p className="text-xs text-text-muted mt-2">{genuine.note}</p>
          {'aiFlag' in article && article.aiFlag ? (
            <p className="text-xs text-accent-amber mt-2">Filter note: {article.aiFlag}</p>
          ) : null}
          {cluster && (
            <p className="text-xs text-text-muted mt-2">Cluster: {cluster.headline}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg border border-border-subtle">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Impact</p>
            <p className="text-xs text-text-secondary mb-2">Reach: {article.estimatedReach}</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {article.ministryTags.map((t) => (
                <span key={t.name} className="text-[10px] px-2 py-0.5 rounded-full border border-border-subtle text-text-secondary">
                  {t.name.replace('Ministry of ', '')} {t.confidence}%
                </span>
              ))}
            </div>
            <p className="text-[11px] text-text-muted">
              {(article.audience || []).join(' · ')}
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border-subtle">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Spread</p>
            <div className="space-y-2">
              {(article.spreadTimeline || []).length === 0 && (
                <p className="text-xs text-text-muted">No cross-outlet spread.</p>
              )}
              {(article.spreadTimeline || []).map((t, i) => (
                <div key={i} className="flex gap-3 text-xs">
                  <span className="font-mono text-text-muted w-16 shrink-0">{t.day}</span>
                  <span className="text-text-primary">{t.outlet}</span>
                  <span className="text-text-muted">{t.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Related coverage</p>
            <div className="space-y-2">
              {related.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onOpenArticle(r.id)}
                  className="w-full text-left text-sm p-3 rounded-lg border border-border-subtle hover:border-border-strong hover:bg-bg-card-hover text-text-primary"
                >
                  {r.headline}
                </button>
              ))}
            </div>
          </div>
        )}

        {article.historicalContext && (
          <div className="mt-4 p-4 rounded-lg border border-border-subtle">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Historical context</p>
            <p className="text-xs text-text-secondary">{article.historicalContext}</p>
          </div>
        )}

        {(article.detailedActions || []).length > 0 && (
          <div className="mt-4">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Recommended actions</p>
            <ul className="space-y-1.5">
              {article.detailedActions.map((a, i) => (
                <li key={i} className="text-sm text-text-secondary pl-3 border-l-2 border-border-strong">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
}
