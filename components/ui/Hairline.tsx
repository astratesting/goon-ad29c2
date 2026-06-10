interface HairlineProps {
  gradient?: boolean;
  className?: string;
}

export default function Hairline({ gradient = false, className = '' }: HairlineProps) {
  if (gradient) {
    return (
      <div
        className={`h-px w-full bg-[var(--gradient)] opacity-30 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`h-px w-full bg-[var(--line)] ${className}`}
      aria-hidden="true"
    />
  );
}
