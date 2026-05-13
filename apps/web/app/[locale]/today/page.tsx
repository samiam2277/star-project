'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { BottomTab } from '@/components/nav/BottomTab';
import {
  ArchetypeSummaryCard,
  TodayStoryCard,
  TransitRemindersGroup,
  TodayTarotCard,
  AIEntranceCard,
  RadarOrbWidget,
} from '@/components/today';
import { mockTodayData } from '@/components/today/data';
import { useRouter } from '@/i18n/navigation';

function getGreetingByHour(): string {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return '早上好';
  if (hour >= 12 && hour < 18) return '下午好';
  if (hour >= 18 && hour < 22) return '晚上好';
  return '夜深了';
}

export default function TodayPage() {
  const router = useRouter();
  const [radarPulse, setRadarPulse] = React.useState(false);

  const handleStoryChoice = React.useCallback(() => {
    setRadarPulse(true);
    setTimeout(() => setRadarPulse(false), 3000);
  }, []);

  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  const greeting = getGreetingByHour();

  return (
    <div className="relative min-h-screen bg-bg-deep pb-24">
      {/* Page Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 z-sticky flex items-center justify-between border-b border-border-subtle bg-bg-deep/90 px-5 py-3 backdrop-blur-lg"
      >
        <div className="flex items-center gap-2">
          <span className="text-accent-gold">✦</span>
          <span className="font-serif text-h3 text-fg-primary">星语</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-caption text-fg-dim">{dateStr}</span>
          <button className="text-fg-dim transition hover:text-fg-secondary">
            🔔
          </button>
          <div className="h-7 w-7 rounded-full border border-border-subtle bg-bg-elevated" />
        </div>
      </motion.header>

      <main className="flex flex-col gap-8 px-5 pt-6">
        <ArchetypeSummaryCard
          userName={mockTodayData.userName}
          nameZh={mockTodayData.archetype.nameZh}
          nameEn={mockTodayData.archetype.nameEn}
          themeColor={mockTodayData.archetype.themeColor}
          greeting={greeting}
          energyText={mockTodayData.energyText}
        />

        <TodayStoryCard
          sceneTag={mockTodayData.story.sceneTag}
          narrative={mockTodayData.story.narrative}
          question={mockTodayData.story.question}
          choices={mockTodayData.story.choices}
          followUpText={mockTodayData.story.followUpText}
          onChoice={handleStoryChoice}
          onContinueToAI={() => router.push('/ai')}
          onGoToRadar={() => router.push('/radar')}
        />

        <TransitRemindersGroup items={mockTodayData.transits} />

        <TodayTarotCard
          cardName={mockTodayData.tarot.cardName}
          cardNameEn={mockTodayData.tarot.cardNameEn}
          meaning={mockTodayData.tarot.meaning}
          drawnCount={mockTodayData.tarot.drawnCount}
          dailyLimit={mockTodayData.tarot.dailyLimit}
        />

        <AIEntranceCard
          quickReplies={mockTodayData.ai.quickReplies.map((label) => ({
            label,
            onClick: () => router.push('/ai'),
          }))}
          usageUsed={mockTodayData.ai.usageUsed}
          usageTotal={mockTodayData.ai.usageTotal}
          userTier={mockTodayData.ai.userTier}
          onOpenChat={() => router.push('/ai')}
        />
      </main>

      <RadarOrbWidget
        dimensions={mockTodayData.radar.dimensions}
        pulse={radarPulse}
        onClick={() => router.push('/radar')}
      />

      <BottomTab />
    </div>
  );
}
