interface GradientTextProps {
  children: React.ReactNode;
  animate?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'span';
  className?: string;
}

export default function GradientText({
  children,
  animate = false,
  as: Tag = 'span',
  className = '',
}: GradientTextProps) {
  return (
    <Tag
      className={`${animate ? 'text-gradient animate-gradient-shift' : 'text-gradient-static'} ${className}`}
      style={animate ? { backgroundSize: '200% 200%' } : undefined}
    >
      {children}
    </Tag>
  );
}
