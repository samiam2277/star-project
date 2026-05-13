'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TalentItem } from './data';

interface TalentZoneProps {
  items: TalentItem[];
  className?: string;
}

export const TalentZone = React.memo<TalentZoneProps>(
  function TalentZone({ items, className }) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn('flex flex-col gap-6 px-6 py-10', className)}
      >
        <div className="flex items-center gap-2">
          <span className="text-h1 text-fg-primary">⭐ 你的天赋区</span>
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
              <div className="absolute left-0 top-4 h-10 w-[3px] rounded-r-full bg-accent-gold" />
              <h3 className="pl-3 text-h3 text-fg-primary">{item.headline}</h3>
              <p className="pl-3 text-body-sm text-fg-secondary">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    );
  },
);

TalentZone.displayName = 'TalentZone';
