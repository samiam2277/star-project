import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total?: number;
  className?: string;
}

export const ProgressBar = React.memo<ProgressBarProps>(
  function ProgressBar({ current, total = 5, className }) {
    return (
      <div className={cn('flex items-center gap-1.5', className)}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-2 w-2 rounded-full transition-all duration-200',
              i < current
                ? 'bg-accent-gold'
                : i === current
                  ? 'bg-accent-gold/60'
                  : 'bg-fg-dim/30',
            )}
          />
        ))}
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';
