'use client';

import { useEffect, useState, useRef } from 'react';

const PROMPT_LINE = '> goon generate --prompt "Indie SaaS for solo lawyers, $29/mo"';
const OUTPUT_LINES = [
  '✓ analyzing offer…',
  '✓ drafting 6 sections…',
  '✓ writing copy…',
  '✓ applied design system',
  '→ yourpage.goon.so',
];

export default function PromptMock() {
  const [showOutput, setShowOutput] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);

    if (mq.matches) {
      setShowOutput(true);
      setVisibleLines(OUTPUT_LINES.length);
      return;
    }

    const timer = setTimeout(() => setShowOutput(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showOutput || prefersReduced) return;

    if (visibleLines < OUTPUT_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLines((v) => v + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showOutput, visibleLines, prefersReduced]);

  const displayLines = prefersReduced ? OUTPUT_LINES : OUTPUT_LINES.slice(0, visibleLines);

  return (
    <div
      ref={containerRef}
      className="bg-ink-2 border border-ink-3 rounded-lg p-4 md:p-5 font-mono text-13 md:text-14 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-text-lo text-12">goon-cli</span>
      </div>
      <div className="space-y-1">
        <div className="text-brand-indigo">
          {PROMPT_LINE}
          {!prefersReduced && <span className="caret-blink" />}
        </div>
        {showOutput && (
          <div className="mt-2 space-y-1">
            {displayLines.map((line, i) => (
              <div
                key={i}
                className={
                  i === OUTPUT_LINES.length - 1
                    ? 'text-brand-teal font-medium'
                    : 'text-text-mid'
                }
              >
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
