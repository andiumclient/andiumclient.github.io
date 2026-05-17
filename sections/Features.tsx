'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Gauge,
  Boxes,
  Swords,
  Shirt,
  ShieldCheck,
  Layers,
  Sparkles,
  MessageCircle,
  type LucideIcon
} from 'lucide-react';

import { EASE } from '@/lib/utils';

type Feature = {
  title: string;
  description: string;
  Icon: LucideIcon;
  accent: 'blue' | 'purple';
};

const FEATURES: Feature[] = [
  {
    title: 'FPS Boost',
    description:
      'Reclaim every frame. Smart render dispatch, micro-stutter killer, and adaptive sync.',
    Icon: Gauge,
    accent: 'blue'
  },
  {
    title: 'Custom Mods',
    description:
      '200+ community-vetted mods, one click away. Always up-to-date, never sketchy.',
    Icon: Boxes,
    accent: 'purple'
  },
  {
    title: 'PvP Optimization',
    description:
      'Tickrate-aware hit reg, animation smoothing and zero-latency input handling.',
    Icon: Swords,
    accent: 'blue'
  },
  {
    title: 'Cosmetics',
    description:
      'Capes, particles and emotes that respect lighting. No tacky, no pay-to-flex.',
    Icon: Shirt,
    accent: 'purple'
  },
  {
    title: 'Anti-Cheat Friendly',
    description:
      'Audited and whitelisted on major servers. Play hard, stay clean.',
    Icon: ShieldCheck,
    accent: 'blue'
  },
  {
    title: 'Multi-Version Support',
    description:
      'From 1.7 nostalgia to the latest snapshot — one launcher, every era.',
    Icon: Layers,
    accent: 'purple'
  },
  {
    title: 'Smooth UI',
    description:
      'A launcher that feels like 2026, not 2014. Animations you can feel.',
    Icon: Sparkles,
    accent: 'blue'
  },
  {
    title: 'Discord Integration',
    description:
      'Rich presence, party invites, and friends-in-game from your sidebar.',
    Icon: MessageCircle,
    accent: 'purple'
  }
];

export default function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/60 px-3 py-1 text-xs font-medium text-fg-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue shadow-glow" />
            Why players switch
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you wanted.{' '}
            <span className="text-gradient">Nothing you didn&apos;t.</span>
          </h2>
          <p className="mt-4 text-base text-fg-muted">
            Andium ships with the eight things competitive players actually
            ask for — and none of the bloat.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } }
          }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const { title, description, Icon, accent } = feature;
  const ax = useMotionValue(0);
  const ay = useMotionValue(0);
  // Spring-smoothed tilt for buttery feel
  const rotateX = useSpring(useTransform(ay, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 18
  });
  const rotateY = useSpring(useTransform(ax, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 18
  });

  const handleMove = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    ax.set((e.clientX - rect.left) / rect.width - 0.5);
    ay.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    ax.set(0);
    ay.set(0);
  };

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="glass group relative cursor-default overflow-hidden rounded-2xl p-6"
    >
      {/* Hover glow */}
      <span
        className={
          'pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ' +
          (accent === 'blue'
            ? 'bg-[radial-gradient(120px_circle_at_var(--mx,50%)_var(--my,50%),hsl(var(--accent-blue)/0.25),transparent_70%)]'
            : 'bg-[radial-gradient(120px_circle_at_var(--mx,50%)_var(--my,50%),hsl(var(--accent-purple)/0.25),transparent_70%)]')
        }
        aria-hidden
      />

      <div
        className={
          'mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border ' +
          (accent === 'blue'
            ? 'border-accent-blue/40 bg-accent-blue/10 text-accent-blue shadow-glow/40'
            : 'border-accent-purple/40 bg-accent-purple/10 text-accent-purple shadow-glow-purple/40')
        }
      >
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="font-display text-lg font-semibold text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{description}</p>
    </motion.li>
  );
}
