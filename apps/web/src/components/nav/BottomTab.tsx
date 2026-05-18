'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Sun, CircleDot, MessageCircle, Link2, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

interface TabItem {
  key: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

const tabs: TabItem[] = [
  { key: 'today', label: '今日', href: '/today', icon: Sun },
  { key: 'chart', label: '星盘', href: '/chart', icon: CircleDot },
  { key: 'ai', label: 'AI', href: '/ai', icon: MessageCircle },
  { key: 'connect', label: '关系', href: '/synastry', icon: Link2 },
  { key: 'me', label: '我', href: '/me', icon: User },
];

export const BottomTab = React.memo(function BottomTab() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    // 支持 /zh/today 或 /en/today 格式
    const segments = pathname.split('/');
    const route = segments[2] || segments[1] || '';
    return href.replace('/', '') === route;
  };

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-sticky',
        'flex h-14 items-center justify-around',
        'border-t border-border-subtle bg-bg-elevated/90 backdrop-blur-lg',
        'pb-[env(safe-area-inset-bottom)]',
      )}
      aria-label="主导航"
    >
      {tabs.map((tab) => {
        const active = isActive(tab.href);
        const Icon = tab.icon;

        return (
          <Link
            key={tab.key}
            href={tab.href as '/today' | '/chart' | '/ai' | '/synastry' | '/me'}
            className={cn(
              'relative flex flex-1 flex-col items-center justify-center gap-0.5',
              'h-full transition-colors duration-fast',
              active ? 'text-accent-gold' : 'text-fg-dim hover:text-fg-secondary',
            )}
            aria-current={active ? 'page' : undefined}
          >
            {/* active 金色短下划线 */}
            {active && (
              <span className="absolute top-0 h-0.5 w-6 rounded-full bg-accent-gold" />
            )}
            {/* @ts-ignore — lucide-react v1 + React 19 type mismatch */}
            <Icon size={24} strokeWidth={active ? 2 : 1.5} />
            <span className="text-micro">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
});

BottomTab.displayName = 'BottomTab';
