import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#0B0B14',
          space: '#11111C',
          card: '#15151F',
          elevated: '#1C1C28',
        },
        fg: {
          primary: '#F4EDE0',
          secondary: '#C7C2B8',
          dim: '#8A8595',
          'on-gold': '#0B0B14',
        },
        accent: {
          gold: '#C9A876',
          'gold-deep': '#9C7E4E',
          purple: '#6B5B95',
          'purple-deep': '#4A3F6B',
          rose: '#B8838C',
          blue: '#5B7A95',
        },
        radar: {
          creativity: '#E0A82E',
          leadership: '#C26B5C',
          insight: '#6B5B95',
          social: '#B8838C',
          intuition: '#5B7A95',
          execution: '#5C7A6B',
        },
        border: {
          subtle: '#2A2A38',
          DEFAULT: '#3A3A4D',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'PingFang SC', 'system-ui', 'sans-serif'],
        serif: ['Fraunces Variable', 'Source Han Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['44px', { lineHeight: '52px', fontWeight: '700' }],
        'display-lg': ['36px', { lineHeight: '44px', fontWeight: '700' }],
        display: ['28px', { lineHeight: '36px', fontWeight: '700' }],
        h1: ['24px', { lineHeight: '32px', fontWeight: '600' }],
        h2: ['20px', { lineHeight: '28px', fontWeight: '600' }],
        h3: ['18px', { lineHeight: '26px', fontWeight: '600' }],
        'body-lg': ['17px', { lineHeight: '26px', fontWeight: '400' }],
        body: ['15px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        caption: ['13px', { lineHeight: '18px', fontWeight: '400' }],
        micro: ['11px', { lineHeight: '16px', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'glow-gold': '0 0 32px rgba(201, 168, 118, 0.25)',
        'glow-purple': '0 0 32px rgba(107, 91, 149, 0.30)',
      },
      zIndex: {
        base: '0',
        elevated: '10',
        sticky: '20',
        overlay: '30',
        'modal-bg': '40',
        modal: '50',
        toast: '60',
        debug: '9999',
      },
    },
  },
  plugins: [],
};

export default config;
