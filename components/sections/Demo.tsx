'use client';

import { useEffect, useState, useRef } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import GradientText from '@/components/ui/GradientText';
import Hairline from '@/components/ui/Hairline';

const SECTIONS = [
  { name: 'Hero', color: 'bg-brand-indigo/20 border-brand-indigo/30' },
  { name: 'Features', color: 'bg-brand-cyan/10 border-brand-cyan/20' },
  { name: 'Pricing', color: 'bg-brand-teal/10 border-brand-teal/20' },
  { name: 'Social Proof', color: 'bg-brand-indigo/10 border-brand-indigo/20' },
  { name: 'FAQ', color: 'bg-brand-cyan/10 border-brand-cyan/20' },
  { name: 'CTA', color: 'bg-brand-teal/10 border-brand-teal/20' },
];

export default function Demo() {
  const [inView, setInView] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Elapsed counter
  useEffect(() => {
    if (!inView || prefersReduced) {
      setElapsed(184);
      return;
    }

    let frame: number;
    const start = Date.now();
    const duration = 6000;

    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setElapsed(Math.round(progress * 184));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, prefersReduced]);

  const elapsedStr = (elapsed / 10).toFixed(1);

  return (
    <section
      id="demo"
      ref={sectionRef}
      aria-label="Demo"
      className="py-20 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionLabel n="03" title="Demo" />
        <GradientText
          as="h2"
          className="font-display font-bold text-32 md:text-40 mb-12"
        >
          Watch a page write itself.
        </GradientText>

        {/* Demo frame */}
        <div className="relative bg-ink-1 border border-ink-3 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Prompt */}
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-ink-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-12 text-text-lo">
                  prompt
                </span>
              </div>
              <div className="font-mono text-14 text-brand-indigo">
                <span className="text-text-lo">$ </span>
                goon generate --prompt
                <br />
                <span className="text-text-mid ml-2">
                  &quot;Indie SaaS for solo lawyers, $29/mo&quot;
                </span>
                {inView && !prefersReduced && (
                  <span className="caret-blink" />
                )}
              </div>
            </div>

            {/* Right: Streaming preview */}
            <div className="p-6 md:p-8">
              <div className="font-mono text-12 text-text-lo mb-4">
                generating sections…
              </div>
              <div className="space-y-2">
                {SECTIONS.map((section, i) => (
                  <div
                    key={section.name}
                    className={`demo-section-animate flex items-center gap-3 p-2.5 rounded border ${
                      section.color
                    } ${inView ? '' : 'opacity-0'}`}
                    style={{
                      animationDelay: prefersReduced ? '0ms' : `${i * 300}ms`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-current opacity-40" />
                    <span className="font-mono text-12 text-text-mid">
                      {section.name}
                    </span>
                    <span className="ml-auto font-mono text-11 text-text-lo">
                      {inView ? '✓' : '…'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-6 text-center font-mono text-13 text-text-lo">
          → {elapsedStr}s elapsed · 6 sections drafted · 0 lines of CSS written
          by a human
        </div>
      </div>
    </section>
  );
}
