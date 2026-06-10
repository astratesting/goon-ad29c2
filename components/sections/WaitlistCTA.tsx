'use client';

import { useState, useEffect, FormEvent } from 'react';
import GradientText from '@/components/ui/GradientText';
import Button from '@/components/ui/Button';
import AtlasGrid from '@/components/ui/AtlasGrid';

type FormState = 'idle' | 'invalid' | 'submitting' | 'success' | 'error';

export default function WaitlistCTA() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [position, setPosition] = useState<number | null>(null);
  const [waitlisted, setWaitlisted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('goon_waitlisted') === '1') {
      setWaitlisted(true);
      setState('success');
    }
  }, []);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setState('invalid');
      return;
    }

    setState('submitting');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setPosition(data.position);
        setState('success');
        setWaitlisted(true);
        localStorage.setItem('goon_waitlisted', '1');
      } else if (res.status === 429) {
        setState('error');
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  if (waitlisted && state === 'success') {
    return (
      <section id="waitlist" aria-label="Waitlist" className="relative py-32">
        <AtlasGrid opacity={0.3} />
        <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-6 text-center">
          <div className="font-mono text-20 text-brand-teal mb-4">
            ✓ you're on the list
            {position !== null && ` — #${String(position).padStart(5, '0')}`}
          </div>
          <p className="text-15 text-text-mid">
            We'll email you when a slot opens.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" aria-label="Waitlist" className="relative py-32">
      <AtlasGrid opacity={0.3} />
      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-6 text-center">
        <GradientText
          as="h2"
          className="font-display font-bold text-32 md:text-40 mb-4"
        >
          Stop describing. Start shipping.
        </GradientText>
        <p className="text-17 text-text-mid mb-10">
          Get early access. We'll email you when a slot opens.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (state === 'invalid') setState('idle');
            }}
            placeholder="you@example.com"
            className={`w-full sm:w-80 h-12 px-4 bg-ink-1 border rounded-md text-15 text-text-hi placeholder:text-text-lo focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 ${
              state === 'invalid' ? 'border-red-500' : 'border-ink-3'
            }`}
            aria-label="Email address"
            disabled={state === 'submitting'}
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={state === 'submitting'}
            className="w-full sm:w-auto"
          >
            {state === 'submitting' ? (
              <span className="font-mono">…</span>
            ) : (
              'Request access'
            )}
          </Button>
        </form>

        {state === 'invalid' && (
          <p className="font-mono text-13 text-red-400 mb-2">
            Enter a valid email
          </p>
        )}

        {state === 'error' && (
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-mono text-13 text-red-400">
              ! something went wrong — try again
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setState('idle')}
            >
              Retry
            </Button>
          </div>
        )}

        <p className="font-mono text-12 text-text-lo">
          We send 0 marketing emails. One email per release, max.
        </p>
      </div>
    </section>
  );
}
