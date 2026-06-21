import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, MODE_COLORS, Spacing } from '@/constants/theme';
import { GameMode } from '@/context/game-context';
import { GAME_MODE_META } from '@/data/game-data';

type CategoryBadgeProps = {
  mode: GameMode;
  size?: 'sm' | 'md';
};

export function CategoryBadge({ mode, size = 'md' }: CategoryBadgeProps) {
  const meta = GAME_MODE_META[mode];
  const color = MODE_COLORS[mode];

  return (
    <View style={[styles.badge, { backgroundColor: `${color}18` }, size === 'sm' && styles.sm]}>
      <ThemedText style={[styles.emoji, size === 'sm' && styles.emojiSm]}>{meta.emoji}</ThemedText>
      <ThemedText style={[styles.label, { color }, size === 'sm' && styles.labelSm]}>
        {meta.label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: BorderRadius.full,
  },
  sm: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
  },
  emoji: {
    fontSize: 14,
  },
  emojiSm: {
    fontSize: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  labelSm: {
    fontSize: 10,
  },
});
