'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '#how', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [waitlisted, setWaitlisted] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Check localStorage for waitlist status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWaitlisted(localStorage.getItem('goon_waitlisted') === '1');
    }
  }, []);

  // Fetch waitlist count
  useEffect(() => {
    fetch('/api/waitlist/count')
      .then((r) => r.json())
      .then((data) => {
        if (data.count > 0) setCount(data.count);
      })
      .catch(() => {});
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = ['how', 'features', 'demo', 'pricing', 'faq', 'waitlist'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-20% 0px -60% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Focus trap for mobile sheet
  useEffect(() => {
    if (!sheetOpen) return;

    const sheet = sheetRef.current;
    if (!sheet) return;

    const focusable = sheet.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSheet();
        return;
      }

      if (e.key !== 'Tab' || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sheetOpen]);

  const closeSheet = useCallback(() => {
    setSheetOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', href);
      }
      if (sheetOpen) closeSheet();
    },
    [sheetOpen, closeSheet]
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-14 transition-colors duration-200 ${
          scrolled
            ? 'bg-ink-0/80 backdrop-blur-md border-b border-ink-3'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          {/* Left: Wordmark */}
          <a href="/" className="flex items-center gap-2.5">
            <span className="font-display font-semibold text-18 text-gradient-static">
              Goon
            </span>
            <span className="font-mono text-11 text-text-lo">v0.1</span>
            {count !== null && (
              <span className="hidden md:inline font-mono text-11 text-text-lo">
                · {count} on the list
              </span>
            )}
          </a>

          {/* Center: Nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-14 transition-colors duration-150 min-h-[44px] inline-flex items-center ${
                  activeSection === link.href.slice(1)
                    ? 'text-text-hi border-b-2 border-brand-indigo'
                    : 'text-text-mid hover:text-text-hi'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <a
              href="#waitlist"
              onClick={(e) => handleNavClick(e, '#waitlist')}
              className="hidden md:inline-flex"
            >
              <Button variant="ghost" size="sm">
                <span className="line-through text-text-lo mr-1">Sign in</span>
                <span>Get early access</span>
              </Button>
            </a>
            <a
              href="#waitlist"
              onClick={(e) => handleNavClick(e, '#waitlist')}
              className="hidden md:inline-flex"
            >
              <Button variant="primary" size="sm">
                {waitlisted ? "You're in ✓" : 'Join waitlist'}
              </Button>
            </a>

            {/* Mobile menu button */}
            <button
              ref={menuButtonRef}
              className="md:hidden flex items-center justify-center w-11 h-11 text-text-mid hover:text-text-hi"
              onClick={() => setSheetOpen(!sheetOpen)}
              aria-label={sheetOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={sheetOpen}
            >
              {sheetOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sheet */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSheet();
          }}
        >
          <div
            ref={sheetRef}
            className="mobile-sheet open fixed top-0 right-0 bottom-0 w-72 bg-ink-1 border-l border-ink-3 p-6 pt-20"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-17 text-text-mid hover:text-text-hi py-3 px-2 rounded-md hover:bg-ink-2 transition-colors min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
              <div className="my-4 h-px bg-[var(--line)]" />
              <a
                href="#waitlist"
                onClick={(e) => handleNavClick(e, '#waitlist')}
              >
                <Button variant="primary" size="md" className="w-full">
                  {waitlisted ? "You're in ✓" : 'Join waitlist'}
                </Button>
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
