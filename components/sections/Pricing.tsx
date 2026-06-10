'use client';

import SectionLabel from '@/components/ui/SectionLabel';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';
import { useReveal } from '@/components/motion/useReveal';
import { Check } from 'lucide-react';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    features: [
      '1 published page',
      'goon.so subdomain',
      'Goon watermark',
      'All 6 section types',
    ],
    recommended: false,
    cta: 'Get started free',
  },
  {
    name: 'Pro',
    price: '$19',
    suffix: '/mo',
    features: [
      'Unlimited pages',
      'Custom domain',
      'Remove watermark',
      'Priority generation queue',
      'Export to HTML',
    ],
    recommended: true,
    cta: 'Join the waitlist',
  },
];

export default function Pricing() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="pricing" aria-label="Pricing" className="py-20 md:py-32">
      <div ref={ref} className="max-w-5xl mx-auto px-4 md:px-6">
        <SectionLabel n="04" title="Pricing" />
        <GradientText
          as="h2"
          className="font-display font-bold text-32 md:text-40 mb-12"
        >
          Simple. Generous on the free tier.
        </GradientText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-ink-1 rounded-lg p-8 ${
                plan.recommended ? 'gradient-border' : 'border border-ink-3'
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 right-6 font-mono text-11 text-brand-indigo bg-ink-2 px-2 py-0.5 rounded-sm border border-ink-3">
                  RECOMMENDED
                </span>
              )}

              <div className="mb-6">
                <h3 className="font-display font-semibold text-24 text-text-hi mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-bold text-56 text-text-hi">
                    {plan.price}
                  </span>
                  {plan.suffix && (
                    <span className="font-mono text-14 text-text-lo">
                      {plan.suffix}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-15 text-text-mid"
                  >
                    <Check
                      size={16}
                      className="text-brand-teal flex-shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="#waitlist" className="block">
                <Button
                  variant={plan.recommended ? 'primary' : 'ghost'}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-14 text-text-mid mt-8">
          Pricing is final at launch — locked in for everyone on the waitlist.
        </p>
      </div>
    </section>
  );
}
