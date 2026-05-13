'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ArchetypeHeroProps {
  nameZh: string;
  nameEn: string;
  number: number;
  themeColor?: string;
  className?: string;
}

export const ArchetypeHero = React.memo<ArchetypeHeroProps>(
  function ArchetypeHero({ nameZh, nameEn, number, themeColor, className }) {
    return (
      <section
        className={cn(
          'relative flex flex-col items-center justify-center',
          'min-h-[488px] w-full overflow-hidden rounded-b-2xl px-8 pb-16 pt-20',
          className,
        )}
        style={{
          background:
            'linear-gradient(135deg, #2A2438 0%, #1A1A28 50%, #0B0B14 100%)',
          border: '1px solid transparent',
          borderImage:
            'linear-gradient(135deg, #C9A876, #E5C892, #9C7E4E) 1',
          boxShadow: '0 0 24px rgba(201, 168, 118, 0.18)',
        }}
      >
        {/* 星盘纹理占位 */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(201,168,118,0.3) 0%, transparent 70%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 flex flex-col items-center gap-4 text-center"
        >
          {/* 装饰圆点 */}
          <div
            className="mb-2 h-5 w-5 rounded-full"
            style={{
              backgroundColor: themeColor || '#C9A876',
              boxShadow: `0 0 16px ${themeColor || '#C9A876'}60`,
            }}
          />

          {/* 中文原型名 */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-serif text-display-xl text-fg-primary"
            style={{ letterSpacing: '0.12em' }}
          >
            {nameZh}
          </motion.h1>

          {/* 烫金分隔线 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-16 bg-accent-gold/60"
          />

          {/* 英文原型名 */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-serif text-body-lg text-fg-secondary italic"
            style={{ letterSpacing: '0.04em' }}
          >
            {nameEn}
          </motion.span>

          {/* 原型编号徽章 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.3, type: 'spring', stiffness: 200, damping: 22 }}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-bg-elevated/80 px-3 py-1 text-caption text-accent-gold backdrop-blur-sm"
          >
            <span>✦</span>
            <span>灵魂原型 · No.{String(number).padStart(2, '0')}</span>
          </motion.div>
        </motion.div>
      </section>
    );
  },
);

ArchetypeHero.displayName = 'ArchetypeHero';
