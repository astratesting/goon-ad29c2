'use client';

import SectionLabel from '@/components/ui/SectionLabel';
import GradientText from '@/components/ui/GradientText';
import FeatureCard from '@/components/ui/FeatureCard';
import { useReveal } from '@/components/motion/useReveal';
import {
  Type,
  Users,
  CreditCard,
  HelpCircle,
  Mail,
  Search,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Type,
    label: 'HERO & HEADLINE',
    title: 'Hero & headline',
    description:
      'A sharp headline, subtext, and primary CTA — the first thing visitors see, written to convert.',
    mock: (
      <div className="bg-ink-2 border border-ink-3 rounded-md p-3 text-center">
        <div className="font-display font-bold text-15 text-gradient-static mb-1">
          Your headline here
        </div>
        <div className="text-12 text-text-lo">Subtext that sells the outcome.</div>
      </div>
    ),
  },
  {
    icon: Users,
    label: 'SOCIAL PROOF',
    title: 'Social proof blocks',
    description:
      'Placeholder logo strips and proof sections ready for your real customers — no fake brands.',
    mock: (
      <div className="flex items-center justify-center gap-3">
        {['LOGO', 'LOGO', 'LOGO'].map((l, i) => (
          <span
            key={i}
            className="font-mono text-11 text-text-lo border border-ink-3 rounded px-2 py-1"
          >
            [{l}]
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: CreditCard,
    label: 'PRICING TABLE',
    title: 'Pricing table',
    description:
      'Three-tier pricing layout with a highlighted recommended plan and feature comparison.',
    mock: (
      <div className="grid grid-cols-3 gap-1">
        {['Free', 'Pro', 'Scale'].map((tier, i) => (
          <div
            key={tier}
            className={`text-center py-2 px-1 rounded text-11 ${
              i === 1
                ? 'bg-brand-indigo/20 border border-brand-indigo/40 text-text-hi'
                : 'bg-ink-2 border border-ink-3 text-text-lo'
            }`}
          >
            {tier}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: HelpCircle,
    label: 'FAQ ACCORDION',
    title: 'FAQ accordion',
    description:
      'Expandable question-and-answer sections — the same native details/summary pattern this page uses.',
    mock: (
      <div className="bg-ink-2 border border-ink-3 rounded-md p-2">
        <div className="flex items-center justify-between text-12 text-text-mid">
          <span>Common question?</span>
          <span className="font-mono text-brand-indigo">+</span>
        </div>
      </div>
    ),
  },
  {
    icon: Mail,
    label: 'EMAIL CAPTURE',
    title: 'Email capture',
    description:
      'Built-in waitlist or newsletter form with validation, success states, and Supabase integration.',
    mock: (
      <div className="flex items-center gap-2 bg-ink-2 border border-ink-3 rounded-md p-2">
        <div className="flex-1 text-12 text-text-lo">you@example.com</div>
        <div className="bg-brand-indigo/30 text-brand-indigo text-11 px-2 py-0.5 rounded">
          Join
        </div>
      </div>
    ),
  },
  {
    icon: Search,
    label: 'SEO & META',
    title: 'SEO & meta',
    description:
      'Auto-generated title tags, meta descriptions, OG tags, and structured data — all baked in.',
    mock: (
      <div className="bg-ink-2 border border-ink-3 rounded-md p-2 font-mono text-11 text-text-lo text-left">
        <div>
          <span className="text-brand-indigo">&lt;title&gt;</span>Your Page
          <span className="text-brand-indigo">&lt;/title&gt;</span>
        </div>
        <div>
          <span className="text-brand-indigo">&lt;meta</span> description=
          <span className="text-brand-teal">&quot;...&quot;</span>
          <span className="text-brand-indigo">/&gt;</span>
        </div>
      </div>
    ),
  },
];

export default function Features() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="features" aria-label="Features" className="py-20 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionLabel n="02" title="What's in the box" />
        <GradientText
          as="h2"
          className="font-display font-bold text-32 md:text-40 mb-12"
        >
          Everything a landing page needs, generated in one pass.
        </GradientText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.label}
              icon={feature.icon}
              label={feature.label}
              title={feature.title}
              description={feature.description}
              mock={feature.mock}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
