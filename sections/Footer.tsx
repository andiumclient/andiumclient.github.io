'use client';

import { motion } from 'framer-motion';
import { Github, MessageCircle, Twitter, Youtube, Zap } from 'lucide-react';

import { EASE } from '@/lib/utils';

const DISCORD_URL = 'https://discord.gg/XwyqZjREjc';

const LINKS = [
  {
    title: 'Product',
    items: [
      { label: 'Features', href: '#features' },
      { label: 'Download', href: '#download' },
      { label: 'Changelog', href: '#' },
      { label: 'Roadmap', href: '#' }
    ]
  },
  {
    title: 'Community',
    items: [
      { label: 'Discord', href: DISCORD_URL },
      { label: 'GitHub', href: 'https://github.com/andiumclient' },
      { label: 'Bug tracker', href: '#' },
      { label: 'Translators', href: '#' }
    ]
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'License', href: '#' },
      { label: 'Trademark', href: '#' }
    ]
  }
];

const SOCIAL = [
  { label: 'Discord', icon: MessageCircle, href: DISCORD_URL },
  { label: 'GitHub', icon: Github, href: 'https://github.com/andiumclient' },
  { label: 'Twitter', icon: Twitter, href: '#' },
  { label: 'YouTube', icon: Youtube, href: '#' }
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative border-t border-border/70 bg-bg/80"
    >
      <div className="container py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <a
              href="#top"
              className="inline-flex items-center gap-2 font-display text-lg font-semibold"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,hsl(var(--accent-blue))_0%,hsl(var(--accent-purple))_100%)] shadow-glow">
                <Zap className="h-5 w-5 text-white" aria-hidden />
              </span>
              <span className="text-gradient">Andium</span>
              <span className="text-fg">Client</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-fg-muted">
              The Minecraft client built for players who care about every
              frame, every pixel and every press.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {SOCIAL.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-bg-elevated/60 text-fg-muted transition-all hover:border-accent-blue/50 hover:text-fg hover:shadow-glow"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-fg">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-sm text-fg-muted">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      className="transition-colors hover:text-fg"
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border/70 pt-6 text-xs text-fg-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} AndiumClient. Not affiliated with
            Mojang or Microsoft.
          </p>
          <p className="font-mono">build 2.4.0 · stable</p>
        </div>
      </div>
    </motion.footer>
  );
}
