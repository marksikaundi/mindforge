import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing } from '@/constants/theme';
import { hexAlpha } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

type StatChipProps = {
  icon: string;
  value: string | number;
  tint: string;
};

export function StatChip({ icon, value, tint }: StatChipProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: hexAlpha(tint, 0.12),
          borderColor: hexAlpha(tint, 0.25),
        },
      ]}>
      <View style={[styles.iconWrap, { backgroundColor: hexAlpha(tint, 0.2) }]}>
        <ThemedText style={styles.icon}>{icon}</ThemedText>
      </View>
      <ThemedText style={[styles.value, { color: theme.text }]}>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingLeft: Spacing.one,
    paddingRight: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
});
