'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface StoryChoice {
  key: 'A' | 'B' | 'C';
  text: string;
  dimension: string;
  dimensionLabel: string;
}

interface TodayStoryCardProps {
  sceneTag: string;
  narrative: string;
  question: string;
  choices: StoryChoice[];
  followUpText: string;
  onChoice?: (choice: StoryChoice) => void;
  onContinueToAI: () => void;
  onGoToRadar: () => void;
  className?: string;
}

export const TodayStoryCard = React.memo<TodayStoryCardProps>(
  function TodayStoryCard({
    sceneTag,
    narrative,
    question,
    choices,
    followUpText,
    onChoice,
    onContinueToAI,
    onGoToRadar,
    className,
  }) {
    const [selected, setSelected] = React.useState<'A' | 'B' | 'C' | null>(null);
    const [showFeedback, setShowFeedback] = React.useState(false);

    const handleChoice = (key: 'A' | 'B' | 'C') => {
      if (selected) return;
      setSelected(key);
      const choice = choices.find((c) => c.key === key);
      if (choice) onChoice?.(choice);
      setTimeout(() => setShowFeedback(true), 500);
    };

    const chosen = selected ? choices.find((c) => c.key === selected) : null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        className={cn('flex flex-col gap-4', className)}
      >
        <h2 className="text-h2 text-fg-primary">✨ 今日剧情</h2>

        <div className="flex flex-col gap-4 rounded-xl border border-border-subtle bg-bg-card p-5">
          {/* Scene tag */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border-subtle" />
            <span className="whitespace-nowrap text-caption text-fg-dim">{sceneTag}</span>
            <div className="h-px flex-1 bg-border-subtle" />
          </div>

          <AnimatePresence mode="wait">
            {!showFeedback ? (
              <motion.div
                key="choices"
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {/* Narrative */}
                <p className="font-serif text-body leading-relaxed text-fg-primary">{narrative}</p>
                <p className="text-h3 text-fg-primary">{question}</p>

                {/* Choices */}
                <div className="flex flex-col gap-2.5">
                  {choices.map((choice) => (
                    <button
                      key={choice.key}
                      onClick={() => handleChoice(choice.key)}
                      disabled={!!selected}
                      className={cn(
                        'w-full rounded-lg border px-4 py-3 text-left text-body transition-all',
                        selected === choice.key
                          ? 'border-accent-gold bg-accent-gold/10 text-fg-primary'
                          : selected
                            ? 'border-border-subtle bg-bg-elevated/50 text-fg-dim'
                            : 'border-border-subtle bg-bg-elevated text-fg-secondary hover:border-accent-gold/40 hover:bg-bg-elevated/80',
                      )}
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>

                <p className="text-center text-micro text-fg-dim">
                  ⓘ 选项基于你的「深潜者」原型设计
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2 text-body text-fg-secondary">
                  <span className="text-accent-gold">✓</span>
                  <span>你选了 {selected}</span>
                </div>

                <div className="flex flex-col items-center gap-2 py-2">
                  <p className="text-body text-fg-secondary">这一选择让你激活了你的</p>
                  <p className="font-serif text-display text-accent-gold">
                    ✨ {chosen?.dimensionLabel}
                  </p>
                  <div className="h-px w-12 bg-accent-gold/50" />
                </div>

                <p className="font-serif text-body leading-relaxed text-fg-primary">
                  {followUpText}
                </p>

                <p className="text-center text-caption text-fg-dim">
                  ⓘ 今日剧情结束，明天再来
                </p>

                <div className="mt-1 flex flex-col gap-2">
                  <Button variant="secondary" onClick={onContinueToAI}>
                    继续跟 AI 聊聊
                  </Button>
                  <button
                    onClick={onGoToRadar}
                    className="py-2 text-center text-caption text-fg-dim transition hover:text-fg-secondary"
                  >
                    今天的雷达 ↗
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  },
);

TodayStoryCard.displayName = 'TodayStoryCard';
