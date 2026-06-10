import Hairline from '@/components/ui/Hairline';

const FACTS = ['private beta', '0 third-party trackers', 'open changelog'];

export default function TrustStrip() {
  return (
    <section aria-label="Trust" className="py-6">
      <Hairline />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 font-mono text-12 text-text-lo">
          {FACTS.map((fact, i) => (
            <span key={fact} className="flex items-center gap-2 md:gap-4">
              {i > 0 && (
                <span className="text-ink-3" aria-hidden="true">
                  ·
                </span>
              )}
              {fact}
            </span>
          ))}
        </div>
      </div>
      <Hairline />
    </section>
  );
}
