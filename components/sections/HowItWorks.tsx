'use client';

import { Pencil, Cpu, Rocket } from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';
import GradientText from '@/components/ui/GradientText';
import FeatureCard from '@/components/ui/FeatureCard';
import { useReveal } from '@/components/motion/useReveal';

const STEPS = [
  {
    icon: Pencil,
    label: '01 / PROMPT',
    title: 'Describe your offer.',
    description:
      'Type what you sell, who it\'s for, and the price. A paragraph is enough.',
  },
  {
    icon: Cpu,
    label: '02 / GENERATE',
    title: 'Goon generates.',
    description:
      'Six sections, written and laid out by the model. You watch it draft in real time.',
  },
  {
    icon: Rocket,
    label: '03 / PUBLISH',
    title: 'Publish in one click.',
    description:
      'Get a goon.so/your-handle URL. Custom domain on the Pro plan.',
  },
];

export default function HowItWorks() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="how" aria-label="How it works" className="py-20 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionLabel n="01" title="How it works" />
        <GradientText
          as="h2"
          className="font-display font-bold text-32 md:text-40 mb-12"
        >
          Three steps. One prompt.
        </GradientText>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <FeatureCard
              key={step.label}
              icon={step.icon}
              label={step.label}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
