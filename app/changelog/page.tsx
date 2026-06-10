import type { Metadata } from 'next';
import changelog from '@/content/changelog.json';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'What we shipped, when we shipped it. No filler.',
};

interface ChangelogEntry {
  version: string;
  date: string;
  items: string[];
}

export default function ChangelogPage() {
  const entries = (changelog as ChangelogEntry[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-ink-0">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-20">
        <Link
          href="/"
          className="font-mono text-13 text-text-lo hover:text-text-mid transition-colors mb-8 inline-block"
        >
          ← back
        </Link>

        <h1 className="font-display font-bold text-40 text-text-hi mb-2">
          Changelog
        </h1>
        <p className="text-15 text-text-mid mb-12">
          What we shipped, when we shipped it. No filler.
        </p>

        <div className="space-y-12">
          {entries.map((entry) => (
            <div key={entry.version} className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-8">
              <div>
                <span className="font-mono text-14 text-brand-indigo">
                  v{entry.version}
                </span>
                <div className="font-mono text-12 text-text-lo mt-1">
                  {entry.date}
                </div>
              </div>
              <ul className="space-y-2">
                {entry.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-15 text-text-mid">
                    <span className="text-brand-teal mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
