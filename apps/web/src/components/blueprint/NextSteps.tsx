'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import type { NextStepItem } from './data';

interface NextStepsProps {
  items: NextStepItem[];
  className?: string;
}

const variantStyles = {
  'primary-gold':
    'h-14 rounded-2xl bg-gradient-to-br from-accent-gold via-[#E5C892] to-accent-gold-deep '
    + 'text-body font-semibold text-fg-on-gold shadow-glow-gold '
    + 'hover:brightness-110 active:scale-[0.97]',
  secondary:
    'h-14 rounded-xl border border-border-default bg-transparent '
    + 'text-body font-medium text-fg-secondary '
    + 'hover:bg-bg-elevated active:scale-[0.97]',
  ghost:
    'h-12 rounded-xl bg-transparent text-body font-medium text-fg-dim '
    + 'hover:text-fg-secondary hover:bg-bg-elevated active:scale-[0.97]',
};

export const NextSteps = React.memo<NextStepsProps>(
  function NextSteps({ items, className }) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn('flex flex-col gap-3 px-6 py-10', className)}
      >
        <span className="text-h2 text-fg-primary">下一步</span>

        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.href as '/today' | '/chart' | '/ai' | '/synastry' | '/me'}
              className={cn(
                'flex w-full items-center justify-center transition-all duration-fast',
                variantStyles[item.variant],
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.section>
    );
  },
);

NextSteps.displayName = 'NextSteps';
