'use client';

import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="border-t border-[var(--line)] py-5"
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex items-center justify-between gap-4 text-16 md:text-17 font-semibold text-text-hi cursor-pointer select-none min-h-[44px]">
        <span>{question}</span>
        <span
          className="font-mono text-20 text-text-mid transition-transform duration-200 flex-shrink-0"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <div className="mt-3 text-15 text-text-mid leading-relaxed pr-8">
        {answer}
      </div>
    </details>
  );
}
