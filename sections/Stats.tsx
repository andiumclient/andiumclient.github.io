'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import { EASE } from '@/lib/utils';

type Stat = {
  value: number;
  suffix: string;
  label: string;
  format?: 'number' | 'compact';
};

const STATS: Stat[] = [
  { value: 50000, suffix: '+', label: 'Users worldwide', format: 'compact' },
  { value: 10, suffix: 'M+', label: 'Hours played', format: 'number' },
  { value: 200, suffix: '+', label: 'Curated mods', format: 'number' }
];

export default function Stats() {
  return (
    <section className="relative py-24">
      <div className="container">
        <div className="glass-strong relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-mesh animated-gradient opacity-60"
            aria-hidden
          />
          <ul className="relative grid grid-cols-1 gap-10 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <StatItem key={s.label} stat={s} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="font-display text-5xl font-bold tracking-tight text-fg sm:text-6xl">
        <Counter target={stat.value} start={inView} format={stat.format} />
        <span className="text-gradient">{stat.suffix}</span>
      </div>
      <p className="mt-3 text-sm uppercase tracking-[0.18em] text-fg-muted">
        {stat.label}
      </p>
    </motion.li>
  );
}

function Counter({
  target,
  start,
  format = 'number'
}: {
  target: number;
  start: boolean;
  format?: 'number' | 'compact';
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1800;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1);
      // easeOutCubic for a satisfying snap at the end
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  const display =
    format === 'compact'
      ? Math.round(val).toLocaleString('en-US')
      : Math.round(val).toString();
  return <span>{display}</span>;
}
