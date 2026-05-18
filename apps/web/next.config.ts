import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('swisseph-wasm');
    }
    // swisseph-wasm 内部有条件动态 import('module')，webpack 静态分析会尝试解析它。
    // 在浏览器端该分支永远不会执行，因此把 'module' 标记为 false（webpack 会忽略这个 import）。
    config.resolve = config.resolve ?? {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      module: false,
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
