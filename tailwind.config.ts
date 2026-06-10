/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink-0': 'var(--ink-0)',
        'ink-1': 'var(--ink-1)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'line': 'var(--line)',
        'text-hi': 'var(--text-hi)',
        'text-mid': 'var(--text-mid)',
        'text-lo': 'var(--text-lo)',
        'brand-indigo': 'var(--indigo)',
        'brand-cyan': 'var(--cyan)',
        'brand-teal': 'var(--teal)',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        '12': '0.75rem',
        '13': '0.8125rem',
        '14': '0.875rem',
        '15': '0.9375rem',
        '17': '1.0625rem',
        '20': '1.25rem',
        '24': '1.5rem',
        '32': '2rem',
        '40': '2.5rem',
        '56': '3.5rem',
        '80': '5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'gradient-shift': 'gradient-shift 12s ease infinite',
        'pulse-glow': 'pulse-glow 8s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 600ms ease-out forwards',
        'stream': 'stream 1.2s steps(60) forwards',
        'caret-blink': 'caret-blink 1s step-end infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.45' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'stream': {
          from: { width: '0' },
          to: { width: '100%' },
        },
        'caret-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
