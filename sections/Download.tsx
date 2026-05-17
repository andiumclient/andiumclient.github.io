'use client';

import { motion } from 'framer-motion';
import { Apple, AppWindow, Download as DownloadIcon, Monitor } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { EASE } from '@/lib/utils';

type Platform = {
  name: string;
  icon: typeof Monitor;
  filename: string;
  size: string;
  arch: string;
  href: string;
  available: boolean;
};

// Windows points at the "latest" GitHub release asset — uploading a new
// release on GitHub auto-updates this URL with zero code changes.
const WIN_INSTALLER =
  'https://github.com/andiumclient/andiumclient.github.io/releases/latest/download/AndiumClient-Setup.exe';

const PLATFORMS: Platform[] = [
  {
    name: 'Windows',
    icon: AppWindow,
    filename: 'AndiumClient-Setup.exe',
    size: '144 MB',
    arch: 'x64 · Windows 10+',
    href: WIN_INSTALLER,
    available: true
  },
  {
    name: 'macOS',
    icon: Apple,
    filename: 'Coming soon',
    size: '—',
    arch: 'Universal · macOS 12+',
    href: '#',
    available: false
  },
  {
    name: 'Linux',
    icon: Monitor,
    filename: 'Coming soon',
    size: '—',
    arch: 'x86_64 · glibc 2.31+',
    href: '#',
    available: false
  }
];

export default function Download() {
  return (
    <section id="download" className="relative py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/60 px-3 py-1 text-xs font-medium text-fg-muted">
            <DownloadIcon className="h-3.5 w-3.5 text-accent-blue" />
            Free, forever
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            One download. <span className="text-gradient">Every platform.</span>
          </h2>
          <p className="mt-4 text-base text-fg-muted">
            Auto-updating. Code-signed. No bundled junk.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {PLATFORMS.map((p) => (
            <PlatformCard key={p.name} p={p} />
          ))}
        </motion.ul>

        <p className="mt-10 text-center text-xs text-fg-muted">
          Looking for a portable build or the .deb / .rpm?{' '}
          <a
            href="#"
            className="text-accent-blue underline-offset-4 hover:underline"
          >
            See all builds →
          </a>
        </p>
      </div>
    </section>
  );
}

function PlatformCard({ p }: { p: Platform }) {
  const Icon = p.icon;
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="glass group relative overflow-hidden rounded-2xl p-7"
    >
      <span
        className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(220px_circle_at_50%_0%,hsl(var(--accent-blue)/0.25),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-blue/40 bg-accent-blue/10 text-accent-blue transition-shadow group-hover:shadow-glow">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <span className="text-xs uppercase tracking-widest text-fg-muted">
          v2.4.0
        </span>
      </div>

      <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
      <p className="mt-1 text-sm text-fg-muted">{p.arch}</p>

      <div className="my-6 h-px w-full bg-border/70" />

      <div className="mb-6 flex items-center justify-between text-xs text-fg-muted">
        <span className="truncate pr-2 font-mono">{p.filename}</span>
        <span className="rounded-full border border-border bg-bg-elevated/60 px-2 py-1 text-[10px]">
          {p.size}
        </span>
      </div>

      {p.available ? (
        <Button asChild className="w-full">
          <a href={p.href} download>
            <DownloadIcon className="h-4 w-4" aria-hidden />
            Download for {p.name}
          </a>
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="w-full cursor-not-allowed opacity-60"
          disabled
        >
          Coming soon
        </Button>
      )}
    </motion.li>
  );
}
