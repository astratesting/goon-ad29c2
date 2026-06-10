'use client';

import SectionLabel from '@/components/ui/SectionLabel';
import GradientText from '@/components/ui/GradientText';
import FAQItem from '@/components/ui/FAQItem';
import Hairline from '@/components/ui/Hairline';
import { useReveal } from '@/components/motion/useReveal';

const FAQ_ITEMS = [
  {
    question: 'Who is Goon for?',
    answer:
      'Solo founders, freelancers, and small-business owners who need a landing page but don\'t have the time, budget, or design skills to build one from scratch. If you can describe what you sell in a paragraph, Goon can build your page.',
  },
  {
    question: 'What does Goon actually produce?',
    answer:
      'A complete, production-ready landing page — HTML, CSS, and copy — generated from your text prompt. In v0.1, pages are hosted on goon.so/your-handle. The Pro plan adds custom domain support and HTML export.',
  },
  {
    question: 'Can I edit the output?',
    answer:
      'In v0.1, the generated page is what you get. We\'re working on a visual editor for v0.2 that lets you tweak copy, swap sections, and adjust the design without touching code. For now, you can re-generate with a more specific prompt to refine the result.',
  },
  {
    question: 'How do custom domains work?',
    answer:
      'On the Pro plan, you can point your own domain (like yourcompany.com) to your Goon page. We handle the SSL certificate and DNS configuration guide. It\'s a CNAME record — takes about 5 minutes.',
  },
  {
    question: 'What\'s the refund policy?',
    answer:
      'Cancel anytime, no questions asked. If you\'re on the Pro plan and cancel, you keep access until the end of your billing period. We don\'t do partial-month refunds, but we also don\'t lock you into contracts.',
  },
  {
    question: 'How is my data handled?',
    answer:
      'Your prompt text is processed to generate the page and is not used to train models. We store your email (if you join the waitlist) and the generated page content. No third-party trackers on the free tier. See our Privacy page for details.',
  },
  {
    question: 'What\'s on the roadmap?',
    answer:
      'v0.2: visual editor, section reordering, and copy tweaking. v0.3: A/B testing, analytics integration, and custom fonts. We ship weekly and maintain a public changelog.',
  },
  {
    question: 'How do I give feedback or report bugs?',
    answer:
      'Email us at feedback@goon.so or open an issue on our GitHub repo. We read everything and respond within 24 hours during the beta.',
  },
];

export default function FAQ() {
  const ref = useReveal<HTMLDivElement>();

  // Build JSON-LD for FAQPage
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" aria-label="FAQ" className="py-20 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div ref={ref} className="max-w-3xl mx-auto px-4 md:px-6">
        <SectionLabel n="05" title="FAQ" />
        <GradientText
          as="h2"
          className="font-display font-bold text-32 md:text-40 mb-8"
        >
          Questions, answered directly.
        </GradientText>

        <div>
          {FAQ_ITEMS.map((item) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
          <Hairline />
        </div>
      </div>
    </section>
  );
}
