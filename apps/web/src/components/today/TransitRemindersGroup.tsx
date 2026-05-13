'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

export interface TransitItem {
  id: string;
  icon: string;
  title: string;
  timing: string;
  description: string;
}

interface TransitRemindersGroupProps {
  items: TransitItem[];
  className?: string;
}

export const TransitRemindersGroup = React.memo<TransitRemindersGroupProps>(
  function TransitRemindersGroup({ items, className }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className={cn('flex flex-col gap-4', className)}
      >
        <h2 className="text-h2 text-fg-primary">🌌 今日 Transit</h2>

        {items.length === 0 ? (
          <div className="rounded-xl border border-border-subtle bg-bg-card p-5 text-center">
            <p className="text-body text-fg-secondary">
              ✨ 今天天象平静，适合自己创造节奏。
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 rounded-xl border border-border-subtle bg-bg-card p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-body-lg">{item.icon}</span>
                  <h3 className="text-body font-semibold text-fg-primary">
                    {item.title}
                  </h3>
                </div>
                <div className="h-px w-full bg-border-subtle" />
                <p className="text-caption text-fg-dim">{item.timing}</p>
                <p className="text-body-sm leading-relaxed text-fg-secondary">
                  {item.description}
                </p>
                <Link
                  href={`/chart?focus=${item.id}`}
                  className="self-end text-caption text-accent-gold transition hover:text-accent-gold/80"
                >
                  看星盘 →
                </Link>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  },
);

TransitRemindersGroup.displayName = 'TransitRemindersGroup';
