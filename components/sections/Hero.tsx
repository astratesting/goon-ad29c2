'use client';

import Button from '@/components/ui/Button';
import GradientText from '@/components/ui/GradientText';
import AtlasGrid from '@/components/ui/AtlasGrid';
import PromptMock from '@/components/ui/PromptMock';

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
    >
      <AtlasGrid opacity={1} />

      {/* Vignette overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, var(--ink-0) 0%, transparent 15%, transparent 85%, var(--ink-0) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center py-32">
        {/* Tag */}
        <div className="mb-8">
          <span className="font-mono text-13 text-brand-indigo tracking-wider">
            {'// LANDING PAGES · GENERATED'}
          </span>
        </div>

        {/* H1 */}
        <GradientText
          as="h1"
          animate
          className="font-display font-bold text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] tracking-tight mb-6"
        >
          Describe your offer. Get a landing page.
        </GradientText>

        {/* Sub */}
        <p className="text-17 md:text-20 text-text-mid leading-relaxed max-w-2xl mx-auto mb-10">
          Goon turns one paragraph about your business into a polished,
          conversion-tested landing page in under a minute — no designer, no
          Figma, no agency.
        </p>

        {/* Prompt mock */}
        <div className="mb-10">
          <PromptMock />
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a href="#waitlist">
            <Button size="lg">Join the waitlist</Button>
          </a>
          <a href="#how">
            <Button variant="ghost" size="lg">
              See how it works ↓
            </Button>
          </a>
        </div>

        {/* Micro line */}
        <p className="font-mono text-12 text-text-lo">
          no credit card · 3 free generations on launch · cancel anytime
        </p>
      </div>
    </section>
  );
}
