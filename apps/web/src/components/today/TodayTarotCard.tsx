'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface TodayTarotCardProps {
  cardName: string;
  cardNameEn: string;
  meaning: string;
  drawnCount: number;
  dailyLimit: number;
  className?: string;
}

export const TodayTarotCard = React.memo<TodayTarotCardProps>(
  function TodayTarotCard({
    cardName,
    cardNameEn,
    meaning,
    drawnCount,
    dailyLimit,
    className,
  }) {
    const [revealed, setRevealed] = React.useState(false);

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn('flex flex-col gap-4', className)}
      >
        <h2 className="text-h2 text-fg-primary">🎴 今日塔罗</h2>

        <div className="flex flex-col items-center gap-4 rounded-xl border border-border-subtle bg-bg-card p-6">
          {/* Card visual */}
          <button
            onClick={() => setRevealed(true)}
            className={cn(
              'relative h-[320px] w-[200px] rounded-xl border transition-all duration-500',
              revealed
                ? 'border-accent-gold/40 bg-gradient-to-br from-[#2A2438] via-[#1A1A28] to-[#0B0B14]'
                : 'border-accent-gold/60 bg-gradient-to-br from-accent-purple/20 via-bg-elevated to-bg-deep hover:shadow-glow-purple',
            )}
            style={{ perspective: '1000px' }}
          >
            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.div
                  key="back"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-display-xl text-accent-gold/30">✦</span>
                </motion.div>
              ) : (
                <motion.div
                  key="front"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center"
                >
                  <span className="text-caption text-fg-dim">{cardNameEn}</span>
                  <span className="font-serif text-h2 text-fg-primary">
                    {cardName}
                  </span>
                  <div className="h-px w-12 bg-accent-gold/50" />
                  <p className="text-body-sm leading-relaxed text-fg-secondary">
                    {meaning}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <p className="text-caption text-fg-dim">
            抽到 {dailyLimit} 次/天 / 已抽 {drawnCount}/{dailyLimit}
          </p>

          {!revealed ? (
            <Button variant="primary-gold" onClick={() => setRevealed(true)}>
              抽今日塔罗
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => {}}>
              展开解读
            </Button>
          )}
        </div>
      </motion.div>
    );
  },
);

TodayTarotCard.displayName = 'TodayTarotCard';
