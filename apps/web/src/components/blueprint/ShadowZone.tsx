'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ShadowItem } from './data';

interface ShadowZoneProps {
  items: ShadowItem[];
  tips: string[];
  className?: string;
}

export const ShadowZone = React.memo<ShadowZoneProps>(
  function ShadowZone({ items, tips, className }) {
    const [expanded, setExpanded] = useState(false);

    return (
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn('flex flex-col gap-6 px-6 py-10', className)}
      >
        <div className="flex flex-col gap-1">
          <span className="text-h1 text-fg-primary">🌒 你的阴影区</span>
          <p className="text-caption text-fg-dim">
            阴影不是缺点，而是未被照亮的部分。
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.35 }}
              className="relative flex flex-col gap-1 rounded-lg bg-bg-card p-4"
            >
              <div className="absolute left-0 top-4 h-10 w-[3px] rounded-r-full bg-accent-purple" />
              <h3 className="pl-3 text-h3 text-fg-primary">• {item.headline}</h3>
              <p className="pl-3 text-body-sm text-fg-secondary">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 阴影建议 Callout */}
        <div className="rounded-xl border-l-4 border-accent-purple bg-accent-purple-deep/20 p-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center justify-between text-body text-fg-primary"
          >
            <span>💡 当这个阴影来临时，你可以...</span>
            <ChevronDown
              size={20}
              className={cn('text-fg-dim transition-transform', expanded && 'rotate-180')}
            />
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-3 flex flex-col gap-2 overflow-hidden"
              >
                {tips.map((tip, i) => (
                  <li key={i} className="text-body-sm text-fg-secondary">
                    {i + 1}. {tip}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    );
  },
);

ShadowZone.displayName = 'ShadowZone';
