'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

interface ArchetypeSummaryCardProps {
  userName: string;
  nameZh: string;
  nameEn: string;
  themeColor?: string;
  greeting: string;
  energyText: string;
  className?: string;
}

export const ArchetypeSummaryCard = React.memo<ArchetypeSummaryCardProps>(
  function ArchetypeSummaryCard({
    userName,
    nameZh,
    themeColor,
    greeting,
    energyText,
    className,
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'relative overflow-hidden rounded-xl p-5',
          'bg-gradient-to-br from-[#2A2438] via-[#1A1A28] to-[#0B0B14]',
          'border border-accent-gold/30',
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(201,168,118,0.3) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-h3 text-fg-primary">
                你好 {userName}，{nameZh}
              </h3>
              <div className="h-px w-6 bg-accent-gold/60" />
            </div>
            <div
              className="h-8 w-8 rounded-full"
              style={{
                backgroundColor: themeColor || '#C9A876',
                boxShadow: `0 0 12px ${themeColor || '#C9A876'}40`,
              }}
            />
          </div>
          <p className="mt-2 text-body text-fg-secondary leading-relaxed">
            {greeting}，<br />
            {energyText}
          </p>
          <Link
            href="/blueprint/result"
            className="mt-3 inline-flex items-center gap-1 self-end text-caption text-accent-gold transition hover:text-accent-gold/80"
          >
            看完整蓝图 <span>→</span>
          </Link>
        </div>
      </motion.div>
    );
  },
);

ArchetypeSummaryCard.displayName = 'ArchetypeSummaryCard';
