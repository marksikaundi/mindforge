import '@/global.css';

import { Platform } from 'react-native';

import type { GameMode } from '@/context/game-context';

export const Colors = {
  light: {
    text: '#1A1B2E',
    background: '#F4F2EF',
    backgroundElement: '#FFFFFF',
    backgroundElevated: '#FFFFFF',
    backgroundSelected: '#EDE9FE',
    textSecondary: '#6B7289',
    border: '#E4E1DC',
    borderSubtle: '#EEECE8',
    accent: '#6C5CE7',
    accentMuted: '#A29BFE',
    accentSoft: '#F0EDFF',
    success: '#10B981',
    successBg: '#ECFDF5',
    error: '#EF4444',
    errorBg: '#FEF2F2',
    star: '#F59E0B',
    flame: '#F97316',
    overlay: 'rgba(26, 27, 46, 0.52)',
    cardShadow: 'rgba(26, 27, 46, 0.06)',
    mesh1: '#6C5CE7',
    mesh2: '#0EA5E9',
    mesh3: '#8B5CF6',
  },
  dark: {
    text: '#F4F2EF',
    background: '#0B1020',
    backgroundElement: '#151929',
    backgroundElevated: '#1E2235',
    backgroundSelected: '#2D2654',
    textSecondary: '#9498B0',
    border: '#2A2F45',
    borderSubtle: '#1E2235',
    accent: '#A29BFE',
    accentMuted: '#6C5CE7',
    accentSoft: '#1E1A35',
    success: '#34D399',
    successBg: '#064E3B',
    error: '#F87171',
    errorBg: '#450A0A',
    star: '#FBBF24',
    flame: '#FB923C',
    overlay: 'rgba(0, 0, 0, 0.72)',
    cardShadow: 'rgba(0, 0, 0, 0.35)',
    mesh1: '#6C5CE7',
    mesh2: '#0EA5E9',
    mesh3: '#8B5CF6',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const MODE_COLORS: Record<GameMode, string> = {
  puzzles: '#6C5CE7',
  logic: '#0EA5E9',
  analyze: '#8B5CF6',
  decisions: '#10B981',
};

export const Typography = {
  display: { fontSize: 34, fontWeight: '800' as const, letterSpacing: -1, lineHeight: 40 },
  h1: { fontSize: 28, fontWeight: '800' as const, letterSpacing: -0.6, lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '700' as const, letterSpacing: -0.4, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '700' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '500' as const, lineHeight: 24 },
  bodySm: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
  label: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 1.4, textTransform: 'uppercase' as const },
  caption: { fontSize: 12, fontWeight: '600' as const, lineHeight: 16 },
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
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24,
  xxl: 28,
  full: 999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 480;

export const Shadow = Platform.select({
  ios: {
    card: {
      shadowColor: '#1A1B2E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.07,
      shadowRadius: 12,
    },
    elevated: {
      shadowColor: '#6C5CE7',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.18,
      shadowRadius: 20,
    },
  },
  android: {
    card: { elevation: 4 },
    elevated: { elevation: 8 },
  },
  default: { card: {}, elevated: {} },
});
