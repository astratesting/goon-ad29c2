'use client';

import { useEffect, useRef, RefObject } from 'react';

export function useReveal<T extends HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      el.classList.remove('reveal-hidden');
      el.classList.add('reveal-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('reveal-hidden');
          el.classList.add('reveal-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    el.classList.add('reveal-hidden');
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
