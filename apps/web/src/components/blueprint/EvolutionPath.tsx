'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { EvolutionData } from './data';

interface EvolutionPathProps {
  data: EvolutionData;
  className?: string;
}

export const EvolutionPath = React.memo<EvolutionPathProps>(
  function EvolutionPath({ data, className }) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn('flex flex-col gap-6 px-6 py-10', className)}
      >
        <span className="text-h1 text-fg-primary">🧭 你的进化路径</span>

        {/* 南北交图示 */}
        <div className="flex items-center justify-center gap-4 rounded-xl bg-bg-card p-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent-rose/40 bg-accent-rose/10 text-body text-accent-rose">
              ☋
            </div>
            <span className="text-caption text-fg-dim">{data.southNode.sign}</span>
            <span className="text-micro text-fg-secondary">你来时</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-caption text-fg-dim">{data.southNode.label}</span>
            <div className="relative h-px w-20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-rose via-accent-gold to-accent-gold" />
              <div className="absolute inset-0 animate-[dash-flow_2s_linear_infinite]"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(201,168,118,0.8) 50%, transparent 60%, transparent 100%)',
                  backgroundSize: '200% 100%',
                }}
              />
            </div>
            <span className="text-caption text-fg-dim">{data.northNode.label}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent-gold/40 bg-accent-gold/10 text-body text-accent-gold shadow-glow-gold">
              ☊
            </div>
            <span className="text-caption text-fg-dim">{data.northNode.sign}</span>
            <span className="text-micro text-fg-secondary">你正在去向</span>
          </div>
        </div>

        {/* 旁白 */}
        <p className="rounded-xl bg-bg-card/50 p-4 text-body italic text-fg-primary/90 leading-relaxed">
          {data.narrative}
        </p>

        {/* 进化心法 */}
        <div className="flex flex-col gap-3">
          <span className="text-h2 text-fg-primary">📚 进化心法</span>
          {data.actions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.35 }}
              className="flex flex-col gap-1 rounded-lg bg-bg-card p-4"
            >
              <h4 className="text-h3 text-fg-primary">▸ {action.headline}</h4>
              <p className="text-caption text-fg-secondary"><strong className="text-fg-primary">为什么：</strong>{action.why}</p>
              <p className="text-caption text-fg-secondary"><strong className="text-fg-primary">怎么做：</strong>{action.how}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    );
  },
);

EvolutionPath.displayName = 'EvolutionPath';
