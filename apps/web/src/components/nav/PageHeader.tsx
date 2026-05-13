import * as React from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader = React.memo<PageHeaderProps>(
  function PageHeader({ title, onBack, actions, className }) {
    return (
      <header
        className={cn(
          'flex h-14 items-center justify-between px-4',
          'border-b border-border-subtle bg-bg-deep/80 backdrop-blur-md',
          'sticky top-0 z-sticky',
          className,
        )}
      >
        {/* 左侧返回 */}
        <div className="flex w-10 items-center justify-start">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-primary transition hover:bg-bg-elevated active:scale-95"
              aria-label="返回"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* 中部标题 */}
        <h1 className="flex-1 truncate px-2 text-center text-h2 text-fg-primary">
          {title}
        </h1>

        {/* 右侧操作 */}
        <div className="flex w-10 items-center justify-end gap-2">
          {actions}
        </div>
      </header>
    );
  },
);

PageHeader.displayName = 'PageHeader';
