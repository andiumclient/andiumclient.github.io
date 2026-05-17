'use client';

import { motion } from 'framer-motion';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { EASE } from '@/lib/utils';

const FAQS = [
  {
    q: 'Is Andium really free?',
    a: 'Yes. Andium is free to download and use, forever. Cosmetics never gate the client and there are no ads.'
  },
  {
    q: 'Is it allowed on Hypixel / NoCheatPlus / other anti-cheats?',
    a: 'Andium ships only with modules audited against major server anti-cheats. We publish our exact module list for server admins to whitelist with confidence.'
  },
  {
    q: 'Which Minecraft versions are supported?',
    a: 'Everything from 1.7.10 through the latest release and snapshots. Switching versions is a single click — no re-installs.'
  },
  {
    q: 'Does it actually boost FPS?',
    a: 'On most hardware: yes, meaningfully. The exact gain depends on your GPU, mods and resolution. We never make magic-number promises.'
  },
  {
    q: 'Will my settings sync between devices?',
    a: 'Link your account once and your settings, instances and cosmetics roam with you. Local-only mode is supported if you prefer.'
  },
  {
    q: 'How do I report a bug?',
    a: 'The Discord linked in the navbar is the fastest path. We tag every report with a build hash so we can reproduce in minutes.'
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-32">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/60 px-3 py-1 text-xs font-medium text-fg-muted">
            FAQ
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Questions, <span className="text-gradient">answered.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } }
          }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <motion.div
                key={f.q}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE }
                  }
                }}
              >
                <AccordionItem value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
