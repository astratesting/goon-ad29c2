import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon?: LucideIcon;
  label: string;
  title: string;
  description: string;
  mock?: React.ReactNode;
  className?: string;
}

export default function FeatureCard({
  icon: Icon,
  label,
  title,
  description,
  mock,
  className = '',
}: FeatureCardProps) {
  return (
    <div
      className={`bg-ink-1 border border-ink-3 rounded-lg p-6 flex flex-col gap-4 ${className}`}
    >
      {Icon && (
        <div className="w-10 h-10 rounded-md border border-ink-3 flex items-center justify-center">
          <Icon size={20} strokeWidth={1.5} className="text-text-mid" />
        </div>
      )}
      <span className="font-mono text-11 uppercase tracking-wider text-text-mid">
        {label}
      </span>
      <h3 className="font-display font-semibold text-20 text-text-hi">{title}</h3>
      <p className="text-15 text-text-mid leading-relaxed">{description}</p>
      {mock && <div className="mt-auto pt-4">{mock}</div>}
    </div>
  );
}
