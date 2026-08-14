'use client';

import { ReactNode } from 'react';

/**
 * Clickable card that is NOT a wrapping <button>, so nested controls
 * (GenuineRing, snooze, chips) can be real buttons without invalid HTML.
 * An inset overlay button receives clicks that miss interactive islands.
 */
export default function ClickableCard({
  onActivate,
  label,
  className,
  contentClassName,
  children,
  dataArticleId,
}: {
  onActivate: () => void;
  label: string;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
  dataArticleId?: number;
}) {
  return (
    <div
      className={`relative overflow-visible ${className ?? ''}`}
      {...(dataArticleId != null ? { 'data-article-id': dataArticleId } : {})}
    >
      <button
        type="button"
        className="absolute inset-0 z-0 rounded-[inherit] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
        onClick={onActivate}
        aria-label={label}
      />
      <div className={`relative z-10 overflow-visible pointer-events-none ${contentClassName ?? ''}`}>{children}</div>
    </div>
  );
}
