'use client';

export default function SentinelMark({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
      <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
      <path d="M16 3v5.5M16 23.5V29M3 16h5.5M23.5 16H29" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
      <circle cx="16" cy="16" r="2.4" fill="currentColor" />
    </svg>
  );
}
