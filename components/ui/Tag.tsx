interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-block font-mono text-11 uppercase tracking-wider text-text-mid bg-ink-2 px-2 py-0.5 rounded-sm ${className}`}
    >
      {children}
    </span>
  );
}
