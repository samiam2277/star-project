'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface RadarDimension {
  key: string;
  color: string;
  activated: number;
  ceiling: number;
}

interface RadarOrbWidgetProps {
  dimensions: RadarDimension[];
  pulse?: boolean;
  onClick?: () => void;
  className?: string;
}

export const RadarOrbWidget = React.memo<RadarOrbWidgetProps>(
  function RadarOrbWidget({ dimensions, pulse, onClick, className }) {
    return (
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          'fixed right-4 top-1/2 z-elevated -translate-y-1/2',
          'flex h-[50px] w-[50px] items-center justify-center rounded-full',
          'bg-gradient-to-br from-[#2A2438] via-[#1A1A28] to-[#0B0B14]',
          'border-[1.5px] border-accent-gold shadow-glow-purple',
          className,
        )}
      >
        {pulse && (
          <motion.div
            className="absolute inset-0 rounded-full border border-accent-gold"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        {/* Micro radar dots */}
        <div className="relative h-6 w-6">
          {dimensions.slice(0, 6).map((d, i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const r = 8 * (d.activated / Math.max(d.ceiling, 1));
            const x = Math.cos(angle) * Math.max(r, 3);
            const y = Math.sin(angle) * Math.max(r, 3);
            return (
              <span
                key={d.key}
                className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full"
                style={{
                  backgroundColor: d.color,
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  opacity: 0.9,
                }}
              />
            );
          })}
          <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-gold/50" />
        </div>
      </motion.button>
    );
  },
);

RadarOrbWidget.displayName = 'RadarOrbWidget';
