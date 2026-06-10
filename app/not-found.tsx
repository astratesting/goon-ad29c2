import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-13 text-brand-indigo mb-4">404</p>
      <h1 className="font-display font-bold text-32 md:text-40 text-text-hi mb-4">
        This route isn't on the atlas.
      </h1>
      <p className="text-15 text-text-mid mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="font-mono text-14 text-brand-indigo hover:text-text-hi transition-colors"
      >
        ← Back to /
      </Link>
    </div>
  );
}
