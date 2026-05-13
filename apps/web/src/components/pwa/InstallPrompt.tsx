'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as Record<string, boolean>).standalone === true
  );
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    React.useState<BeforeInstallPromptEvent | null>(null);
  const [showIOS, setShowIOS] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // 注册 Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => console.error('SW registration failed:', err));
    }

    if (isStandalone()) return;

    // 检查本地存储
    if (localStorage.getItem('install-prompt-dismissed') === '1') {
      setDismissed(true);
      return;
    }

    // iOS Safari 不触发 beforeinstallprompt，单独提示
    if (isIOS()) {
      setShowIOS(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as unknown as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowIOS(false);
    setDeferredPrompt(null);
    localStorage.setItem('install-prompt-dismissed', '1');
  };

  const visible = !dismissed && (deferredPrompt || showIOS);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-20 left-0 right-0 z-modal flex justify-center px-4"
        >
          <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border border-accent-gold/30 bg-bg-elevated/95 p-4 shadow-glow-gold backdrop-blur-lg">
            {showIOS ? (
              <>
                <p className="text-body-sm text-fg-primary">
                  iOS 用户：点击 Safari 底部的
                  <span className="mx-1 inline-block align-text-bottom">📤</span>
                  ，然后选择「<span className="text-accent-gold">添加到主屏幕</span>」，即可像 App 一样使用
                  <span className="font-serif text-accent-gold">星语</span>。
                </p>
                <Button variant="ghost" className="w-full" onClick={handleDismiss}>
                  知道了
                </Button>
              </>
            ) : (
              <>
                <p className="text-body-sm text-fg-primary">
                  将
                  <span className="font-serif text-accent-gold"> 星语 </span>
                  安装到主屏幕，像原生 App 一样随时查看今日能量。
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="primary-gold"
                    className="flex-1"
                    onClick={handleInstall}
                  >
                    安装
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={handleDismiss}
                  >
                    忽略
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
