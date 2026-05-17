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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
      className={cn('flex flex-wrap items-center justify-center gap-2', className)}
    >
      <Pill icon={Globe} label="online" count={web} />
      <Pill icon={Gamepad2} label="in-game" count={app} />
    </motion.div>
  );
}

function Pill({
  icon: Icon,
  label,
  count
}: {
  icon: typeof Globe;
  label: string;
  count: number | null;
}) {
  return (
    <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <Icon className="h-3.5 w-3.5 text-fg-muted" aria-hidden />
      <span className="font-mono tabular-nums text-fg">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={count ?? 'loading'}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="inline-block"
          >
            {count === null ? '—' : count.toLocaleString('en-US')}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-fg-muted">{label}</span>
    </div>
  );
}
