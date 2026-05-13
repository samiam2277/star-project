import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ArchetypeCardProps {
  nameZh: string;
  nameEn: string;
  oneliner: string;
  themeColor?: string;
  className?: string;
}

/**
 * ArchetypeCard.S — 小尺寸 (120×168px)
 * 用于列表 / Today 顶部摘要
 */
export const ArchetypeCardS = React.memo<ArchetypeCardProps>(
  function ArchetypeCardS({ nameZh, nameEn, oneliner, themeColor, className }) {
    return (
      <div
        className={cn(
          'relative flex flex-col items-center justify-between',
          'w-[120px] h-[168px] rounded-xl p-3 overflow-hidden',
          'bg-gradient-to-br from-[#2A2438] via-[#1A1A28] to-[#0B0B14]',
          'border border-border-subtle',
          className,
        )}
      >
        <div
          className="h-4 w-4 rounded-full opacity-60"
          style={{ backgroundColor: themeColor || '#C9A876' }}
        />

        <div className="flex flex-col items-center gap-1 text-center">
          <span className="font-serif text-h3 text-fg-primary tracking-wide">
            {nameZh}
          </span>
          <span className="font-serif text-caption text-fg-dim italic tracking-wider">
            {nameEn}
          </span>
        </div>

        <p className="text-micro text-fg-dim text-center line-clamp-2 leading-relaxed">
          {oneliner}
        </p>
      </div>
    );
  },
);

ArchetypeCardS.displayName = 'ArchetypeCardS';

/**
 * ArchetypeCard.M — 中等尺寸 (320×440px)
 * 用于分享 / Card 列表
 *
 * 设计参照: 00-system.md §5.2.1
 *   - 完整烫金边框 (gradient border trick)
 *   - 星盘纹理 6% opacity 占位
 *   - 上中下三段: 装饰 / 原型名 / 一句话定义
 */
export const ArchetypeCardM = React.memo<ArchetypeCardProps>(
  function ArchetypeCardM({ nameZh, nameEn, oneliner, themeColor, className }) {
    return (
      <div
        className={cn(
          'relative flex flex-col items-center justify-between',
          'w-[320px] h-[440px] rounded-2xl p-6 overflow-hidden',
          className,
        )}
        style={{
          background:
            'linear-gradient(#15151F, #15151F) padding-box, '
            + 'linear-gradient(135deg, #C9A876, #E5C892, #9C7E4E) border-box',
          border: '1px solid transparent',
          boxShadow: '0 0 24px rgba(201, 168, 118, 0.18)',
        }}
      >
        {/* 星盘纹理占位层 */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(201,168,118,0.3) 0%, transparent 70%)',
          }}
        />

        {/* 上段：装饰标识 */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div
            className="h-6 w-6 rounded-full"
            style={{
              backgroundColor: themeColor || '#C9A876',
              boxShadow: `0 0 12px ${themeColor || '#C9A876'}40`,
            }}
          />
          <div className="h-px w-16 bg-accent-gold/50" />
        </div>

        {/* 中段：中英原型名 */}
        <div className="relative z-10 flex flex-col items-center gap-3 text-center">
          <span
            className="font-serif text-display-lg text-fg-primary tracking-widest"
            style={{ letterSpacing: '0.12em' }}
          >
            {nameZh}
          </span>
          <div className="h-px w-16 bg-accent-gold/50" />
          <span className="font-serif text-body-lg text-fg-secondary italic tracking-wide">
            {nameEn}
          </span>
        </div>

        {/* 下段：一句话定义 */}
        <p className="relative z-10 max-w-[260px] text-center text-body text-fg-secondary leading-relaxed">
          {oneliner}
        </p>
      </div>
    );
  },
);

ArchetypeCardM.displayName = 'ArchetypeCardM';
