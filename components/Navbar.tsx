'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, MessageCircle, X, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import OnlineCounter from '@/components/OnlineCounter';
import { cn, EASE } from '@/lib/utils';

const DISCORD_URL = 'https://discord.gg/XwyqZjREjc';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Download', href: '#download' },
  { label: 'FAQ', href: '#faq' }
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
        className="container flex h-16 items-center justify-between gap-3 md:h-20"
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
                className="relative rounded-full px-4 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <OnlineCounter />

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Join our Discord"
            className="group grid h-10 w-10 place-items-center rounded-full border border-border bg-bg-elevated/60 text-fg-muted transition-all hover:border-[#5865F2]/60 hover:text-[#7B83FF] hover:shadow-[0_0_24px_rgba(88,101,242,0.45)]"
          >
            <DiscordIcon className="h-4 w-4" />
          </a>

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
            <div className="container flex flex-col gap-2 py-4">
              <div className="flex items-center justify-between">
                <OnlineCounter />
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Join our Discord"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-bg-elevated/60 text-fg-muted hover:border-[#5865F2]/60 hover:text-[#7B83FF]"
                >
                  <DiscordIcon className="h-4 w-4" />
                </a>
              </div>
              <ul className="flex flex-col gap-1 pt-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Inline Discord SVG — Lucide doesn't have an official Discord icon.
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.075.075 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.61 12.61 0 0 0-.617-1.25.077.077 0 0 0-.079-.036A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.13 13.13 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.34 12.34 0 0 1-1.873.891.077.077 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.211 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
