'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface QuickReply {
  label: string;
  onClick: () => void;
}

interface AIEntranceCardProps {
  quickReplies: QuickReply[];
  usageUsed: number;
  usageTotal: number;
  userTier: 'free' | 'plus' | 'pro';
  onOpenChat: () => void;
  className?: string;
}

export const AIEntranceCard = React.memo<AIEntranceCardProps>(
  function AIEntranceCard({
    quickReplies,
    usageUsed,
    usageTotal,
    userTier,
    onOpenChat,
    className,
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'flex flex-col gap-4 rounded-xl border border-accent-gold/20 bg-bg-card p-6',
          className,
        )}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-h3 text-fg-primary">💬 跟 AI 占星师聊聊</h2>
          <div className="mt-2 h-px w-full bg-border-subtle" />
        </div>

        <p className="text-body text-fg-secondary">今天问点什么？</p>

        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={reply.onClick}
              className="rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-body-sm text-fg-secondary transition hover:border-accent-gold/40 hover:text-fg-primary"
            >
              {reply.label}
            </button>
          ))}
        </div>

        <div className="h-px w-full bg-border-subtle" />

        <div className="flex items-center justify-between">
          <p className="text-caption text-fg-dim">
            {userTier === 'pro'
              ? 'Pro · 不限'
              : `剩余 ${usageTotal - usageUsed}/${usageTotal} 次 (${userTier === 'plus' ? 'Plus' : 'Free'})`}
          </p>
        </div>

        <Button variant="primary-gold" className="w-full" onClick={onOpenChat}>
          打开对话 →
        </Button>
      </motion.div>
    );
  },
);

AIEntranceCard.displayName = 'AIEntranceCard';
