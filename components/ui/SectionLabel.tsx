interface SectionLabelProps {
  n: string;
  title: string;
  className?: string;
}

export default function SectionLabel({ n, title, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <span className="font-mono text-13 text-brand-indigo">{n}</span>
      <span className="h-px w-8 bg-[var(--line)]" aria-hidden="true" />
      <span className="font-mono text-13 text-text-mid uppercase tracking-wider">
        {title}
      </span>
    </div>
  );
}
