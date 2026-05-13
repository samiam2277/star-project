'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface HookCardData {
  nameZh: string;
  nameEn: string;
  number: number;
  definition: string;
  evolution: string;
  themeColor?: string;
}

interface HookCardProps {
  data: HookCardData;
  onContinue: () => void;
  onShare: () => void;
  onSkip: () => void;
  className?: string;
}

export const HookCard = React.memo<HookCardProps>(
  function HookCard({ data, onContinue, onShare, onSkip, className }) {
    return (
      <div
        className={cn(
          'relative flex min-h-screen flex-col items-center justify-center',
          'px-6 py-16',
          className,
        )}
        style={{ background: 'linear-gradient(180deg, #0B0B14 0%, #15151F 50%, #11111C 100%)' }}
      >
        {/* 星点装饰 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-accent-gold/40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.5,
              }}
            />
          ))}
        </div>

        {/* 主卡片 */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 flex w-full max-w-[320px] flex-col items-center gap-6 rounded-2xl p-6"
          style={{
            background:
              'linear-gradient(#15151F, #15151F) padding-box, '
              + 'linear-gradient(135deg, #C9A876, #E5C892, #9C7E4E) border-box',
            border: '1px solid transparent',
            boxShadow: '0 0 24px rgba(201, 168, 118, 0.18)',
          }}
        >
          {/* 装饰点 */}
          <div className="flex gap-2">
            {['✦', '✦', '✦'].map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
                className="text-caption text-accent-gold"
              >
                {s}
              </motion.span>
            ))}
          </div>

          {/* "你是" */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="text-body-sm text-fg-secondary"
          >
            你是
          </motion.span>

          {/* 中文原型名 - 逐字浮现 */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {data.nameZh.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.1 + i * 0.15,
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="font-serif text-display-xl text-fg-primary"
                  style={{ letterSpacing: '0.12em' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* 烫金分隔线 */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-16 bg-accent-gold/60"
            />

            {/* 英文原型名 */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              className="font-serif text-body-lg text-fg-secondary italic"
              style={{ letterSpacing: '0.04em' }}
            >
              {data.nameEn}
            </motion.span>

            {/* 编号徽章 */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 2.2,
                duration: 0.4,
                type: 'spring',
                stiffness: 200,
                damping: 22,
              }}
              className="mt-1 inline-flex items-center gap-1 rounded-full bg-bg-elevated/80 px-2.5 py-0.5 text-micro text-accent-gold"
            >
              <span>✦</span>
              <span>No.{String(data.number).padStart(2, '0')}</span>
            </motion.div>
          </div>

          {/* 分隔线 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.4 }}
            className="h-px w-full bg-border-subtle"
          />

          {/* 定义引文 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
            className="flex flex-col gap-3 text-center"
          >
            <p className="text-body text-fg-primary leading-relaxed">
              {data.definition}
            </p>
            <p className="text-body-sm text-fg-secondary">
              今年的你正在修炼：
            </p>
            <p className="font-serif text-body italic text-accent-gold/90">
              「{data.evolution}」
            </p>
          </motion.div>
        </motion.div>

        {/* CTA 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-8 flex w-full max-w-[320px] flex-col gap-3"
        >
          <Button variant="primary-gold" className="w-full" onClick={onContinue}>
            📖 看完整灵魂蓝图
          </Button>
          <Button variant="secondary" className="w-full" onClick={onShare}>
            📤 分享我的原型
          </Button>
          <button
            onClick={onSkip}
            className="py-2 text-caption text-fg-dim transition hover:text-fg-secondary"
          >
            跳过，先看看再说
          </button>
        </motion.div>
      </div>
    );
  },
);

HookCard.displayName = 'HookCard';
