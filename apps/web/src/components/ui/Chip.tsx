import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ active = false, children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center h-7 px-3 rounded-full',
          'text-caption font-medium',
          'transition-colors duration-fast',
          'touch-manipulation',
          active
            ? 'bg-accent-gold/10 border border-accent-gold text-accent-gold'
            : 'bg-bg-elevated text-fg-secondary border border-transparent',
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Chip.displayName = 'Chip';
