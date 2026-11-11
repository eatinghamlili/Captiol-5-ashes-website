import type { ReactNode } from 'react';
import { Eye, EyeOff, Plus } from 'lucide-react';

export function Reveal({
  open,
  eyebrow,
  title,
  teaser,
  onMouseEnter,
  children,
}: {
  open: boolean;
  eyebrow: string;
  title: string;
  teaser?: string;
  onMouseEnter?: () => void;
  children: ReactNode;
}) {
  return (
    <article className={`reveal ${open ? 'is-open' : ''}`} tabIndex={0} onMouseEnter={onMouseEnter} onFocus={onMouseEnter}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#a75239]">{eyebrow}</div>
          <h3 className="serif mt-2 text-xl leading-snug text-[#25343a]">{title}</h3>
        </div>
        <span className="reveal-hint" aria-hidden="true">
          <Plus size={13} />
        </span>
      </div>
      {teaser ? <p className="mt-3 text-[13px] leading-5 text-[#77766e]">{teaser}</p> : null}
      <div className="reveal-body">
        <div className="reveal-body-inner">{children}</div>
      </div>
    </article>
  );
}

export function RevealToggle({ open, onToggle, className = '' }: { open: boolean; onToggle: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={open}
      className={`inline-flex items-center gap-2 rounded-full border border-[#a75239] px-3.5 py-2 text-[11px] font-semibold text-[#a75239] transition-colors duration-200 hover:bg-[#a75239] hover:text-[#fff7ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a75239] ${className}`}
    >
      {open ? <EyeOff size={13} /> : <Eye size={13} />}
      {open ? 'Hide the details again' : 'Show all the information'}
    </button>
  );
}
