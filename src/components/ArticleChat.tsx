'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { articles } from '@/data/mockData';
import { matchArticleChat } from '@/data/articleChat';
import { useFocus } from './Providers';
import SentinelMark from './SentinelMark';

type Mode = 'story' | 'graph';

interface Turn {
  id: number;
  role: 'user' | 'assistant';
  raw: string;
  visible: string;
  citations: number[];
  done: boolean;
}

const Ctx = createContext<{
  openChat: (articleId: number) => void;
}>({ openChat: () => {} });

export function useArticleChat() {
  return useContext(Ctx);
}

export function ArticleChatProvider({ children }: { children: ReactNode }) {
  const [articleId, setArticleId] = useState<number | null>(null);
  const openChat = useCallback((id: number) => setArticleId(id), []);
  return (
    <Ctx.Provider value={{ openChat }}>
      {children}
      {articleId != null && (
        <ArticleChatPanel articleId={articleId} onClose={() => setArticleId(null)} />
      )}
    </Ctx.Provider>
  );
}

function ArticleChatPanel({ articleId, onClose }: { articleId: number; onClose: () => void }) {
  const article = articles.find((a) => a.id === articleId);
  const { requestFocus } = useFocus();
  const [mode, setMode] = useState<Mode>('story');
  const [query, setQuery] = useState('');
  const [turns, setTurns] = useState<Turn[]>([]);
  const streamRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const turnId = useRef(0);

  useEffect(() => {
    setTurns([]);
    setMode('story');
    setQuery('');
    turnId.current = 0;
  }, [articleId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [turns]);

  useEffect(() => () => {
    if (streamRef.current) window.clearInterval(streamRef.current);
  }, []);

  if (!article) return null;
  const piece = article;

  function submit(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setQuery('');
    const userTurnId = ++turnId.current;
    setTurns((prev) => [...prev, { id: userTurnId, role: 'user', raw: trimmed, visible: trimmed, citations: [], done: true }]);
    const match = matchArticleChat(piece, mode, trimmed);
    const assistantTurnId = ++turnId.current;
    setTurns((prev) => [
      ...prev,
      { id: assistantTurnId, role: 'assistant', raw: match.response, visible: '', citations: match.citations, done: false },
    ]);
    if (streamRef.current) window.clearInterval(streamRef.current);
    let i = 0;
    streamRef.current = window.setInterval(() => {
      i += 1;
      const done = i >= match.response.length;
      const slice = match.response.slice(0, i);
      const incomplete = slice.search(/\[c:(?:\d+)?$/);
      const visible = incomplete === -1 ? slice : slice.slice(0, incomplete);
      setTurns((prev) =>
        prev.map((t) => (t.id === assistantTurnId ? { ...t, visible: done ? match.response : visible, done } : t)),
      );
      if (done && streamRef.current) {
        window.clearInterval(streamRef.current);
        streamRef.current = null;
      }
    }, 12);
  }

  return (
    <>
      <button type="button" className="fixed inset-0 z-[110] bg-black/35 animate-fade-in" aria-label="Dismiss article chat" onClick={onClose} />
      <aside
        className="fixed z-[111] left-3 right-3 bottom-20 md:left-auto md:right-6 md:bottom-6 md:w-[400px] max-h-[min(72vh,560px)] bg-bg-card border border-border-strong rounded-xl shadow-lg flex flex-col animate-scale-in overflow-hidden"
        role="dialog"
        aria-label="Chat with this article"
      >
        <div className="px-4 py-3 border-b border-border-subtle">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-text-muted">Chat with this article</p>
              <p className="text-xs font-semibold text-text-primary leading-snug line-clamp-2 mt-0.5">{article.headline}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-border-subtle text-text-muted hover:text-text-primary shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-1 mt-3">
            {([
              { id: 'story' as const, label: 'This story' },
              { id: 'graph' as const, label: 'Story graph' },
            ]).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                  mode === m.id ? 'border-border-strong text-text-primary bg-bg-card-hover' : 'border-border-subtle text-text-muted'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-text-muted mt-2 leading-snug">
            {mode === 'story'
              ? 'This piece and its cluster variants — how the claim mutated, not the whole platform.'
              : 'Ministries, outlets, journalists, schemes and past responses linked to this story on the graph.'}
          </p>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[140px]">
          {turns.length === 0 && (
            <div className="flex flex-wrap gap-1.5">
              {(mode === 'story'
                ? ['Where do outlets disagree?', 'How did this mutate?']
                : ['Who is on the graph?', 'Any past response?']
              ).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  className="text-[11px] px-2.5 py-1.5 rounded-full border border-border-subtle text-text-secondary hover:border-border-strong"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          {turns.map((t) => (
            <div key={t.id} className={t.role === 'user' ? 'flex justify-end' : ''}>
              {t.role === 'user' ? (
                <div className="max-w-[85%] text-xs px-3 py-2 rounded-lg bg-bg-card-hover border border-border-subtle">{t.visible}</div>
              ) : (
                <ArticleChatBubble
                  text={t.visible}
                  done={t.done}
                  onCitation={(id) => {
                    onClose();
                    setTimeout(() => requestFocus({ articleId: id, stay: true }), 150);
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); submit(query); }}
          className="border-t border-border-subtle p-3 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={mode === 'story' ? 'Ask about this story…' : 'Ask the story graph…'}
            className="flex-1 text-sm px-3 py-2 rounded-lg border border-border-subtle bg-bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong"
          />
          <button type="submit" disabled={!query.trim()} className="p-2 rounded-lg border border-border-strong disabled:opacity-40" aria-label="Send">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </aside>
    </>
  );
}

function ArticleChatBubble({
  text,
  done,
  onCitation,
}: {
  text: string;
  done: boolean;
  onCitation: (id: number) => void;
}) {
  const parts = useMemo(() => {
    const rx = /\[c:(\d+)\]/g;
    const out: Array<{ kind: 'text'; text: string } | { kind: 'chip'; articleId: number }> = [];
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = rx.exec(text)) !== null) {
      if (m.index > last) out.push({ kind: 'text', text: text.slice(last, m.index) });
      out.push({ kind: 'chip', articleId: Number(m[1]) });
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push({ kind: 'text', text: text.slice(last) });
    return out;
  }, [text]);

  return (
    <div className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
      {parts.map((p, i) => {
        if (p.kind === 'text') return <span key={i}>{p.text}</span>;
        const a = articles.find((x) => x.id === p.articleId);
        return (
          <button
            key={i}
            type="button"
            onClick={() => onCitation(p.articleId)}
            className="mx-0.5 inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-md border border-border-strong bg-bg-surface"
          >
            <SentinelMark className="w-2.5 h-2.5" /> {a ? a.source : `#${p.articleId}`}
          </button>
        );
      })}
      {!done && <span className="inline-block w-1.5 h-3 ml-0.5 bg-text-muted animate-pulse" />}
    </div>
  );
}

export function ArticleChatButton({ articleId }: { articleId: number }) {
  const { openChat } = useArticleChat();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        openChat(articleId);
      }}
      className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg border border-border-strong text-text-primary hover:bg-bg-card-hover"
    >
      <MessageCircle className="w-3 h-3" />
      Chat
    </button>
  );
}
