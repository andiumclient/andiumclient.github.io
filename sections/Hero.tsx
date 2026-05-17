'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import OnlineCounter from '@/components/OnlineCounter';
import { EASE } from '@/lib/utils';

// Deterministic pseudo-random so SSR markup matches CSR markup.
function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CUBE_COUNT = 14;
const PARTICLE_COUNT = 40;

export default function Hero() {
  const cubes = useMemo(() => {
    const rand = mulberry32(7);
    return Array.from({ length: CUBE_COUNT }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: 28 + rand() * 64,
      depth: 0.35 + rand() * 0.65,
      delay: rand() * 4,
      duration: 12 + rand() * 12,
      rotate: rand() * 360
    }));
  }, []);

  const particles = useMemo(() => {
    const rand = mulberry32(101);
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand() * 2.5,
      delay: rand() * 6,
      duration: 5 + rand() * 7
    }));
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 -z-20 bg-gradient-mesh animated-gradient" aria-hidden />
      <div
        className="absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)'
        }}
        aria-hidden
      />

      {/* Floating Minecraft-style cubes */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        {cubes.map((c) => (
          <motion.div
            key={c.id}
            className="absolute"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: c.size,
              height: c.size,
              opacity: c.depth
            }}
            initial={{ y: 0, rotate: c.rotate }}
            animate={{
              y: [0, -40, 0],
              rotate: [c.rotate, c.rotate + 180, c.rotate + 360]
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              ease: 'easeInOut',
              repeat: Infinity
            }}
          >
            <Cube />
          </motion.div>
        ))}
      </div>

      {/* Particle field */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-accent-glow/70"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              boxShadow: '0 0 12px hsl(var(--accent-glow) / 0.8)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -30, -60] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeOut',
              repeat: Infinity
            }}
          />
        ))}
      </div>

      <div className="container relative grid place-items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/60 px-4 py-1.5 text-xs font-medium text-fg-muted backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-blue" aria-hidden />
          <span>
            Version 2.4 is out — now with{' '}
            <span className="text-fg">Smart FPS Boost</span>
          </span>
        </motion.div>

        <OnlineCounter className="mb-6" />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-gradient animated-gradient">Andium</span>
          <span className="text-fg">Client</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="mt-6 max-w-2xl text-balance text-base text-fg-muted sm:text-lg md:text-xl"
        >
          Elevate Your Minecraft Experience. Buttery FPS, hand-tuned PvP,
          curated mods, and a UI you&apos;ll actually want to look at.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button size="lg" asChild>
            <a href="#download">
              <Download className="h-5 w-5" aria-hidden />
              Get Andium
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#features">
              See what&apos;s inside
              <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="mt-16 flex items-center gap-6 text-xs text-fg-muted"
        >
          <span>Windows · macOS · Linux</span>
          <span aria-hidden>•</span>
          <span>Free forever</span>
          <span aria-hidden>•</span>
          <span>Anti-cheat friendly</span>
        </motion.div>
      </div>
    </section>
  );
}

function Cube() {
  return (
    <div
      className="relative h-full w-full rounded-md"
      style={{
        background:
          'linear-gradient(135deg, hsl(var(--accent-blue) / 0.18) 0%, hsl(var(--accent-purple) / 0.18) 100%)',
        border: '1px solid hsl(var(--accent-blue) / 0.35)',
        boxShadow:
          '0 0 32px hsl(var(--accent-blue) / 0.18), inset 0 0 24px hsl(var(--accent-purple) / 0.12)'
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-md"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 30%)'
        }}
      />
    </div>
  );
}
