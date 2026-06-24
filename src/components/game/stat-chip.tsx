import { SymbolView } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { hexAlpha } from '@/lib/color';
import { useTheme } from '@/hooks/use-theme';

type StatChipProps = {
  icon?: string;
  symbol?: { ios: string; android: string; web: string };
  value: string | number;
  tint: string;
};

export function StatChip({ icon, symbol, value, tint }: StatChipProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: hexAlpha(tint, 0.2),
        },
      ]}>
      <View style={[styles.iconWrap, { backgroundColor: hexAlpha(tint, 0.12) }]}>
        {symbol ? (
          <SymbolView
            name={symbol as Parameters<typeof SymbolView>[0]['name']}
            size={14}
            tintColor={tint}
          />
        ) : (
          <ThemedText style={styles.iconEmoji}>{icon}</ThemedText>
        )}
      </View>
      <ThemedText style={[styles.value, { color: theme.text }]}>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingLeft: Spacing.one,
    paddingRight: Spacing.three,
    paddingVertical: Spacing.one + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 14,
  },
  value: {
    ...Typography.caption,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
});
