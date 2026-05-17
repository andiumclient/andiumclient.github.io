'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn, EASE } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Download', href: '#download' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Discord', href: 'https://discord.gg/', external: true }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border/70 bg-bg/70 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/55'
          : 'border-b border-transparent bg-transparent'
      )}
      role="banner"
    >
      <nav
        aria-label="Primary"
        className="container flex h-16 items-center justify-between md:h-20"
      >
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,hsl(var(--accent-blue))_0%,hsl(var(--accent-purple))_100%)] shadow-glow transition-shadow group-hover:shadow-glow-lg">
            <Zap className="h-5 w-5 text-white" aria-hidden />
          </span>
          <span className="text-gradient">Andium</span>
          <span className="text-fg">Client</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
                className="relative rounded-full px-4 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center md:flex">
          <Button asChild size="sm" variant="primary" className="px-5">
            <a href="#download">
              <Download className="h-4 w-4" aria-hidden />
              Download
            </a>
          </Button>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-bg-elevated/60 text-fg md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-border/70 bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container flex flex-col gap-1 py-4">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    {...(l.external
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                    className="block rounded-xl px-4 py-3 text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild className="w-full">
                  <a href="#download" onClick={() => setOpen(false)}>
                    <Download className="h-4 w-4" aria-hidden />
                    Download
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
