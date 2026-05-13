import * as React from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant =
  | 'primary-gold'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'icon-only';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  'primary-gold':
    'h-11 px-6 rounded-2xl bg-gradient-to-br from-accent-gold via-[#E5C892] to-accent-gold-deep '
    + 'text-body font-semibold text-fg-on-gold shadow-glow-gold '
    + 'hover:brightness-110 active:scale-[0.97]',
  secondary:
    'h-11 px-6 rounded-xl border border-border-default bg-transparent '
    + 'text-body font-medium text-fg-secondary '
    + 'hover:bg-bg-elevated active:scale-[0.97]',
  ghost:
    'h-10 px-4 rounded-xl bg-transparent text-body font-medium text-fg-secondary '
    + 'hover:bg-bg-elevated active:scale-[0.97]',
  destructive:
    'h-11 px-6 rounded-xl bg-radar-leadership text-body font-semibold text-fg-primary '
    + 'hover:brightness-110 active:scale-[0.97]',
  'icon-only':
    'h-10 w-10 rounded-xl flex items-center justify-center '
    + 'bg-bg-elevated text-fg-primary border border-border-default '
    + 'hover:bg-bg-card active:scale-[0.97]',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary-gold',
      loading = false,
      disabled = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'transition-all duration-fast ease-out-soft',
          'disabled:opacity-40 disabled:grayscale-[0.8] disabled:cursor-not-allowed disabled:active:scale-100',
          'touch-manipulation',
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {loading && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-fg-on-gold/30 border-t-fg-on-gold" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
