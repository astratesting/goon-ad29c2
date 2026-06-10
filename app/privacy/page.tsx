import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Goon handles your data. Short version: we don\'t sell it.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ink-0">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-20">
        <Link
          href="/"
          className="font-mono text-13 text-text-lo hover:text-text-mid transition-colors mb-8 inline-block"
        >
          ← back
        </Link>

        <h1 className="font-display font-bold text-40 text-text-hi mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-15 text-text-mid leading-relaxed">
          <section>
            <h2 className="font-display font-semibold text-20 text-text-hi mb-3">
              What we collect
            </h2>
            <p>
              If you join the waitlist, we store your email address. We also log your IP address
              (hashed, not stored raw), user agent, and referrer for rate-limiting and abuse prevention.
              That's it.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-20 text-text-hi mb-3">
              What we don't do
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-brand-teal">•</span>
                We don't sell your data. Ever.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-teal">•</span>
                We don't use third-party trackers. No Google Analytics, no Facebook Pixel, no Hotjar.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-teal">•</span>
                We don't send marketing emails. One email per release, max.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-teal">•</span>
                We don't use cookies for tracking. The only cookie-like storage is a localStorage flag to remember your waitlist status.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-semibold text-20 text-text-hi mb-3">
              Your prompt data
            </h2>
            <p>
              When you use Goon to generate a page, your prompt text is processed to create the output.
              We do not use your prompts to train models. Prompt data is stored only as long as needed
              to generate and host your page.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-20 text-text-hi mb-3">
              Analytics
            </h2>
            <p>
              If we enable analytics, it will be a privacy-respecting tool like Plausible or a self-hosted
              Umami instance. No cookies, no personal data, no consent banner needed. We'd rather have
              honest, incomplete data than creepy, complete data.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-20 text-text-hi mb-3">
              Your rights
            </h2>
            <p>
              You can request deletion of your data at any time by emailing{' '}
              <a href="mailto:privacy@goon.so" className="text-brand-indigo hover:text-text-hi transition-colors">
                privacy@goon.so
              </a>. We'll delete it within 48 hours.
            </p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-20 text-text-hi mb-3">
              Changes
            </h2>
            <p>
              If we update this policy, we'll post the changes here and note it in the changelog.
              No silent edits.
            </p>
          </section>

          <p className="font-mono text-12 text-text-lo pt-4 border-t border-[var(--line)]">
            Last updated: January 2025
          </p>
        </div>
      </div>
    </div>
  );
}
