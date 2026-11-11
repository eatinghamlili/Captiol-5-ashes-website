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
          <h3 className="heading text-lg leading-snug text-[#16324f]">{title}</h3>
          <span className="tag mt-2">{eyebrow}</span>
        </div>
        <span className="reveal-hint" aria-hidden="true">
          <Plus size={14} />
        </span>
      </div>
      {teaser ? <p className="mt-3 text-[14px] leading-6 text-[#3f5873]">{teaser}</p> : null}
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
      className={`inline-flex items-center gap-2 rounded-lg border border-[#2563a8] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#2563a8] transition-colors duration-200 hover:bg-[#2563a8] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563a8] ${className}`}
    >
      {open ? <EyeOff size={14} /> : <Eye size={14} />}
      {open ? 'Hide the details again' : 'Show all the information'}
    </button>
  );
}
