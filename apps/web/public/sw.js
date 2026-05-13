/* 星语 StellarLog · Service Worker
 * 极简版本：仅用于满足 PWA 安装要求，无复杂缓存策略
 */

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // 透传网络请求，由 Next.js 自行处理
  event.respondWith(fetch(event.request));
});
