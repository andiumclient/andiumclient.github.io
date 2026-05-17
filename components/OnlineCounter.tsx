'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Globe } from 'lucide-react';

import { usePresence } from '@/lib/usePresence';
import { isFirebaseConfigured } from '@/lib/firebase-config';
import { cn, EASE } from '@/lib/utils';

export default function OnlineCounter({ className }: { className?: string }) {
  // If Firebase isn't configured yet, render nothing — site looks the same
  // as before. Once config is pasted in, the pill appears.
  if (!isFirebaseConfigured()) return null;
  return <Pills className={className} />;
}

function Pills({ className }: { className?: string }) {
  const { web, app } = usePresence();

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
      className={cn('inline-flex items-center gap-1.5', className)}
      aria-label="Live presence"
    >
      <Pill icon={Globe} title="Online on the site" count={web} />
      <Pill icon={Gamepad2} title="In-game right now" count={app} />
    </motion.div>
  );
}

function Pill({
  icon: Icon,
  title,
  count
}: {
  icon: typeof Globe;
  title: string;
  count: number | null;
}) {
  return (
    <div
      title={title}
      className="glass inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <Icon className="h-3 w-3 text-fg-muted" aria-hidden />
      <span className="font-mono tabular-nums text-fg">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={count ?? 'loading'}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 6, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="inline-block"
          >
            {count === null ? '—' : count.toLocaleString('en-US')}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
