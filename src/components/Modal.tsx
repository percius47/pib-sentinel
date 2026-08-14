'use client';

import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  open, onClose, children, title, subtitle,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {(title || subtitle) && (
          <div className="sticky top-0 z-10 px-5 md:px-6 py-4 border-b border-border-subtle bg-bg-card flex items-start justify-between gap-4">
            <div className="min-w-0">
              {title && <h3 className="text-sm md:text-base font-semibold text-text-primary leading-tight">{title}</h3>}
              {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary p-1 shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="p-5 md:p-6">{children}</div>
      </div>
    </div>
  );
}
