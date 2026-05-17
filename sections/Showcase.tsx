'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, MousePointer2 } from 'lucide-react';

import { EASE } from '@/lib/utils';

export default function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  // Spring smoothing so the parallax doesn't feel chained directly to wheel ticks
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4
  });

  const yBack = useTransform(progress, [0, 1], ['0%', '-30%']);
  const yMid = useTransform(progress, [0, 1], ['0%', '-15%']);
  const yFront = useTransform(progress, [0, 1], ['0%', '-6%']);
  const scaleFront = useTransform(progress, [0, 1], [0.96, 1.04]);
  const rotateFront = useTransform(progress, [0, 1], [-2, 2]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-5"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/60 px-3 py-1 text-xs font-medium text-fg-muted">
              <Sparkles className="h-3.5 w-3.5 text-accent-purple" />
              The launcher, redesigned
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              A canvas built for{' '}
              <span className="text-gradient">flow state.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-fg-muted">
              Every panel, every transition, every press has been measured and
              re-measured. Andium gets out of your way so you can get into the
              game — fast, clean, and unmistakable.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-fg-muted">
              {[
                'Sub-16ms input pipeline',
                'Pinned instances + smart prefetch',
                'Live FPS graphs in a single keystroke'
              ].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-blue shadow-glow" />
                  {b}
                </li>
              ))}
            </ul>

            <p className="mt-10 flex items-center gap-2 text-xs text-fg-muted">
              <MousePointer2 className="h-3.5 w-3.5" aria-hidden />
              Scroll to explore — these panels move with you.
            </p>
          </motion.div>

          <div className="relative h-[520px] lg:col-span-7 lg:h-[640px]">
            {/* Back panel */}
            <motion.div
              style={{ y: yBack }}
              className="absolute left-4 top-0 h-56 w-3/4 rounded-2xl border border-border/70 bg-gradient-to-br from-accent-purple/15 to-accent-blue/10 shadow-glow-purple/40 sm:h-64"
            >
              <PanelChrome label="andium / overview" />
              <Sparkline />
            </motion.div>

            {/* Mid panel */}
            <motion.div
              style={{ y: yMid }}
              className="glass-strong absolute left-12 top-32 h-72 w-[88%] rounded-2xl p-4 shadow-glow-lg sm:h-80"
            >
              <PanelChrome label="instances / pinned" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-lg border border-border bg-bg-elevated/70"
                    style={{
                      backgroundImage:
                        i % 2 === 0
                          ? 'linear-gradient(135deg, hsl(var(--accent-blue)/0.22), transparent)'
                          : 'linear-gradient(135deg, hsl(var(--accent-purple)/0.22), transparent)'
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Front panel */}
            <motion.div
              style={{ y: yFront, scale: scaleFront, rotate: rotateFront }}
              className="glass-strong absolute right-0 top-56 h-64 w-[78%] rounded-2xl p-4 shadow-glow sm:h-72"
            >
              <PanelChrome label="performance / live" />
              <div className="mt-4 flex items-end gap-1.5 h-32">
                {[20, 35, 28, 50, 44, 62, 55, 70, 65, 82, 78, 90, 86, 95].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-[linear-gradient(to_top,hsl(var(--accent-blue)),hsl(var(--accent-purple)))]"
                      style={{ height: `${h}%` }}
                    />
                  )
                )}
              </div>
              <div className="mt-3 flex justify-between text-xs text-fg-muted">
                <span>FPS</span>
                <span className="text-fg">412</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/70 px-4 py-3 text-[10px] uppercase tracking-widest text-fg-muted">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
        <span className="h-2 w-2 rounded-full bg-green-400/70" />
      </div>
      <span>{label}</span>
    </div>
  );
}

function Sparkline() {
  return (
    <svg
      viewBox="0 0 200 50"
      className="absolute bottom-4 left-4 right-4 h-12 w-[calc(100%-2rem)] opacity-80"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="sparkA" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="hsl(var(--accent-blue))" />
          <stop offset="100%" stopColor="hsl(var(--accent-purple))" />
        </linearGradient>
      </defs>
      <path
        d="M0,40 C20,32 30,18 50,22 C75,28 85,8 110,14 C135,20 145,4 170,8 C185,10 195,20 200,16"
        stroke="url(#sparkA)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
