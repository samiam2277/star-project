'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DefinitionQuoteProps {
  text: string;
  className?: string;
}

export const DefinitionQuote = React.memo<DefinitionQuoteProps>(
  function DefinitionQuote({ text, className }) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn('flex flex-col items-center gap-4 px-8 py-12', className)}
      >
        <span
          className="self-start font-serif text-[80px] leading-none text-accent-gold/40"
          aria-hidden="true"
        >
          "
        </span>
        <p className="max-w-[280px] text-center font-serif text-display text-fg-primary">
          {text}
        </p>
        <span
          className="self-end font-serif text-[80px] leading-none text-accent-gold/40"
          aria-hidden="true"
        >
          "
        </span>
        <span className="mt-2 text-micro uppercase tracking-[0.2em] text-fg-dim">
          DEFINITION
        </span>
      </motion.section>
    );
  },
);

DefinitionQuote.displayName = 'DefinitionQuote';
