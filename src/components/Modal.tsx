'use client';

import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  children,
  onClose,
  labelledBy,
}: {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div
        className="modal-content animate-scale-in relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-3 float-right mr-3 mt-3 z-10 p-1.5 rounded-lg border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-strong bg-bg-card"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
