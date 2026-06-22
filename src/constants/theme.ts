import '@/global.css';

import { Platform } from 'react-native';

import type { GameMode } from '@/context/game-context';

export const Colors = {
  light: {
    text: '#111827',
    background: '#F8FAFC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#EEF2FF',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    accent: '#4F46E5',
    accentMuted: '#818CF8',
    success: '#059669',
    successBg: '#ECFDF5',
    error: '#DC2626',
    errorBg: '#FEF2F2',
    star: '#F59E0B',
    flame: '#F97316',
    overlay: 'rgba(15, 23, 42, 0.55)',
    cardShadow: 'rgba(15, 23, 42, 0.08)',
  },
  dark: {
    text: '#F8FAFC',
    background: '#0F172A',
    backgroundElement: '#1E293B',
    backgroundSelected: '#312E81',
    textSecondary: '#94A3B8',
    border: '#334155',
    accent: '#818CF8',
    accentMuted: '#6366F1',
    success: '#34D399',
    successBg: '#064E3B',
    error: '#F87171',
    errorBg: '#450A0A',
    star: '#FBBF24',
    flame: '#FB923C',
    overlay: 'rgba(0, 0, 0, 0.75)',
    cardShadow: 'rgba(0, 0, 0, 0.3)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const MODE_COLORS: Record<GameMode, string> = {
  puzzles: '#6366F1',
  logic: '#0EA5E9',
  analyze: '#8B5CF6',
  decisions: '#10B981',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 480;

export const Shadow = Platform.select({
  ios: {
    card: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
  },
  android: {
    card: {
      elevation: 3,
    },
  },
  default: {},
});
