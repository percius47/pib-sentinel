'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { askSentinelSuggestions, matchAskResponse, articles } from '@/data/mockData';
import { useAskSentinel, useFocus } from './Providers';
import SentinelMark from './SentinelMark';

interface Turn {
  id: number;
  role: 'user' | 'assistant';
  raw: string;
  visible: string;
  citations: number[];
  done: boolean;
}

export function useAskSentinelHotkey() {
  const { openPanel } = useAskSentinel();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (inField) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPanel();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openPanel]);
}

export default function AskSentinel() {
  const { open, close, presetQuery, consumePreset, openPanel } = useAskSentinel();
  const { requestFocus } = useFocus();
  const [query, setQuery] = useState('');
  const [turns, setTurns] = useState<Turn[]>([]);
  const streamRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const turnId = useRef(0);

  useAskSentinelHotkey();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    if (open && presetQuery) {
      submit(presetQuery);
      consumePreset();
    }
  }, [open, presetQuery, consumePreset]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [turns]);

  useEffect(() => {
    return () => {
      if (streamRef.current) window.clearInterval(streamRef.current);
    };
  }, []);

  function submit(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setQuery('');

    const userTurnId = ++turnId.current;
    setTurns((prev) => [
      ...prev,
      { id: userTurnId, role: 'user', raw: trimmed, visible: trimmed, citations: [], done: true },
    ]);

    const match = matchAskResponse(trimmed);
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
        prev.map((t) =>
          t.id === assistantTurnId ? { ...t, visible: done ? match.response : visible, done } : t,
        ),
      );
      if (done && streamRef.current) {
        window.clearInterval(streamRef.current);
        streamRef.current = null;
      }
    }, 15);
  }

  function citationClick(articleId: number) {
    close();
    setTimeout(() => requestFocus({ articleId }), 200);
  }

  const showSuggestions = turns.length === 0;

  return (
    <>
      <button
        type="button"
        onClick={() => openPanel()}
        aria-label="Ask Prahari"
        className={`ask-cta ${open ? 'hidden' : 'hidden md:inline-flex'}`}
      >
        <MessageCircle className="w-4 h-4" strokeWidth={2.25} />
        Ask Prahari
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:bg-black/20 animate-fade-in"
            onClick={close}
          />
          <aside
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[440px] bg-bg-card border-l border-border-strong flex flex-col animate-slide-in-right"
            role="dialog"
            aria-label="Ask Prahari"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <SentinelMark className="w-4 h-4 text-text-primary" />
                <span className="text-sm font-semibold text-text-primary">Ask Prahari</span>
              </div>
              <button
                onClick={close}
                aria-label="Close"
                className="p-1.5 rounded-lg border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-strong"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); submit(query); }}
              className="border-b border-border-subtle p-3 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about ministries, coverage, regions, misinfo…"
                className="flex-1 text-sm px-3 py-2 rounded-lg border border-border-subtle bg-bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!query.trim()}
                className="p-2 rounded-lg border border-border-strong text-text-primary hover:bg-bg-card-hover disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {showSuggestions && (
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-text-muted mb-2">
                    Try asking
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {askSentinelSuggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => submit(s)}
                        className="text-left text-[11px] px-2.5 py-1.5 rounded-full border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-strong hover:bg-bg-card-hover"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-text-muted mt-4 leading-relaxed">
                    Whole-platform copilot for government, news and media. Answers cite coverage you can open. To chat about one piece, use Chat on that article in Coverage.
                  </p>
                </div>
              )}

              {turns.map((t) => (
                <div key={t.id} className={t.role === 'user' ? 'flex justify-end' : ''}>
                  {t.role === 'user' ? (
                    <div className="max-w-[85%] text-xs px-3 py-2 rounded-lg bg-bg-card-hover border border-border-subtle text-text-primary">
                      {t.visible}
                    </div>
                  ) : (
                    <AssistantBubble text={t.visible} done={t.done} citations={t.citations} onCitation={citationClick} />
                  )}
                </div>
              ))}
            </div>
          </aside>
        </>
      )}
    </>
  );
}

function AssistantBubble({
  text, done, citations, onCitation,
}: {
  text: string;
  done: boolean;
  citations: number[];
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
    <div className="max-w-full text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
      {parts.map((p, i) => {
        if (p.kind === 'text') return <span key={i}>{p.text}</span>;
        const a = articles.find((x) => x.id === p.articleId);
        const label = a ? a.source : `#${p.articleId}`;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onCitation(p.articleId)}
            className="mx-0.5 inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-md border border-border-strong bg-bg-surface text-text-primary hover:bg-bg-card-hover align-baseline"
            title={a ? a.headline : `Article ${p.articleId}`}
          >
            <SentinelMark className="w-2.5 h-2.5" /> {label}
          </button>
        );
      })}
      {!done && <span className="inline-block w-1.5 h-3 ml-0.5 bg-text-muted align-baseline animate-pulse" />}
    </div>
  );
}
