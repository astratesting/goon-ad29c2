'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'mono';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-body font-semibold rounded-md transition-all duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--indigo)] min-w-[44px] min-h-[44px]';

    const variants = {
      primary:
        'bg-[var(--gradient)] text-white shadow-[0_0_24px_-6px_rgba(79,70,229,0.6)] hover:shadow-[0_0_32px_-4px_rgba(79,70,229,0.8)] hover:brightness-110',
      ghost:
        'bg-transparent text-text-mid border border-ink-3 hover:text-text-hi hover:border-line',
      mono:
        'bg-ink-2 text-text-mid border border-ink-3 font-mono text-14 hover:text-text-hi hover:border-line',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-13',
      md: 'px-5 py-2.5 text-15',
      lg: 'px-8 py-3.5 text-17',
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
